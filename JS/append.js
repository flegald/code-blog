
var newArt = [];
var catForm = [];
var bigArray = [];
var eTag;

$(function(){
  $.ajax({
     type: "HEAD",
     async: true,
     url: "blogArticles.json",
     success: function(data, textStatus, xhr){
       eTag = xhr.getResponseHeader('ETag');
       get_json();
     }
   });

   var get_json = function(){
       $.getJSON('blogArticles.json', function(data){
         localStorage.setItem('blogData', JSON.stringify(data));
         var rawBlogData = localStorage.getItem('blogData');
         var blogData = JSON.parse(rawBlogData);
         for (i = 0; i < blogData.length; i ++){
           bigArray[i] = new Articles(blogData[i]);
          }
          for (i = 0; i < bigArray.length; i++){
            if(bigArray[i].markdown){
              bigArray[i].body = marked(bigArray[i].markdown);
            }
          }
          $.get('template.handlebars', function(data){
            for (i = 0; i < bigArray.length; i++) {
              var compTemp = Handlebars.compile(data);
              var handPush = compTemp(bigArray[i]);
              $('.articleBox').append(handPush);
              localStorage.setItem('Etag', eTag);
              $('.cateFill').hide();
              $('.articleBox').find('.bod p:not(:first)').hide();
            }
            $(function(){
              $('.readMore').click(function(){
                var scrollTo = $(this).parent().position().top;
                $(this).parent().find('.bod p:not(:first)').slideToggle();
                $("html, body").animate({scrollTop: scrollTo}, 300);
                  });
                });
              });
          })
        }
          var authForm = [];
          var popAform = function(a){
            $('#auth').append('<option value=' + a + '>' + a + '</option>');
          };

          var popCform = function(c){
            $('#cate').append('<option value=' + c +'>' + c + '</option>');
          };

          var popForm = function(){
            var tempA = [];
            var tempC = [];
            for (i = 0; i < bigArray.length; i ++){
              tempA[i] =bigArray[i].author;
              tempC[i] = bigArray[i].category;
            }
            authForm = $.unique(tempA)
            authForm.sort();
            for (i = 0; i < authForm.length; i++){
              popAform(authForm[i]);
            }
            catForm = $.unique(tempC);
            catForm.sort();
            for (i = 0; i < catForm.length; i++) {;
            popCform(catForm[i]);
            };
          };
          popForm();
        });

$('#Enter').click(function(e){
  e.preventDefault();
  window.location = "admin_stats.html";
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
   this.markdown = obj.markdown;
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
