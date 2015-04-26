module.exports = function (grunt) {
	grunt.initConfig({

		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: {
					'public_html/css/main.css': 'public_html/sass/main.scss'					
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
                    'public_html/sass/**/*.scss'
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

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-fest');


	grunt.registerTask('default', ['concurrent']);
};
