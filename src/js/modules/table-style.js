/**
*	@desc module control for Product Slideshow
*/

var settings = require('modules/settings');

module.exports = function( el ) {
	
	var $el = $(el),
      $window = $(window);
      
  init();
  
  function init(){
    console.log('table style');
    
    $el.find('td').each(function(){
      var $td = $(this);
      var has_table = $td.find('table').length;
      
      
      
      if(has_table > 0) {
        $td.addClass('parent-td');
        $td.css('height', $td.closest('tr').height());
        $td.find('td').each(function(){
          var $sub_td = $(this);
          var has_subtable = $sub_td.find('table').length;
          if(has_subtable > 0) {
            $sub_td.addClass('subparent-td');
          }
          
        });
      }
    });
    
    //$('td').css('height', $(this).closest('tr').height());
    
  }

		
	
	
}; 