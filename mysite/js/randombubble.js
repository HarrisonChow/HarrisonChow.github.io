var anything = window.setInterval(function(){
  var allSkills = ['.JavaScript', '.Rails','.HTML', '.Ruby', '.CSS','.Backbone', '.jQuery', '.Github', '.Heroku', '.PostgreSQL', '.Bootstrap', '.Repec', '.AJAX' ];
  var activeOne = allSkills[Math.floor(Math.random() * allSkills.length)];
  var event = document.createEvent("SVGEvents");
  event.initEvent("click",true,true);
  $(activeOne)[0].dispatchEvent(event)
}, 4000);
