const gulp = require("gulp");
const pug = require("gulp-pug");
const sass = require("gulp-sass");
const production = false;
const browserSync = require("browser-sync");
const stream = browserSync.stream;
const reload = browserSync.reload;

gulp.task("pug", () => {
  return gulp
    .src("./src/pug/pages/*.pug")
    .pipe(
      pug({
        pretty: production ? false : true,
      })
    )
    .pipe(gulp.dest("./build"))
    .pipe(stream());
});

gulp.task("sass", () => {
  return gulp
    .src("./src/scss/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("./build/css"))
    .pipe(stream());
});

gulp.task("default", () => {
  browserSync({
    server: "./build",
  });
  gulp.watch("./src/pug/**/*.pug", gulp.series("pug")).on("change", reload);
  gulp.watch("./src/scss/**/*.scss", gulp.series("sass")).on("change", reload);
});
