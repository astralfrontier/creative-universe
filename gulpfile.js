const { src, dest, series, parallel } = require("gulp");
const cp = require("child_process");

function fontAwesome(_cb) {
  return src("node_modules/@fortawesome/fontawesome-free/webfonts/*").pipe(
    dest("static/webfonts/")
  );
}

function jquery(_cb) {
  return src("node_modules/jquery/dist/jquery.min.js").pipe(dest("static/"));
}

function zolaBuild(_cb) {
  const i = process.argv.indexOf("--base-url");
  if (i > -1 && process.argv[i + 1]) {
    return cp.exec(`zola build --base-url ${process.argv[i + 1]}`);
  } else {
    return cp.exec(`zola build`);
  }
}

function zolaServe(_cb) {
  return cp.exec("zola serve --open");
}

exports.preinstall = parallel(fontAwesome, jquery);
exports.build = series(exports.preinstall, zolaBuild);
exports.serve = series(exports.preinstall, zolaServe);
exports.default = exports.build;
