/**
*	@desc module control for Product Slideshow
*/

var settings = require('modules/settings');

module.exports = function( el ) {
	
	var $el = $(el),
      $window = $(window);
      $registerBtn = $el.find('.register-btn');

  console.log('register module')
 
  $registerBtn.on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    var email = $('#Email').val();
    var password = $('#CreatePassword').val();
    var firstName = $('#FirstName').val();
    var lastName = $('#LastName').val();
    
    console.log('email:' + email);
    console.log('password:' + password);
    console.log('firstName:' + firstName);
    console.log('lastName:' + lastName);
    register(email, password, firstName, lastName).done(function (html) {
  
      // logic for registration errors
      if (html.indexOf('email is invalid') !== -1) {
        console.log('email is invalid');
      } else if (html.indexOf('email can&#39;t be blank') !== -1) { 
        console.log('email cant be blank' );
      } else if (html.indexOf('password can&#39;t be blank.') !== -1) {
        console.log('password cant be blank');
      } 

    });
    
  });
  
  function register(email, password, firstName, lastName) {  
    var data = {
      'customer[email]': email,
      'customer[password]': password,
      'customer[first_name]': firstName,
      'customer[last_name]': lastName,
      form_type: 'create_customer',
      utf8: '✓'
    };

    var promise = $.ajax({
      url: '/account',
      method: 'post',
      data: data,
      dataType: 'html',
      async: true
    });

    return promise;
  }
	
	
	
}; 
  