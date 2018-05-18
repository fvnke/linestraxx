var gulp = require( "gulp" );
var concat = require( "gulp-concat" );
var uglify = require( "gulp-uglify" );
var sourcemaps = require( "gulp-sourcemaps" );

var vendorScripts = [
  './node_modules/vide/dist/jquery.vide.min.js',
  './vendors/cookie.js'
];

gulp.task( "vendors", function() {
	return gulp.src( vendorScripts )
    .pipe( sourcemaps.init() )
    .pipe( concat( "vendor.min.js" ) )
    .pipe( uglify() )
    .pipe( sourcemaps.write() )
    .pipe( gulp.dest( "assets/" ) );
});
 