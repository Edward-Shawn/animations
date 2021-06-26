(function($) {
    var selector = ".section";
  
    var $slides = $(selector);
  
    var currentSlide = 0;
    var isAnimating = false;
  
    var stopAnimation = function() {
      setTimeout(function() {
        isAnimating = false;
      }, 300);
    };
  
    var bottomIsReached = function($elem) {
      var rect = $elem[0].getBoundingClientRect();
      return rect.bottom <= $(window).height();
    };
  
    var topIsReached = function($elem) {
      var rect = $elem[0].getBoundingClientRect();
      return rect.top >= 0;
    };
  

var lastScrollTop = 0;
var startX,startY, endX,endY;
$("#sticker").on('touchstart',function(event){
    startX = event.originalEvent.changedTouches[0].screenX;
    startY = event.originalEvent.changedTouches[0].screenY;
    event.preventDefault();
});
window.blockMenuHeaderScroll = false;
$("#sticker").on('touchend',function(event){
  
    var $currentSlide = $($slides[currentSlide]);
    if (isAnimating) {
      event.preventDefault();
      return;
    }
     endX=event.originalEvent.changedTouches[0].screenX;
     endY=event.originalEvent.changedTouches[0].screenY;
    if(startY-endY>50){
      if (currentSlide + 1 >= $slides.length) return;
      if (!bottomIsReached($currentSlide)) return;
      event.preventDefault();
      currentSlide++;
      var $slide = $($slides[currentSlide]);
      var offsetTop = $slide.offset().top;
      isAnimating = true;
      $("html, body").animate(
        {
          scrollTop: offsetTop
        },
        800,
        stopAnimation
      );
        console.log("스크롤터치다운")

     }else if(endY-startY>50){

      if (currentSlide - 1 < 0) return;
      if (!topIsReached($currentSlide)) return;
      event.preventDefault();
      currentSlide--;
      var $slide = $($slides[currentSlide]);
      var offsetTop = $slide.offset().top;
      isAnimating = true;
      $("html, body").animate(
        {
          scrollTop: offsetTop
        },
        800,
        stopAnimation
      );
    }

});

    document.addEventListener(
      "wheel",
      function(event) {
        var $currentSlide = $($slides[currentSlide]);
  
        if (isAnimating) {
          event.preventDefault();
          return;
        }
  
        var direction = -event.deltaY;
  
        if (direction < 0) {
          // next
          if (currentSlide + 1 >= $slides.length) return;
          if (!bottomIsReached($currentSlide)) return;
          event.preventDefault();
          currentSlide++;
          var $slide = $($slides[currentSlide]);
          var offsetTop = $slide.offset().top;
          isAnimating = true;
          $("html, body").animate(
            {
              scrollTop: offsetTop
            },
            800,
            stopAnimation
          );
        } else {
          // back
          if (currentSlide - 1 < 0) return;
          if (!topIsReached($currentSlide)) return;
          event.preventDefault();
          currentSlide--;
          var $slide = $($slides[currentSlide]);
          var offsetTop = $slide.offset().top;
          isAnimating = true;
          $("html, body").animate(
            {
              scrollTop: offsetTop
            },
            800,
            stopAnimation
          );
        }
      },
      { passive: false }
    );
  })(jQuery);