var settings = require( "modules/settings" );

module.exports = function( el ) {
 	   
  var $el = $(el);
  
  init();
  
  function init(){
    console.log('collaboration');
    /*
    $('.product-collab-image').on('mouseover', function(){
      $('.product-collab-block').removeClass('visible');
      $(this).closest('.product-collab-block').addClass('visible');
    }).on('mouseout', function(){
      $(this).closest('.product-collab-block').removeClass('visible');
    }).on('click', function(){
      $('.product-collab-block').removeClass('active');
      $(this).closest('.product-collab-block').addClass('active');
    });
    */
    
    $('.shop-collaboration.right-link').attr('href', $('.shop-collaboration-link').attr('href'));
    
    $('.product-collab-image').on('click', function(){
      $('.product-collab-block').removeClass('active').css('min-height', '');
      
      var img_height = $('.product-collab-image').height();
      $(this).closest('.product-collab-block').addClass('active').css('min-height', img_height);
    });
    
    $('.product-collab-image a').on('mouseover', function(){
      var index = $(this).data('id');
      var $parent = $(this).closest('.product-collab-upper');
      
      $parent.find('.product-collab-block-references').addClass('over');
      $parent.find('.product-collab-block-references li[data-id="'+ index +'"]').addClass('over');
      
    }).on('mouseout', function(){
      $('.product-collab-block-references').removeClass('over'); 
      $('.product-collab-block-references li.over').removeClass('over');
    })
    
    $('.product-collab-block-references li').on('mouseover', function(){
      var index = $(this).data('id');
      var $parent = $(this).closest('.product-collab-upper');
      
      $parent.find('.product-collab-image a[data-id="'+ index +'"]').addClass('over');
      
    }).on('mouseout', function(){
      $('.product-collab-image a.over').removeClass('over');
    })
    
    $('.view-as-images').on('click', function(){
      var $p = $(this).closest('.product-collab-block');
      $p.addClass('show-images');
      $p.find('ol').addClass('gallery');
      $p.find('ol li').addClass('gallery-inner');
      $p.find('.view-as-text').removeClass('active');
      $(this).addClass('active');
    });
    $('.view-as-text').on('click', function(){
      $(this).closest('.product-collab-block').removeClass('show-images');
      var $p = $(this).closest('.product-collab-block');
      $p.removeClass('show-images');
      $p.find('ol').removeClass('gallery');
      $p.find('ol li').removeClass('gallery-inner');
      $p.find('.view-as-images').removeClass('active');
      $(this).addClass('active');
    });
    $('.back-to-look').on('click', function(){
      $(this).closest('.product-collab-block').removeClass('active');
    });
  }

};
  