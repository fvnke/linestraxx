/**
*	@desc module control for Product Slideshow
*/

var settings = require('modules/settings');

module.exports = function( el ) {
	
	var $el = $(el),
      $window = $(window),
      isInfinite = $el.data('infinite') != true ? false : true,
      $flickity,
      index = 0,
      total = $el.find('.gallery-child').length - 1,
      gallery_width = $el.find('.gallery-child').first().width(),
      maxed = false;
      
  //init();
  it();
  function it(){
    $el.on('scroll', function(){
      //console.log($el.scrollLeft())
    });
    
    setImages();
    
    
    if($el.attr('id')=='product-images')
    $el.on('click', function(e){
      var goingRight;
      
      if(e.clientX > $(window).width()/2 && index < total){
        if(!maxed)index++;
        goingRight = true;
      } else if(index > 0) {
        index--;
        maxed = false;
        goingRight = false;
      }
      
      
      
      console.log(index)
      //if( $el.scrollLeft() >= $('.gallery-child').eq(total-1).position().left - gallery_width ) index = total;
      
      //console.log($el.scrollLeft())
      //console.log($el[0].scrollWidth - $window.width())
      
      var left = $el.find('.gallery-child').eq(index).position().left;
      
      /*
      if(left > $el[0].scrollWidth - $window.width() ) {
        left = $el[0].scrollWidth - $window.width();
        maxed = true;
        console.log('max true')
      }
      */
      
      if (goingRight && $el.scrollLeft() > $el.find('.gallery-child').eq(total-1).position().left - $window.width() ) {
        left = $el[0].scrollWidth - $window.width();
        maxed = true;
      }
      
      $el.stop().animate({ scrollLeft: left }, 150, 'linear');
    })
    
    $el.find('.gallery-child').on('click', function(){
      
      //$('#product-image').css('transform', 'translateX(' + -left +  'px)');
      
    });
    
    $window.on('resize', setImages);
  }
  
  function setImages(){
    gallery_width = $el.find('.gallery-child').first().width();
    $el.find('.gallery-child').each(function(){
      $(this).css('left', $(this).index() * gallery_width)
    });
  }
  
  return true;
  
  function init(){
    
    console.log('init flickity')
    
    var options = {
        cellAlign: 'left',
        freeScroll: true,
        prevNextButtons: false,
        pageDots: false,
        imagesLoaded: true,
        contain: true,
        wrapAround: isInfinite,
        selectedAttraction: 0.3,
        friction: .8
      };
    var isFlickity = true;
    $flickity = $el.flickity(options);
    
    window.wheeldelta = {};
    window.wheeldelta.x = 0;
    window.wheeldelta.y = 0;
    
    
   // cancel wrap-around if content smaller than container
    var flickelem = Flickity.data($flickity[0]);
    
    if(!$('body').hasClass('cart')) {
      var lastCell = flickelem.getLastCell();
      var contentWidth = flickelem.slideableWidth - lastCell.size[ flickelem.options.rightToLeft ? 'marginLeft' : 'marginRight' ];
      if ( contentWidth <= flickelem.size.innerWidth ) {
        flickelem.options.wrapAround = false;
      } else {
        flickelem.options.wrapAround = true;
      }
    }
    
    
    
    if(!settings.isMobile){
      if($el.hasClass('gallery')){
        $el.on('click', function(e){
          $flickity.flickity( 'next' );
        })
      }
      
      
      $el.mousewheel(function(e) {
        //e.preventDefault();
        var flickelem = Flickity.data($flickity[0]);

        var restingX = flickelem.getRestingPosition();
        flickelem.isFreeScrolling = -restingX > flickelem.cells[0].target &&
        -restingX < flickelem.getLastCell().target;
        
        var max = -flickelem.getLastCell().target + $window.width()/2;
        console.log(restingX);
        console.log(max);
        if (e.deltaX) {
          flickelem.x -= e.deltaX * e.deltaFactor;
        }
        /*
        else if (e.deltaY) {
            flickelem.x += e.deltaY * e.deltaFactor;
        }*/
        scrollEnd(flickelem);

      });
    }
    
    // Defined in seperate JS file
    function scrollEnd(flickelem) {
        // FLICKITY DragEnd

        if ( flickelem.options.freeScroll ) {
            flickelem.isFreeScrolling = true;
        }
        // set selectedIndex based on where flick will end up
        var index = flickelem.dragEndRestingSelect();

        if ( flickelem.options.freeScroll && !flickelem.options.wrapAround ) {
          console.log('scrollEnd')
        // if free-scroll & not wrap around
        // do not free-scroll if going outside of bounding cells
        // so bounding cells can attract slider, and keep it in bounds
        var restingX = flickelem.getRestingPosition();
        flickelem.isFreeScrolling = -restingX > flickelem.cells[0].target &&
        -restingX < flickelem.getLastCell().target;
        } else if ( !flickelem.options.freeScroll && index == flickelem.selectedIndex ) {
        // boost selection if selected index has not changed
        index += flickelem.dragEndBoostSelect();
        }
        // apply selection
        // TODO refactor this, selecting here feels weird
        flickelem.select( index );
    }
  
    function is_touch_device()
    {
      // Checks for existence in all browsers and IE 10/11 & Surface
      return 'ontouchstart' in window || navigator.maxTouchPoints;
    }
    
    
    return true;
    var $slideshow = $el.flickity({
        freeScroll: true,
        contain: true,
        // disable previous & next buttons and dots
        prevNextButtons: false,
        pageDots: false,
        wrapAround: true,
        cellAlign: 'left'
    });
    
    /*
    var $slideshow = $el.slick({
      speed: 250,
      slidesToShow: 3,
      arrows: false,
      variableWidth: true,
      cssEase: 'linear',
      infinite: isInfinite,
      responsive: [{
        breakpoint: 767,
        settings: {
          slidesToShow: 1
        }
      }]
    });
    */
    
    if($el.hasClass('product-slick')) {
      $('.slick-slide').click(function(e) {
        $slideshow.slick('slickNext');
        /*
        if(e.clientX > $(window).width()/2) {
          $slideshow.slick('slickNext');
        } else {
          $slideshow.slick('slickPrev');
        }
        */
      
      });
    }
    
  }
  


		
	
	
}; 
  