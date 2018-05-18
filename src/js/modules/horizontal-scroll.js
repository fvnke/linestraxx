/**
*	@desc module control for Product Slideshow
*/

var settings = require('modules/settings');

module.exports = function( el ) {
	
	var $el = $(el),
      $inner = $el.find('ul'),
      $window = $(window),
	    cntWd = $el.innerWidth(),
	    tb = $inner,
	    sldWd = tb.outerWidth(),
      ePageX = 0;
      
  init();
  
  console.log('horizontal scroll')

  $window.on('resize', winResize);
  
  function init(){
    
    console.log(sldWd)
		$el.mousemove(function(e) {
      sldWd = tb.outerWidth()
      ePageX = e.pageX;
      if(sldWd > $window.width())
			  tb.css({left: ((cntWd - sldWd)*((e.pageX / cntWd).toFixed(3))).toFixed(1) +"px" });
 		});
    
    

  }
  
  function winResize(){
    cntWd = $el.innerWidth();
    sldWd = tb.outerWidth();
    tb.css({left: ((cntWd - sldWd)*((0 / cntWd).toFixed(3))).toFixed(1) +"px" });
  }
		
	
	
}; 
  