var footer = require("modules/footer");

var footerNav = module.exports = function(el) {
  
  var $el = $(el),
      $window = $(window);
  
  init();
  
  function init(){
    $('.footer-nav__link--main').on('click', footer.toggleFooter);
  }
  
}