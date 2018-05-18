/**
*	@desc module control for Product Slideshow
*/

var settings = require('modules/settings');

module.exports = function( el ) {
	
	var $el = $(el),
  rand = Math.floor(Math.random() * 5);
      
  init();
  
  function init(){
    
    //rand = 1;
    
    attachMessage();
    console.log('init narrative interruption')
    
  }
  
  function attachMessage(){
    var randomMessage = Math.floor(Math.random() * $('.message').length);
    var $message = $('.narrative-interruption-messages').find('.message').eq(randomMessage);
    $el.append($message.clone())
    console.log($message.text())
  }
	
	
}; 
  