(function ($) {
  $.fn.changecolor = function () {
    this.css({
      color: "rgb(188,10,188)"
    });
    return this;
  };


  $.fn.rainbow = function () {
    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    $( "#rgbTohex" ).submit(function( event ) {
      var r = parseInt($("#getR").val());
      var g = parseInt($("#getG").val());
      var b = parseInt($("#getB").val());
      event.preventDefault();
      if (r<= 255 && r>=0 && g<= 255 && g>=0 && b<= 255 && b>=0) {

        $("#rgb").text("RGB("+ r +" "+ g +" "+ b +")");
        $("#hex").text(rgbToHex(r, g, b));
        $("body").css({
          background: ""+ rgbToHex(r, g, b)+"",
          transition: "0.2s ease-in-out"
        });

      }
      console.log(rgbToHex(r, g, b));
    });

    $("body").mousemove(function (event) {
      var msg = "Handler for .mousemove() called at ";
      msg += event.pageX + ", " + event.pageY;
      var windowHeight = $(window).height();
      var windowWidth = $(window).width();
      var cellX = windowWidth/3;
      var cellY = windowHeight/3;
      var rgb = {r: 0, g: 0, b: 0};


      function calculateRBG(x, y, keys, direction) {
        function relativeColor(mouseLocation, fullLengh) {
          return Math.round((mouseLocation/fullLengh)*255);
        }

        function diagonal(x, y) {
          return Math.sqrt(Math.pow(x,2) + Math.pow(y,2))
        }

        rgb[keys[0]] = relativeColor(x, cellX);
        rgb[keys[1]] = relativeColor(y, cellY);
        if(direction === 1) {
          rgb[keys[2]] = relativeColor(diagonal(x, y), diagonal(cellX, cellY));
        } else {
          rgb[keys[2]] = 255 - relativeColor(diagonal(x, y), diagonal(cellX, cellY));
        }

      }

      if(event.pageX < cellX && event.pageY < cellY) {
        calculateRBG(event.pageX, event.pageY, ['b', 'g', 'r'], 1);
      } else if(event.pageX < cellX *2 && event.pageX >= cellX && event.pageY < cellY) {
        calculateRBG(event.pageX - cellX, event.pageY, ['r', 'g', 'b'], 1);
      } else if(event.pageX >= cellX *2 && event.pageY < cellY) {
        calculateRBG(event.pageX - cellX *2, event.pageY, ['g', 'b', 'r'], 1);
      } else if(event.pageX < cellX && event.pageY >= cellY && event.pageY < cellY *2) {
        calculateRBG(event.pageX, event.pageY - cellY, ['r', 'b', 'g'], 1);
      } else if(event.pageX >= cellX * 2 && event.pageY >= cellY && event.pageY < cellY * 2) {
        calculateRBG(event.pageX - cellX * 2, event.pageY - cellY, ['b', 'r', 'g'], -1);
      } else if(event.pageX < cellX && event.pageY >= cellY * 2) {
        calculateRBG(event.pageX, event.pageY - cellY * 2, ['g', 'b', 'r'], -1);
      } else if(event.pageX >= cellX && event.pageX < cellX *2 && event.pageY >= cellY * 2) {
        calculateRBG(event.pageX - cellX, event.pageY - cellY * 2, ['r', 'g', 'b'], -1);
      } else if(event.pageX >= cellX * 2 && event.pageY >= cellY * 2) {
        calculateRBG(event.pageX - cellX * 2, event.pageY - cellY * 2, ['b', 'g', 'r'], -1);
      } else {
        calculateRBG(event.pageX - cellX , event.pageY - cellY, ['g', 'r', 'b'], -1);
      }

      $("body").css({
        background: "rgb(" + rgb['r'] + "," + rgb['g'] + "," + rgb['b'] +")",
        transition: "0.2s ease-in-out"
      });
      $("#rgb").css({
        color: "rgb(" + rgb['b'] + "," + rgb['r'] + "," + rgb['g'] +")",
        'font-size': "2em"
      });
      $("#hex").css({
        'font-size': "2em",
        color: "rgb(" + rgb['g'] + "," + rgb['r'] + "," + rgb['b'] +")"
      });
      $("#rgb").text("RGB("+rgb['r'] +" "+rgb['g']+" "+rgb['b'] +")");
      $("#hex").text(rgbToHex(rgb['r'], rgb['g'], rgb['b']));
      console.log(msg);
    });

  };

}(jQuery));

// setInterval( function () {
//   $("h5").changecolor().text("Moooove..");
// },600);




$("body").rainbow();
