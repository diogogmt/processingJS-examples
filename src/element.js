define (function (require) {

  console.log("element.js");
  var app = require("./config");
  console.log("app: ", app);

  Element = Base.extend({
    "x": 0,
    "y": 0,
    "width": 0,
    "height": 0,
    "color": null,
    "number": 0,
    "finalY": 0,
    "type": 0,
    "empty": false,
    "pjs": null,

    constructor: function (options) {
      for (var i in options) {
        this[i] !== undefined ? this[i] = options[i] : 0;
      }
    },

    draw: function (y) {
      this.pjs.fill(this.color.r, this.color.g, this.color.b);
      this.pjs.rect(this.x, this.y, this.width, this.height);
      this.pjs.fill(0);
      this.pjs.textSize(32);
      var x = this.x + (this.width / 2) - 10
        , y = this.y + app.ELEMENT_HEIGHT - 10;
      !this.empty && this.pjs.text(+this.number, x, y);
    },

    maybeDelete: function () {
      return this.type === app.DEFAULT && this.y === 0;
    },

    animate: function () {
      var animationCompleted = false;

      if (this.type === app.PUSH) {
        this.y < this.finalY
          ? this.y++
          : animationCompleted = true;

      }
      else if (this.type === app.POP) {
        this.y > 0
          ? this.y--
          : animationCompleted = true;
      }

      if (animationCompleted) {
        this.type = app.DEFAULT;
        return false;
      }

      return true;
    },

    setNumber: function (n) {
      this.number = +n;
      this.empty = false;
    },

    clearNumber: function () {
      this.number = "";
      this.empty = true;
    },

    getNumber: function () {
      return !this.empty ? this.number :  false;
    },

  });

  return Element;
});