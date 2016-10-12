var gulp    = require('gulp'),
    sass    = require('gulp-sass'),
    cleanCSS    = require('gulp-clean-css'),
    svgSprite = require('gulp-svg-sprite'),
    rename  = require('gulp-rename');
    //uglify    = require('gulp-uglify');

var svgConfig  = {
    mode                : {
        css             : {     // Activate the «css» mode
            render      : {
                css     : true  // Activate CSS output (with default options)
            }
        }
    }
};

// Compile SASS
gulp.task('styles', function() {
    gulp.src( './src/scss/**/*.scss' )
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('./dist/css/'))
});

// SVG
gulp.task('svg', function() {
    gulp.src( './src/svg/**/**/*.svg' )
        .pipe(svgSprite(svgConfig))
        .on('error', function(error){
            /* Do some awesome error handling ... */
        })
        .pipe(gulp.dest('./dist/svg/'))
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
    gulp.watch('./src/svg/**/*.svg',['svg']);
});