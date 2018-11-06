var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var sourcemaps = require("gulp-sourcemaps");
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");
var rename = require("gulp-rename");
var server = require("browser-sync").create();

gulp.task("style", function() {
  gulp
    .src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

gulp.task("build", function() {
  var processors = [autoprefixer({ browsers: ["last 2 versions"] }), cssnano];

  gulp
    .src("source/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss(processors))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

gulp.task("serve", ["style"], function() {
  server.init({
    server: "source/.",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", ["style"]);
  gulp.watch("source/*.html").on("change", server.reload);
});
