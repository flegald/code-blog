
var newArt = [];
var catForm = [];
var bigArray = [];

$(function(){
  $.ajax({
     type: "HEAD",
     async: true,
     url: "blogArticles.json",
     complete: function(XMLHttpRequest, textStatus){
       var eTag = XMLHttpRequest.getResponseHeader('ETag');
       console.log(eTag);
       localStorage.setItem('ergodicEtag', eTag)
     }
   });
       $.getJSON('blogArticles.json', function(data){
         localStorage.setItem('blogData', JSON.stringify(data));
         var rawBlogData = localStorage.getItem('blogData');
         var blogData = JSON.parse(rawBlogData);
         for (i = 0; i < blogData.length; i ++){
           bigArray[i] = new Articles(blogData[i]);
          }
          $.get('template.handlebars', function(data){
            for (i = 0; i < bigArray.length; i++) {
              var compTemp = Handlebars.compile(data);
              var handPush = compTemp(bigArray[i]);
              $('.articleBox').append(handPush);
            }
          })
        });

$('#Enter').click(function(){
  window.location = "newentry.html";
});
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

 // var pushArray = function(){
 //    for (i = 0; i < blog.rawData.length; i ++){
 //      newArt[i] = new Articles(blog.rawData[i]);
 //    };
 //    newArt.sort(function(a, b){
 //      a = new Date (a.publishedOn);
 //      b = new Date (b.publishedOn);
 //      return b - a;
 //    });
 //    var stringArray = JSON.stringify(newArt)
 //    localStorage.setItem('articles', stringArray)
 //  }

// IMPORT WITH HANDLEBAR***********
  // var createAll = function(){
  //     $.get('template.handlebars', function(data){
  //       for (i = 0; i < bigArray.length; i++) {
  //         var compTemp = Handlebars.compile(data);
  //         var handPush = compTemp(bigArray[i]);
  //         $('.articleBox').append(compTemp(handPush));
  //         }
  //         $('.cateFill').hide();
  //         $('.bod').find('p:not(:first-child)').hide();
  //         $('.readMore').click(function(){
  //           var scrollTo = $(this).parent().position().top;
  //           $(this).parent().find('.bod p:not(:first)').slideToggle();
  //           $("html, body").animate({scrollTop: scrollTo}, 300);
  //         })
  //       })
  //     };
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
    for (i = 0; i < bigArray.length; i ++){
      authForm.push(bigArray[i].author);
      tempA[i] = bigArray[i].category;
    }
    authForm.sort();
    for (i = 0; i < authForm.length; i++){
      popAform(authForm[i]);
    }
    catForm = $.unique(tempA);
    catForm.sort();
    for (i = 0; i < catForm.length; i++) {;
    popCform(catForm[i]);
    };
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



});
