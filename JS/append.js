
var newArt = [];
var catForm = [];


$(function(){

// OBJECT CONSTRUCTOR*************
function Articles(obj) {
   this.title = obj.title;
   this.category = obj.category;
   this.author = obj.author;
   this.authorUrl = obj.authorUrl;
   this.publishedOn = obj.publishedOn;
   this.body = obj.body;
   this.getDay = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);

 };

 var pushArray = function(){
    for (i = 0; i < blog.rawData.length; i ++){
      newArt[i] = new Articles(blog.rawData[i]);
    };
    newArt.sort(function(a, b){
      a = new Date (a.publishedOn);
      b = new Date (b.publishedOn);
      return b - a;
    });
  }

// IMPORT WITH HANDLEBAR***********
  var createAll = function(){
    for (i = 0; i < newArt.length; i++){
      var temp = $("#template").html();
      var compTemp = Handlebars.compile(temp);
      var handPush = compTemp(newArt[i]);
      $('.hidden').append(handPush);
      $('.cateFill').hide();
      $('.bod').find('p:not(:first-child)').hide();
    };
};



// POPULATING FORM******************

  var authForm = [];


  var popAform = function(a){
    $('#auth').append('<option value=' + a + '>' + a + '</option>');
  };

  var popCform = function(c){
    $('#cate').append('<option value=' + c +'>' + c + '</option>');
  };

  var popForm = function(){

    var tempA = [];
    for (i = 0; i < newArt.length; i ++){
      authForm.push(newArt[i].author);
      tempA[i] = newArt[i].category;
    }
    authForm.sort();
    for (i = 0; i < authForm.length; i++){
      popAform(authForm[i]);
    }
    catForm = $.unique(tempA);
    catForm.sort();
    for (i = 0; i < catForm.length; i++) {;
    popCform(catForm[i]);
  }
  };

// FILTERING BY CATEGORY****************
  $('#cate').change(function(){
    var getCat = $(this).val();
    if (getCat == 'All' || getCat == "FILTER BY CATEGORY"){
      $('.artFull').show();
    } else {
      $('.artFull').hide();
    var testCat = $('.cateFill');
    $(".cateFill:contains('" + getCat + "')").parent().show();
    };
  });

  // FILTERING BY AUTHOR****************
  $('#auth').change(function(){
    var getAuth = $(this).val();
    if (getAuth == 'All' || getAuth == "FILTER BY AUTHOR"){
      $('.artFull').show();
    } else {
        $('.artFull').hide();
      var testCat = $('.AuthFill');
      $(".authFill:contains('" + getAuth + "')").parent().show();
    };
  });





// CALLING ALL FUNCTIONS*******************
pushArray();
createAll();
popForm();
});
