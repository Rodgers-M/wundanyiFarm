var gulp = require ('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('styles', function(){
	return gulp.src([
		'./assets/styles/app.scss'])
		.pipe(sass(
				{
					includePaths:['./bower_components/foundation/scss']
				}
			))
		.pipe(concat('app.css'))
		.pipe(gulp.dest('./public/css'));
});
 gulp.task('default', ['styles']);
