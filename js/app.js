$(function(){

  const scroller = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
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
    var y         = (scrollTop > lastScrollTop) ? 'down' : ((scrollTop === lastScrollTop) ? 'none' : 'up');

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

    if( y == 'up' ){
      $('header').addClass('hide');

    } else{
      $('header').removeClass('hide');

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
      var centerY = Math.max(0,(($window.height() - elem.outerHeight()/2) ) + $window.scrollTop());
      var elementTop = elem.offset().top;
      return elementTop <= centerY;
    } 
  }

  $('.nav-btn').on("click", function(){
    $(this).toggleClass("active");
    //$('#site-nav').fadeToggle('fast');
    /* 
    if( lastScrollTop < -90 ){
      $(this).toggleClass('active-header');
    } else{
      $(this).removeClass('active-header');
    }
    */
  });

});









