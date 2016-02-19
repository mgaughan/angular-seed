module.exports = function() {
    var client = './src/client/'
        clientApp = client + 'app/',
        root = './',
        temp = './.tmp/',
        wiredep = require('wiredep'),
        bowerFiles = wiredep({devDependencies: true})['js'],
        bower = {
            json: require('../bower.json'),
            directory: '../bower_components/',
            ignorePath: '../..'
        };

    var config = {
        /**
         * File paths
         */
        client: client,
        css: temp + 'styles.css',
        html: client + '**/*.html',
        // htmlTemplates: clientApp + '**/*.html',
        index: client + 'index.html',
        // app js, with no specs
        js: [
            clientApp + '**/*.module.js',
            clientApp + '**/*.js',
            '!' + clientApp + '**/*.spec.js'
        ],
        jsOrder: [
            '**/app.module.js',
            '**/*.module.js',
            '**/*.js'
        ],
        sass: client + 'app/**/*.sass',
        root: root,
        source: 'src/',

        /**
         * optimized files
         */
        // optimized: {
        //     app: 'app.js',
        //     lib: 'lib.js'
        // },

        /**
         * plato
         */
        // plato: {js: clientApp + '**/*.js'},

        /**
         * browser sync
         */
        browserReloadDelay: 1000,

        /**
         * template cache
         */
        // templateCache: {
        //     file: 'templates.js',
        //     options: {
        //         module: 'app.core',
        //         root: 'app/',
        //         standalone: false
        //     }
        // },

        /**
         * Bower and NPM files
         */
        bower: bower,

        /**
         * specs.html, our HTML spec runner
         */
        // specRunner: client + specRunnerFile,
        // specRunnerFile: specRunnerFile,

        /**
         * The sequence of the injections into specs.html:
         *  1 testlibraries
         *      mocha setup
         *  2 bower
         *  3 js
         *  4 spechelpers
         *  5 specs
         *  6 templates
         */
        // testlibraries: [
        //     nodeModules + '/mocha/mocha.js',
        //     nodeModules + '/chai/chai.js',
        //     nodeModules + '/sinon-chai/lib/sinon-chai.js'
        // ],
        // specHelpers: [client + 'test-helpers/*.js'],
        // specs: [clientApp + '**/*.spec.js'],
        // serverIntegrationSpecs: [client + '/tests/server-integration/**/*.spec.js'],

        /**
         * Node settings
         */
        defaultPort: '8001'
    };

    /**
     * wiredep and bower settings
     */
    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

    return config;

    ////////////////
};
