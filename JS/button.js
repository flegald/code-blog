$(function(){
  $('.readMore').click(function(){
    var scrollTo = $(this).parent().position().top;
    $(this).parent().find('.bod p:not(:first)').slideToggle();
    $("html, body").animate({scrollTop: scrollTo}, 300);
      });
    });
