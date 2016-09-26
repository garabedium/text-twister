var gulp    = require('gulp'),
    sass    = require('gulp-sass'),
    cleanCSS    = require('gulp-clean-css'),
    rename  = require('gulp-rename');
    //uglify    = require('gulp-uglify');

// Compile SASS
gulp.task('styles', function() {
    gulp.src( './src/scss/**/*.scss' )
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('./dist/css/'))
});

// Minify JS
// gulp.task('scripts', function() {
//     gulp.src('./assets/js/*.*')
//         .pipe(rename({suffix: '.min'}))
//         //.pipe(uglify())
//         .pipe(gulp.dest('./dist/js/'))
// });

// Minify CSS
// gulp.task('clean-css', function() {
//   return gulp.src('./assets/css/*.css')
//    .pipe(rename({ suffix: '.min' }))
//     //.pipe(rev())
//     .pipe(cleanCSS())
//     .pipe(gulp.dest('./dist/css'))
// });

// Watch Tasks
gulp.task('default',function() {
    gulp.watch('./src/scss/**/*.scss',['styles']);
    // gulp.watch('./assets/js/*.*',['scripts']);
});