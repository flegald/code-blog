$(function(){

  function Articles(obj) {
    this.title = obj.title;
    this.category = obj.category;
    this.author = obj.author;
    this.authorUrl = obj.authorUrl;
    this.publishedOn = obj.publishedOn;
    this.body = obj.body;
  };

  Articles.prototype.toHtml = function(){
    var grab = $('article.articleBox');
    var grab2 = $('section.main');
    var newBox = grab2.clone().appendTo(grab);
    newBox.removeClass('main');
    newBox.find('.title').html(this.title);
    newBox.find('.author').html('<a href="https://en.wikipedia.org/wiki/Walt_Whitman">' + this.author + '</a>');
    newBox.find('.pubDate').html('About ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
    newBox.find('.body').html(this.body);
  };

  var newArt = [];

  var createAll = function(){
    for (i = 0; i < blog.rawData.length; i ++){
      newArt[i] = new Articles(blog.rawData[i]);
    }
    newArt.sort(function(a, b){
      a = new Date (a.publishedOn);
      b = new Date (b.publishedOn);
      return b - a;
    });
    for (i = 0; i < newArt.length; i++){
      newArt[i].toHtml();
    }
  };
  createAll();
});
