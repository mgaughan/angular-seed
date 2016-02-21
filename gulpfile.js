(function() {
	const gulp = require('gulp'),
		config = getConfig(),
		paths = config.paths,
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
			root: paths.root,
			livereload: true,
			debug: true
		});
	};

	function wiredep(){
		var wiredep = require('wiredep').stream;

		return gulp.src(
        	paths.index
        )
        .pipe(
        	wiredep(config.bower)
        )
        .pipe(
        	gulp.dest(paths.root)
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

   	 	// sets up a livereload that watches for any changes in the root
	    // $.watch(config.index)
	    //     .pipe($.livereload());
	    //     // .pipe(gulp.dest(config.app));
	    console.log($.livereload)
		return $.watch(
			[paths.index]
		)
		.pipe($.livereload());
	};

	function watchSass() {
		console.log(
			chalk.yellow('Watching for change in sass files...')
		);

		return gulp.watch(
			paths.sass, ['sass']
		);
	};

	function watchScripts(){
		return gulp.src(
			paths.js
		)
		.pipe(
			connect.reload()
		);	
	};

	// Scripts
	function sass() {
		return gulp.src(
			paths.sass
		)
		.pipe(
			$.sass().on('error', $.sass.logError)
		)
		.pipe(
			gulp.dest(paths.content)
		);
	};

	function injectCss(){
	    return gulp.src(
        	paths.index
        )
        .pipe(
        	$.inject(
        		gulp.src(paths.css),
        		paths.inject
        	)
        )
        .pipe(
        	gulp.dest(paths.root)
        );
	};

	// Scripts
	function injectJs() {
	    return gulp.src(
        	paths.index
        )
        .pipe(
        	$.inject(
        		gulp.src(paths.js),
        		paths.inject
        	)
        )
        .pipe(
        	gulp.dest(paths.root)
        );
	};

	// Config
	function getConfig(){
		var root = './src/'
			app = root + 'app/',
			content = root + 'content/',
			bowerPath = content + 'bower_components/';
		
		return {
			paths: {
				root: root,
		        index: root + 'index.html',
		        content: content,
		        bower: bowerPath,
				app: app,
		        sass: app + '**/*.scss',
		        css: content + '*.css',
		        // app js, with no specs
		        js: [
		            app + '**/*.module.js',
		            app + '**/*.js',
		            '!' + app + '**/*.spec.js',
		            '!' + bowerPath + '**/*.js'
		        ]
			},
			bower: {
				json: require('./bower.json'),
	            directory: bowerPath,
	            ignorePath: '/^(\.\.\/)+/'
			},
			inject: {
    			ignorePath: 'src',
            	addRootSlash: false
    		}
		};
	};
	
})();
