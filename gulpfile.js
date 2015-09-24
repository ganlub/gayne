'use strict';

var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    del = require('del'),
    size = require('gulp-size'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    minifyCss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create();

var files = {
    sass: {
        src: 'src/scss/**/*.scss',
        dist: 'dist/css/'
    },
    js: {
        src: 'src/js/**/*.js',
    },
    html: {
        src: 'test/*.html',
    },
    fonts: {
        src: 'src/fonts/**/*',
        dist: 'dist/fonts/'
    }
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
        .src(files.sass.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(autoprefixerOptions)) //autoprefixer
        // .pipe(minifyCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(files.sass.dist))
        .pipe(browserSync.stream());
});


// Clean output directory
gulp.task('clean', del.bind(null, ['dist/*'], {dot: true}));

// Copy web fonts to dist
gulp.task('fonts', function () {
  return gulp.src(files.fonts.src)
    .pipe(gulp.dest(files.fonts.dist));
});

gulp.task('watch', function() {
    browserSync.init({
        notify: true,
        server: {
            baseDir: ['test', 'dist']
        }
    });

    gulp.watch(files.sass.src, ['styles']);
    gulp.watch(files.js.src).on('change', browserSync.reload);
    gulp.watch(files.html.src).on('change', browserSync.reload);
});



gulp.task('default', ['watch'], function(cb) {
    runSequence('clean', 'fonts', 'styles', cb);
});
