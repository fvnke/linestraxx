/**
*	@desc module control for Product Slideshow
*/

var settings = require('modules/settings');

module.exports = function( el ) {
	
	var $el = $(el),
      $window = $(window);
      
  init();
  
  function init(){
    console.log('product init')
    //$el.slick();
    $('#AddToCart').click(function(e) {
        e.preventDefault();
        
        var selected = $('#productSelect :selected').val();
        CartJS.addItem(selected, 1, {}, {

            // Define a success callback to display a success message.
            "success": function(data, textStatus, jqXHR) {
                $('#AddToCart').addClass('message-success');
                $('#AddToCartText').html('Added');
                $('#GoToBag').show();
            },

            // Define an error callback to display an error message.
            "error": function(jqXHR, textStatus, errorThrown) {
              console.log(textStatus);
              console.log(errorThrown)
              $('.error').text('All available items in bag').show();
                //$('#message').addClass('message-error');
                //$('#message').html('There was a problem adding to the cart!');
            }

        });
    });
    
    $(document).on('cart.requestComplete', function(event, cart) {
        $('.cart-count-num').html(cart.item_count);
    });
  }

		
	
	
}; 
  