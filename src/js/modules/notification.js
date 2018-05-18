/**
*	@desc module control for Product Items
*/

var settings = require('modules/settings');

module.exports = function( el ) {
	
	var $el = $(el),
		$window = $(window),
    text = $el.data('text');
  
	init();
  
	function init(){
    $el.delay(1000).fadeIn(800);
    $('nav.footer-nav').css('margin-bottom', $el.height());
    
    $('.notification').on('click', function(){
      $(this).fadeOut(200);
      $('nav.footer-nav').css('margin-bottom', 0);
    });
    
    //$('body').append('<div id="notification"><p>'+text+'</p></div>');
	}
	
};  
  