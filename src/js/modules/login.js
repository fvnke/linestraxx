/**
*	@desc module control for Product Slideshow
*/

var settings = require('modules/settings');

module.exports = function( el ) {
	
	var $el = $(el),
      $window = $(window);
      $loginBtn = $el.find('.login-box .login-btn'),
      $error = $el.find('.error');

  $loginBtn.on('click', function(e){
    return true;
    e.preventDefault();
    var email = $('#CustomerEmail').val();
    var password = $('#CustomerPassword').val();
    
    console.log('ajax login');
    login(email, password).done(function (html) {  
      if (html.indexOf('Invalid login credentials') !== -1) {
        console.log('invalid login credentials');
        $error.show();
        // invalid password - show a message to the user
      } else {
        console.log('all good')
        var checkoutUrl = getCheckoutUrl();  
        console.log('checkoutURL');
        console.log(checkoutUrl);
        if (checkoutUrl) {  
          window.location.href = checkoutUrl;
        } else {
          /*
          *
          * Refresh the page and it will show the accounts nav
          *
          */
          window.location.href = '/account'
        }
      }
    });
    
  });
  
  function getCheckoutUrl() {  
    function getParameterByName(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
          results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    return getParameterByName('checkout_url');
  }
  
  function login(email, password) {  
    var data = {
      'customer[email]': email,
      'customer[password]': password,
      form_type: 'customer_login',
      utf8: '✓'
    };

    var promise = $.ajax({
      url: '/account/login',
      method: 'post',
      data: data,
      dataType: 'html',
      async: true
    });

    return promise;
  }
	
	
	
}; 
  