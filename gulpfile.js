// We have to require our dependencies
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    clean = require('gulp-clean'),
    connect = require('gulp-connect'),
    paths = {
        dist: {
            path: "./dist/",
            js: {
                path: "./dist/js/"
            },
            css: {
                path: "./dist/css/"
            }
        },
        public: {
            path: "./public/",
            js: {
                path: "./public/js/"
            },
            css: {
                path: "./public/css/"
            }
        },
        src: {
            path: "./src/",
            js: {
                path: "./src/js/"
            },
            sass: {
                path: "./src/sass/"
            }
        }
    };
// create a TASK to compile Jade to HTML using gulp-jade
gulp.task('html', function (done) {
    gulp.src([paths.src.path + '**/*.jade'])
        .pipe($.jade({ pretty: true, doctype: 'html' }))
        .on('error', $.util.log)
        .pipe(gulp.dest(paths.public.path));
    done();
});

// create a TASK to compile CoffeeScript to JavaScript using gulp-coffee
gulp.task('js', function (done) {
    gulp.src([paths.src.js.path + '**/*.coffee'])
        .pipe($.coffee({ bare: true }))
        .on('error', $.util.log)
        .pipe(gulp.dest(paths.public.js.path));
    done();
});

// create a TASK to compile Sass into CSS using gulp-sass
gulp.task('css', function (done) {
    gulp.src([paths.src.sass.path + '**/*.sass'])
        .pipe($.sass({ style: 'expanded' }))
        .pipe(gulp.dest(paths.public.css.path));
    done();
});

// create a TASK to WATCH for changes in your files
// this will "watch" for any changes in your files and rerun gulp if necessary
gulp.task('watch', function (done) {
    gulp.watch([paths.src.path + '**/*.jade'], gulp.series('html'));
    gulp.watch([paths.src.js.path + '**/*.coffee'], gulp.series('js'));
    gulp.watch([paths.src.sass.path + '**/*.sass'], gulp.series('css'));
    done();
});

gulp.task('clean', function(done) {
    gulp.src([paths.public.css.path + '**/*.css', paths.public.js.path + '**/*.js', paths.public.path + '**/*.html'], {read: false})
        .pipe(clean());
    done();
});

gulp.task('connect', function(done) {
    connect.server({
        name: 'localhost',
        host: 'localhost',
        port: '4000',
        root: paths.public.path,
        livereload: true
    });
    done();
});

gulp.task('install', gulp.parallel('html', 'js', 'css'), function(done){
    done();
});

// finally, create a TASK that will run all commands when typing "gulp"
// in Terminal

gulp.task('default', gulp.series('clean', gulp.parallel('install', 'connect', 'watch'), function(done) {
    done();
}));