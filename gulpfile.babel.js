'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';
import { create as browserSyncCreate } from 'browser-sync';
import browserify from 'browserify';
import gutil from 'gulp-util';

const browserSync = browserSyncCreate();

gulp.task('sass', () => {
  gulp
    .src('src/styles/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('app.css'))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/css/'))
    .pipe(browserSync.stream());
});

gulp.task('build', () => {
  browserify({
    entries: 'src/scripts/main.js',
    debug: true,
    transform: ['babelify'],
  })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .on('error', gutil.log)
    .pipe(gulp.dest('public/js/'));
});

gulp.task('js-watch', ['build'], done => {
  browserSync.reload();
  done();
});

gulp.task('serve', ['sass', 'js-watch'], () => {
  browserSync.init({
    server: {
      baseDir: './public',
    },
  });

  gulp.watch('src/**/*.js', ['js-watch']);
  gulp.watch('src/styles/*.scss', ['sass']);
  gulp.watch('public/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
