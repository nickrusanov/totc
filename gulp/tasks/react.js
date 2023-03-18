export default () =>
	app.gulp.src([app.path.react.src,])
		.pipe(app.gulp.dest(app.path.react.dist))