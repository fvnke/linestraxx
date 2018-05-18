/**
*	@desc module control for Product Slideshow
*/

var settings = require('modules/settings');

module.exports = function( el ) {
	
	var $el = $(el),
      $parent = $el.parent(),
      $window = $(window),
      $img = $el.find('.item-image'),
      $submit = $el.find('button.btn'),
      $form = $el.find('form');
       
  init();
  
  function handleize(str){
    return str.toLowerCase().replace(/[^\w\u00C0-\u024f]+/g, "-").replace(/^-+|-+$/g, "");
  }

  function init(){
    //console.log('select length ' + $el.find('.selector-wrapper').length);
    
    $submit.on('click', function(e){
      e.preventDefault();

    
      var p_id = $form.data('id');
    
      var variantId = $('#productSelect-'+p_id+' :selected').val();
      console.log('adding ' + variantId)
      if(variantId != undefined) {
        Shopify.addItem(variantId, 1, function(){
          // Do Something here once the product is added
          window.location.href = '/cart'
        });
        Shopify.onError = function(){
          console.log('error')
        }
      }
    })
    
    $img.on('click', function(e){
      //e.preventDefault();
      //e.stopPropagation();
      $('#related-products .grid-item.related').removeClass('active');
      //$el.addClass('open');
      $(this).closest('.product-item').addClass('active');
      
      if($(this).closest('.product-item').hasClass('selected')){
        $(this).closest('.product-item').removeClass('selected');
      }
      
      //console.log('cart related image click');
      
      //$('#related-products').flickity('resize');
    });
    
		$el.find('.selector-wrapper').each(function(){
			var $select = $(this);
			
			if ($(this).find('label').text() == 'Color' || $(this).find('label').text() == 'Size') {
				
				var $label = $select.find('label');
				//console.log($label)
				$select.append('<ul class="dummy-select option-'+$label.text()+'"></ul>');
				$dummy = $select.find('.dummy-select');
				
				var $options = $select.find('option');
					$selection = $('<div class="selection label">Select '+$label.text()+'</div>');
		
				$options.each(function(i, el){
					$el = $(this);
					qty = $el.data('qty');
          disabled = $el.attr('disabled') == 'disabled' ? true : false;
					name = $el.data('variant-title');
					$dummy.append('<li data-val="'+$el.val()+'" data-disabled="'+disabled+'" class="color-swatch '+ handleize($el.val()) +'"><span>'+$el.val()+'</span></li>');
				});
				
				var selected_option = $select.find('select').find(":selected").text();
				setTimeout(function(){
					//$el.find('.dummy-select li[data-val="'+selected_option+'"]').click();
				}, 100)
				
		
				$select.append($selection)
					.append($dummy)
					.append('<span class="choice" style="display: none;"></span>');
				$label.hide();
				$select.find('select').hide();
        
        $dummy.find('li').on('click', function(e){
          e.stopPropagation();
    			// Dev note: without a var definition before these three variables, they will be defined on the window instead of scoped to the function.
    			// Fix by adding a var keyword before defining them.
    			$me = $(this);
    			index = $me.index();
    			data = $me.data('val');
			
    			// update active classes
    			if (!$me.hasClass('active')){
    				$me.addClass('active').siblings('li').removeClass('active');  
    			}
          
          //$el.addClass('selected');
          
    			$(this).closest('.product-item').find('.dummy-select').each(function(){
    				data = $(this).find('li.active').data('val');
    				$select = $me.closest('.selector-wrapper').find('select');
    				$select.val(data).trigger('change');
            $(this).closest('.product-item').addClass('selected');
    	      //$me.closest('.product-item').find('.btn').trigger('click');
    			});
      
    			var select_index = 0;
        });
        
			}
		});
  }

		
	
	
}; 
  