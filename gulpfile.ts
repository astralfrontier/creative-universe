import purgeCSSPlugin from "@fullhuman/postcss-purgecss";
import toml from "@iarna/toml";
import { prompt } from "enquirer";
import { dest, parallel, series, src } from "gulp";
import htmlmin from "gulp-htmlmin";
import postcss from "gulp-postcss";
import moment from "moment";
import cp from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import slugify from "slugify";
import ogs from "open-graph-scraper";
// const cheerio = require("gulp-cheerio");

function fontAwesome() {
  return src("node_modules/@fortawesome/fontawesome-free/webfonts/*").pipe(
    dest("static/webfonts/")
  );
}

function jquery() {
  return src("node_modules/jquery/dist/jquery.min.js").pipe(dest("static/"));
}

function zolaBuild(cb: (err?: any) => void) {
  const i = process.argv.indexOf("--base-url");
  let cmd = "zola build";
  if (i > -1 && process.argv[i + 1]) {
    cmd = `zola build --base-url ${process.argv[i + 1]}`;
  }
  cp.exec(cmd, (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (err) {
      cb(new Error(err?.message));
    } else {
      cb();
    }
  });
}

function zolaServe() {
  return cp.exec("zola serve --open");
}

function minify() {
  return src("public/**/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("public"));
}

const postcssPlugins = [
  purgeCSSPlugin({
    content: ["public/**/*.html"],
  }),
];

function css() {
  return src("public/**/*.css")
    .pipe(postcss(postcssPlugins))
    .pipe(dest("public"));
}

// function modifyHtml(_cb) {
//   return src("public/**/*.html")
//     .pipe(
//       cheerio(($, file) => {
//         const usesLightbox = $("a[data-lightbox]").length > 0;
//         if (usesLightbox) {
//           $("head").append(
//             `<link href="/lightbox/lightbox.min.css" rel="stylesheet"></link>`
//           );
//           $("body").append(`<script src="/lightbox/lightbox.min.js"></script>`);
//         }
//       })
//     )
//     .pipe(dest("public/"));
// }

async function newBlog() {
  prompt;
  const contentFolders = fs
    .readdirSync(path.join(__dirname, "content"), {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
  const questions = [
    {
      type: "input",
      name: "title",
      message: "Blog title",
    },
    {
      type: "input",
      name: "description",
      message: "Blog description",
    },
    {
      type: "input",
      name: "banner_image",
      message: "Banner image path",
    },
    {
      type: "input",
      name: "tags",
      message: "Comma-separated tags",
    },
    {
      type: "select",
      name: "path",
      message: "Where does this post belong?",
      choices: contentFolders,
    },
  ];
  const extra_tags: any = {
    "exsurge-auroram": ["Arise"],
  };
  const answers: Record<any, any> = await prompt(questions);

  const date = moment().format("yyyy-MM-DD HH:mm:ss");
  const title = answers["title"] || "No Title";
  let tags = answers["tags"].split(",");
  if (extra_tags[answers["path"]]) {
    extra_tags[answers["path"]].map((tag: string) => tags.push(tag));
  }
  tags = tags
    .map((item: string) => item.trim())
    .filter((item: string) => item.length);
  const metadata: any = {
    title,
    description: answers["description"],
    date,
    authors: ["astralfrontier"],
  };
  if (tags.length) {
    metadata["taxonomies"] = { tags };
  }

  const options = {
    remove: /[*+~.()'"!:@]/g,
  };
  const filename = path.join(
    "content",
    answers["path"],
    `${slugify(title, options).toLowerCase()}`
  );

  // Accept banner images as local files or URLs
  if (answers["banner_image"]) {
    const bannerImagePath = await locateBannerImage(
      filename,
      answers["banner_image"]
    );
    if (bannerImagePath) {
      const bannerImageRelative = path
        .relative(path.join(__dirname, "content"), bannerImagePath)
        .split(path.sep)
        .join("/");
      metadata["extra"] = { banner_image: bannerImageRelative };
    } else {
      metadata["extra"] = { banner_image: answers["banner_image"] };
    }
  }

  const text = `+++\n${toml.stringify(
    metadata
  )}+++\n\nNew blog post.\n\n<!-- more -->\n\nMore blog content.\n`;
  fs.writeFileSync(`${filename}.md`, text);
  console.log(`Wrote ${filename}.md`);
}

async function locateBannerImage(filename: string, bannerImage: string) {
  // Is the banner image a local file?
  try {
    fs.accessSync(bannerImage, fs.constants.R_OK);
    return bannerImage;
  } catch (e) {
    // Nope, try something else
  }

  // Is the banner image a URL we can scrape for OG metadata?
  const options = { url: bannerImage };
  const { result } = await ogs(options);
  if (result?.ogImage && result?.ogImage[0] && result?.ogImage[0].url) {
    const response = await fetch(result.ogImage[0].url);
    const buffer = Buffer.from(await response.arrayBuffer());
    const bannerImage = `${filename}.${result?.ogImage[0].type || "jpg"}`;
    fs.writeFileSync(bannerImage, buffer);
    console.log(`Wrote ${bannerImage}`);
    return bannerImage;
  }
}

exports.newblog = newBlog;
exports.preinstall = parallel(fontAwesome, jquery);
exports.build = series(
  exports.preinstall,
  zolaBuild,
  /* modifyHtml, */ minify,
  css
);
exports.serve = series(exports.preinstall, zolaServe);
exports.default = exports.build;
