const gulp = require('gulp');
const del = require('del');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const browserSync = require('browser-sync')
const yargs = require('yargs');

const argv = yargs.argv;
const production = !!argv.production;

webpackConfig.mode = production ? "production" : "development";

gulp.task('clean', () => {
    return del('./dist/*');
})

gulp.task('html', () => {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist'))
        .on("end", browserSync.reload);
})

gulp.task('scripts', () => {
    return gulp.src('./src/js/*.js')
        .pipe(webpackStream(webpackConfig), webpack)
        .pipe(gulp.dest('./dist/js'))
        .on("end", browserSync.reload);
})

gulp.task('serve', () => {
    browserSync.init({
        server: './dist',
        port: 3000,
        notify: true
    });

    gulp.watch(['./src/*.html'], gulp.parallel('html'));
    gulp.watch(['./src/js/*.js', './index.js'], gulp.parallel('scripts'));
})

gulp.task('prod', gulp.series(
    'clean', 
    gulp.parallel(['html', 'scripts'])
))

gulp.task('default', gulp.series(
    'clean', 
    gulp.parallel(['html', 'scripts'],
    gulp.parallel('serve'))
))
