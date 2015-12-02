var newArt = [];

$(function(){

// OBJECT CONSTRUCTOR****************
  function Articles(obj) {
    this.title = obj.title;
    this.category = obj.category;
    this.author = obj.author;
    this.authorUrl = obj.authorUrl;
    this.publishedOn = obj.publishedOn;
    this.body = obj.body;
  };

  Articles.prototype.toHtml = function(){
    var grab = $('.articleBox');
    var grab2 = $('.hidden');
    var newBox = grab2.clone().appendTo(grab);
    newBox.addClass('main').removeClass('hidden');
    newBox.find('.cateFill').html(this.category);
    newBox.find('.authFill').html(this.author)
    newBox.find('.title').html(this.title);
    newBox.find('.author').html('<a href="' + this.authorUrl + '">' + this.author + '</a>');
    newBox.find('.pubDate').html('About ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
    newBox.find('.body').html(this.body);
    $('.main').find('p:not(:first)').hide();
  };

  var createAll = function(){
    for (i = 0; i < blog.rawData.length; i ++){
      newArt[i] = new Articles(blog.rawData[i]);
    };
    newArt.sort(function(a, b){
      a = new Date (a.publishedOn);
      b = new Date (b.publishedOn);
      return b - a;
    });
    for (i = 0; i < newArt.length; i++){
      newArt[i].toHtml();
    };
  };

// POPULATING FORM******************
  var authForm = [];
  var catForm = [];

  var popAform = function(a){
    $('#auth').append('<option value=' + a + '>' + a + '</option>');
  };

  var popCform = function(c){
    $('#cate').append('<option value=' + c +'>' + c + '</option>');
  };

  var popForm = function(){
    for (i = 0; i < newArt.length; i ++){
      authForm[i] = [newArt[i].author];
      catForm[i] = [newArt[i].category];
    };
    authForm.sort();
    catForm.sort();
    for (i = 0; i < authForm.length; i++){
      popAform(authForm[i]);
      popCform(catForm[i]);
    };
  };

// FILTERING BY CATEGORY****************
  $('#cate').change(function(){
    var getCat = $('#cate :selected').val();
    if (getCat == 'All'){
      $('.main').remove();
      createAll();
    } else {
      $('.main').hide();
      $(".cateFill:contains('" + getCat + "')").parent().show();
    };
  });

  // FILTERING BY AUTHOR****************
  $('#auth').change(function(){
    var getAuth = $('#auth :selected').val();
    if ( getAuth == 'All'){
      $('.main').remove();
      createAll();
    } else {
      $('.main').hide();
      $(".authFill:contains('" + getAuth + "')").parent().show();
    }
  });



// CALLING ALL FUNCTIONS*******************
  createAll();
  popForm();

});
