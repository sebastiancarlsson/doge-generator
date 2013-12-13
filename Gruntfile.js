module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		clean: {
			build: {
				src: ['bin/']
			}
		},
		sass: {
			build: {
				files: {
					'bin/css/style.min.css':'src/css/style.scss'
				}
			}
		},
		cssmin: {
			build: {
				files: [
					{
						src:['bin/css/style.min.css'],
						dest:'bin/css/style.min.css'
					}
				]
			}
		},
		copy: {
			build: {
		        files: [
		          {
		            expand: true,
		            cwd: 'src/',
		            src: [
		              '**',
		              '.htaccess',
		              '!css/**',
		              '!js/**'
		            ], dest: 'bin/'
		          }
		        ]
		    }
		},
		uglify: {
			build: {
				src: 'src/js/init.js',
				dest: 'bin/js/init.min.js'
			}
		},
		watch: {
		    sass: {
		        files: 'src/**',
		        tasks: ['default'],
		        options: {
		        	interrupt: false,
		        }
		    }
		}
	});

	grunt.registerTask('default', [
		'clean',
		'sass',
		'uglify',
		'copy'
	]);

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
}