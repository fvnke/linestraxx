var settings = require( "modules/settings" ),
	throttle = require("modules/throttle");


 "use strict";



module.exports = function( el ) {
 	   
	var $el = $(el),
	$window = $(window);
	
	init();
	
	function init(){
		$('body, html').on('scroll', logoWinScroll);
	}
	
	function logoWinScroll(){
		
		var op = 1 - ($('body').scrollTop()/( $window.height()/2 ));
		
		$el.css('opacity', op);
	}
};
  