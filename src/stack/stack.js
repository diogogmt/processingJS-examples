define (function (require) {

  console.log("stack.js");

  var Color = require("./../color");
  var Element = require("./../element");
  var pjs = require("./stackCanvas");
  var helper = require("./../helper");
  var app = require("./../config");

  var Stack = function () {
    var _elements = []
      , _pushQueue = 0
      , _popQueue = 0;


    this.push = function (n) {
      if (_elements.length === app.MAX_ELEMENTS) {
        return false;
      }
      var  i = _elements.push(new Element({
        pjs: pjs,
        x: (pjs.width / 2) - app.ELEMENT_WIDTH / 2,
        y: 0,
        finalY: pjs.height - 60 - (app.ELEMENT_HEIGHT * (_elements.length + 1 - _popQueue)),
        width: app.ELEMENT_WIDTH,
        height: app.ELEMENT_HEIGHT,
        color: helper.generateColor(),
        number: Math.ceil(Math.random() * 100),
        type: app.PUSH,
      }));
      _pushQueue++;
      return true;
    };

    this.pop = function () {
      var i = _elements.length
        , element;

      while (i--) {
        if (_elements[i].type !== app.POP) {
          _elements[i].type = app.POP;
          _popQueue++;
          return;
        }
      }
    };

    this.drawTop = function () {
      var i = _elements.length
        , element;

      while (i--) {
        if (_elements[i].type === app.DEFAULT) {
          element = _elements[i];
          break;
        }
      }

      if (!element) return;

      var x = element.x + (element.width / 2)
        , y = element.y + app.ELEMENT_HEIGHT - (app.ELEMENT_HEIGHT / 2);

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
        !elem.animate() && _pushQueue--;
        elem.maybeDelete()
          ? _elements.splice(i, 1) && _popQueue--
          : elem.draw();
      }

      if (_elements.length && (_elements.length - _popQueue)) {
        this.drawTop();
      }
    };

    this.init = function () {
      var that = this;
      pjs.setup = function() {
        pjs.size(500, 440);
        pjs.frameRate(64);
        pjs.stroke("#003300");
        pjs.fill("#0000FF");
        var fontA = pjs.loadFont("Arial");
        pjs.textFont(fontA, 20);
      }

      pjs.draw = function() {
        pjs.background(33, 66, 99);
        that.draw();
      }

      pjs.setup();
      this.createEventHandlers();
    };

    this.createEventHandlers = function () {
      var that = this;
      $(document).ready(function () {
        $("#stackStart").click(function (e) {
          pjs.loop();
        });

        $("#stackStop").click(function (e) {
          pjs.noLoop();
        });

        $("#stackPush").click(function (e) {
          that.push();
        });

        $("#stackPop").click(function (e) {
          that.pop();
        });
      });
    };

  }

  return Stack;

});