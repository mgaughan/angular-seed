(function() {
	const gulp = require('gulp'),
		config = require('./gulp/gulp.config')(),
		server = require('gulp-server-livereload');
		$ = require('gulp-load-plugins')({lazy: true}),
		chalk = require('chalk');

	gulp.task('default', serve);
	gulp.task('injectIndex', injectIndex);
	 
	function serve() {
		gulp.src(config.client)
		    .pipe(
		    	server({
			        fallback: 'index.html',
			        livereload: true,
			        log: 'debug'
				})
			);
	};

	function injectIndex() {

	    console.log(
	    	chalk.yellow('Wiring up the bower cssjs and our app js into the html...')
	    );

	    var wiredep = require('wiredep').stream,
	    	options = config.getWiredepDefaultOptions();
	    console.log(options)
	    return gulp
	        .src(
	        	config.index
	        )
	        .pipe(
	        	wiredep({
			      directory: 'app/bower_components',
			      fileTypes: {
			        scss: {
			          replace: {
			            scss: '@import "src/app/{{filePath}}";'
			          }
			        }
			      },
			      ignorePath: /^(\.\.\/)+/
			  })
	        )
	        .pipe(
	        	$.inject(
	        		gulp.src(config.js, {read: false}), {relative: true}
	        	)
	        )
	        .pipe(
	        	gulp.dest(config.client)
	        );
	};
	
})();
