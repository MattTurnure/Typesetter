'use strict';

var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    jshint      = require('gulp-jshint'),
    uglify      = require('gulp-uglify'),
    rename      = require('gulp-rename'),
    concat      = require('gulp-concat'),
    del         = require('del'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload;

gulp.task('html', function () {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('sass', function () {
    return gulp.src('src/scss/*.scss')
        .pipe(sass({
            precision: 8
        }))
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('scripts', function () {
    return gulp.src([
            'src/js/typesetter.js'
        ])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('clean', function (cb) {
    del(['dist'], cb);
});

gulp.task('build', ['html', 'sass', 'scripts']);

gulp.task('default', ['build']);

// Static Server + watching scss/html files
gulp.task('serve', ['html', 'sass', 'scripts'], function() {

    browserSync({
        server: "./dist"
    });

    gulp.watch("src/scss/**/*.scss", ['sass']);
    gulp.watch("src/js/**/*.js", ['scripts']);
    gulp.watch("dist/styles/*").on('change', reload);
    gulp.watch("dist/**/*.html").on('change', reload);
    gulp.watch("dist/js/**/*.js").on('change', reload);
});
