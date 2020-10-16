'use strict';

/* ------------------------------------ *\
    Modules
\* ------------------------------------ */

// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require('gulp');

// Pump - https://github.com/mafintosh/pump
//const pump = require('pump');
// Sass autocompile - https://github.com/dlmanning/gulp-sass
const sass = require('gulp-sass');
// CSS Autoprefixer - https://github.com/sindresorhus/gulp-autoprefixer
const autoprefixer = require('gulp-autoprefixer');
// Concat ("merge JS") - https://github.com/contra/gulp-concat 
const concat = require('gulp-concat');
// JS Uglyfy - https://www.npmjs.com/package/gulp-uglify
const uglify = require('gulp-uglify');
// Sourcemaps - https://github.com/gulp-sourcemaps/gulp-sourcemaps
const sourcemaps = require('gulp-sourcemaps');


/* ------------------------------------ *\
    Vars & Consts
\* ------------------------------------ */

sass.compiler = require('node-sass');

const paths = {
  // templates
  template: '**/*.html',
  // CSS
  scss: 'assets/scss/**/*.scss',
  css: 'assets/css',
  // JS
  js: 'assets/js/src/',
  js_in: 'assets/js/src/**/*.js',
  js_out: './assets/js',
}


/* ------------------------------------ *\
    Tasks
\* ------------------------------------ */

// Compile Sass to CSS (and minify) + feed updates to BrowserSync
function styles(){
  return src([paths.scss], {base: ''})
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({cascade: false}))
    .pipe(sourcemaps.write(''))
    .pipe(dest(paths.css)
    //.pipe(browserSync.stream())
  );
}
/*
gulp.task('sass', function (cb) {
  pump([
    gulp.src(paths.scss),
    sourcemaps.init(),
    sass({outputStyle: 'compressed'}).on('error', sass.logError),
    autoprefixer({
      browsers: ['> 0.01%'], // https://github.com/ai/browserslist#queries
      cascade: false
    }),
    sourcemaps.write(''),
    gulp.dest(paths.css),
  ], cb );
});
*/


// Concatenate JavaScript and uglify
function scripts(){
  return src([
    paths.js + 'modernizr.min.js',
    paths.js + 'jquery-1.11.2.min.js',
    paths.js + 'brickst.js',
  ])
    .pipe(sourcemaps.init(),)
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write(''),)
    .pipe(dest(paths.js_out)
  );
}
/*
gulp.task('scripts', function (cb) {
  pump([
    gulp.src([
      paths.js + 'modernizr.min.js',
      paths.js + 'jquery-1.11.2.min.js',
      paths.js + 'brickst.js',
    ]),
    sourcemaps.init(),
    concat('app.js'),
    uglify(),
    sourcemaps.write(''),
    gulp.dest(paths.js_out),
  ], cb );
});
*/




// Watch for Sass/JS changes and compile
function watchTask(){
  watch([
    paths.scss,
    paths.js_in
  ],
    parallel(styles, scripts)
  );
}
/*
//gulp.task('watch', ['browserSync', 'sass'], function () {
gulp.task('watch', ['sass', 'scripts'], function () { // 'browserSync', 'webfont'
  gulp.watch(paths.scss, ['sass']);
  gulp.watch(paths.js_in, ['scripts']);
  gulp.watch(paths.ico_input, ['webfont']);
  //gulp.watch(paths.template, browserSync.reload); 
});
*/

exports.default = series(
  parallel(styles, scripts), 
  watchTask);