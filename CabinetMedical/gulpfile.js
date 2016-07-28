var gulp				= require('gulp')
  , autoprefixer		= require('gulp-autoprefixer')
  , cleanCSS 			= require('gulp-clean-css')
  , gzip				= require('gulp-gzip')
  , through2 			= require( "through2" )
  , upath				= require("upath")
  , tsc					= require('gulp-typescript')
  , tslint				= require("gulp-tslint")
  , filter				= require("gulp-filter")
  , stylish 			= require('gulp-tslint-stylish')
  ;


var typescriptInputs=	[ {config: "./IHMAngular2TS/tsconfig.json", dest: "./IHMAngular2JS"}
						];
var filesToLint 	=	[ "IHMAngular2TS/**/*.ts"
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
	return through2.obj( function(file, encoding, callback) {// stream = through(function(file, encoding, callback) {
		this.push(file);
		if(file.tslint) {
			var parsedFile = upath.parse( file.path );
			var fName = upath.normalizeSafe( file.cwd + '/' + parsedFile.name );
			if (  file.tslint.failureCount  ) {
				appendProblemFiles(fName);
				console.log( "appendProblemFiles", fName );
			} else {
				removeProblemFiles(fName);
			}
		}
		callback();
		}, function(callback) {callback();});
}

function linterPipeline() {
	console.log( "linterPipeline", problemFiles );
	var src = gulp.src ( problemFiles );
	src	.pipe(tslint( {formatter: "stylish", configuration: "tslint.json"} ))
		.pipe( listLinted() 	)
        .pipe( tslint.report( {
			emitError: false,
			sort: true,
			bell: true,
			fullPath: true
		}));
	return src;
}

gulp.task('lint'  , function () {return linterPipeline  ();});

gulp.task('watch', ['lint'], function () {
	// console.log("Task lint")
	problemFiles.splice(0, filesToLint.length);
	// console.log( "problemFiles:", problemFiles);
	gulp.watch( filesToLint, ['tsc']);
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

gulp.task( 'tsc', function() {
	typescriptInputs.forEach( function(def) {
		var tsProject = tsc.createProject( def.config );
		var tsresult = tsProject.src().pipe(tsc(tsProject));
		tsresult.js.pipe( gulp.dest( def.dest ) );
	});
});

gulp.task('default', ['watch', 'tsc'], function() {
	console.log("Done ???");
});

