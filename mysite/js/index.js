$(document).ready(function () {
  var bubbleChart = new d3.svg.BubbleChart({
    supportResponsive: true,
    //container: => use @default
    size: 500,
    //viewBoxSize: => use @default
    innerRadius: 500 / 3.5,
    //outerRadius: => use @default
    radiusMin: 40,
    //radiusMax: use @default
    //intersectDelta: use @default
    //intersectInc: use @default
    //circleColor: use @default
    data: {
      items: [
        {text: "JavaScript", count: "350"},
        {text: "Rails", count: "300"},
        {text: "HTML", count: "500"},
        {text: "Ruby", count: "240"},
        {text: "CSS", count: "400"},
        {text: "Backbone", count: "150"},
        {text: "jQuery", count: "300"},
        {text: "Github", count: "200"},
        {text: "Heroku", count: "130"},
        {text: "PostgreSQL", count: "450"},
        {text: "Bootstrap", count: "400"},
        {text: "Repec", count: "30"},
        {text: "AJAX", count: "200"},
      ],
      eval: function (item) {return item.count;},
      classed: function (item) {return item.text.split(" ").join("");}
    },
    plugins: [
      {
        name: "central-click",
        options: {
          text: "",
          style: {
            "font-size": "12px",
            "font-style": "italic",
            "font-family": "Source Sans Pro, sans-serif",
            //"font-weight": "700",
            "text-anchor": "middle",
            "fill": "white"
          },
          attr: {dy: "65px"},

        }
      },
      {
        name: "lines",
        options: {
          format: [
            {// Line #0
              textField: "text",
              classed: {count: true},
              style: {
                "font-size": "16px",
                "font-family": "Source Sans Pro, sans-serif",
                "text-anchor": "middle",
                "text-shadow": "1px 1px 1px rgba(0, 0, 0, 0.5)",
                "font-weight": "900",

                fill: "white"
              },
              attr: {
                dy: "0px",
                x: function (d) {return d.cx;},
                y: function (d) {return d.cy;}
              }
            },
            {// Line #1
              textField: "",
              classed: {text: true},
              style: {
                "font-size": "14px",
                "font-family": "Source Sans Pro, sans-serif",
                "text-anchor": "middle",
                fill: "black"
              },
              attr: {
                dy: "20px",
                x: function (d) {return d.cx;},
                y: function (d) {return d.cy;}
              }
            }
          ],
          centralFormat: [
            {// Line #0
              style: {"font-size": "50px"},
              attr: {}
            },
            {// Line #1
              style: {"font-size": "30px"},
              attr: {dy: "40px"}
            }
          ]
        }
      }]
  });
});
