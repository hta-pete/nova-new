$(function(){

  const $window         = $(window);
  const scroll_cue      = $(".scroll-cue");

  const scroller = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    getDirection: true,
    smartphone: {
      smooth: false,
    },
    tablet: {
      smooth: false,
    }
  });

  scroller.on('scroll', (instance) => {

      document.documentElement.setAttribute('data-direction', instance.direction)

      let mainScrollTop   = $('main').offset().top;
      let windowScrollTop = $window.scrollTop();

      if( mainScrollTop < -90 || windowScrollTop > 90 ){
        $('header, .nav-btn').addClass('active');
      } else{
        $('header, .nav-btn').removeClass('active');
      }

      if(typeof(scroll_cue) != 'undefined' && scroll_cue != null){
        if( mainScrollTop < -30 || windowScrollTop > 30 ){
          scroll_cue.addClass("active");
        } else{
          scroll_cue.removeClass("active");
        }
      }

      console.log(mainScrollTop)
      console.log(windowScrollTop)

  });

	
  $window.on('load', function(){

    window.dispatchEvent(new Event('resize'));

  });

 

  $('.nav-btn').on("click", function(){

    let mainScrollTop   = $('main').offset().top;
    let windowScrollTop = $window.scrollTop();

    $(this).toggleClass("open");
    $('#site-nav').fadeToggle('fast').toggleClass("active");
     
    if( mainScrollTop < -90 || windowScrollTop > 90 ){
      $(this).toggleClass('active');
    } else{
      $(this).removeClass('active');
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









