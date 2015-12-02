$(function(){
  $('.readMore').click(function(){
    $(this).parent().find('p:not(:first)').toggle();
  })
});
