/**
*	@desc module control for Cart Item
*/

var settings = require('modules/settings');

module.exports = function( el ) {
	
	var $el = $(el),
      $window = $(window),
      $edit = $el.find('.edit-item'),
      $cancel = $el.find('.cancel-edit-item'),
      $submit = $el.find('.submit-edit-item');
      
  init();
  
  function init(){
    
    $edit.on('click', editItem);
    $cancel.on('click', cancelEditItem);
    $submit.on('click', submitEditItem);
  }
  
  function editItem(e){
    e.preventDefault();
    $('.cart-item').removeClass('editing');
    $el.addClass('editing');
  }
  
  function cancelEditItem(e){
    e.preventDefault();
    $el.removeClass('editing');
  }
	
  function submitEditItem(e){
    e.preventDefault();
    
    $cartItem = $(this).closest('.cart-item');
    
    current_qty = Number( $(this).closest('.cart-item').find('.c-qty .item-set-variant').text() );
    current_variant = $(this).closest('.cart-item').data('variant-id');
    
    var qty = Number( $el.find('.c-qty-select li.active span').text() );
    var variant = $el.find('.product-single__variants :selected').val();
    console.log('current_qty: ' + current_qty + ' current_variant: ' + current_variant)
    console.log('add: ' + qty + ' to variant: ' + variant);
    
    if (current_variant == variant && current_qty != qty) {
      console.log('same just change item')
      Shopify.changeItem($el.data('variant-id'), qty, function(data){
        $cartItem.find('.c-qty .item-set-variant').text(qty);
        window.location.href = '/cart'
      });
    } else if (current_variant != variant) {
      Shopify.removeItem(current_variant, function(){
        console.log('done');
        Shopify.addItem(variant, qty, function(){
          window.location.href = '/cart'
        })
      });
    } else if (current_qty == qty) {
      $('.cart-item').removeClass('editing');
    }
    
    Shopify.getCart(function(data){
      console.log(data)
    })
    /*
    jQuery.post('/cart/add.js', {
      quantity: qty,
      id: variant,
    }, function(data){
      console.log(data)
    }).done(function( data ) {
      alert( "Data Loaded: " + data );
    });
    */
  }	
	
	
}; 