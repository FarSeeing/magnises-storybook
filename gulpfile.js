(function () {
  'use strict';

  // --------------------------------------------------------------------
  // Plugins
  // --------------------------------------------------------------------

  var webserver   = require('gulp-server-livereload');

  var path        = require('path');
  var fs          = require('fs');
  var es          = require('event-stream');

  var gulp        = require('gulp');
  var debug       = require('gulp-debug');
  var watch 			= require('gulp-watch');
  var plumber     = require('gulp-plumber');
  var notify      = require('gulp-notify');
  var changed 		= require('gulp-changed');
  var connect     = require('gulp-connect');
  var ngdoc       = require('gulp-ngdocs');
  var glob        = require('glob');

  // Run sass alongside burbon (fastest way of sass compiling)
  var sass        = require('gulp-sass');
  var neat        = require('node-neat').includePaths;

  // JS/CSS Injection Related Files
  var inject      = require('gulp-inject');
  var bowerFiles  = require('main-bower-files');
  var angularSort = require('gulp-angular-filesort');

  // --------------------------------------------------------------------
  // BUILD PLUGINS
  // --------------------------------------------------------------------

  var concat      = require('gulp-concat');
  var del 				= require('del');

  //JS Modules
  var uglify      = require('gulp-uglify');
  var cssmin      = require('gulp-cssmin');
  var sourcemaps  = require('gulp-sourcemaps');

  //HTML Modules
  var htmlmin     = require('gulp-htmlmin');
  var rename      = require('gulp-rename');

  //images
  var imagemin 		= require('gulp-imagemin');
  var pngquant 		= require('imagemin-pngquant');

  // --------------------------------------------------------------------
  // Error Handler
  // --------------------------------------------------------------------

  //The title and icon that will be used for the gulp notifications
  var onError = {
    errorHandler: notify.onError({
  		title: 'Gulp',
  		message: 'Error: <%= error.message %>'
  	})
  };

  // --------------------------------------------------------------------
  // Gulp config
  // --------------------------------------------------------------------

  var sourcePath = 'client/';
  var vendorPath = sourcePath + 'vendor/';

  var bowerOptions = {
    overrides: {
      'screenfull': {
        main: 'dist/screenfull.js'
      },
      'angular-ui-router-anim-in-out': {
  			main: 'anim-in-out.js'
  		},
      'hint.css': {
  			main: 'hint.css'
  		}
    }
  };

  var config = {
    inject: {
      target: sourcePath + 'index.html',
      sources: {
        app: {
          css: [
            sourcePath + 'css/**/*.css',
            sourcePath + 'app/**/*.css'
          ],
          js: [
            sourcePath + 'app/**/*.js'
          ]
        }
      }
    },
    sass: {
      target: sourcePath + 'css',
      source: [
        sourcePath + 'css/**/*.scss',
        sourcePath + 'app/**/*.scss',
      ]
    }
  };

  // --------------------------------------------------------------------
  // BUILD Options
  // --------------------------------------------------------------------

  var destPath  = './dist/';
  var destIndex = destPath + 'index.html';
  var buildDate = (new Date()).getTime();

  var build = {
    css: [
      sourcePath + 'css/**/*.css',
      sourcePath + 'app/**/*.css',
    ],
    js: sourcePath + 'app/**/*.js',
  	html: sourcePath + 'app/**/*.html',
    images: sourcePath + 'images/**/*.*',
    assets: sourcePath + 'assets/**/*.*',
    cssAssets: sourcePath + 'assets/*.css',
  };

  var dest = {
  	imagesPath: destPath + 'images/',
    assetsPath: destPath + 'assets/',
  	cssPath: destPath + 'css/',
  	cssVendorFile: 'vendor.min.css',
  	cssFile: 'app.min.css',
  	jsPath: destPath + 'app/',
  	jsVendorFile: 'vendor.min.js',
  	jsFile: 'app.min.js',
  	htmlPath: destPath + 'app',
    mapPath: destPath + 'maps/'
  };

  var htmlOpts = {
    collapseWhitespace: true
  };

  var jsOpts = {
  	mangle: false
  };

  var cacheOpts = {
  	type: 'timestamp'
  };

  var buildJSOptions = JSON.parse(JSON.stringify(bowerOptions));
  buildJSOptions.filter = /\.js$/i;

  var bowerJS = bowerFiles(buildJSOptions);

  var bowerCSS = bowerFiles({
      filter: /\.css$/i
  });

  // --------------------------------------------------------------------
  // BUILD Tasks
  // --------------------------------------------------------------------

  gulp.task('build', ['build:inject']);

  gulp.task('build:inject', ['build:clean', 'move:index', 'build:js', 'build:css'], function(){
  	return gulp.src(destIndex)
  		.pipe(inject(
  			gulp.src([dest.cssPath + 'app.min.*', dest.jsPath + 'app.min.*'], {read: false}),
  			{relative: true}
  		))
  		.pipe(inject(
  			gulp.src([dest.cssPath + 'vendor.min.*', dest.jsPath + 'vendor.min.*'], {read: false}),
  			{name: 'bower', relative: true}
  		))
      .pipe(gulp.dest(destPath));
  });

  gulp.task('build:clean', function() {
  	return del([
      dest.cssPath + '*.css',
  		dest.jsPath  + '*.js',
      dest.mapPath + '*.map'
    ]);
  });

  gulp.task('build:css', ['build:css:vendor', 'build:css:app', 'build:css:assets']);

  gulp.task('build:css:vendor', function(){
  	return gulp.src(bowerCSS)
      .pipe(plumber(onError))
      .pipe(concat(dest.cssVendorFile))
      .pipe(cssmin())
  		.pipe(rename(function (path) {
  	    path.basename += '.' + buildDate;
  	  }))
      .pipe(gulp.dest(dest.cssPath));
  });

  gulp.task('build:css:assets', ['move:assets'], function(){
  	return gulp.src(build.cssAssets)
      .pipe(plumber(onError))
      .pipe(cssmin())
      .pipe(gulp.dest(dest.assetsPath));
  });

  gulp.task('build:css:app', ['sass'], function(){

  	return gulp.src(build.css)
      .pipe(plumber(onError))
      .pipe(concat(dest.cssFile))
      .pipe(cssmin())
  		.pipe(rename(function (path) {
  	    path.basename += '.' + buildDate;
  	  }))
      .pipe(gulp.dest(dest.cssPath));
  });

  gulp.task('build:js', ['build:js:vendor', 'build:js:app']);

  gulp.task('build:js:vendor', function(){
  	return gulp.src(bowerJS)
      .pipe(plumber(onError))
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(concat(dest.jsVendorFile))
  		.pipe(rename(function (path) {
  	    path.basename += '.' + buildDate;
  	  }))
      .pipe(sourcemaps.write('../maps'))
      .pipe(gulp.dest(dest.jsPath));
  });

  gulp.task('build:js:app', function(){

  	return gulp.src(build.js)
  	  .pipe(angularSort())
      .pipe(plumber(onError))
      .pipe(sourcemaps.init())
      .pipe(uglify(jsOpts))
      .pipe(concat(dest.jsFile))
  		.pipe(rename(function (path) {
  	    path.basename += '.' + buildDate;
  	  }))
      .pipe(sourcemaps.write('../maps'))
      .pipe(gulp.dest(dest.jsPath));
  });

  gulp.task('move:index', ['move:angular', 'move:images'], function(){
  	return gulp.src(config.inject.target)
  		.pipe(gulp.dest(destPath));
  });

  gulp.task('move:assets', function(){
  	return gulp.src(build.assets)
  		.pipe(gulp.dest(dest.assetsPath));
  });

  gulp.task('move:images', function(){
  	return gulp.src(build.images)
  		.pipe(gulp.dest(dest.imagesPath));
  });

  gulp.task('move:angular', function(){
  	return gulp.src(build.html)
  	  .pipe(htmlmin(htmlOpts))
  		.pipe(gulp.dest(dest.htmlPath));
  });

  // --------------------------------------------------------------------
  // Development Tasks
  // --------------------------------------------------------------------

  //Default gulp task for dev purposes
  gulp.task('default', ['watch', 'inject', 'sass']);

  //Watches for changes in files that should be streamed/compiled to browser
  gulp.task('watch', function() {

    //We only want to inject files when files are added/deleted, not changed.
  	var options = {events: ['add', 'unlink']};
  	var injectFn = function() {
  			gulp.start('inject');
  	};

    watch(
  		config.sass.source,
  		function(){
  			gulp.start('sass');
  		}
  	);

    //Watch for changes in app related files and inject new ones
  	watch(
      config.inject.sources.app.js.concat(config.inject.sources.app.css),
  		options,
  		injectFn
  	);

  	//Watch for changes in bower related files and inject new ones
  	watch(
  		'bower.json',
  		injectFn
  	);
  });

  gulp.task('i', ['inject']);
  //Injects all css/js files into our index.html src file
  gulp.task('inject', function () {

    return gulp.src(config.inject.target)
  		.pipe(plumber(onError))
      .pipe(inject(
  			gulp.src(bowerFiles(bowerOptions), {read: false}),
  			{name: 'bower', relative: true}
  		))
      .pipe(inject(
  			es.merge(
  	      gulp.src(config.inject.sources.app.css),
  	      gulp.src(config.inject.sources.app.js).pipe(angularSort())
  	    ),
  			{relative: true}
  		))
      .pipe(gulp.dest(sourcePath));
  });

  //Builds our sass with burbon/neat
  gulp.task('sass', function(){

    return gulp.src(config.sass.source)
  		.pipe(changed(config.sass.target))
  		.pipe(plumber(onError))
      .pipe(sass(
  			{ includePaths: ['styles'].concat(neat) }
  		))
      .pipe(gulp.dest(config.sass.target));
  });

  // --------------------------------------------------------------------
  // dev-server 
  // --------------------------------------------------------------------
 
  gulp.task('server', ['dev-server']);
  gulp.task('webserver', ['dev-server']);
  gulp.task('dev-server', function() {
    gulp.src('client')
      .pipe(webserver({
        fallback: 'index.html',
        livereload: {
          enable: true,
          filter: function(filePath, cb){
            cb( !(/\.(sw[a-z])$/.test(filePath)) ) ;
          }
        },
        directoryListing: false,
      }));
  });

  gulp.task('ngdoc', ['connect'], function (callback) {
    var files = bowerFiles(bowerOptions);

    var options = {
      html5Mode: true,
      startPage: '/docs/api',
      loadDefaults: {
        angular: false,
        angularAnimate: false
      },
      scripts: files.filter(function (file) {
        return /\.js$/.test(file);
      }),
      styles: files.filter(function (file) {
        return /\.css$/.test(file);
      })/*.concat(config.inject.sources.app.css.reduce(function (files, regexp) {
        return files.concat(glob.sync(regexp));
      }, []))*/
    };

    del('./docs').then(function () {
      gulp.src(config.inject.sources.app.js)
        .pipe(angularSort())
        .pipe(require('through2').obj(function (file, enc, done) {
          options.scripts.push(file.path);
          done();
        }))
        .on('data', function () {})
        .on('end', function () {
          gulp.src('./client/app/components/*/*.directive.js')
            .pipe(ngdoc.process())
            .pipe(gulp.dest('./docs'))
            .on('end', function () {
              gulp.src('./client/app/components/*/*.directive.js')
                .pipe(ngdoc.process(options))
                .pipe(gulp.dest('./docs'))
                .on('end', callback);
            });
        });
    });
  });

  gulp.task('connect', function () {
    connect.server({
      root: '.',
      livereload: false,
      fallback: 'docs/index.html',
      port: 9001
    });
  });

}());
