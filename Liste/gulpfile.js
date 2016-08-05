var gulp				= require('gulp')
  , webpack				= require("webpack-stream")
  , named				= require('vinyl-named')
  , eslint				= require('gulp-eslint')
  , ExtractTextPlugin	= require("extract-text-webpack-plugin")
  // , uglify				= require('gulp-uglify')
  , filter				= require('gulp-filter')
  , autoprefixer		= require('gulp-autoprefixer')
  , cleanCSS 			= require('gulp-clean-css')
  , gzip				= require('gulp-gzip')
  , through				= require('through-gulp')
  , upath				= require("upath")
  , ts 					= require("ts-loader")
  , tsc					= require('gulp-typescript')
  , tslint				= require("gulp-tslint")
  ,	gulp_jspm 			= require('gulp-jspm')
  , babel 				= require('gulp-babel')
  , sourcemaps 			= require('gulp-sourcemaps')
  ;

var webpackEntries	=	[ "./V0/mainV0.js"
						, "./V1/mainV1.js"
						, "./V2/mainV2_webpack.ts"
						];
var typescriptInputs=	[ {config: "./V2/tsconfig.json", dest: "./V2/compil"}
						];
var filesToLint 	=	[ "NF/**/*.js"
						, "NF/**/*.ts"
						, "V0/**/*.js"
						, "V1/**/*.js"
						, "V2/**/*.js"
						, "V2/**/*.ts"
						];

var problemFiles	=	filesToLint.slice();
function appendProblemFiles(fName) {
	if(problemFiles.indexOf(fName) === -1) {
		problemFiles.push(fName);
	}
}
function removeProblemFiles(fName) {
	var pos = problemFiles.indexOf(fName)
	if(pos !== -1) {
		problemFiles.splice(problemFiles.indexOf(fName), 1);
	}
}

function listLinted() {
	return stream = through(function(file, encoding,callback) {
		this.push(file);
		if(file.eslint || file.tslint) {
			var fName = upath.normalizeSafe( file.cwd + '/' + file.eslint.filePath );
			// console.log( "\t", fName );
			var pos = problemFiles.indexOf(fName);
			if (  file.eslint.errorCount || file.eslint.warningCount 
				||file.tslint.errorCount || file.tslint.warningCount  ) {
				appendProblemFiles(fName);
			} else {
				removeProblemFiles(fName);
			}
		}
		callback();
		}, function(callback) {callback();});
}

function linterPipeline() {
	// console.log( "linterPipeline", problemFiles );
   var src = gulp.src ( problemFiles )
     ,  ts =  src.pipe( filter('*.ts' ))
     ,  js =  src.pipe( filter('*.js' ))
    js	.pipe( eslint() 		)
		.pipe( listLinted() 	)
		.pipe( eslint.format("stylish", process.stdout) 	)
		;
    js	.pipe(tslint( {formatter: "verbose"} ))
		.pipe( eslint.format("stylish", process.stdout) 	)
		.pipe( listLinted() 	)
        .pipe(tslint.report())
		;
	return src;
}

gulp.task('lint'  , function () {return linterPipeline  ();});


gulp.task('watch', ['lint'], function () {
	// console.log("Task lint")
	problemFiles.splice(0, filesToLint.length);
	// console.log( "problemFiles:", problemFiles);
	gulp.watch( filesToLint, function(event) {
		var fName = upath.normalizeSafe( event.path );
		// console.log( event );
		if (event.type !== 'deleted') {
	  			appendProblemFiles(fName);
				console.log( "__________________________________________________________________________" );
				console.log( "------------------------------- CODE LINT --------------------------------" );
				console.log( "--------------------------------------------------------------------------" );
				return linterPipeline();
			}
  });
});


gulp.task("webpack", function(callback) {
	var wp =
	gulp.src( webpackEntries )
		.pipe( named() )
		.pipe( webpack({
			progress	: false,
			stats: {
				colors	: true ,
				modules	: false,
				reasons	: false
			},
			watch		: true,
			resolve		: {
				extensions	: ["", ".webpack.js", ".web.js", ".js", ".ts"]
			},
			module		: {
				loaders: [
					{ test	: /\.css$/					, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
					{ test	: /\.html$/					, loader: 'raw-loader'},
                    { test: /\.(png|woff|jpg|jpeg|gif)$/, loader: 'url-loader?limit=100000' },
                    { test: /\.ts$/ 					, loader: 'ts-loader'}
				]
			},
			ts : {
				configFileName	: "tsconfig.webpack.json"
			},
			plugins: [ new ExtractTextPlugin("[name].css")
					 ],
			failOnError	: false
    	}) ); /* End of pipe webpack */
   // Split CSS and JS process
   var css = wp.pipe( filter('*.css' ))
     , js  = wp.pipe( filter('*.js'  ));
	// CSS process
	css.pipe( autoprefixer() )
		// Split dev and dist
		css	.pipe( gulp.dest('dev') )
			.pipe( cleanCSS() )
			.pipe( gulp.dest('dist') )
			.pipe( gzip() )
			.pipe( gulp.dest('dist') );

	// JS process
	js	.pipe( gulp.dest('dev') )
		.pipe( babel({minified: true}) )
		.pipe( gulp.dest('dist') )
		.pipe( gzip() )
		.pipe( gulp.dest('dist') );

	return wp;
});

;

gulp.task( 'tsc', function() {
	typescriptInputs.forEach( function(def) {
		var tsProject = tsc.createProject( def.config );
		var tsresult = tsProject.src().pipe( sourcemaps.init() ).pipe(tsc(tsProject));
		tsresult.js.pipe(sourcemaps.write({
			// Return relative source map root directories per file.
			sourceRoot: function (file) {
				var sourceFile = upath.join(file.cwd, file.sourceMap.file );
				console.log( "source map", sourceFile );
				return upath.relative(upath.dirname(sourceFile), file.cwd);
			}
		})).pipe( gulp.dest( def.dest ) );
	});
});


gulp.task('default', ['webpack', 'watch', 'tsc'], function() {
	console.log("Done ???");
});



