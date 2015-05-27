module.exports = function (grunt) {
	grunt.initConfig({
		requirejs: {
			build: { 
				options: {
					almond: true,
					baseUrl: "public_html/js",
					mainConfigFile: "public_html/js/main.js",
					name: "main",
					optimize: "none",
					out: "public_html/js/build/main.js"
				} 
			}
		}, 

		concat: {
			build: { 
				separator: ';\n',
				src: [
					'public_html/js/lib/almond.js',
					'public_html/js/build/main.js'
				],
				dest: 'public_html/js/build.js'
			}
		},

		uglify: {
			build: {
				files: {
					'public_html/js/build.min.js': 
						['public_html/js/build.js']
				}
			}
		},

		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'public_html/css/main.css': 'sass/main.scss'					
				}
			}
		},	

		shell: {
				options: {
						stdout: true,
						stderr: true
				},
				server: {
						command: 'java -cp Cassandra.jar main.Main 8100'
				}
		},

		fest: {
				templates: {
					files: [{
						expand: true,
						cwd: 'templates',
						src: '*.xml',
						dest: 'public_html/js/tmpl'
					}],
					options: {
						template: function (data) {
							return grunt.template.process(
								'define(function () { return <%= contents %> ; });',
								{ data: data }
							);
						}
					}
	      }
		},

		watch: {
            fest: {
                files: ['templates/*.xml'],
                tasks: ['fest'],
                options: {
                    interrupt: true,
                    atBegin: true
                }
            },
            server: {
                files: [
                    'public_html/js/**/*.js',
                    'public_html/css/**/*.css',
                    'sass/**/*.scss'
                ],
                tasks: ['sass'],
                options: {
                    livereload: true
                }
            }
        },

		concurrent: {
			target: ['watch', 'shell'],
			options: {
				logConcurrentOutput: true
			}
		}
	});


	grunt.registerTask(
		'build',
		[
			'fest', 'requirejs:build',
			'concat:build', 'uglify:build'
		]
	);

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-fest');	
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('default', ['concurrent']);
};
