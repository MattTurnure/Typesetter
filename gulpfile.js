'use strict';

var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    del         = require('del'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload;

gulp.task('html', function () {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('sass', function () {
    return gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('clean', function (cb) {
    del(['dist'], cb);
});

gulp.task('build', ['html', 'sass']);

gulp.task('default', ['build']);

// Static Server + watching scss/html files
gulp.task('serve', ['html', 'sass'], function() {

    browserSync({
        server: "./dist"
    });

    gulp.watch("src/scss/**/*.scss", ['sass']);
    gulp.watch("dist/styles/*").on('change', reload);
    gulp.watch("src/**/*.html").on('change', reload);
});
