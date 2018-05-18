var settings = require( "modules/settings" ),
	throttle = require("modules/throttle");


 "use strict";



module.exports = function( el ) {
 	   
		//var win = window;
	   
	    console.log('shop-link module')
		console.log(el);
		
		el.addEventListener('mouseover', shopOver);
		el.addEventListener('mouseout', shopOut)
		el.addEventListener('click', shopClick);
		
		function shopOver(e){
			
			//var shopScreen = document.getElementById('shop-screen');
			//shopScreen.classList.add('shown');
			 
		}
		 
		function shopOut(e){
		
			//var shopScreen = document.getElementById('shop-screen');
			//shopScreen.classList.remove('shown');
			
		}
		
		function shopClick(e) {
			
			console.log(window.location)
			
			if(window.location.pathname == '/collections/all') {
				e.preventDefault();
				$('body').removeClass('about-screen');
				$('[data-module-init="cart-count"]').removeClass('active');
			
				if($('body').hasClass('js-drawer-open')) {
					$('.cart-link').trigger('click');
				}
			 
				$('#about-screen').removeClass('shown');
				$('[data-module-init="about-link"]').removeClass('active');
			}
			
			
			
		}
};
  