/**
*	@desc module control for Product Slideshow
*/

var settings = require('modules/settings');

module.exports = function( el ) {
	
	var $el = $(el),
      $window = $(window);
       
  init();
  function init(){
    $(window).on('scroll', winScroll);
    $('#home-video').on('click', function(){
      $('body, html').animate({scrollTop: $('.main-content').offset().top}, 300, 'linear')
    })
    //$('.main-wrapper').css()
  }

  function winScroll(){
    console.log("$('body, html').scrollTop() " + $('body, html').scrollTop())
    console.log("$('#shop').position().top" + $('#shop').position().top)
    if($('body, html').scrollTop() >= $('#shop').position().top) {
      $('body').addClass('scrolled-past');
    } else {
      $('body').removeClass('scrolled-past');
    }
  }
	
	
}; 