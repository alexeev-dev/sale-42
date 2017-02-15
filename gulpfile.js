var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync').create(),
	spritesmith = require('gulp.spritesmith'),
    concat = require('gulp-concat');

gulp.task('sass', function () {
  return gulp.src('app/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('browser-sync', function() {
 	browserSync.init({server: { baseDir: 'app'}});
});

gulp.task('sprite', function() {
	var spriteData = 
        gulp.src('app/img/icon/**/*.png')
        .pipe(spritesmith({
        	imgName: 'sprite.png',
        	cssName: 'sprite.css',
        }));

    spriteData.pipe(gulp.dest('app/css/sprite/'));
});

gulp.task('libs', () => {
  gulp.src([
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/waypoints/lib/jquery.waypoints.min.js'
  ])
  .pipe(concat('libs.min.js'))
  .pipe(gulp.dest(`app/js/vendor`));
});

// WATCH
gulp.task('watch', ['browser-sync', 'sprite', 'sass', 'libs'], function () {
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/img/icon/**/*.png', ['sprite']);
	gulp.watch('app/sass/**/*.scss',  ['sass']);
    gulp.watch('app/js/vendor/**/*.scss',  ['libs']);
});