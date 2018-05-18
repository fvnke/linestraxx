var settings = require( "modules/settings" ),
	throttle = require("modules/throttle"),
	menu = require("modules/menu"),
	footer = require("modules/footer"),
	barba = require("modules/barba"),
  shop = require("modules/shop"),
  cart = require("modules/cart");

	
module.exports = function( el ) {
		var $el = $( el ),
		$window = $( window ),
		resizeTimer;
 
 
 	    init();
 
		function init(){
			
      //shopify.init();
			barba.init();
			menu.init();
		  footer.init();
			shop.init();
      cart.init();
      
			$('*[data-fade="in"]').each(function(){
        var $th = $(this);
        setTimeout(function(){
          $th.addClass('fade-in');
        }, 200);
			});
      
      $('body').removeClass('init');
      
			$window.on('resize', winResize);
		}
		
		function animOff(){
			$('body').addClass('noTransition');
		}
		
		function animOn(){
			$('body').removeClass('noTransition');
		}
		
		function winResizeEnd(){
			animOn();
		}
		
		function winResize(){
			clearTimeout(resizeTimer);
			animOff();
			
			resizeTimer = setTimeout(function(){
				winResizeEnd();
			}, 300);
		} 
		
};
  