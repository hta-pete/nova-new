function daVideoPlayer(player){


  //var play_btn        = player.querySelector('.play-btn-large');
  //var thumbnail       = player.querySelector('.thumbnail');
  var video_container = player.querySelector('.video-container');
  var video           = player.querySelector('.player');
  var video_controls  = player.querySelector('.video-controls');
  var toggle          = player.querySelector('.toggle-btn');
  var progressBar     = player.querySelector('.progress-bar');
  var progress        = player.querySelector('.progress-fill');
  var tooltip         = player.querySelector('.progress-tooltip');
  var duration        = player.querySelector('.duration');
  var volumeBar       = player.querySelector('.volume-track');
  var volumeIndicator = player.querySelector('.volume-indicator');
  var volumeIcon      = player.querySelector('.volume-icon');
  var fs_toggle       = player.querySelector('.fs_toggle');
  var mousemove       = false;
  var timeout         = null;
 
  // Play video 
  function startVideo(){
    video_controls.style.zIndex = '2147483647 !important';
    video.play();
  };
  // Listen for video to end
  function videoEnded(){
    video_controls.style.zIndex = '6 !important';
    video.currentTime = 0;
    toggle.innerHTML = '<i class="icon-play"></i>';
  }
  // Pause/Play video 
  function toggleVideo(){
    if( video.paused ){
      video.play();
      toggle.innerHTML = '<i class="icon-pause"></i>';
    } else{
      video.pause();
      toggle.innerHTML = '<i class="icon-play"></i>';
    }
  };
  // Video progress/duration
  function handleProgress(){
    var percent = (video.currentTime / video.duration) * 100;
    progress.style.width = percent + '%';
  };
  function handleDuration(){
    countdown = video.duration - video.currentTime
    duration.innerHTML =  '-' + formatTime(countdown);
  };
  // Scrub video
  function scrub(e){
    var scrub_time = ( (e.offsetX + 6) / progressBar.offsetWidth ) * video.duration;
    if( mousemove == true ){
      video.currentTime = scrub_time;
      tooltip.innerHTML = formatTime(video.currentTime);
      tooltip.style.left = (e.offsetX - 35) + 'px';
    }
  };
  function scrubPause(){
    mousemove = true;
    video.pause();
    toggle.innerHTML = '<i class="icon-play"></i>';
    tooltip.classList.add('show');
  }
  function scrubPlay(){
    if( mousemove == true ){
      mousemove = false;
      video.play();
      toggle.innerHTML = '<i class="icon-pause"></i>';
      tooltip.classList.remove('show');
    }
  }

  // Contol video volume
  function volumeControl(){

      var volumePos = volumeBar.value/2;

      video.volume = volumeBar.value / 100;

      volumeIndicator.style.height = (volumePos) + 'px';

      if( video.volume >= 0.75 ){

        volumeIcon.innerHTML = '<i class="icon-volume-high"></i>';

      } else if( video.volume >= 0.5 ){

        volumeIcon.innerHTML = '<i class="icon-volume-medium"></i>';

      } else if( video.volume == 0 ){

        volumeIcon.innerHTML = '<i class="icon-volume-mute"></i>';

      } else{

        volumeIcon.innerHTML = '<i class="icon-volume-low"></i>';

      }

  };


  // Toggle video fullscreen
	function toggleFullScreen(event) {

	  var element = video_container;

	  if (event instanceof HTMLElement) {
	    element = event;
	  }

	  var isFullscreen = document.webkitIsFullScreen || document.mozFullScreen || false;

	  element.requestFullScreen = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || function() {
	    return false;
	  };
	  document.cancelFullScreen = document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || function() {
	    return false;
	  };

	  isFullscreen ? document.cancelFullScreen() : element.requestFullScreen();
	  
	}
    
  // Show/Hide video controls
  function controlsSleep(){

      clearTimeout(timeout);
      video_controls.classList.add('show');

      timeout = setTimeout(function() {

        video_controls.classList.remove('show');

      }, 3000);

  };
  function controlsHide(){

      if( mousemove != true ){

          video_controls.classList.remove('show');

      }

  };
  function controlsShow(){

      video_controls.classList.add('show');

  };


  //play_btn.addEventListener('click', startVideo);
  video.addEventListener('ended', videoEnded);
  toggle.addEventListener('click', toggleVideo);
  video.addEventListener('timeupdate', handleProgress);
  video.addEventListener('timeupdate', handleDuration);
  progressBar.addEventListener('click', scrub);
  progressBar.addEventListener('mousemove', scrub);
  progressBar.addEventListener('mousedown', scrubPause);
  document.addEventListener('mouseup', scrubPlay);
  volumeBar.addEventListener("change", volumeControl);
  volumeBar.addEventListener('mousemove', volumeControl);
  fs_toggle.addEventListener('click',toggleFullScreen);
  player.addEventListener('mousemove', controlsSleep);
  player.addEventListener('mouseout', controlsHide);

    
}

function formatTime(secs, format) {

  var hr  = Math.floor(secs / 3600);
  var min = Math.floor((secs - (hr * 3600))/60);
  var sec = Math.floor(secs - (hr * 3600) - (min * 60));

  if (min < 10){ 
    min = "0" + min; 
  }
  if (sec < 10){ 
    sec  = "0" + sec;
  }

  return min + ':' + sec;

}




    