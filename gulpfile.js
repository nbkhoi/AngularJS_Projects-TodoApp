// We have to require our dependencies
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

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
    gulp.watch(['./app/**/*.jade'], ['html']);
    gulp.watch(['./app/**/*.coffee'], ['js']);
    gulp.watch(['./app/**/*.scss'], ['css']);
    done();
});

// finally, create a TASK that will run all commands when typing "gulp"
// in Terminal

gulp.task('default', ['html', 'js', 'css', 'watch'], function() {
    console.log("Build Success");
});