$(function(){

  const scroller = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    getDirection: true,
    smartphone: {
      smooth: 1
    },
    tablet: {
      smooth: 1
    }
  });

  scroller.on('scroll', (instance) => {
      document.documentElement.setAttribute('data-direction', instance.direction)
  });

	var $window       = $(window);
	var raf           = requestAnimationFrame;
  var lastScrollTop = $('main').offset().top;
  var scroll_cue    = $(".scroll-cue");

  $window.on('load', function(){
    if( lastScrollTop < -90 ){
      $('header').addClass('active');
      $('.nav-btn').addClass('active-header');
    }
    checkScrollPos();
    window.dispatchEvent(new Event('resize'));
  });

  if (raf) {
    loop();
  }

  function loop() {

    var scrollTop = $('main').offset().top;
    
    if (lastScrollTop === scrollTop) {
      raf(loop);
      return;
    } else {
      lastScrollTop = scrollTop;
      raf(loop);
    }

    if( scrollTop < -90 ){
      $('header').addClass('active');
      $('.nav-btn').addClass('active-header');
    } else{
      $('header').removeClass('active');
      $('.nav-btn').removeClass('active-header');
    }
    if(typeof(scroll_cue) != 'undefined' && scroll_cue != null){
      if( scrollTop < -30 ){
        scroll_cue.addClass("active");
      } else{
        scroll_cue.removeClass("active");
      }
    }
    
    lastScrollTop = scrollTop;
    checkHiddenStuff();
  }

  function checkHiddenStuff(){
    $('.scroll-in, .pattern-in').each(function(){
      if ( inView($(this).parent()) ) {
        $(this).addClass('show');
      } 
    });
  }
  checkHiddenStuff();

  function checkScrollPos(){
    setTimeout(function(){
      checkHiddenStuff();
    },500); 
  };

  function inView(elem){
    if (elem.length){
      var centerY = Math.max(0,(($window.height() - elem.outerHeight()/2) ));
      var elementTop = elem.offset().top;
      return elementTop <= centerY;
    } 
  }

  $('.nav-btn').on("click", function(){
    $(this).toggleClass("active");
    $('#site-nav').fadeToggle('fast').toggleClass("active");
     
    if( lastScrollTop < -90 ){
      $(this).toggleClass('active-header');
    } else{
      $(this).removeClass('active-header');
    }
    
  });



  $('.nova-blog_slider').slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: $(".slider-nav .prev-btn"),
    nextArrow: $(".slider-nav .next-btn")
  });


  $('.watch-video-btn').on("click", function(e){

    e.preventDefault();

    $('#video-overlay').fadeIn('fast');
    $('.player')[0].play();
    $('.toggle-btn').html('<i class="icon-pause"></i>');

  });
  
  $('#video-overlay').on("click", function(e){
    
    if ( $(e.target).hasClass('video-player') ) {
      $('#video-overlay').fadeOut('fast');
      $('.player')[0].pause();
    }
  }); 






});



var player = document.querySelectorAll('.video-player');

for (var i = 0; i < player.length; i++) {

  daVideoPlayer(player[i]);

}









