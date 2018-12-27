// We have to require our dependencies
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    clean = require('gulp-clean'),
    connect = require('gulp-connect');
// create a TASK to compile Jade to HTML using gulp-jade
gulp.task('html', function (done) {
    gulp.src(['./app/**/*.jade'])
        .pipe($.jade({ pretty: true, doctype: 'html' }))
        .on('error', $.util.log)
        .pipe(gulp.dest('./public/'));
    done();
});

// create a TASK to compile CoffeeScript to JavaScript using gulp-coffee
gulp.task('js', function (done) {
    gulp.src(['./app/**/*.coffee'])
        .pipe($.coffee({ bare: true }))
        .on('error', $.util.log)
        .pipe(gulp.dest('./public/'));
    done();
});

// create a TASK to compile Sass into CSS using gulp-sass
gulp.task('css', function (done) {
    gulp.src(['./app/**/*.scss'])
        .pipe($.sass({ style: 'expanded' }))
        .pipe(gulp.dest('./public/'));
    done();
});

// create a TASK to WATCH for changes in your files
// this will "watch" for any changes in your files and rerun gulp if necessary
gulp.task('watch', function (done) {
    gulp.watch(['./app/**/*.jade'], gulp.series('html'));
    gulp.watch(['./app/**/*.coffee'], gulp.series('js'));
    gulp.watch(['./app/**/*.scss'], gulp.series('css'));
    done();
});

gulp.task('clean', function() {
    return gulp.src(['./public/**/*.css', './public/**/*.js', './public/**/*.html'], {read: false})
        .pipe(clean());
});

gulp.task('connect', function() {
    connect.server({
        name: 'localhost',
        host: 'localhost',
        port: '4000',
        root: './',
        livereload: true
    })
});

gulp.task('install', gulp.parallel('html', 'js', 'css'), function(){});

// finally, create a TASK that will run all commands when typing "gulp"
// in Terminal

gulp.task('default', gulp.series('clean', gulp.parallel('install', 'connect', 'watch'), function() {}));