$(function(){


  $('#cate').change(function(){

var getCat = $('#cate :selected').val();
$('.main').hide();
$(".cateFill:contains('" + getCat + "')").parent().show();
});

});
