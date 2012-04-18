define (function (require) {

  console.log("stack.js");

  var Color = require("./color");
  var Element = require("./element");

  var Stack = function () {
    var _elements = []
      , _popQueue = 0;


    this.push = function (n) {
      if (_elements.length === MAX_ELEMENTS) {
        return false;
      }
      var  i = _elements.push(new Element({
        x: (pjs.width / 2) - ELEMENT_WIDTH / 2,
        y: 0,
        finalY: pjs.height - 60 - (ELEMENT_HEIGHT * (_elements.length + 1)),
        width: ELEMENT_WIDTH,
        height: ELEMENT_HEIGHT,
        color: this.generateColor(),
        number: Math.ceil(Math.random() * 100),
        type: PUSH,
      }));
      return true;
    };

    this.pop = function () {
      var i = (_elements.length - 1) - _popQueue;
      if (i >= 0) {
        _elements[i].type = POP;
        _popQueue++;
      }
    };

    this.generateColor = function () {
      var brightness = 51 * 5
        , color = []
        , i = 3
      while (i--) {
        color.push(Math.random() * 256 + brightness);
      }
      color = color.map(function (x) { return Math.round(x/2.0) });
      return new Color({
          "r": color[0],
          "g": color[1],
          "b": color[2],
      });
    };

    this.drawTop = function (element) {
      var x = element.x + (element.width / 2)
        , y = element.y + ELEMENT_HEIGHT - (ELEMENT_HEIGHT / 2);

      pjs.fill(229, 229, 229);
      pjs.ellipse(x - 185, y, 70, 70)
      pjs.fill(0, 0, 0);
      pjs.text("Top", x - 205, y + 5);
      pjs.line( element.x - 100, y, x - 50, y);
    };

    this.draw = function () {
      var i = _elements.length
        , element = _elements[i-1]
        , elem;
      if (!element) {
        return;
      }

      while (i--) {
        elem = _elements[i];
        elem.animate();
        elem.maybeDelete()
          ? _elements.splice(i, 1) && _popQueue--
          : elem.draw();
      }

      this.drawTop(element);
    };
  }

  return Stack;

});