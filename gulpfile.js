(function() {
	const gulp = require('gulp'),
		config = getConfig(),
		server = require('gulp-server-livereload'),
		$ = require('gulp-load-plugins')({lazy: true}),
		chalk = require('chalk');

	gulp.task('default', [
		'serve', 'wiredep', 'inject-css', 'inject-js', 'watch-sass'
	]);
	gulp.task('serve', serve);
	gulp.task('wiredep', wiredep);
	gulp.task('watch-sass', watchSass);
	gulp.task('sass', sass);
	gulp.task('inject-css', injectCss);
	gulp.task('inject-js', injectJs);
	 
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

	// Styles
	function sass() {
		return gulp.src(config.sass)
			.pipe(
				$.sass().on('error', $.sass.logError)
			)
			.pipe(
				gulp.dest(config.cssRoot)
			);
	};

	function watchSass() {
		console.log(
			chalk.yellow('Watching for change in sass files...')
		);
		
		return gulp.watch(
			config.sass, ['sass']
		);

	};

	function injectCss(){
	    return gulp
	        .src(
	        	config.index
	        )
	        .pipe(
	        	$.inject(
	        		gulp.src(config.css)
	        	)
	        )
	        .pipe(
	        	gulp.dest(config.client)
	        );
	}

	// Scripts
	function injectJs() {
	    return gulp
	        .src(
	        	config.index
	        )
	        .pipe(
	        	$.inject(
	        		gulp.src(config.js)
	        	)
	        )
	        .pipe(
	        	gulp.dest(config.client)
	        );
	};

	// Config
	function getConfig(){
		var client = './src/client/',
			clientApp = client + 'app/',
			cssRoot = clientApp + '/css/';
		
		return {
			client: client,
	        index: client + 'index.html',
	        sass: clientApp + '**/*.scss',
	        cssRoot: cssRoot,
	        css: cssRoot + '*.css',
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
