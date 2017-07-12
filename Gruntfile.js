module.exports = function(grunt) {

	// Require it at the top and pass in the grunt instance
	require('jit-grunt')(grunt, {
		svgcss: 'grunt-svg-css'
	});
	require('time-grunt')(grunt);


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

		// Configuration for BrowserSync
		browserSync: {
			dev: {
				bsFiles: {
					src: [
						'<%= paths.dev %>/img/**/*.{jpg,jpeg,png,gif,ico,svg}',
						'<%= paths.dev %>/css/**/*.css',
						'<%= paths.dev %>/js/**/*.js',
						'<%= paths.dev %>/**/*.html'
					]
				},
				options: {
					open: false,
					online: false,
					watchTask: true,
					port: grunt.option('port') || 3000,
					ui: {
						port: grunt.option('port')+1 || 3001
					},
					server: {
						baseDir: ['<%= paths.dev %>']
					},
					ghostMode: {
						scroll: false
					}
				}
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

		// Configuration for run tasks concurrently
		concurrent: {
			dev1: ['svgcss'],
			dev2: ['sass:dev', 'twigRender:dev'],
			dist: ['svgcss', 'imagemin:dist'],
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

		eslint: {
			options: {
				envs: ['browser'],
				configFile: './node_modules/eslint-config-nikita/index.js'
			},
			check: ['<%= paths.src %>/js/**/*.js'],
			fix: {
				options: {
					fix: true,
				},
				src: ['<%= paths.src %>/js/**/*.js']
			}
		},

		// Configuration for gitinfo (will be populated with values from Git)
		gitinfo: {
			
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

		// Configuration for linting SCSS
		stylelint: {
			options: {
				configFile: 'stylelint.config.js',
				formatter: 'string',
				syntax: 'scss'
			},
			check: ['<%= paths.src %>/sass/**/*.scss'],
			fix: {
				options: {
					fix: true,
				},
				src: ['<%= paths.src %>/sass/**/*.scss'],
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
		},

		twigRender: {
			options: {
				namespaces: {
					'data': '<%= paths.src %>/html/data/',
					'layouts': '<%= paths.src %>/html/layouts/',
					'partials': '<%= paths.src %>/html/partials/',
					'macros': '<%= paths.src %>/html/macros/'
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
						cwd: '<%= paths.src %>/html/pages/',
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
						cwd: '<%= paths.src %>/html/pages/',
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
				files: ['<%= paths.src %>/js/**/*'],
				tasks: ['webpack:dev']
			},
			templates: {
				files: ['<%= paths.src %>/html/**/*.{json,yml,yaml,twig}'],
				tasks: ['newer:twigRender:dev', 'prettify:dev']
			}
		},

		webpack: (function(){

			const path = require('path');
			const webpack = require('webpack');
			const plugins = [
				new webpack.IgnorePlugin(/^(.*)$/, /node-jsb$/),
				new webpack.optimize.ModuleConcatenationPlugin(),
			];

			return {
				options: {
					cache: true,
					entry: {
						main: './<%= paths.src %>/js/_main.js'
					},
					output: {
						chunkFilename: '[chunkhash].pkg.js'
					},
					module: {
						exprContextCritical: false,
						rules: [
							{
								test: /\.js$/,
								enforce: 'pre',
								loader: 'import-glob',
								exclude: /node_modules/
							},
							{
								test: /\.scss$/,
								enforce: 'pre',
								loader: 'import-glob'
							},
							{
								test: /\.js$/,
								loader: 'babel-loader',
								exclude: /node_modules/,
								options: {
									compact: true,
									cacheDirectory: true,
									plugins: ['transform-runtime'],
									presets: [['env', {
										modules: false,
										loose: true,
										targets: {
											browsers: 'last 2 versions, Android >= 4.4' // see http://browserl.ist/
										}
									}]]
								}
							},
							{
								test: /\.ejs$/,
								loader: 'ejs-compiled-loader',
								options: {
									'htmlmin': true,
									'htmlminOptions': {
										removeComments: true
									}
								}
							},
							{
								test: /\.scss$/,
								use: ['style-loader', 'css-loader', 'sass-loader']
							}
						]
					},
					resolve: {
						modules: ['<%= paths.src %>/js', 'node_modules']
					}
				},
				dev: {
					devtool: 'sourcemap',
					output: {
						filename: '[name].js',
						path: path.resolve('<%= paths.dev %>/js/')
					},
					plugins: plugins
				},
				dist: {
					output: {
						filename: '[name].js',
						path: path.resolve('<%= paths.dist %>/js/')
					},
					plugins: plugins
				}
			};
		})()

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
		'webpack:dev',
		'sync',
		'prettify:dev'
	]);

	// Build task
	grunt.registerTask('build', [
		'dev',
		'browserSync:dev',
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
		'postcss:dist',
		'cssmin',
		'webpack:dist',
		'copy:ajax',
		'copy:favicon',
		'copy:fonts',
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

	// stylelint task
	grunt.registerTask('check-scss', [
		'stylelint:check'
	]);

	grunt.registerTask('fix-scss', [
		'stylelint:fix'
	]);

	// ESlint tasks
	grunt.registerTask('check-js', [
		'eslint:check'
	]);

	grunt.registerTask('fix-js', [
		'eslint:fix'
	]);

	// Accessibility task
	grunt.registerTask('check-wcag2', [
		'accessibility'
	]);











};
