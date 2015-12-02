$(function(){


  $('.readMore').on('click',function(){
    $(this).parent().find('p:not(:first)').toggle();
  });

  $('#auth').on('click', function(){
    console.log(this.value);
    if ( $.inArray(this.value, newArt.author) === 0 ){
      newArt.show();
    } else {
      newArt.hide();
    }
  })




});
