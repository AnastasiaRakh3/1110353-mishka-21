const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify-es").default;
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const del = require("del");
const gulpif = require("gulp-if");
const sync = require("browser-sync").create();

const isProd = process.argv.includes("build");

// Styles

const styles = () => {
  return gulp
    .src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), csso()]))
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
};

exports.styles = styles;

// HTML

const html = () => {
  return gulp
    .src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
};

// Scripts

const scripts = () => {
  return gulp
    .src("source/js/script.js")
    .pipe(uglify())
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream());
};

exports.scripts = scripts;

// ImagesAll

const images = () => {
  return gulp
    .src("source/img/*.{png,jpg,svg}")
    .pipe(
      gulpif(
        isProd,
        imagemin([
          imagemin.mozjpeg({ quality: 85, progressive: true }),
          imagemin.optipng({ optimizationLevel: 3 }),
          imagemin.svgo(),
        ])
      )
    )
    .pipe(gulp.dest("build/img"));
};
exports.images = images;

// ImagesBackground

const imagesBackground = () => {
  return gulp
    .src("source/img/background/*.{png,jpg,svg}")
    .pipe(
      imagemin([
        imagemin.mozjpeg({ quality: 85, progressive: true }),
        imagemin.optipng({ optimizationLevel: 3 }),
      ])
    )
    .pipe(gulp.dest("build/img/background"));
};

exports.imagesBackground = imagesBackground;

// WebP

const createWebp = () => {
  return gulp
    .src("source/img/*.{jpg,png}")
    .pipe(webp({ quality: 85 }))
    .pipe(gulp.dest("build/img"));
};

exports.createWebp = createWebp;

// Sprite

const sprite = () => {
  return gulp
    .src("source/img/icons/*.svg")
    .pipe(imagemin([imagemin.svgo()]))
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
};

exports.sprite = sprite;

// Copy

const copy = (done) => {
  gulp
    .src(["source/fonts/*.{woff2,woff}", "source/*.ico"], {
      base: "source",
    })
    .pipe(gulp.dest("build"));
  done();
};

exports.copy = copy;

// Clean

const clean = () => {
  return del("build");
};

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

// Reload

const reload = (done) => {
  sync.reload();
  done();
};

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series(styles));
  gulp.watch("source/js/script.js", gulp.series(scripts));
  gulp.watch("source/*.html", gulp.series(html, reload));
};

// Build

const build = gulp.series(
  clean,
  gulp.parallel(
    styles,
    html,
    scripts,
    copy,
    images,
    imagesBackground,
    sprite,
    createWebp
  )
);

exports.build = build;

// Default

exports.default = gulp.series(build, server, watcher);
