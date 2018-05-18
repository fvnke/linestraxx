/**
*	@desc module to illustrate where you are on the product scroll
*/

module.exports = function( el ) {
	
	var $el = $(el);
	
  var $form = $('#mc-embedded-subscribe-form-footer'),
      $form2 = $('#mc-embedded-subscribe-form'),
      msg;

  $form.on('submit', function(event) {
    if(event) event.preventDefault();
    register($form);
  });

  $form2.on('submit', function(event){
    if(event) event.preventDefault();
    register($form2);
  });

  function register($form) {
  	$.ajax({
      type: $form.attr('method'),
      url: $form.attr('action'),
      data: $form.serialize(),
      cache: false,
      dataType: 'json',
      contentType: "application/json; charset=utf-8",
      error: function(err) { alert("Could not connect to the registration server. Please try again later."); },
      success: function(data) {
  			msg = (data.result != "success") ? 'fail' : 'success';
  			$form.next('.subscribe-status').html(msg).fadeIn();
      }
    });
  }
	
	
	 
	
		
}; 
  