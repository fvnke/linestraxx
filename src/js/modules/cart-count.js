var settings = require( "modules/settings" ),
    throttle = require("modules/throttle"),
    cart = require("modules/cart");


module.exports = function( el ) {
 	   
		$window = $(window);
		//var win = window;
	   
	    console.log('cart-count module')
		console.log(el);
		
		el.addEventListener('click', toggleCart);
		
		function toggleCart(e){
      e.preventDefault();
      console.log('toggle')
		  cart.toggle();
		}
		
		$window.on('resize', function(){
			$('#CartDrawer form').css('height', $window.height());
			$('#CartDrawer form .scroll-container').css('height', $window.height());
		});
};
  