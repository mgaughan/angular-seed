(function() {
	const gulp = require('gulp'),
		config = getConfig(),
		paths = config.paths,
		connect = require('gulp-connect'),
		$ = require('gulp-load-plugins')({lazy: true}),
		chalk = require('chalk'),
		runSequence = require('gulp-run-sequence');

	// Tasks
	gulp.task('default', [
		'connect', 'wiredep', 'watch'
	]);
	gulp.task('watch', [
		'watch-sass', 'watch-scripts'
	]);
	gulp.task('connect', startServer);
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
	function watchHtml(){
		console.log(
			chalk.yellow('Watching for change in index.html...')
		);
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

		return gulp.src(
			paths.sass
		)
		.pipe(
			$.watch(paths.sass, function(){
				runSequence(
					'sass',
					'inject-css'
				)
			})
		);
	};

	function watchScripts(){
		return gulp.src(
			paths.js
		)
		.pipe(
			$.watch(paths.js, injectJs)
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
        		config.inject
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
        		config.inject
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
		        css: [
		        	content + '**/*.css',
		            '!' + bowerPath + '**/*.css'
		        ],
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
    			relative: true
    		}
		};
	};
	
})();
