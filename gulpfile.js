const gulp = require('gulp');
const autopreFixer = require('gulp-autoprefixer');
const sourceMaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const uglyfly = require('gulp-uglyfly');

// style function
gulp.task('style', function () {
    return gulp.src('src/scss/style.scss')
        .pipe(sourceMaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        })).on('error', sass.logError)
        .pipe(autopreFixer())
        .pipe(sourceMaps.write('.'))
        .pipe(rename('netflixify.min.css'))
        .pipe(gulp.dest('dist/css'))
}); //-- end style function

// view function
gulp.task('view', function () {
    return gulp.src('src/pug/page/index.pug')
        .pipe(pug({
            doctype: 'html',
            pretty: true
        }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./'))
}); //-- end view function


// page function
gulp.task('page', function () {
    return gulp.src('src/pug/page/*.pug')
        .pipe(pug({
            doctype: 'html',
            pretty: true
        }))
        .pipe(gulp.dest('./pages'))
}); //-- end view function

// bootstrap function
gulp.task('bootstrap', function () {
    return gulp.src('src/scss/bootstrap/bootstrap.scss')
        .pipe(sourceMaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        })).on('error', sass.logError)
        .pipe(autopreFixer())
        .pipe(sourceMaps.write())
        .pipe(rename('bootstrap.min.css'))
        .pipe(gulp.dest('dist/css'))
}); //-- end bootstrap

// js task
gulp.task('js', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(uglyfly())
        .pipe(rename('netflixify.min.js'))
        .pipe(gulp.dest('dist/js'))
}); //-- end js task

// vendor_style task
gulp.task('vendor_style', function () {
    return gulp.src('src/plugins/**/*.css')
        .pipe(sourceMaps.init())
        .pipe(sourceMaps.write())
        .pipe(concat('vendor.min.css'))
        .pipe(gulp.dest('dist/css'))
}); //-- end vendor_style

//-- vendor_script task
gulp.task('vendor_script', function () {
    return gulp.src('src/plugins/**/*.js')
        .pipe(uglyfly())
        .pipe(concat('vendor_script.min.js'))
        .pipe(gulp.dest('dist/js'))
}); //-- end js task

// image task
gulp.task('image', function () {
    return gulp.src('src/images/**/*.*')
        .pipe(imagemin([
            imagemin.gifsicle({
                interlaced: true
            }),
            imagemin.mozjpeg({
                quality: 75,
                progressive: true
            }),
            imagemin.optipng({
                optimizationLevel: 5
            }),
            imagemin.svgo({
                plugins: [{
                        removeViewBox: true
                    },
                    {
                        cleanupIDs: false
                    }
                ]
            })
        ]))
        .pipe(gulp.dest('dist/images'))
}); //-- image task

//-- start watch tasks
gulp.task('watch', function () {
    gulp.watch('src/scss/**/*.scss', gulp.series('style'));
    gulp.watch('src/pug/**/*.pug', gulp.series('page', 'view'));
    gulp.watch('src/scss/bootstrap/**/*.scss', gulp.series('bootstrap'));
    gulp.watch('src/js/*.js', gulp.series('js'));
    gulp.watch('src/plugins/**/*.css', gulp.series('vendor_style'));
    gulp.watch('src/plugins/**/*.js', gulp.series('vendor_script'));
    gulp.watch('src/images/**/*.*', gulp.series('image'));
}); //-- end watch tasks