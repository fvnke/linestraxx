/**
*	@desc module control for Product Slideshow
*/

var settings = require('modules/settings');

module.exports = function( el ) {
	
	var $el = $(el),
      $window = $(window),
      $btn = $el.find('button'),
      $accordionInner = $el.find('.accordion-inner').slideUp(0);
      
  init();

  function init(){
    $btn.on('click', function(){
      $accordionInner.slideToggle(0);
    })
  }

		 
	
	
}; 
  