var settings = require( "modules/settings" );

module.exports = function( el ) {
 	   
  var $el = $(el);
  
  init();
  
  function init(){
    console.log('collaboration');
    $('.product-collab-image').on('mouseover', function(){
      $('.product-collab-block').removeClass('visible');
      $(this).closest('.product-collab-block').addClass('visible');
    }).on('mouseout', function(){
      $(this).closest('.product-collab-block').removeClass('visible');
    }).on('click', function(){
      $('.product-collab-block').removeClass('active');
      $(this).closest('.product-collab-block').addClass('active');
    });
    
    $('.product-collab-image a').on('mouseover', function(){
      var index = $(this).data('id');
      var $parent = $(this).closest('.product-collab-upper');
      
      $parent.find('.product-collab-block-references li[data-id="'+ index +'"]').addClass('over');
    }).on('mouseout', function(){
      $('.product-collab-block-references li.over').removeClass('over');
    })
    
    $('.view-as-images').on('click', function(){
      $(this).closest('.product-collab-block').addClass('show-images');
    });
    $('.view-as-text').on('click', function(){
      $(this).closest('.product-collab-block').removeClass('show-images');
    });
    $('.back').on('click', function(){
      $(this).closest('.product-collab-block').removeClass('active');
    });
  }

};
  