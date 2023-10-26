const { src, dest, series, parallel } = require("gulp");
const htmlmin = require("gulp-htmlmin");
const postcss = require("gulp-postcss");
const cp = require("child_process");
const purgecss = require("@fullhuman/postcss-purgecss");

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

exports.preinstall = parallel(fontAwesome, jquery);
exports.build = series(exports.preinstall, zolaBuild, minify);
exports.serve = series(exports.preinstall, zolaServe);
exports.default = exports.build;
