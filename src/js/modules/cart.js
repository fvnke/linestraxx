var settings = require("modules/settings");

var cart = module.exports = {
 	   
	$window: $(window),
	
	init: function (){
    console.log('cart init')
		
    $(window).on('resize', cart.winResize);
    $('.cart-empty-message a, .ajax__cart .mobile-cart-close, .cart-item a').on('click', cart.hide);
    $('.ajax__cart').on('classChange change', cart.ajaxCartChange);
    cart.positionCart();
    setTimeout(function(){
      $('.ajax__cart').removeClass('disabled');
      if($('body').hasClass('template-cart')) {
        cart.show();
      }
    }, 500);
	},
  
  ajaxCartChange: function(){
    alert('class change');
  },
  
  positionCart: function(){
    var cart_height = $('.ajax__cart').height();
    $('.ajax__cart').css({
      "-webkit-transform":"translate(0px, -"+ cart_height+"px)",
      "-ms-transform":"translate(0px, -"+ cart_height +"px)",
      "transform":"translate(0px, -"+ cart_height +"px)"
    });​
  },
  
  toggle: function(){
    if($('.ajax__cart').hasClass('shown')){
      cart.hide();
    } else {
      cart.show();
    }
  },
  
  hide: function(){
    $('.ajax__cart').removeClass('shown');
    $('body').removeClass('cart-shown');
    var cart_height = $('.ajax__cart').height();
    var yPos = 0;
    
    $('.ajax__cart').css({
      "-webkit-transform":"translate(0px, -"+ cart_height+"px)",
      "-ms-transform":"translate(0px, -"+ cart_height +"px)",
      "transform":"translate(0px, -"+ cart_height +"px)"
    });​
    
    $('body').css({
      "-webkit-transform":"translate(0px, "+ yPos +"px)",
      "-ms-transform":"translate(0px, "+ yPos +"px)",
      "transform":"translate(0px, "+ yPos +"px)"
    });​
    
    $(window).off('click', cart.winClick);
   
  },
  
  show: function(){
    $('.ajax__cart').addClass('shown');
    $('body').addClass('cart-shown');
    var yPos = 0;
    var cart_height = $('.ajax__cart').height();
    
    $('.ajax__cart').css({
      "-webkit-transform":"translate(0px, -"+ cart_height+"px)",
      "-ms-transform":"translate(0px, -"+ cart_height +"px)",
      "transform":"translate(0px, -"+ cart_height +"px)"
    });​
    
    $('body').css({
      "-webkit-transform":"translate(0px, "+ cart_height+"px)",
      "-ms-transform":"translate(0px, "+ cart_height +"px)",
      "transform":"translate(0px, "+ cart_height +"px)"
    });​
    
    
    $(window).on('click', cart.winClick);
    
    if(settings.page.current == 'index') {
      $(settings.scrollContainer).on('scroll', cart.containerScroll);
    } else if(settings.page.current == 'product') {
      $('.main-content').on('scroll', cart.containerScroll);
    }
    
    
  },
  
  containerScroll: function(e){
    $(e.target).off('scroll', cart.containerScroll);
    cart.hide();
  },
  
  winClick: function(e){
    if(e.clientY > $('.ajax__cart').height()) {
      cart.hide();
    }
  },
  
  winResize: function(){
    cart.hide();
  }
	
	
		
};
  