var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var size = require('gulp-size');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var source = require('vinyl-source-stream');
var ngAnnotate = require('gulp-ng-annotate');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngConfig = require('gulp-ng-config');
var es = require('event-stream');

gulp.task('images', function () {
    return gulp.src('src/images/*')
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('public/images'))
        .pipe(size({
            title: 'images'
        }));
});

gulp.task('fonts', function () {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('public/fonts'))
        .pipe(size({
            title: 'fonts'
        }));
});

gulp.task('styles', function () {
    var AUTOPREFIXER_BROWSERS = [
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

    return es.merge(gulp.src('src/**/*.scss'))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(minifyCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public'))
        .pipe(browserSync.stream())
        .pipe(size({ title: 'styles' }));
});

gulp.task('scripts', function () {
    var scripts = gulp.src([
      'src/core/module.js',
      'src/core/**/*.js',
      'src/components/**/*.js'
    ]);
    return es.merge(scripts)
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/scripts'))
        .pipe(size({ title: 'scripts' }));
});

gulp.task('configs', function () {
    var scripts = gulp.src(['src/config/development.js']);
    return es.merge(scripts)
        .pipe(concat('config.js'))
        .pipe(gulp.dest('public/scripts'));
});

gulp.task('scripts-vendor', function () {
    return gulp.src([
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/lodash/dist/lodash.min.js',
            'bower_components/angular/angular.min.js',
            'bower_components/moment/min/moment.min.js',
            'bower_components/pikaday/pikaday.js',
            'bower_components/pikaday-angular/pikaday-angular.js',
            'bower_components/angular-ui-router/release/angular-ui-router.min.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
            'bower_components/angular-scroll/angular-scroll.min.js',
            'bower_components/angular-animate/angular-animate.min.js',
            'bower_components/angular-simple-logger/dist/angular-simple-logger.min.js',
            'bower_components/angular-google-maps/dist/angular-google-maps.min.js',
            'bower_components/angulartics/dist/angulartics.min.js',
            'bower_components/angulartics-mixpanel/dist/angulartics-mixpanel.min.js',
            'bower_components/angulartics-google-analytics/dist/angulartics-google-analytics.min.js',
            'bower_components/ng-fastclick/dist/index.min.js',
            'bower_components/ng-file-upload/ng-file-upload-all.min.js',
            'bower_components/ng-lodash/build/ng-lodash.min.js'
        ])
        .pipe(concat('vendor.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/scripts'))
        .pipe(size({ title: 'vendor' }));
});

gulp.task('watch', ['default'], function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/**/*.js', ['scripts']);
    gulp.watch('src/images/*', ['images']);
    gulp.watch(
      ['src/*.html'],
      ['html-index']
    ).on('change', browserSync.reload);

    gulp.watch(
      ['src/components/**/*.html'],
      ['html-component']
    ).on('change', browserSync.reload);
});

gulp.task('watch:staging', ['default'], function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/scripts/**/*.js', ['scripts:staging']);
    gulp.watch('src/images/*', ['images']);
    gulp.watch(
      ['src/*.html'],
      ['html-index']
    ).on('change', browserSync.reload);

    gulp.watch(
      ['src/components/**/*.html'],
      ['html-component']
    ).on('change', browserSync.reload);
});

gulp.task('watch:production', ['production'], function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/scripts/**/*.js', ['scripts:production']);
    gulp.watch('src/images/*', ['images']);
    gulp.watch(
      ['src/*.html'],
      ['html-index']
    ).on('change', browserSync.reload);

    gulp.watch(
      ['src/components/**/*.html'],
      ['html-component']
    ).on('change', browserSync.reload);
});

gulp.task('html-index', function () {
    return gulp.src(['src/*.html'])
        .pipe(gulp.dest('public'));
});

gulp.task('html-component', function () {
    return gulp.src(['src/components/**/templates/*.html'])
        .pipe(gulp.dest('public/components'));
});

gulp.task('clean', function () {
    del('public/*');
});

gulp.task('default', ['clean'], function (done) {
    runSequence(
        'styles',
        ['html-index', 'html-component', 'configs', 'scripts', 'scripts-vendor', 'images', 'fonts'],
        done
    )
});

gulp.task('build', ['clean'], function (done) {
    runSequence(
        'styles',
        ['html-index', 'html-component', 'scripts', 'scripts-vendor', 'fonts'],
        done
    )
});
