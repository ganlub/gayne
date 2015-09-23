'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create();

var files = {
    sass: {
        input: 'src/scss/**/*.scss',
        dist: 'dist/'
    },
    js: {
        input: 'src/js/**/*.js',
    },
    html: {
        input: 'test/*.html',
    }
};

var sassOptions = {
    outputStyle: 'compact'
};

var autoprefixerOptions = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

gulp.task('styles', function () {
    return gulp
        .src(files.sass.input)
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(autoprefixer(autoprefixerOptions)) //autoprefixer
        .pipe(gulp.dest(files.sass.dist))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    browserSync.init({
        notify: false,
        server: {
            baseDir: "test",
            routes: {
                "/node_modules": "node_modules",
                "/dist": "dist"
            }
        }
    });

    gulp.watch(files.sass.input, ['styles']);
    gulp.watch(files.js.input).on('change', browserSync.reload);
    gulp.watch(files.html.input).on('change', browserSync.reload);
});



gulp.task('default', ['watch'], function() {
    gulp.start('styles');
});
