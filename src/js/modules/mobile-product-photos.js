/**
*	@desc module to illustrate where you are on the product scroll
*/

module.exports = function( el ) {
	
	var $el = $(el),
	$window = $(window),
  count = 0,
  total = $('.mobile-product-image').length - 1;
	
	init();
	
	function init(){
		//positionEl();
		
		//$('.main-content').off('scroll', winProductScroll).on('scroll', winProductScroll);
    
    $el.on('scroll', function(e) {
      //e.preventDefault();
    })
    
    $el.swipe( {
        //Generic swipe handler for all directions
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
          console.log('swipe')
          nextPhoto(direction);
        }
      });
    
    
    $window.on('resize', winResize);
    
    sizeContainers();
	}
  
  function nextPhoto(direction) {
    
    count = $('.photo-position-block.active').index();
    
    if (direction == 'left') {
      //moving forward
      count = count < total ? count + 1 : total;
    } else if (direction == 'right') {
      //moving back
      count = count > 0 ? count - 1 : 0;
    }
    
    
    
    var sl = $(window).width() * count;
    
    $('.mobile-product-photos').stop().animate({ scrollLeft: sl }, 500, 'easeInOutCirc');
    
  }
  
  function sizeContainers(){
    
  }
  
  function winResize(){
    sizeContainers();
  }
	
	
	 
	
		
}; 
  