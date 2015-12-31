$(function(){
var arrayLength = [];
var realWordsArray = [];
json_array = [];


function initArray(){
  json_array = bigArray;
  return json_array
};


  function numOfArticles(data){
    return data.length  };

  var numOfAuths = function (data){
     var authArray = [];
     uniqueAuthArray = [];
     authArray = data.map(function(article){
       return article.author
    })
    uniqueAuthArray =  $.unique(authArray);
    return uniqueAuthArray;
  };

  function arrayOfWords(data){
    firstWordsArray = [];
    wordsArray = [];
    realWordsArray = [];
    letterArray = [];
    data.forEach(function(article){
      firstWordsArray.push(article.body) ;
    })
    firstWordsArray.forEach(function(body){
      wordsArray.push(body.split(' '));
    })
    wordsArray.forEach(function(words){
      words.forEach(function(inWords){
        realWordsArray.push(inWords);
      })
    })
    return realWordsArray;
  };

  function wordNum(data){
    var counter = 0;
    data.forEach(function(word){
      counter += word.length;
    })
    return counter;
    }

  function avgWordFunc(data, data2){
    var avgWord = data/data2;
    return avgWord.toFixed(2);
    }

  function avgAuth(){
    var mainArray = initArray();
    var authorList = numOfAuths(initArray());
    var searchResults = [];
    var authorWords;
    var authorLetters;
    var authorAvg;

    authorList.forEach(function(author) {
        searchResults = mainArray.filter(searchFilter(author, 'author'));
        authorWords = arrayOfWords(searchResults);
        authorLetters = wordNum(authorWords)
        var authorAvg = avgWordFunc(authorLetters, authorWords.length);
        $('#avgAuth').append("<li>" + author + ": " + authorAvg + "</li>");
    });
}

function searchFilter(value, property){
  var searchFor = value;
  return function(item) {
    return item[property] == value;
  };
}



setTimeout(function(){

$('#numOfArticles').text(numOfArticles(initArray()));
console.log('number of articles ' + numOfArticles(initArray()));

$('#numOfAuths').text(numOfAuths(initArray()).length);
console.log('number of authors ' + numOfAuths(initArray()).length);

$('#numOfWords').text(arrayOfWords(initArray()).length);
console.log(arrayOfWords(initArray()).length);

$('#avgWordL').text(avgWordFunc(wordNum(arrayOfWords(initArray())), arrayOfWords(initArray()).length))
console.log(avgWordFunc(wordNum(arrayOfWords(initArray())), arrayOfWords(initArray()).length))
avgAuth()
}, 2000);

  });
