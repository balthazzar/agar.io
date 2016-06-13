var gulp = require('gulp');
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');
var uglify = require('gulp-uglify');
var util = require('gulp-util');
var webpack = require('webpack-stream');

gulp.task('build', ['build-client', 'build-server']);

gulp.task('build-client', ['move-client'], function() {
	return gulp.src(['src/client/js/app.js'])
		.pipe(uglify())
		.pipe(webpack(require('./webpack.config.js')))
		.pipe(babel())
		.pipe(gulp.dest('dist/client/js/'));
});

gulp.task('move-client', function() {
	return gulp.src(['src/client/**/*.*', '!client/js/*.js'])
		.pipe(gulp.dest('./dist/client/'));
});


gulp.task('build-server', function() {
	return gulp.src(['src/server/**/*.*', 'src/server/**/*.js'])
		.pipe(babel())
		.pipe(gulp.dest('dist/server/'));
});

gulp.task('watch', ['build'], function() {
	gulp.watch(['src/client/**/*.*'], ['build-client', 'move-client']);
	gulp.watch(['src/server/*.*', 'src/server/**/*.js'], ['build-server']);
	gulp.start('run');
});

gulp.task('run', ['build'], function() {
	nodemon({
			delay: 10,
			script: './server/server.js',
			cwd: "./dist/",
			args: ["config.json"],
			ext: 'html js css'
		})
		.on('restart', function() {
			util.log('server restarted!');
		});
});

gulp.task('default', ['run']);
