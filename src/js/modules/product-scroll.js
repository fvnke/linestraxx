/**
*	@desc module to illustrate where you are on the product scroll
*/


var settings = require("modules/settings");


module.exports = function( el ) {
	
	var $el = $(el),
	$window = $(window),
	active = 0,
  pcOffset = $el.offset().top
  st = 0;
	
	init();
	
	function init(){
		positionEl();
		console.log('pcOffset ' + pcOffset)
    $('.photo-position-block').on('click', positionBtnClick);
    
    if(!settings.isMobile) {
      $('.main-content').off('scroll', winProductScroll).on('scroll', winProductScroll);
    } else {
      $('.mobile-product-photos').off('scroll', winMobileProductScroll).on('scroll', winMobileProductScroll);
    }
	}
  
  function positionBtnClick(e){
    var index = $(e.currentTarget).index();
    var padding = $('.product-photo').height() - $('.product-photo img').height();
    var tp = $('.main-content').scrollTop() + $('.product-photo').eq(index).position().top - padding;
    $('.photo-position-block').removeClass('selected');
    $(e.currentTarget).addClass('selected');
    
    if(!settings.isMobile) {
      $('.main-content').stop().animate({ scrollTop: tp }, 1000, 'easeInOutCubic', function(){
        $('.photo-position-block').removeClass('selected');
      })
    } else {
      
      console.log('mobile pip click');
      active = index;
      
      var sl = $(window).width() * active;
      

      
      $('.mobile-product-photos').stop().animate({ scrollLeft: sl }, 1000, 'easeInOutCubic', function(){
        $('.photo-position-block').removeClass('selected');
      })
      
    }
    
    
    
  }
	
	function positionEl(){
		$el.css('top', $window.height()/2 - $el.outerHeight()/2).addClass('show');
	}
	
	function winProductScroll(){
		st = $('.main-content').scrollTop() - pcOffset;
    
		clearTimeout($.data(this, 'timer'));
    
	  $.data(this, 'timer', setTimeout(function() {
      setMarker(st);
      //console.log('winProductScroll')
	  }, 1000));
      
    setMarker(st);
	}
  
  function winMobileProductScroll(){
		st = $('.mobile-product-photos').scrollLeft();
    
		clearTimeout($.data(this, 'timer'));
    
	  $.data(this, 'timer', setTimeout(function() {
      setMobileMarker(st);
	  }, 100));
      
    setMobileMarker(st);
  }
  
  function setMobileMarker(scrollPos) {
		for(var i=0; i<$('.mobile-product-image').length; i++) {
			if(st >= $(window).width() * i - $(window).width()/2) {
				active = i;
			}
		}
    
    if(st <= 0) {
      active = 0;
    } else if(st >= $('.mobile-product-photos')[0].scrollWidth - $window.width()) {
      active = $('.mobile-product-image').length - 1;
      console.log('end of document')
    }
		
		$('.photo-position-block').removeClass('active');
		
		$('.photo-position-block').eq(active).addClass('active');
  }
	
  function setMarker(scrollPos){
    
    $('.product-photo').each(function(){
      
      var $p = $(this);
      if(st >= $(this).offset().top - $('.product-single').position().top - $window.height()/2) {
        
        active = $p.index();
      }
      
    })
    //console.log(active);
		
    console.log('st ' + st)
    console.log($('.main-content')[0].scrollHeight- $window.height() - $('.product-photo').last().outerHeight());
    if(st <= 0) {
      active = 0;
    } else if(st >= $('.main-content')[0].scrollHeight- $window.height() - pcOffset) {
      active = $('.product-photo').length - 1;
      console.log('end of document')
    }
    
		$('.photo-position-block').removeClass('active');
		
		$('.photo-position-block').eq(active).addClass('active');
    
    return;
    
		for(var i=0; i<$('.product-photo').length; i++) {
			if(st >= $('.product-photo').eq(i).position().top + $window.height() + pcOffset) {
				active = i;
			}
		}
    
    if(st <= 0) {
      active = 0;
    }
    
    if(st >= $('.main-content')[0].scrollHeight - $window.height() * 2) {
      active = $('.product-photo').length - 1;
      console.log('end of document')
    }
		
		$('.photo-position-block').removeClass('active');
		
		$('.photo-position-block').eq(active).addClass('active');
  }
  
	function winResize(){
    pcOffset = $('.product-container').offset().top;
		positionEl();
	}
	 
	
		
}; 
  