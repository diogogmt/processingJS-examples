define (function (require) {

  console.log("queue.js");

  var Color = require("./../color");
  var Element = require("./../element");
  var pjs = require("./queueCanvas");
  var helper = require("./../helper");
  var app = require("./../config");

  var Queue = function () {
    var _elements = []
      , _popQueue = 0;


    this.push = function (n) {
      if (_elements.length - _popQueue === app.MAX_ELEMENTS) {
        return false;
      }
      var that = this;
      var  i = _elements.push(new Element({
        pjs: pjs,
        x: app.ELEMENT_WIDTH_QUEUE * (_elements.length + 1 - _popQueue),
        y: 0,
        finalY: (pjs.height / 2) - (app.ELEMENT_HEIGHT / 2),
        width: app.ELEMENT_WIDTH_QUEUE,
        height: app.ELEMENT_HEIGHT,
        color: helper.generateColor(),
        number: Math.ceil(Math.random() * 100),
        type: app.PUSH,
      }));
      return true;
    };

    this.pop = function () {
      if (_elements.length) {
        _elements[0 + _popQueue].type = app.POP;
        _popQueue++;
        this.recalculateXPos();
      }
    };

    this.recalculateXPos = function () {
      var end = _elements.length && (_elements.length - 1) + _popQueue;
      for (i = _popQueue; i < end; i++) {
        if (i < _elements.length) {
          _elements[i].x = (app.ELEMENT_WIDTH_QUEUE * (i - _popQueue + 1))
        }
      }
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

    };

    this.init = function () {
      var that = this;
      pjs.setup = function() {
        pjs.size(500, 200);
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
        $("#start").click(function (e) {
          pjs.loop();
        });

        $("#stop").click(function (e) {
          pjs.noLoop();
        });

        $("#queuePush").click(function (e) {
          that.push();
        });

        $("#queuePop").click(function (e) {
          that.pop();
        });
      });
    };
  }

  return Queue;

});