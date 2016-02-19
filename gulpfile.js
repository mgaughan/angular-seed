(function() {
	var gulp = require('gulp'),
		config = require('./gulp/gulp.config')(),
		webserver = require('gulp-webserver'),
		$ = require('gulp-load-plugins')({lazy: true}),
		port = process.env.PORT || config.defaultPort;

	gulp.task('default', serve);
	gulp.task('wireJs', wireJs);
	 
	function serve() {
		console.log($)
		gulp.src(config.client)
		    .pipe(
		    	$.webserver({
			        fallback: 'index.html',
			        livereload: true
				})
			);
	};

	function wireJs() {
	    log('Wiring the JS into the html');

	    var wiredep = require('wiredep').stream;
	    var options = config.getWiredepDefaultOptions();

	    return gulp
	        .src(
	        	config.index
	        )
	        .pipe(
	        	wiredep(options)
	        )
	        .pipe(
	        	inject(config.js, '', config.jsOrder)
	        )
	        .pipe(
	        	gulp.dest(config.client)
	        );
	};
	
})();
