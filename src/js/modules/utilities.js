/**
*	@desc module control for Product Slideshow
*/

var settings = require('modules/settings');

module.exports = function( el ) {
	
	var $el = $(el),
  $window = $(window),
  $body = $('body'),
  currentPage = $('.desktop-app-nav li.active').data('page'),
  handle;
      
  init();
  hamburger();
  
  console.log('utilities')

	function init(){ 
		var $utility_trigger = $('.utility-trigger-j');
    $('body').attr('data-page', currentPage);
    
    if($body.hasClass('template-index')){
      $('.desktop-app-nav li').on('click', function(){
        //$('body, html').animate({ scrollTop: $('.main-content').position().top }, 200, 'linear');
      })
      $body.on('scroll', function(){
        console.log('scroll')
      })
    }
    
    $('.utility-trigger-j[data-utility="app-search"]').find('a').on('mouseover', function(e){
      e.preventDefault();
      setBodyAttr('search');
      $('input[type="search"]').focus();
      $('.tier-1 li').removeClass('active');
      $('.tier-2').removeClass('visible');
      
    });
	  
    $('.trigger-account-nav').on('mouseover', function(e){
      e.preventDefault();
      e.stopPropagation();
      var module;
      if($('.account-module-trigger.over').length > 0) {
        module = $('.account-module-trigger.over').data('module');
      } else {
        module = 'login';
      }
      
      $(this).addClass('active');
 
      //$('body').addClass('account-nav-show');
      //$('body').removeClass('search-show'); 
      //$('#app-search').removeClass('show');
      setBodyAttr('account');
      $('.account-module[data-module="'+module+'"]').show();
      
      $('header').on('mouseleave', function(){
        //$('body').removeClass('account-nav-show');
        //$('.account-module').hide();
      });
    }).on('mouseout', function(){
   
    });
    
    
    
    
    $('.account-module-trigger').on('mouseover', function(e){
      e.preventDefault();
      e.stopPropagation();
      var module = $(this).data('module');
      //$('body').addClass('account-nav-show');
      //$('body').removeClass('search-show');
      //$('#app-search').removeClass('show');
      
      
      setBodyAttr('account');
      
      $('.account-module-trigger').removeClass('over');
      $(this).addClass('over');
      $('.account-module').hide();
      
      $('.account-module[data-module="'+module+'"]').show();
      //$('#recently-viewed-products').flickity('resize');
      
      if($(this).hasClass('wishlist-link')){
        //$('.wk-row').flickity('resize');
      }
      
      
    }).on('click', function(e){
      e.preventDefault();
    });
    
    
    $('.desktop-app-nav li.has-dropdown').on('mouseover', function(e){
      e.preventDefault();
      //$('body').removeClass('search-show account-nav-show');
      //$('#app-search').removeClass('show');
      setBodyAttr('shop');
      if($('body').attr('id') != 'create-account' && 
         $('body').attr('id') != 'address' &&
         $('body').attr('id') != 'account' ){
          $('.account-module').hide();
          $('.trigger-account-nav').removeClass('active');
      }
      handle = $(this).data('main');
      console.log(handle);
      
      $('.tier-1 li').removeClass('active');
      $('.tier-2').removeClass('visible');
      
      $('.app-nav').addClass('over');
      $('.tier-1 li[data-main="'+ handle + '"]').addClass('active');
      $('.tier-2[data-sub="'+ handle + '"]').addClass('visible');
      
      
      //$('.app-nav').on('mouseleave', mouseLeave);
      
      
      
    });
    
    if($('body').attr('id') != 'create-account'
      && $('body').attr('id') != 'purchase-history' 
      && $('body').attr('id') != 'wishlist'
      && $('body').attr('id') != 'purchase-history' 
      && $('body').attr('id') != 'recently-viewed'
      && $('body').attr('id') != 'account'
      && $('body').attr('id') != 'addresses'    
    ){
      $('header').off('mouseleave').on('mouseleave', mouseLeave);
    }
    
    
    
    function mouseLeave(e){
      console.log(e)
      //if($(e.currentTarget).attr('id') == 'app-header') return true;
      var currentID = $(e.currentTarget).attr('id');
      var target = $(e.relatedTarget);    
      /*
      if (target.parent('.bc-sf-search-suggestion-wrapper').length) {
        $('body').attr('data-nav', 'search');
        return true;
      } 
      */
      
      if ($('.bc-sf-search-suggestion-wrapper').length > 0){
        console.log('search exists')
      }

      if(!$('body').hasClass('results-available')) {
        $('li[data-page="'+ currentPage +'"]').addClass('active');
        $('body').attr('data-nav', '');
        //$('.account-module').hide();
        $('.app-nav').removeClass('over');
        $('.tier-2[data-sub="'+ handle + '"]').removeClass('visible');
        $('.tier-1 li').removeClass('active');
        $('body').attr('data-nav', '');
        $('.tier-1 li[data-page="'+ currentPage + '"]').addClass('active');
        
        if($('body').attr('id') != 'create-account' && 
           $('body').attr('id') != 'address' &&
           $('body').attr('id') != 'account' ){
            $('.account-module').hide();
            $('.trigger-account-nav').removeClass('active');
        }
      }
    }
    
    function setBodyAttr(attr) {
      $body.attr('data-nav', attr);
      $('.app-nav').removeClass('over');
      if($('body').attr('id') != 'create-account' && 
         $('body').attr('id') != 'address' &&
         $('body').attr('id') != 'account' ){
          $('.account-module').hide();
          $('.trigger-account-nav').removeClass('active');
      }
    }
    
    /*
		$utility_trigger.click(function(){
      console.log('clicked')
			$me = $(this);
		
			//$me.siblings().removeClass('active');
			$('.utility-item').removeClass('show'); 
		 
			if($me.hasClass('active')){ 
				$me.removeClass('active');
				$me_item = $me.data('utility');
				$('#'+$me_item).removeClass('show');
			
			
			} else {
				$me.addClass('active');
				$me_item = $me.data('utility');
				$('#'+$me_item).addClass('show');
			
				if($('#'+$me_item).find('input[type="search"]').length > 0) {
					setTimeout(function(){
						$('#'+$me_item).find('input[type="search"]').focus();
						$('#'+$me_item).find('input[type="search"]').get(0).focus();
					}, 300);
				}
			}
		});
    */
	}

	function hamburger(){
	  $('#nav-hamburger').on('click', function(){
	    $('#app-header').toggleClass('active');
      $('body').attr('data-nav', '');
      $('.account-module').hide();
      $('#main-dummy').css('height', $('header').outerHeight());
	  });
	}
	
	
}; 
  