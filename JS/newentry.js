$(function() {

var $title = $('#title');
var $cat = $('#category');
var $auth = $('#author');
var $authUrl = $('#authUrl');
var $date = $('#date');
var $body = $('#body');

var article = {};

function render() {

  var titleVal = $title.val();
  var catVal = $cat.val();
  var authVal = $auth.val();
  var authUrlVal = $authUrl.val();
  var dateVal = $date.val();
  var bodyVal = $body.val();

  $('#prevTitle').text(titleVal);
  $('#prevCat').text(catVal);
  $('#prevAuth').text(authVal);
  $('#prevAuthUrl').text(authUrlVal);
  $('#prevDate').text(dateVal);
  $('#prevBody').text(bodyVal);

  var mTitleVal = marked(titleVal);
  var mCatVal = marked(catVal);
  var mAuthVal = marked(authVal);
  var mAuthUrlVal = marked(authUrlVal);
  var mDateVal = marked(dateVal);
  var mBodyVal = marked(bodyVal);

  article.title = titleVal;
  article.category = catVal;
  article.author = authVal;
  article.authorUrl = authUrlVal;
  article.publishedOn = dateVal;
  article.body = mBodyVal;

  var jsonStr = JSON.stringify(article);
  $('#prevJson').text(jsonStr);
};

$title.on('input', render);
$cat.on('input', render);
$auth.on('input', render);
$authUrl.on('input', render);
$date.on('input', render);
$body.on('input', render);

render();

});
