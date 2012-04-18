define (function (require) {

  console.log("element.js");

  Element = Base.extend({
    "x": 0,
    "y": 0,
    "width": 0,
    "height": 0,
    "color": null,
    "number": 0,
    "finalY": 0,
    "type": 0,

    constructor: function (options) {
      console.log("element constructor");
      for (var i in options) {
        this[i] !== undefined ? this[i] = options[i] : 0;
      }
    },

    draw: function (y) {
      pjs.fill(this.color.r, this.color.g, this.color.b);
      pjs.rect(this.x, this.y, this.width, this.height);
      pjs.fill(0);
      pjs.textSize(32);
      pjs.text(this.number, this.x + (this.width / 2),
        this.y + (this.height / 2));
    },

    maybeDelete: function () {
      return this.type === DEFAULT && this.y === 0;
    },

    animate: function () {
      if (this.type === PUSH) {
        this.y < this.finalY
          ? this.y++
          : this.type = DEFAULT;

      }
      else if (this.type === POP) {
        this.y > 0
          ? this.y--
          : this.type = DEFAULT;
      }
    },

  });

  return Element;
});