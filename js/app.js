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

      //console.log(mainScrollTop)
      //console.log(windowScrollTop)

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
  $('.page-reviews_slider').slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: $(".slider-nav .prev-btn"),
    nextArrow: $(".slider-nav .next-btn"),
    dots: true,
    customPaging : function(slider, i) {
        return '<span></span>';
    },
  });
  $('.page-slides_slider').slick({
    infinite: false,
    slidesToShow: 2,
    slidesToScroll: 2,
    prevArrow: $(".slider-nav .prev-btn"),
    nextArrow: $(".slider-nav .next-btn"),
    dots: true,
    customPaging : function(slider, i) {
        return '<span></span>';
    },
  });


  $('.watch-video-btn').on("click", function(e){

    e.preventDefault();

    $('#video-overlay').fadeIn('fast');
    $('.player')[0].play();

  });
  
  $('#video-overlay').on("click", function(e){
    
    if ( $(e.target).hasClass('video-player') ) {
      $('#video-overlay').fadeOut('fast');
      $('.player')[0].pause();
    }

  }); 



  $('.list-item_question').on("click", function(){

    var $questions = $(".list-item_answer");
    var $question  = $(this).parent().find(".list-item_answer");

    $questions.each(function(){
      if( $(this).is(':visible') ){
        $(this).slideUp('fast');
        $(this).parent().find('.list-toggle-btn').removeClass("open");
      }
    });

    if( $question.is(':visible') ){
      $question.slideUp('fast');
      $(this).find('.list-toggle-btn').removeClass("open");
    } else{
      $question.slideDown('fast');
      $(this).find('.list-toggle-btn').addClass("open");
    }

  });



  // ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  // Card Slider
  // ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  let cardsWrap = document.querySelectorAll(".page-slider-wrap");
  let cards;

  cardsWrap.forEach(function(p){
    let card      = p.querySelectorAll(".page-slider_slide");
    let cardsNext = p.querySelector(".page-slider_next");
    let cardsPrev = p.querySelector(".page-slider_prev");

    cardsNext.addEventListener("click", scrollCardsLeft);
    cardsPrev.addEventListener("click", scrollCardsRight);
  });

  function scrollCardsLeft(){
    cards = this.parentNode.querySelector(".page-slider");
    cards.scrollBy({
      left: 960, 
      behavior: 'smooth'
    });
  }
  function scrollCardsRight(){
    cards = this.parentNode.querySelector(".page-slider");
    cards.scrollBy({
      left: -960, 
      behavior: 'smooth'
    });
  }

});










