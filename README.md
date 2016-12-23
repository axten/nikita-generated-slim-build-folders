# nikita.kickstarter

This is our toolbelt how to start a new project from scratch.

Latest Release: [![GitHub version](https://badge.fury.io/gh/nikita-kit%2Fnikita-kickstarter.png)](https://github.com/nikita-kit/nikita-kickstarter/releases)

If you're interested in HTML patterns, code snippets and best practices, try [nikita.html](https://github.com/nikita-kit/nikita-html).  
If you want to write efficient and scalable (S)CSS-code for big websites, try [nikita.css](https://github.com/nikita-kit/nikita-css).


## Project-Setup

- [__Grunt__](http://gruntjs.com/) – js task runner
- [__Webpack__](http://gruntjs.com/) – module bundler
- [__Babel__](https://babeljs.io/) – compiler for ES6 javascript
- [__twigRender__](https://github.com/stefanullinger/grunt-twig-render) – static site generator
- [__SASS__](http://sass-lang.com/) with [__LibSass__](http://libsass.org/) – css preprocessing
- [__nikita.html__](https://github.com/nikita-kit/nikita-html) – HTML conventions and coding guidelines
- [__nikita.css__](https://github.com/nikita-kit/nikita-css) – (S)CSS conventions and coding guidelines
- [__nikita.js__](https://github.com/nikita-kit/nikita-js) – JS conventions and coding guidelines
- [__SASS-Lint__](https://github.com/sasstools/sass-lint) – linter for SCSS files
- [__BrowserSync__](https://browsersync.io/) – synchronised browser testing
- [__KSS__](http://warpspire.com/kss/) – living styleguide

Grunt depends on [node.js](http://nodejs.org). Some of the [Grunt plugins](#grunt-plugins-used) depend on command line tools to be installed on your (build) system.

## Requirements

These are the minimum requirements for the project setup:  
 
- [__Node.js & Node Package Manager__](http://nodejs.org)
- [__Grunt Command Line Interface__](http://gruntjs.com/getting-started) – `sudo npm install -g grunt-cli`


## Getting started

Open your preferred command line tool and choose your project directory.  

Either use `./setup-dev-env.sh`. This will start a shell script to check requirements, then runs `npm install`  automatically to install Grunt and [Grunt plugins](#grunt-plugins-used) required for the build script plus Bower and [Bower packages](#bower-packages-used). 

Or use `npm install` if your are on Windows (you have to check the requirements manually). This will install Grunt and [Grunt plugins](#grunt-plugins-used) required for the build script.

1. `grunt` or `grunt build` – start build script
2. [http://localhost:3000/](http://localhost:3000/) or [http://0.0.0.0:3000/](http://0.0.0.0:3000/) – watch your build-directory in the browser
3. `grunt dist` – start distribution build script

If you want to specify a different port, you can start the script with the `--port` option:
`grunt --port=9000` will launch the BrowserSync webserver on [http://0.0.0.0:9000/](http://0.0.0.0:9000/) and will start the Browsersync UI on port 9001 (= 9000 + 1).
If a port is already in use, BrowserSync will auto detect that case and increases the port number until a free port is found.

If you want to generate the dist to a different folder, you may use the `--target` option:
`grunt dist --target=www` will generate to `www` folder instead of `dist`.

## Grunt-Devtools

If you dont't like the command line you can use an alternative called [grunt-devtools](https://github.com/vladikoff/grunt-devtools) for the Chrome browser to start the grunt tasks.

1. Download the [Grunt Devtools extension for Chrome Developer Tools](https://chrome.google.com/webstore/detail/grunt-devtools/fbiodiodggnlakggeeckkjccjhhjndnb?hl=en) from the Chrome Web Store.
2. Global install via `npm install -g grunt-devtools`.
3. Run `grunt-devtools` in a directory with a Gruntfile.
4. Open Chrome Devtools and find the __Grunt tab__. Your grunt tasks should now be accessible from within Chrome.


## Grunt-Notifications

You don't like to stare permanently on your console? So wouldn’t it be great if your system could notify you when your fresh build is ready to consume or when anything bad happened? Meet [grunt-notify](https://github.com/dylang/grunt-notify), an automatic desktop notification service for Grunt using Growl for OS X or Windows, Mountain Lion and Mavericks Notification Center and Notify-Send. Just install this plugin via npm and load it in your Gruntfile.


## Grunt-Plugins used

- [autoprefixer-core](https://github.com/postcss/autoprefixer-core)
- [babel-core](https://github.com/babel/babel/tree/master/packages/babel-core)
- [babel-loader](https://github.com/babel/babel-loader)
- [babel-plugin-transform-runtime](https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-runtime)
- [babel-preset-latest](https://github.com/babel/babel/tree/master/packages/babel-preset-latest)
- [ejs-compiled-loader](https://github.com/bazilio91/ejs-compiled-loader)
- [grunt](https://github.com/gruntjs/grunt)
- [grunt-accessibility](https://github.com/yargalot/grunt-accessibility)
- [grunt-browser-sync](https://github.com/BrowserSync/grunt-browser-sync)
- [grunt-concurrent](https://github.com/sindresorhus/grunt-concurrent)
- [grunt-contrib-clean](https://github.com/gruntjs/grunt-contrib-clean)
- [grunt-contrib-copy](https://github.com/gruntjs/grunt-contrib-copy)
- [grunt-contrib-cssmin](https://github.com/gruntjs/grunt-contrib-cssmin)
- [grunt-contrib-imagemin](https://github.com/gruntjs/grunt-contrib-imagemin)
- [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)
- [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)
- [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)
- [grunt-csssplit](https://github.com/project-collins/grunt-csssplit)
- [grunt-gitinfo](https://github.com/damkraw/grunt-gitinfo)
- [grunt-htmlhint](https://github.com/yaniswang/grunt-htmlhint)
- [grunt-jsdoc](https://github.com/krampstudio/grunt-jsdoc)
- [grunt-modernizr](https://github.com/Modernizr/grunt-modernizr)
- [grunt-newer](https://github.com/tschaub/grunt-newer)
- [grunt-pagespeed](https://github.com/jrcryer/grunt-pagespeed)
- [grunt-phantomas](https://github.com/stefanjudis/grunt-phantomas)
- [grunt-photobox](https://github.com/stefanjudis/grunt-photobox)
- [grunt-postcss](https://github.com/nDmitry/grunt-postcss)
- [grunt-prettify](https://github.com/jonschlinkert/grunt-prettify)
- [grunt-sass](https://github.com/sindresorhus/grunt-sass)
- [grunt-sass-lint](https://github.com/sasstools/grunt-sass-lint)
- [grunt-string-replace](https://github.com/erickrdch/grunt-string-replace)
- [grunt-styleguide](https://github.com/indieisaconcept/grunt-styleguide)
- [grunt-svg-css](https://github.com/psyrendust/grunt-svg-css)
- [grunt-svgmin](https://github.com/sindresorhus/grunt-svgmin)
- [grunt-svgstore](https://github.com/FWeinb/grunt-svgstore)
- [grunt-sync](https://github.com/tomusdrw/grunt-sync)
- [grunt-twig-render](https://github.com/stefanullinger/grunt-twig-render)
- [grunt-webpack](https://github.com/webpack/grunt-webpack)
- [import-glob](https://github.com/terpiljenya/import-glob)
- [jit-grunt](https://github.com/shootaroo/jit-grunt)
- [time-grunt](https://github.com/sindresorhus/time-grunt)
- [webpack](https://github.com/webpack/webpack)
- [webpack-dev-server](https://github.com/webpack/webpack-dev-server)



## Project structure

The kickstart-setup provides the three main folders `source/`, `build/` and `dist/` plus a `tmp/`-folder. All source-files will be put to the `source`-folder like templates, fonts, images, js- and sass-files. These files will be processed by several grunt tasks – e.g. grunt-sass: sass -> css – and then stored in the `build`-folder. From there you can view the generated html-files in the browser. The `dist`-folder is built up like the `build`-folder. The main difference between `build/` and `dist/` is, that `dist/` has combined and minified css/js files and no unnecessary files or code-comments. The `build`-folder is for debugging your files, the `dist-`folder should be used for production.

```
$ tree -d -I node_modules
.
├── build
│   ├── css
│   ├── fonts
│   ├── img
│   │   ├── appicons
│   │   └── bgs
│   └── js
│       └── modernizr
├── dist
│   ├── css
│   ├── fonts
│   ├── img
│   │   ├── appicons
│   │   └── bgs
│   └── js
│       └── modernizr
├── source
│   ├── html
│   │   ├── data
│   │   ├── macros
│   │   ├── layouts
│   │   ├── pages
│   │   └── partials
│   ├── fonts
│   ├── img
│   │   ├── appicons
│   │   ├── bgs
│   │   ├── dev
│   │   ├── icons
│   │   └── temp
│   ├── js
│   │   └── modernizr
│   │   └── modules
│   ├── sass
│   │   ├── blocks
│   │   ├── extends
│   │   ├── mixins
│   │   └── variables
│   └── styleguide-template
│       └── public
└── tmp
    ├── svgcss
    ├── svg-bg-extends
    └── svgmin
        └── bgs
```


## HTML

For the HTML structure, please have a look at [nikita.html](https://github.com/nikita-kit/nikita-html). This sub project
describes the HTML coding standards and conventions.


## CSS

For the CSS structure, please have a look at [nikita.css](https://github.com/nikita-kit/nikita-css). This sub project
describes the CSS coding standards and conventions.


## Javascript

For the JS structure, please have a look at [nikita.js](https://github.com/nikita-kit/nikita-js). This sub project
describes the JS coding standards and conventions.

The page will contain 2 parts of javascript.

The first part is in `html/layouts/master.twig` at the beginning:

``` html
<script src="js/modernizr.js"></script>
```

It ensures that the html5shiv is loaded and modernizr is ready. The modernizr file is generated automagically with all modernizr features, which are used in your `sass/**/*.sass` and `js/**/*.js` files. The `js/modernizr` folder contains custom tests for modernizr. Those will be added to the `modernizr.js`, too.

The second part is at the end of the file (before the closing `</body>` tag:

``` html
<script src="js/main.js"></script>
```

The `js/main.js` file is generated by webpack. This file contains everything, which is `require`d or `import`ed in your JS-Code.


## Icon-Workflow







### Data-URIs

If you have to include your icon as a background-image, e.g. because you can't simply add a `svg` element, then you should use this method.

1. Just put your SVG-icons into `source/img/bgs`.
2. All icons will be processed with the svgmin-task and put into the `tmp/svgmin/bgs` folder.
3. Afterwards the svgcss-task uses these icons to produce SCSS-files (all icons are included as data-URIs in the form of SASS-placeholders), which will be put into `tmp/svgcss` folder.
4. These SCSS-files will now be processed by the string-replace-task to get different placeholder-extends. They are saved into `tmp/svg-bg-extends` folder.
5. Now you can include your icons by using the `_svg-background.scss` mixin. Just type `@include svg-background(name-of-your-icon);`.



## Use `source+build+dist` or one custom folder

Since 0.9.0 it's possible to decide whether you want to use the default structure:

```
source
dist
build
```

or if you want to use a custom folder (e.g. for symfony2):

```
src/AppBundle/Resources/public
```

To decide between those, you will be asked:

``` console
? Do you want to use "build/source and dist" folder? No
? Which source folder do you want to use? (src/AppBundle/Resources/public)
```

You can choose `Y` to keep the default logic (using source-folder to generate dist+build folder depending on the grunt
task you choose).

## Questions?

If you're asking yourself »Why not …?« have a look at my [WHYNOT.md](https://github.com/nikita-kit/nikita-kickstarter/blob/master/WHY-NOT.md) file. There we might answer some common questions. :)


## License

nikita.kickstarter is licensed under [CC0](http://creativecommons.org/publicdomain/zero/1.0/): Public Domain Dedication, please see
[NIKITA-LICENSE.md](https://github.com/nikita-kit/nikita-kickstarter/blob/master/NIKITA-LICENSE.md) for further information.
