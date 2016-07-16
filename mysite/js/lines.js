/**
 * Javascript Array extension
 * @module
 */
$.extend(Array.prototype, {

  /**
   * Return min value of value array
   *
   * @func Array.min
   * @example:
   *  ```js
   *  [1,2,3].min() === 1
   *  ```
   */
  min: function () {
    return this.reduce(function (x, y) {
      return ( x < y ? x : y );
    });
  },

  /**
   * Return max value of value array
   *
   * @func Array.max
   * @example:
   *  ```js
   *  [1,2,3].max() === 3
   *  ```
   */
  max: function () {
    return this.reduce(function (x, y) {
      return ( x > y ? x : y );
    });
  },

  /**
   * Return min value of objects which have property
   *
   * @param {string} prop - property name
   * @example:
   *  ```js
   *  [{name: "phuong", count: 1}, {name: "huynh", count: 2}].minBy("count") === 1
   *  ```
   */
  minBy: function(prop) {
    var values = [];
    $.each(this, function (i, v) {values.push(v[prop]);});
    return values.min();
  },

  /**
   * Return max value of objects which have property
   *
   * @param {string} prop - property name
   * @example:
   *  ```js
   *  [{name: "phuong", count: 1}, {name: "huynh", count: 2}].maxBy("count") === 2
   *  ```
   */
  maxBy: function(prop) {
    var values = [];
    $.each(this, function (i, v) {values.push(v[prop]);});
    return values.max();
  },

  /**
   * Return array of values of objects which have property
   *
   * @param {string} prop - property name
   * @example:
   *  ```js
   *  [{name: "phuong", count: 1}, {name: "huynh", count: 2}].toArray("count") === [1,2]
   *  ```
   */
  toArray : function (prop) {
    var values = [];
    $.each(this, function (i, v) {values.push(v[prop]);});
    return values;
  },

  /**
   * Random array of values using [shuffle](http://bost.ocks.org/mike/shuffle/)
   *
   * @param {string} prop - property name
   * @example:
   *  ```js
   *  [{name: "phuong", count: 1}, {name: "huynh", count: 2}].shuffle()
   *  ```
   */
  shuffle : function () {
    var m = this.length, t, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = this[m];
      this[m] = this[i];
      this[i] = t;
    }
    return this;
  },

  /*
   * Return an array without any duplicated value
   *
   * @param {string} prop - property name
   * @example:
   *  ```js
   *  [{name: "phuong", count: 1}, {name: "huynh", count: 2}].distinct()
   *  ```
   * */
  distinct : function () {
    var result = [];
    $.each(this, function (i, v) {
      if ($.inArray(v, result) == -1) result.push(v);
    });
    return result;
  },

  /**
   * Return object/value which has value equal to
   *
   * @param {object} val - found value
   * @param {string} prop - property name
   * @example:
   *  ```js
   *  [{name: "phuong", count: 1}, {name: "huynh", count: 2}].findFirst("phuong", "name") === {name: "phuong", count: 1}
   *  ```
   */
  findFirst : function (val, prop) {
    var index = undefined;
    $.each(this, function (i, v) {
      var value = (prop === undefined ? v : v[prop] );
      if (value === val) {
        index = i;
        return false;
      }
    });
    return this[index];
  }
});


/**
 * Text lines
 *
 * @module
 *
 * @param {object} options - setting of text lines
 * @param {object[]} options.format - n-th object is used to format n-th line
 * @param {string} options.format.textField - name of property will be used in function text()
 * @param {string} options.format.classed - classes used to apply to [text](http://www.w3.org/TR/SVG/text.html#TextElement)
 * @param {string} options.format.style - style used to apply to [text](http://www.w3.org/TR/SVG/text.html#TextElement)
 * @param {string} options.format.attr - attribute used to apply to [text](http://www.w3.org/TR/SVG/text.html#TextElement)
 * @param {object[]} options.centralFormat - like #format but used to format central-bubble
 */
d3.svg.BubbleChart.define("lines", function (options) {
  /*
   * @param
   *  options = {
   *    format: [ //n-th object is used to format n-th line
   *      {
   *        textField: #string, name of property will be used in function text(), @link
   *        classed: #object, @link
   *        style: #object, @link
   *        attr: #object, @link
   *      }
   *    ],
   *    centralFormat: [ //@see #format, but used to format central-bubble
   *    ]
   *  }
   * */

  var self = this;

  self.setup = (function () {
    var original = self.setup;
    return function () {
      var fn = original.apply(this, arguments);
      var node = self.getNodes();
      $.each(options.format, function (i, f) {
        node.append("text")
          .classed(f.classed)
          .style(f.style)
          .attr(f.attr)
          .text(function (d) {return d.item[f.textField];});
      });
      return fn;
    };
  })();

  self.reset = (function (node) {
    var original = self.reset;
    return function (node) {
      var fn = original.apply(this, arguments);
      $.each(options.format, function (i, f) {
        var tNode = d3.select(node.selectAll("text")[0][i]);
        tNode.classed(f.classed).text(function (d) {return d.item[f.textField];})
          .transition().duration(self.getOptions().transitDuration)
          .style(f.style)
          .attr(f.attr);
      });
      return fn;
    };
  })();

  self.moveToCentral = (function (node) {
    var original = self.moveToCentral;
    return function (node) {
      var fn = original.apply(this, arguments);
      $.each(options.centralFormat, function (i, f) {
        var tNode = d3.select(node.selectAll("text")[0][i]);
        tNode.transition().duration(self.getOptions().transitDuration)
          .style(f.style)
          .attr(f.attr);
        f.classed !== undefined && tNode.classed(f.classed);
        f.textField !== undefined && tNode.text(function (d) {return d.item[f.textField];});
      });
      return fn;
    };
  })();
});


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


(function () {
  $.misc = {
    uuid: function() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
  }
})();



var anything = window.setInterval(function(){
  var allSkills = ['.JavaScript', '.Rails','.HTML', '.Ruby', '.CSS','.Backbone', '.jQuery', '.Github', '.Heroku', '.PostgreSQL', '.Bootstrap', '.Repec', '.AJAX' ];
  var activeOne = allSkills[Math.floor(Math.random() * allSkills.length)];
  var event = document.createEvent("SVGEvents");
  event.initEvent("click",true,true);
  $(activeOne)[0].dispatchEvent(event)
}, 4000);


/**
 * central-click.js
 */
d3.svg.BubbleChart.define("central-click", function (options) {
  var self = this;

  self.setup = (function (node) {
    var original = self.setup;
    return function (node) {
      var fn = original.apply(this, arguments);
      self.event.on("click", function(node) {
        // if (node.selectAll("text.central-click")[0].length === 1) {
          // alert("Hello there!\nCentral bubble is clicked.");
        // }
      });
      return fn;
    };
  })();

  self.reset = (function (node) {
    var original = self.reset;
    return function (node) {
      var fn = original.apply(this, arguments);
      node.select("text.central-click").remove();
      return fn;
    };
  })();

  self.moveToCentral = (function (node) {
    var original = self.moveToCentral;
    return function (node) {
      var fn = original.apply(this, arguments);
      var transition = self.getTransition().centralNode;
      transition.each("end", function() {
        node.append("text").classed({"central-click": true})
          .attr(options.attr)
          .style(options.style)
          .attr("x", function (d) {return d.cx;})
          .attr("y", function (d) {return d.cy;})
          .text(options.text)
          .style("opacity", 0).transition().duration(self.getOptions().transitDuration / 2).style("opacity", "0.8");
      });
      return fn;
    };
  })();
});

/**
 * Observer Pattern javascript implementation [Observer](http://en.wikipedia.org/wiki/Observer_pattern)
 *
 * @module
 * @example
 *  ```js
 *  var observer = $.microObserver.get("test-cafej");
 *
 *  var dog = {
   *    wou: function(text) {
   *      observer.send("wou", text);
   *    }
   *  }
 *
 *  observer.on("wou", function(text) {
   *    $("#man").text(text);
   *  });
 *  ```
 */
(function () {

  var MicroObserver = function () {};

  MicroObserver.prototype = {

    /**
     * Register event by notify
     *
     * @member on
     * @param {string} notify - name of the notification
     * @param {handler} handler - handler of the notification
     * @param {able} able - able to receive notification
     * @example
     *  ```js
     *  MicroObserver.on("Say text", handler, able)
     *  ```
     */
    on: function (notify, handler, able) {
      var self = this;
      self.notifications = this.notifications || {};
      self.notifications[notify] = self.notifications[notify] || [];
      self.notifications[notify].push({handler: handler, able: able});
    },

    /**
     * Unregister event by notify
     *
     * @member off
     * @param {string} notify - Name of the notification
     * @param {handler} handler - Handler of the notification
     * @example
     *  ```js
     *  MicroObserver.off("Say text", handler)
     *  ```
     */
    off: function (notify, handler) {
      var self = this;
      var n = arguments.length;
      if (n === 0) return delete self.notifications;
      if (n === 1) return delete self.notifications[notify];

      self.notifications = self.notifications || {};
      var notifies = self.notifications[notify] || [];
      $.each(notifies, function (i, nf) {
        if (nf.handler === handler) {
          self.notifications[notify].splice(i, 1);
          return false;
        }
      });
    },

    /**
     * Send will send event by notify
     *
     * @member send
     * @param {string} notify - Name of the notification
     * @param {...any} arguments is passed to registered {MicroObserver~handler}
     * @example
     *  ```js
     *  MicroObserver.send("Say text", "tell me", "something", "to someone")
     *  ```
     */
    send: function (/* arguments... */) {
      var notify = arguments[0];
      var self = this;
      self.notifications = self.notifications || {};
      self.notifications[notify] = self.notifications[notify] || [];
      var notifies = self.notifications[notify];
      var args = Array.prototype.slice.call(arguments, 1);
      $.each(notifies, function (i, nf) {
        var ok = nf.able === undefined || nf.able.apply(null, args);
        ok && nf.handler.apply(null, args);
      });
    }
  }

  var observers = {}

  $.microObserver = {
    create: function (name) {
      observers[name] = new MicroObserver();
      return observers[name];
    },
    get: function (name) {
      var self = this;
      return observers[name] || self.create(name);
    }
  }
})();
/**
 * Handler of the notification
 *
 * @typedef handler
 * @param {...any}
 */
/**
 * Able to receive notification
 *
 * @typedef able
 * @returns {undefined | true} handler is invoked when notification coming <br/>
 * @returns {false} handler is not invoked when notification coming
 */
