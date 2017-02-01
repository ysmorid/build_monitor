'use strict';

var request = require('request');

module.exports = function (grunt) {
	// show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    var reloadPort = 8080, files;

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		mochaTest: {
			test: {
				src: ['test/**/*.js']
			}
		},

		browserify: {
			options: {
				ignore: ['cls-bluebird']
			},
			client: {
				src: ['public/js/*.js'],
				dest: 'public/src/main.js'
			}
		},

		develop: {
			server: {
				file: 'app/app.js'
			}
		},

		sass: {
			options: {
		    	sourceMap: true
			},
		    dist: {
				files: {
					'public/css/main.css' : 'public/sass/main.scss'
				}
		    }
		}, 

		connect: {
			server : {
				options : {
					hostname: '*',
		            livereload: true,
		            open: {
		                target: 'http://127.0.0.1:1337'
		            },
		            port: 1337,
		            useAvailablePort: true
				}	
			}
			
		},
		
		watch: { // Compile everything into one task with Watch Plugin
	    	options: {
	    		nospawn: true,
	    		livereload: reloadPort
	    	},

	    	js: {
	    		files: [
	    			'app.js',
	    			'app/**/*.js',
	    			// 'config/*.js',
	    			'public/js/*.js'
	    		],
	    		tasks: ['build', 'delayed-livereload']
	    	},

	    	css: {
	    		files: [
	    			'public/sass/*.scss'
	    		],

	    		tasks: ['sass'],
	    		options: {
	    			livereload: reloadPort
	    		}
	    	},

    		views: {
    			files: [
    				'*.html'
    			],
    			options: {livereload: reloadPort}
    		}
    	}
	});

	grunt.config.requires('watch.js.files');
	files = grunt.config('watch.js.files');
	files = grunt.file.expand(files);

	grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
		var done = this.async();
		setTimeout(function () {
			request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','), function (err, res) {
				var reloaded = !err && res.statusCode === 200;

				if (reloaded) 
					grunt.log.ok('Delayed live reload successful.');
				else
					grunt.log.error('Unable to make a delayed live reload.');
				done(reloaded);
			});
		}, 500);
	});

	grunt.loadNpmTasks('grunt-connect');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-mocha-test');

	// Register Grunt tasks
	grunt.registerTask('scss', ['sass']);
	grunt.registerTask('build', [
		'browserify',
		'scss'
	]);

	grunt.registerTask('serve', [
		'build',
		'test',
		'connect:server']);

	grunt.registerTask('test', ['mochaTest']);	
	grunt.registerTask('default', [
		'build',
		'test',
		'watch'
	]);
};
