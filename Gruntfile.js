module.exports = function(grunt) {

	// Require it at the top and pass in the grunt instance
	require('jit-grunt')(grunt, {
		sasslint: 'grunt-sass-lint',
		svgcss: 'grunt-svg-css'
	});
	require('time-grunt')(grunt);

	if (!grunt.option('port'))
	{
		grunt.option('port', 9002);
	}

	if (!grunt.option('livereload-port'))
	{
		grunt.option('livereload-port', grunt.option('port') + 1);
	}


	var paths = {
		src: 'source',
		dev: grunt.option('target') || 'build',
		dist: grunt.option('target') || 'dist',
		tmp: 'tmp'
	};

	// All configuration goes here
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		paths: paths,

		// Accessibility Configuration
		accessibility: {
			options : {
				accessibilityLevel: 'WCAG2A',
				verbose: true
			},
			all : {
				files: [
					{
						cwd: '<%= paths.dev %>/',
						dest: 'reports/accessibility/',
						expand: true,
						ext: '-report.txt',
						src: ['*.html']
					}
				]
			}
		},

		// Configuration for postcss
		postcss: {
			options: {
				processors: [
					require('autoprefixer')({
						browsers: ['last 2 versions']
					})
				]
			},
			dev: {
				options: {
					map: true
				},
				src: '<%= paths.dev %>/css/*.css'
			},
			dist: {
				src: '<%= paths.dist %>/css/*.css'
			}
		},

		// Configuration for deleting files
		clean: {
			options: {
				force: true
			},
			dev: {
				files: [
					{
						src: ['<%= paths.dev %>']
					}
				]
			},
			dist: {
				files: [
					{
						src: ['<%= paths.dist %>']
					}
				]
			},
			tmp: {
				files: [
					{
						src: ['<%= paths.tmp %>']
					}
				]
			}
		},

		// Configuration for concatenating js files
		concat: {
			options: {
				separator: ';',
				process: function(src, filepath)
				{
					// Add cachebuster for every required file
					if (filepath == paths.src + '/js/_requireconfig.js')
					{
						return 'require({"urlArgs": "cb=' + (new Date()).getTime()+ '"});' + "\n\n" + src;
					}

					return src;
				}
			},
			dev: {
				dest: '<%= paths.dev %>/js/main.js',
				src: ['node_modules/requirejs/require.js', '<%= paths.src %>/js/_requireconfig.js']
			},
			dist: {
				dest: '<%= paths.dist %>/js/main.js',
				src: ['node_modules/requirejs/require.js', '<%= paths.src %>/js/_requireconfig.js', '<%= paths.tmp %>/main.js']
			}
		},

		// Configuration for run tasks concurrently
		concurrent: {
			dev1: ['svgcss'],
			dev2: ['sass:dev', 'twigRender:dev', 'modernizr'],
			dist: ['svgcss', 'imagemin:dist'],
		},

		// Configuration for livereload
		connect: {
			livereload: {
				options: {
					base: ['', '<%= paths.dev %>'],
					hostname: '0.0.0.0',
					port: grunt.option('port'),
					middleware: function(connect, options) {
						grunt.log.writeln('');
						grunt.log.writeln('Launching webserver now:');
						grunt.log.writeln(' - index at http://0.0.0.0:' + grunt.option('port') + '/');
						grunt.log.writeln(' - rwd-testing at http://0.0.0.0:' + grunt.option('port') + '/rwd-testing.html');
						grunt.log.writeln('');
						return [
							require('connect-livereload')({
								port: grunt.option('livereload-port')
							}),
							connect.static(options.base[0]),
							connect.static(options.base[1]),
							connect.directory(options.base[1])
						]
					}
				},
				files: {
					src: ['**/*.html']
				}
			}
		},

		// Configuration for copying files
		copy: {
			ajax: {
				cwd: '<%= paths.src %>/ajax-content/',
				dest: '<%= paths.dist %>/ajax-content/',
				expand: true,
				src: ['**/*']
			},
			favicon: {
				cwd: '<%= paths.src %>/img/appicons/',
				dest: '<%= paths.dist %>/img/appicons/',
				expand: true,
				src: ['**/*.ico']
			},
			fonts: {
				cwd: '<%= paths.src %>/fonts/',
				dest: '<%= paths.dist %>/fonts/',
				expand: true,
				src: ['**/*']
			},
			js: {
				cwd: '<%= paths.src %>/js/',
				dest: '<%= paths.dist %>/js/',
				expand: true,
				src: ['**/*']
			},
			modernizr: {
				cwd: '<%= paths.tmp %>/',
				dest: '<%= paths.dist %>/js/',
				expand: true,
				src: ['modernizr.js']
			}
		},

		// Configuration for minifying css-files
		cssmin: {
			dist: {
				cwd: '<%= paths.dist %>/css/',
				dest: '<%= paths.dist %>/css/',
				expand: true,
				src: ['*.css']
			}
		},
		
		// Configuration for gitinfo (will be populated with values from Git)
		gitinfo: {
			
		},

		// Configuration for grouping media queries
		group_css_media_queries: {
			dist: {
				files: {
					'<%= paths.dist %>/css/styles.css': ['<%= paths.dist %>/css/styles.css']
				}
			}
		},

		// Configuration for validating html-files
		htmlhint: {
			options: {
				force: true,
				'attr-lowercase': false, // set to false because of svg-attribute 'viewBox'
				'attr-value-double-quotes': false, // set to false because of json inside data-attributes
				'attr-value-not-empty': false, // in HTML5 you don't need to set a value, e.g. itemscope
				'doctype-first': true,
				'doctype-html5': true,
				'id-class-value': true,
				'id-unique': true,
				'img-alt-require': true,
				'space-tab-mixed-disabled': true,
				'spec-char-escape': true,
				'src-not-empty': true,
				'style-disabled': true,
				'tag-pair': true,
				'tag-self-close': true,
				'tagname-lowercase': true
			},
			all: {
				src: ['*/*.html']
			}
		},

		// Configuration for optimizing image-files
		imagemin: {
			options: {
				optimizationLevel: 7
			},
			dist: {
				files: [
					{
						cwd: '<%= paths.src %>/img/',
						dest: '<%= paths.dist %>/img/',
						expand: true,
						src: ['**/*.{jpg,jpeg,png,gif}']
					}
				]
			}
		},

		// Configuration for validating js-files
		jshint: {
			options: {
				force: true,
				'asi': false,
				'bitwise': false,
				'boss': true,
				'browser': true,
				'curly': false,
				'eqeqeq': false,
				'eqnull': true,
				'evil': false,
				'forin': true,
				'immed': false,
				'indent': 4,
				'jquery': true,
				'laxbreak': true,
				'maxerr': 50,
				'newcap': false,
				'noarg': true,
				'noempty': false,
				'nonew': false,
				'nomen': false,
				'onevar': false,
				'plusplus': false,
				'regexp': false,
				'undef': false,
				'sub': true,
				'strict': false,
				'white': false
			},
			all: {
				options: {
					'-W015': true,
					'-W089': true
				},
				src: [
					'<%= paths.src %>/js/**/*.js'
				]
			}
		},

		// Modernizr configuration
		modernizr: {
			all: {
				customTests: ['<%= paths.src %>/js/modernizr/*.js'],
				devFile: 'remote',
				files: {
					src: ['<%= paths.src %>/**/*.js', '<%= paths.src %>/**/*.scss']
				},
				outputFile: '<%= paths.tmp %>/modernizr.js',
				extensibility: { teststyles: true, prefixes: true },
				uglify: false
			}
		},

		// Configuration for prettifying the html-code
		prettify: {
			options: {
				condense: false,
				indent: 1,
				indent_char: '	',
				indent_inner_html: false,
				max_preserve_newlines: 1,
				preserve_newlines: true,
				unformatted: [
					"a",
					"b",
					"code",
					"em",
					"i",
					"mark",
					"strong",
					"pre"
				]
			},
			dev: {
				options: {
					brace_style: 'expand'
				},
				files: [
					{
						cwd: '<%= paths.dev %>/',
						dest: '<%= paths.dev %>/',
						expand: true,
						ext: '.html',
						src: ['*.html']
					}
				]
			},
			dist: {
				options: {
					brace_style: 'collapse'
				},
				files: [
					{
						cwd: '<%= paths.dist %>/',
						dest: '<%= paths.dist %>/',
						expand: true,
						ext: '.html',
						src: ['*.html']
					}
				]
			}
		},
		
		// Configuration for requirejs
		requirejs: {
			compile: {
				options: {
					baseUrl: "<%= paths.src %>/js/",
					mainConfigFile: "<%= paths.src %>/js/_requireconfig.js",
					out: "<%= paths.tmp %>/main.js",
					optimize: "none"
				}
			}
		},
		
		// Configuration for SASS
		sass: {
			dev: {
				options: {
					outputStyle: 'nested',
					sourceMap: true,
					includePaths: ['<%= paths.src %>/sass', '']
				},
				files: {
					'<%= paths.dev %>/css/styles.css': '<%= paths.tmp %>/styles.scss'
				}
			},
			dist: {
				options: {
					outputStyle: 'nested', // minifying by cssmin-task
					sourceMap: false,
					includePaths: ['<%= paths.src %>/sass', '']
				},
				files: {
					'<%= paths.dist %>/css/styles.css': '<%= paths.tmp %>/styles.scss'
				}
			}
		},

		// Configuration for SASS/SCSS linting
		sasslint: {
			allFiles: [
				'<%= paths.src %>/sass/{blocks,extends,mixins,variables,styles.scss,_*.scss}'
			],
			options: {
				configFile: '.sass-lint.yml'
			}
		},

		// Configuration for string-replacing the svgcss output
		'string-replace': {
			'svgcss-datasvg': {
				files: {
					'<%= paths.tmp %>/svg-bg-extends/_bg-data-svg.scss': '<%= paths.tmp %>/svgcss/_icons-data-svg.scss'
				},
				options: {
					replacements: [{
						pattern: /.%bg-data-svg-/g,
						replacement: '%bg-data-svg-'
					}]
				}
			}
		},

		// Configuration for creating SVG-Data-URIs
		svgcss: {
			options: {
				previewhtml: null,
				cssprefix: "%bg-data-svg-"
			},
			all: {
				files: {
					'<%= paths.tmp %>/svgcss/_icons-data-svg.scss': ['<%= paths.tmp %>/svgmin/bgs/*.svg']
				}
			}
		},

		// Configuration for optimizing SVG-files
		svgmin: {
			options: {
				 plugins: [
					{ cleanupAttrs: true },
					{ cleanupEnableBackground: true },
					{ cleanupIDs: true },
					{ cleanupListOfValues: true },
					{ cleanupNumericValues: true },
					{ collapseGroups: true },
					{ convertColors: true },
					{ convertPathData: true },
					{ convertShapeToPath: true },
					{ convertStyleToAttrs: true },
					{ convertTransform: true },
					{ mergePaths: true },
					{ moveElemsAttrsToGroup: true },
					{ moveGroupAttrsToElems: true },
					{ removeComments: true },
					{ removeDesc: true },
					{ removeDoctype: true },
					{ removeEditorsNSData: true },
					{ removeEmptyAttrs: true },
					{ removeEmptyContainers: true },
					{ removeEmptyText: true },
					{ removeHiddenElems: true },
					{ removeMetadata: true },
					{ removeNonInheritableGroupAttrs: true },
					{ removeRasterImages: true },
					{ removeTitle: true },
					{ removeUnknownsAndDefaults: true },
					{ removeUnusedNS: true },
					{ removeUselessDefs: true },
					{ removeUselessStrokeAndFill: false }, // Enabling this may cause small details to be removed
					{ removeViewBox: false }, // Keep the viewBox because that's where illustrator hides the SVG dimensions
					{ removeXMLProcInst: false }, // Enabling this breaks svgcss because it removes the XML header
					{ sortAttrs: true },
					{ transformsWithOnePath: false } // Enabling this breaks Illustrator SVGs with complex text
				]
			},
			dev_bg: {
				files: [
					{
						cwd: '<%= paths.src %>/img/bgs/',
						dest: '<%= paths.tmp %>/svgmin/bgs/',
						expand: true,
						ext: '.svg',
						src: ['*.svg']
					}
				]
			},
			dev_file: {
				files: [
					{
						cwd: '<%= paths.src %>/img/',
						dest: '<%= paths.dev %>/img/',
						expand: true,
						ext: '.svg',
						src: ['*.svg', 'temp/*.svg']
					}
				]
			},
			dist_bg: {
				files: [
					{
						cwd: '<%= paths.src %>/img/bgs/',
						dest: '<%= paths.tmp %>/svgmin/bgs/',
						expand: true,
						ext: '.svg',
						src: ['*.svg']
					}
				]
			},
			dist_file: {
				files: [
					{
						cwd: '<%= paths.src %>/img/',
						dest: '<%= paths.dist %>/img/',
						expand: true,
						ext: '.svg',
						src: ['*.svg', 'temp/*.svg']
					}
				]
			}
		},

		// Configuration for syncing files
		// Task does not remove any files and directories in 'dest' that are no longer in 'cwd'. :'(
		sync: {
			ajax: {
				files: [
					{
						cwd: '<%= paths.src %>/ajax-content/',
						dest: '<%= paths.dev %>/ajax-content/',
						src: '**/*'
					}
				]
			},
			favicon: {
				files: [
					{
						cwd: '<%= paths.src %>/img/appicons/',
						dest: '<%= paths.dev %>/img/appicons/',
						src: '**/*.ico'
					}
				]
			},
			fonts: {
				files: [
					{
						cwd: '<%= paths.src %>/fonts/',
						dest: '<%= paths.dev %>/fonts/',
						src: '**/*'
					}
				]
			},
			images: {
				files: [
					{
						cwd: '<%= paths.src %>/img/',
						dest: '<%= paths.dev %>/img/',
						src: '**/*.{jpg,jpeg,png,gif}'
					}
				]
			},
			js: {
				files: [
					{
						cwd: '<%= paths.src %>/js/',
						dest: '<%= paths.dev %>/js/',
						src: ['**/*', '!_requireconfig.js']
					}
				]
			},
			modernizr: {
 				files: [
					{
						cwd: '<%= paths.tmp %>/',
						dest: '<%= paths.dev %>/js/',
						src: 'modernizr.js'
					}
				]
			}
		},

		twigRender: {
			options: {
				namespaces: {
					'data': '<%= paths.src %>/static/data/',
					'layouts': '<%= paths.src %>/static/layouts/',
					'partials': '<%= paths.src %>/static/partials/',
					'macros': '<%= paths.src %>/static/macros/'
				},
				extensions: [
					function(Twig){
						Twig.exports.extendFunction('data', function(filename){
							var namespacePath = Twig.path.parsePath.apply(this, [this, filename]);

							if (/\.yml$/i.test(namespacePath) || /\.yaml/i.test(namespacePath)){
								return grunt.file.readYAML(namespacePath);
							} else {
								return grunt.file.readJSON(namespacePath);
							}
						});
					}
				]
			},
			dev: {
				files: [
					{
						data: {
							production: false,
							currentTimestamp: (new Date()).getTime()
						},
						expand: true,
						cwd: '<%= paths.src %>/static/pages/',
						src: ['**/*.twig'],
						dest: '<%= paths.dev %>/',
						ext: '.html'
					}
				]
			},
			dist: {
				files: [
					{
						data: [
							'<%= paths.tmp %>/gitinfos.json',
							{
								production: true,
								currentTimestamp: (new Date()).getTime(),
							}
						],
						expand: true,
						cwd: '<%= paths.src %>/static/pages/',
						src: ['**/*.twig'],
						dest: '<%= paths.dist %>/',
						ext: '.html'
					}
				]
			}
		},

		// Configuration for uglifying JS
		uglify: {
			dist: {
				options: {
					compress: {
						drop_console: true
					}
				},
				files: [
					{
						cwd: '<%= paths.dist %>/js',
						dest: '<%= paths.dist %>/js',
						expand: true,
						src: ['**/*.js', '!**/_*.js']
					}
				]
			}
		},

		// Configuration for watching changes
		watch: {
			options: {
				livereload: grunt.option('livereload-port'),
				spawn: true
			},
			scss: {
				files: ['<%= paths.src %>/sass/**/*.scss'],
				tasks: ['sass:dev', 'postcss:dev']
			},
			svg_bgs: {
				files: ['<%= paths.src %>/img/bgs/*.svg'],
				tasks: ['newer:svgmin:dev_bg', 'svgcss', 'string-replace']
			},
			svg_files: {
				files: ['<%= paths.src %>/img/*.svg'],
				tasks: ['newer:svgmin:dev_file']
			},
			sync_ajax: {
				files: ['<%= paths.src %>/ajax-content/**/*'],
				tasks: ['sync:ajax']
			},
			sync_images: {
				files: ['<%= paths.src %>/img/*', '<%= paths.src %>/img/**/*.{jpg,jpeg,png,gif}', '!<%= paths.src %>/img/dev/*'],
				tasks: ['sync:images']
			},
			sync_fonts: {
				files: ['<%= paths.src %>/fonts/**/*'],
				tasks: ['sync:fonts']
			},
			sync_js: {
				files: ['<%= paths.src %>/js/**/*', '!<%= paths.src %>/js/_requireconfig.js'],
				tasks: ['modernizr', 'sync:js']
			},
			sync_requirejs: {
				files: ['<%= paths.src %>/js/_requireconfig.js'],
				tasks: ['modernizr', 'requirejs', 'concat:dev']
			},
			templates: {
				files: ['<%= paths.src %>/static/**/*.{json,yml,yaml,twig}'],
				tasks: ['newer:twigRender:dev', 'prettify:dev']
			}
		}
	});

	// Where we tell Grunt we plan to use this plug-in.
	// done by jit-grunt plugin loader


	// Where we tell Grunt what to do when we type "grunt" into the terminal.

	// Default -> Standard Build task
	grunt.registerTask('default', [
		'build'
	]);

	// Development task
	grunt.registerTask('dev', [
		'clean:dev',
		'clean:tmp',
		'svgmin:dev_bg',
		'svgmin:dev_file',
		'concurrent:dev1',
		'string-replace',
		'generate-tmp-styles-scss',
		'concurrent:dev2',
		'postcss:dev',
		'concat:dev',
		'sync',
		'prettify:dev'
	]);

	// Build task
	grunt.registerTask('build', [
		'dev',
		'connect:livereload',
		'watch'
	]);

	// Distributing task
	grunt.registerTask('dist', [
		'clean:dist',
		'clean:tmp',
		'svgmin:dist_bg',
		'svgmin:dist_file',
		'concurrent:dist',
		'string-replace',
		'generate-tmp-styles-scss',
		'sass:dist',
		'gitinfo',
		'write-gitinfos',
		'twigRender:dist',
		'modernizr',
		'postcss:dist',
		'group_css_media_queries',
		'cssmin',
		'requirejs',
		'concat:dist',
		'copy:ajax',
		'copy:favicon',
		'copy:fonts',
		'copy:js',
		'copy:modernizr',
		'uglify',
		'prettify:dist'
	]);


	// Gitinfos task
	grunt.registerTask('write-gitinfos', 'Write gitinfos to a temp. file', function () {
		grunt.task.requires('gitinfo');
		
		grunt.file.write(paths.tmp+'/gitinfos.json', JSON.stringify({
			gitinfo: grunt.config('gitinfo')
		}));
	});


	// task to generate styles.scss without sass-globbing
	grunt.registerTask('generate-tmp-styles-scss', 'Generate styles tmp file', function () {
		var resultContent = grunt.file.read(paths.src+'/sass/styles.scss');
		
		// get rid of ../../-prefix, since libsass does not support them in @import-statements+includePaths option
		resultContent = resultContent.replace(/\"\.\.\/\.\.\//g, '"');

		var importMatches = resultContent.match(/^@import.+\*.*$/mg);

		if (importMatches) {
			importMatches.forEach(function(initialMatch) {
				// remove all " or '
				var match = initialMatch.replace(/["']/g,'');

				// remove the preceeding @import
				match = match.replace(/^@import/g,'');

				// lets get rid of the final ;
				match = match.replace(/;$/g,'');

				// remove all whitespaces
				match = match.trim();

				// get all files, which match this pattern
				var files = grunt.file.expand(
					{
						'cwd': paths.src+'/sass/',
						'filter': 'isFile'
					},
					match
				);

				var replaceContent = [];

				files.forEach(function(matchedFile)
				{
					replaceContent.push('@import "' + matchedFile + '";');
				});

				resultContent = resultContent.replace(initialMatch, replaceContent.join("\n"));
			});
		}
		grunt.file.write(paths.tmp+'/styles.scss', resultContent);
	});

	// HTMLHint task
	grunt.registerTask('check-html', [
		'htmlhint'
	]);

	// SASSLint/SCSSLint task
	grunt.registerTask('check-scss', [
		'sasslint'
	]);

	// JSHint task
	grunt.registerTask('check-js', [
		'jshint'
	]);

	// Accessibility task
	grunt.registerTask('check-wcag2', [
		'accessibility'
	]);











};
