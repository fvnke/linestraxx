/**
*	@desc module control for Product Slideshow
*/

var settings = require('modules/settings');

module.exports = function( el ) {
	
	var $el = $(el),
      $window = $(window),
      $parent = $el.closest('.cart-item'),
      $qty_select = $parent.find('.c-qty-select');
      
  init();
  
  function handleize(str){
    return str.toLowerCase().replace(/[^\w\u00C0-\u024f]+/g, "-").replace(/^-+|-+$/g, "");
  }

  function init(){
    //console.log('select length ' + $parent.find('.selector-wrapper').length)
		$parent.find('.selector-wrapper').each(function(){
			var $select = $(this);
			
			if ($(this).find('label').text() == 'Color' || $(this).find('label').text() == 'Size') {
				
				var $label = $select.find('label');
					
				$select.append('<ul class="dummy-select variant-update option-'+$label.text()+'"></ul>');
				$dummy = $select.find('.dummy-select');
				
				var $options = $select.find('option');
					$selection = $('<div class="selection label">'+$label.text()+'</div>');
		
				$options.each(function(i, el){
					$option = $(this);
					qty = $option.data('qty');
          inventory = $el.find('option').eq(i).attr('data-inventory');
          disabled = $option.attr('disabled') == 'disabled' ? true : false;
					name = $option.data('variant-title');
					$dummy.append('<li data-inventory="'+ inventory +'" data-val="'+$option.val()+'" data-disabled="'+disabled+'" class="color-swatch '+ handleize($option.val()) +'">'+$option.val()+'</li>');
				});
				
				var selected_option = $select.find(':selected').val();
				setTimeout(function(){
					//$('.dummy-select li[data-val="'+selected_option+'"]').click();
				}, 100)
        console.log(selected_option)
				$dummy.find('li[data-val="'+selected_option+'"]').addClass('active');
		
				$select.append($selection)
					.append($dummy)
					.append('<span class="choice" style="display: none;"></span>');
				$label.hide();
				$select.find('select').hide();
				
			}
		});
    
    //disable sold out variants
    if ($('.selector-wrapper').length == 1) {
      
    }
	  
    function updateQuantities(num){
      $qty_select.html('');
      for(var i=0; i<num; i++) {
        if(i==0){
          $qty_select.append('<li class="active"><span>'+(i+1)+'</span></li>')
        } else {
          $qty_select.append('<li><span>'+(i+1)+'</span></li>')
        }
        
      }
      $parent.find('.dummy-select li').off('click', dummyClick).on('click', dummyClick);
    }
    
    $parent.find('.dummy-select li').on('click', dummyClick);
    
    function dummyClick(){
			// Dev note: without a var definition before these three variables, they will be defined on the window instead of scoped to the function.
			// Fix by adding a var keyword before defining them.

			$me = $(this);
			index = $me.index();
			data = $me.data('val');
			
			// update active classes
			if (!$me.hasClass('active')){
				$me.addClass('active').siblings('li').removeClass('active');  
			}
      
      if($(this).parent().hasClass('variant-update')){
        var new_qty = $(this).data('inventory');
        updateQuantities(new_qty);
      }
      

			$me.parent().next('.choice').text(data);
			
			$parent.find('.dummy-select').each(function(){
				data = $(this).find('li.active').data('val');
				$select = $(this).parent().find('select');
				$select.val(data).trigger('change');
	
			});
    }
  }

		
	
	
}; 
  