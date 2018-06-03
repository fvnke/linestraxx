/**
*	@desc module control for Product Slideshow
*/

var settings = require('modules/settings');

module.exports = function( el ) {
	
	var $el = $(el),
      $window = $(window),
      $form = $el.closest('form');
      
  init();
  
  function handleize(str){
    return str.toLowerCase().replace(/[^\w\u00C0-\u024f]+/g, "-").replace(/^-+|-+$/g, "");
  }

  function init(){
    //console.log('select length ' + $('#AddToCartForm .selector-wrapper').length)
		$('#AddToCartForm .selector-wrapper').each(function(){
			var $select = $(this);
			
			if ($(this).find('label').text() == 'Color' || $(this).find('label').text() == 'Size') {
				
				var $label = $select.find('label');
					
				$select.append('<ul class="dummy-select option-'+$label.text()+'"></ul>');
				$dummy = $select.find('.dummy-select');
				
				var $options = $select.find('option');
					$selection = $('<div class="selection label">'+$label.text()+'</div>');
		
				$options.each(function(i, el){
					$el = $(this);
					qty = $el.data('qty');
          disabled = $el.attr('disabled') == 'disabled' ? true : false;
					name = $el.data('variant-title');
					$dummy.append('<li data-val="'+$el.val()+'" data-disabled="'+disabled+'" class="color-swatch '+ handleize($el.val()) +'">'+$el.val()+'</li>');
				});
				
				var selected_option = $select.find('select').find(":selected").text();
				setTimeout(function(){
					$('.dummy-select li[data-val="'+selected_option+'"]').click();
				}, 100)
				
		
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
	
		$('body').on('click', '#AddToCartForm .dummy-select li', function(){
			
			// Dev note: without a var definition before these three variables, they will be defined on the window instead of scoped to the function.
			// Fix by adding a var keyword before defining them.

			$me = $(this);
			index = $me.index();
			data = $me.data('val');
			$('.error').hide();
			// update active classes
			if (!$me.hasClass('active')){
				$me.addClass('active').siblings('li').removeClass('active');  
			}

			$me.parent().next('.choice').text(data);
			
			$('.dummy-select').each(function(){
				data = $(this).find('li.active').data('val');
				$select = $(this).parent().find('select');
				$select.val(data).trigger('change');
	
			});
      
			var select_index = 0;
			$('.product-thumb img').each(function(){
				var $img = $(this);
				if($img.attr('alt') != data) {
					// $img.parent().hide();
				} else {
					$img.parent().show();
					if(select_index == 0) {
						new_pic = $img.parent().attr('href');
						new_zoom = new_pic.replace("1024x1024", "2048x2048");
	
						$('.zoomContainer').remove();
						$main_photo = $('#product-image').find('img');
						$main_photo.attr('src', new_pic).data('zoom-image', new_zoom);				
					}
					select_index++;
				}
			});

			

		});
  }

		
	
	
}; 
  