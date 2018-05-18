/**
*	@desc module control for Product Slideshow
*/

var settings = require('modules/settings');

module.exports = function( el ) {
	
  var $el = $(el),
      $videoEl = $el.find('.billboard-bg-video'),
      mpfour = $el.data('mp4'),
      webm = $el.data('webm'),
      ogv = $el.data('ogv'),
      poster = $el.data('poster'),
      isTimestamp = $el.data('timestamp'),
      vid,
      $ts;
	
  init();
  
  function init(){
		$videoEl.vide({
			mp4: mpfour,
		  webm: webm,
		  ogv: ogv,
		  poster: poster
		}, {
			muted: true,
			loop: true,
			position: '50% 50%',
			autoplay: true,
			posterType: 'detect'
		});
    
    vid = $videoEl.data('vide');
    vid = vid.getVideoObject();
    
    if(isTimestamp) {
      $(vid).on( "timeupdate", function(event){
        var s = parseInt(this.currentTime % 60);
        var m = parseInt((this.currentTime / 60) % 60);
        var dur_s = parseInt(this.duration % 60);
        var dur_m = parseInt((this.duration / 60) % 60);
      
        //var txt = m + ':' + s;
        //var dur = dur_m + ':' + dur_s;
        
        var txt = format(this.currentTime);
        var dur = format(this.duration)
        
        updateTimestamp(txt, dur);
      
        onTrackedVideoFrame(this.currentTime, this.duration);
      });
    
      createTimestamp();
    }
    
  }
  
  function format(s) {
    m = Math.floor(s / 60);
    m = (m >= 10) ? m : "0" + m;
    s = Math.floor(s % 60);
    s = (s >= 10) ? s : "0" + s;
    return m + ":" + s;
  }
  
  function createTimestamp(){
    var ts = '<div class="timestamp"></div>';
    
    $videoEl.append(ts);
    $ts = $el.find('.timestamp');
  }
  
  function updateTimestamp(txt, dur){
    //console.log(txt + '/' + dur)
    $ts.text(txt + '/' + dur);
  }
  
  function onTrackedVideoFrame(currentTime, duration){
    //console.log(currentTime + '/' + duration);
  }
	
	
}; 
  