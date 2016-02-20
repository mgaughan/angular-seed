(function() {
	const gulp = require('gulp'),
		config = getConfig(),
		connect = require('gulp-connect'),
		$ = require('gulp-load-plugins')({lazy: true}),
		chalk = require('chalk');

	// Tasks
	gulp.task('default', [
		'connect', 'update-html', 'watch'
	]);
	gulp.task('watch', [
		'watch-html', 'watch-sass', 'watch-scripts']
	);
	gulp.task('connect', startServer);
	gulp.task('update-html', [
		'wiredep', 'inject-css', 'inject-js']
	);
	gulp.task('wiredep', wiredep);
	gulp.task('watch-html', watchHtml);
	gulp.task('watch-sass', watchSass);
	gulp.task('watch-scripts', watchScripts);
	gulp.task('sass', sass);
	gulp.task('inject-css', injectCss);
	gulp.task('inject-js', injectJs);

	function startServer() {
		connect.server({
			root: config.clientApp,
			livereload: true,
			debug: true
		});

   	 	// sets up a livereload that watches for any changes in the root
	    $.watch(config.client + '*.html')
	        .pipe(connect.reload())
	        .pipe(gulp.dest(config.clientApp));
	};

	function wiredep(){
		var wiredep = require('wiredep').stream;

		return gulp.src(
        	config.index
        )
        .pipe(
        	wiredep(config.bower)
        )
        .pipe(
        	gulp.dest(config.client)
        );
	};

	// Watch
	function watch(){
		// return livereload.listen();
			// gulp.watch('assets/js/libs/**/*.js', ['squish-jquery']);
			// gulp.watch('assets/js/*.js', ['build-js']);
			// gulp.watch('assets/less/**/*.less', ['build-css']);
			// return gulp.watch(
			// 	config.index, ['watch-html']
			// );
	};

	function watchHtml(){
		console.log(
			chalk.yellow('Watching for change in index.html...')
		);

		return $.watch(
			[config.index]
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

	function watchScripts(){
		return gulp.src(
			config.js
		)
		.pipe(
			connect.reload()
		);	
	};

	// Scripts
	function sass() {
		return gulp.src(
			config.sass
		)
		.pipe(
			$.sass().on('error', $.sass.logError)
		)
		.pipe(
			gulp.dest(config.cssRoot)
		);
	};

	function injectCss(){
	    return gulp.src(
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
	};

	// Scripts
	function injectJs() {
	    return gulp.src(
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
			clientApp: clientApp,
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
	};
	
})();
