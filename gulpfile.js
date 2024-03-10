const { src, dest, series, parallel } = require("gulp");
const htmlmin = require("gulp-htmlmin");
const postcss = require("gulp-postcss");
// const cheerio = require("gulp-cheerio");
const cp = require("child_process");
const purgecss = require("@fullhuman/postcss-purgecss");
const inquirer = require("inquirer");
const moment = require("moment");
const slugify = require("slugify");
const toml = require("@iarna/toml");
const fs = require("fs");
const path = require("path");

function fontAwesome(_cb) {
  return src("node_modules/@fortawesome/fontawesome-free/webfonts/*").pipe(
    dest("static/webfonts/")
  );
}

function jquery(_cb) {
  return src("node_modules/jquery/dist/jquery.min.js").pipe(dest("static/"));
}

function zolaBuild(cb) {
  const i = process.argv.indexOf("--base-url");
  let cmd = "zola build";
  if (i > -1 && process.argv[i + 1]) {
    cmd = `zola build --base-url ${process.argv[i + 1]}`;
  }
  cp.exec(cmd, (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (err) {
      cb(new Error(err));
    } else {
      cb();
    }
  });
}

function zolaServe(_cb) {
  return cp.exec("zola serve --open");
}

function minify(_cb) {
  return src("public/**/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("public"));
}

const postcssPlugins = [
  purgecss({
    content: ["public/**/*.html"],
  }),
];

function css(_cb) {
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

function newBlog(cb) {
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
      type: "list",
      name: "path",
      message: "Where does this post belong?",
      choices: ["blog", "fiction", "empyrean-diadem", "exsurge-auroram"],
    },
  ];
  inquirer
    .prompt(questions)
    .then((answers) => {
      const date = moment().format("yyyy-MM-DD HH:mm:ss");
      const title = answers["title"] || "No Title";
      let tags = answers["tags"].split(",");
      if (answers["path"] == "exsurge-auroram") {
        tags.push("Arise");
      }
      tags = tags.filter((item) => item.length).map((item) => item.trim());
      const metadata = {
        title,
        description: answers["description"],
        date,
        authors: ["astralfrontier"],
      };
      if (tags.length) {
        metadata["taxonomies"] = { tags };
      }
      if (answers["banner_image"]) {
        metadata["extra"] = { banner_image: answers["banner_image"] };
      }
      const filename = path.join(
        "content",
        answers["path"],
        `${slugify(title).toLowerCase()}.md`
      );
      const text = `+++\n${toml.stringify(
        metadata
      )}+++\n\nNew blog post.\n\n<!-- more -->\n\nMore blog content.\n`;
      fs.writeFileSync(filename, text);
      console.log(`Wrote ${filename}`);
      cb();
    })
    .catch((e) => cb(e));
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
