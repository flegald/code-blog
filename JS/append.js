
var newArt = [];
var catForm = [];
var bigArray = [];
var authForm = [];
var eTag;

page.base('/');


$(function(){

  page('/', index);
  page('about', about);
  page('stats', stats);
  page('newentry', editPage);
  page();


function index(){
  $('#adminStats').hide();
  $('#aboutMe').hide();
  $('#newEntry').hide();
  
  webDB.init();
  webDB.setupTables();


  var etagLookup = localStorage.getItem('eTizzle');


  $.ajax({
     type: "HEAD",
     async: true,
     url: "blogArticles.json",
     success: function(data, textStatus, xhr){
       eTag = xhr.getResponseHeader('ETag')
       if (etagLookup == eTag){
         console.log('hit');
         get_json();
         createArray();

      } else {
        console.log('miss');
        localStorage.setItem('eTizzle', eTag);
        get_json();
        createArray();

      }
     }
   });

   var get_json = function(){
       $.getJSON('blogArticles.json', function(data){
         webDB.insertAllRecords(data)
       })
     }

  function createArray(){
     html5sql.process("SELECT * FROM Articles", function(transaction, results, rowsArray){
       rowsArray.forEach(function(rows) {
         bigArray.push(new Articles(rows));
       });
       $.get('template.handlebars', function(data){
         for (i = 0; i < bigArray.length; i++) {
           var compTemp = Handlebars.compile(data);
           var handPush = compTemp(bigArray[i]);
           $('.articleBox').append(handPush);
           localStorage.setItem('Etag', eTag);
           $('.cateFill').hide();
           $('.articleBox').find('.bod p:not(:first)').hide();
       }
       $('.readMore').click(function(){
         var scrollTo = $(this).parent().position().top;
         $(this).parent().find('.bod p:not(:first)').slideToggle();
         $("html, body").animate({scrollTop: scrollTo}, 300);
           });
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
     })
    })
  };

};

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

     var popAform = function(a){
       $('#auth').append('<option value=' + a + '>' + a + '</option>');
     };

     var popCform = function(c){
       $('#cate').append('<option value=' + c +'>' + c + '</option>');
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
    }
  });

  // BUTTONS**************
  $('#homeButt').click(function(e){
    e.preventDefault();
    page('/');
  });

  $('#aboutButt').click(function(e){
    e.preventDefault();
    page('about');
  });

  $('#stats').click(function(e){
    e.preventDefault();
    page('stats');
  })

  $('#git').click(function(){
    window.location = "https://github.com/flegald"
  });

  $('#edit').click(function(e){
    e.preventDefault();
    page('newentry');
  });


function about(){
  $('#mainPage').hide();
  $('#aboutMe').show();
  $('#adminStats').hide();
  $('#newEntry').hide();
};

function stats(){
  $('#adminStats').show();
  $('#mainPage').hide();
  $('#newEntry').hide();
  $('#aboutMe').hide();
}

function editPage(){
  $('#adminStats').hide();
  $('#mainPage').hide();
  $('#newEntry').show();
  $('#aboutMe').hide();
}





});
