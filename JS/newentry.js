var article = {};

$(function() {

  var $title = $('#title');
  var $cat = $('#category');
  var $auth = $('#author');
  var $authUrl = $('#authUrl');
  var $date = $('#date');
  var $body = $('#body');


  if (localStorage.getItem("savedTitle") !== null){
    $('#title').val(localStorage.getItem('savedTitle'));
  }

  if (localStorage.getItem("savedCat") !== null){
    $('#category').val(localStorage.getItem('savedCat'));
  }

  if (localStorage.getItem("savedAuth") !== null){
    $('#author').val(localStorage.getItem('savedAuth'));
  }

  if (localStorage.getItem("savedAuthUrl") !== null){
    $('#authUrl').val(localStorage.getItem('savedAuthUrl'));
  }

  if (localStorage.getItem("savedBody") !== null){
    $('#body').val(localStorage.getItem('savedBody'));
  }

  function render() {

    var titleVal = $title.val();
    var catVal = $cat.val();
    var authVal = $auth.val();
    var authUrlVal = $authUrl.val();
    var dateVal = $date.val();
    var bodyVal = $body.val();


    var mBodyVal = marked(bodyVal);


    article.title = titleVal;
    article.category = catVal;
    article.author = authVal;
    article.authorUrl = authUrlVal;
    article.body = mBodyVal;
    article.getDay = "0";


    var jsonStr = JSON.stringify(article);
    var prevJsonDiv = $('#prevJson');
    prevJsonDiv.text(jsonStr);




    $.get('template.handlebars', function(data){
      var compTemp = Handlebars.compile(data);
      var handPush = compTemp(article);
      $('#prevAll').html(handPush);
      $('.cateFill').hide();
    })
    localStorage.setItem("savedTitle", titleVal);
    localStorage.setItem("savedCat", catVal);
    localStorage.setItem("savedAuth", authVal);
    localStorage.setItem("savedAuthUrl", authUrlVal);
    localStorage.setItem("savedBody", bodyVal);
  };

  $title.on('input', render);
  $cat.on('input', render);
  $auth.on('input', render);
  $authUrl.on('input', render);
  $date.on('input', render);
  $body.on('input', render);


  $('#submit').click(function(){
    localStorage.clear();
  });


});
