var settings = require("modules/settings");

var footer = module.exports = {

	toggleBtn: $('.footer-nav__link'),
	footerContent: $('.footer-nav__page-content'),

init: function(){
	
  $(window).on('resize', footer.winResize);
  
	footer.toggleBtn.on('click', footer.toggleFooter);
  $('.site__footer .mobile-cart-close').on('click', footer.hideFooter);
  footer.positionFooter();
  
  setTimeout(function(){
    $('.site__footer').removeClass('disabled');
  }, 500);
},

positionFooter: function(){
  var footer_height = $('.site__footer').outerHeight();
  $('.site__footer').css({
    "-webkit-transform":"translate(0px, "+ footer_height +"px)",
    "-ms-transform":"translate(0px, "+ footer_height +"px)",
    "transform":"translate(0px, "+ footer_height +"px)"
  });​
},

toggleFooter: function(e){
	
	e.preventDefault();
  
  $('.site__footer').attr('style', '');
	
	if( !$('body').hasClass('footer-open') ) {
		
		footer.showFooter();
		
	} else {
		
		footer.hideFooter();
		
	}
	
},

showFooter: function(){
  
  $('.site__footer').addClass('shown');
  $('body').addClass('footer-shown');
  var yPos = 0;
  var footer_height = $('.site__footer').height();
  
  if(settings.isMobile) {
    $('.footer-nav__page-content').css('height', $window.height())
  }
  
  $('.site__footer').css({
    "-webkit-transform":"translate(0px, "+ footer_height +"px)",
    "-ms-transform":"translate(0px, "+ footer_height +"px)",
    "transform":"translate(0px, "+ footer_height +"px)"
  });​ 
  
  console.log(footer_height)
  
  $('body').css({
    "-webkit-transform":"translate(0px, -"+ footer_height+"px)",
    "-ms-transform":"translate(0px, -"+ footer_height +"px)",
    "transform":"translate(0px, -"+ footer_height +"px)"
  });​
  
  setTimeout(function(){
    $(window).on('click', footer.winClick);
  }, 150);
  
  
  if(settings.page.current == 'index') {
    $(settings.scrollContainer).on('scroll', footer.containerScroll);
  } else if(settings.page.current == 'product') {
    $('.main-content').on('scroll', footer.containerScroll);
  }
	
},

hideFooter: function(){
  
  $('.site__footer').removeClass('shown');
  $('body').removeClass('footer-shown');
  var footer_height = $('.site__footer').height();
  var yPos = 0;
  
  console.log('.site__footer')
  
  $('.site__footer').css({
    "-webkit-transform":"translate(0px, "+ footer_height+"px)",
    "-ms-transform":"translate(0px, "+ footer_height +"px)",
    "transform":"translate(0px, "+ footer_height +"px)"
  });​
  
  $('body').css({
    "-webkit-transform":"translate(0px, "+ yPos +"px)",
    "-ms-transform":"translate(0px, "+ yPos +"px)",
    "transform":"translate(0px, "+ yPos +"px)"
  });​
  
  $(window).off('click', footer.winClick);
},

containerScroll: function(e){
  $(e.target).off('scroll', footer.containerScroll);
  footer.hideFooter();
},

winClick: function(e){
  if(e.clientY < $(window).height() - $('.site__footer').height()) {
    footer.hideFooter();
  }
},

winScroll: function(){
  var testY = $('.page-template').outerHeight() - $(window).height() + $('.site-footer').outerHeight();
  
  /*
  if( $('.page-template').offset().top > -testY ) {
      footer.footerContent.removeClass('open').slideUp(0);
      $('body').removeClass('footer-open');	
      $(window).off('click', footer.windowClick);
      $(settings.scrollContainer).off('scroll', footer.winScroll);
  }
  */
},


windowClick: function(e){
	
	console.log(e.target);

  if(!$(e.target).parents('.footer-nav__page-content').length && !$(e.target).hasClass('footer-nav__page-content') ) {
    footer.hideFooter();
  }
	
},

winResize: function(){
  footer.hideFooter();
}
	
};
