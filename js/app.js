$(function(){

  var $window       = $(window);

  if( $window.width() > 600 ){

    const scroller = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    getDirection: true,
    /*
    smartphone: {
      smooth: 1,
      smoothMobile: true,
      touchMultiplier: 4
    },
    tablet: {
      smooth: 1,
      smoothMobile: true
    }
    */
  });

  scroller.on('scroll', (instance) => {
      document.documentElement.setAttribute('data-direction', instance.direction)
  });

  }
  

	
	var raf           = requestAnimationFrame;
  var scroll_cue    = $(".scroll-cue");
  var lastScrollTop;

  if( $window.width() < 600 ){
    lastScrollTop = $window.scrollTop();
  } else {
    lastScrollTop = $('main').offset().top;
  }

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

    var scrollTop;

    if( $window.width() < 600 ){
      scrollTop = $window.scrollTop();
    } else{
      scrollTop = $('main').offset().top;
    }
    var y = (scrollTop > lastScrollTop) ? 'down' : ((scrollTop === lastScrollTop) ? 'none' : 'up');
    
    if (lastScrollTop === scrollTop) {
      raf(loop);
      return;
    } else {
      lastScrollTop = scrollTop;
      raf(loop);
    }

    if( $window.width() > 600 ){

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

    } else{

      if( scrollTop > 90 ){
        $('header').addClass('active');
        $('.nav-btn').addClass('active-header');
      } else{
        $('header').removeClass('active');
        $('.nav-btn').removeClass('active-header');
      }

      if(typeof(scroll_cue) != 'undefined' && scroll_cue != null){
        if( scrollTop > 30 ){
          scroll_cue.addClass("active");
        } else{
          scroll_cue.removeClass("active");
        }
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
      if( $window.width() > 600 ){
        var centerY = Math.max(0,(($window.height() - elem.outerHeight()/2) ));
      } else{
        var centerY = Math.max(0,(($window.height() - elem.outerHeight()/2) ) + $window.scrollTop());
      }
      var elementTop = elem.offset().top;
      return elementTop <= centerY;
    } 
  }

  $('.nav-btn').on("click", function(){
    $(this).toggleClass("active");
    $('#site-nav').fadeToggle('fast').toggleClass("active");
     
    if( lastScrollTop < -90 || lastScrollTop > 90 ){
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









