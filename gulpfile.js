var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var htmlmin = require("gulp-htmlmin");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var notify = require("gulp-notify");
var postcss = require("gulp-postcss");
var sourcemaps = require("gulp-sourcemaps");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var uglify = require("gulp-uglify");
var pump = require("pump");
var rename = require("gulp-rename");
var run = require("run-sequence");
var del = require("del");

gulp.task("clean", function() {
  return del("build");
});

gulp.task("serve", function() {
  browserSync.init({
    server: { baseDir: "build/" }
  });

  gulp.watch("source/less/**/*.less", ["less"]);
  gulp.watch("source/**/*.html", ["html"]);
  gulp.watch("source/js/**/*.js", ["copy:fonts"]);
  gulp.watch("source/img/**/*.*", ["images"]);
  gulp.watch("source/js/**/*.js", ["js"]);
});

gulp.task("html", function() {
  return gulp
    .src("source/**/*.html")
    .pipe(posthtml([include()]))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build/"))
    .pipe(browserSync.stream());
});

gulp.task("copy:fonts", function() {
  return gulp
    .src("source/fonts/**/*.{woff,woff2}")
    .pipe(gulp.dest("build/fonts"))
    .pipe(browserSync.stream());
});

gulp.task("js", function(cb) {
  pump([gulp.src("source/js/**/*.js"), uglify(), gulp.dest("build/js")], cb);
});

gulp.task("images", ["webp", "sprite"], function() {
  return gulp
    .src("source/img/**/*.*")
    .pipe(
      imagemin([
        imagemin.optipng({ optimizationLevel: 3 }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.svgo()
      ])
    )
    .pipe(gulp.dest("build/img"))
    .pipe(browserSync.stream());
});

gulp.task("webp", function() {
  return gulp
    .src("source/img/**/*.{png,jpg}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("build/img"))
    .pipe(browserSync.stream());
});

gulp.task("sprite", function() {
  return gulp
    .src("source/img/icon-*.svg")
    .pipe(
      svgstore({
        inlineSvg: true
      })
    )
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"))
    .pipe(browserSync.stream());
});

gulp.task("less", function() {
  return gulp
    .src("source/less/style.less")
    .pipe(
      plumber({
        errorHandler: notify.onError(function(err) {
          return {
            title: "Styles",
            message: err.message
          };
        })
      })
    )
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(
      postcss([
        autoprefixer({
          browsers: ["last 6 versions"],
          cascade: false
        })
      ])
    )
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("build/css"))
    .pipe(browserSync.stream());
});

gulp.task("build", function(callback) {
  run("clean", "images", ["less", "html", "copy:fonts", "js"], callback);
});
