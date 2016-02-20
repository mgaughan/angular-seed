(function() {
	const gulp = require('gulp'),
		config = getConfig(),
		server = require('gulp-server-livereload'),
		// $ = require('gulp-load-plugins')({lazy: true}),
		chalk = require('chalk');

	gulp.task('default', serve);
	gulp.task('wiredep', wiredep);
	gulp.task('injectJs', injectJs);
	 
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

	function wiredep(){
		var wiredep = require('wiredep').stream;
		
		return gulp
	        .src(
	        	config.index
	        )
	        .pipe(
	        	wiredep(config.bower)
	        )
	        .pipe(
	        	gulp.dest(config.client)
	        );
	};

	function injectJs() {
	    console.log(
	    	chalk.yellow('Injecting JavaScript into the html...')
	    );

	    return gulp
	        .src(
	        	config.index
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

	function getConfig(){
		var client = './src/client/',
			clientApp = client + 'app/';
		
		return {
			client: client,
	        index: client + 'index.html',
	        // app js, with no specs
	        js: [
	            clientApp + '**/*.module.js',
	            clientApp + '**/*.js',
	            '!' + clientApp + '**/*.spec.js'
	        ],
			bower: {
				json: require('./bower.json'),
	            directory: './bower_components/',
	            ignorePath: '/^(\.\.\/)+/'
			}
		};
	}
	
})();
