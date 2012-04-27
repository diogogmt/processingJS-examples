define (function (require) {

  console.log("cyclic-queue.js");

  var Color = require("./../color");
  var Element = require("./../element");
  var pjs = require("./cyclic-queueCanvas");
  var helper = require("./../helper");
  var app = require("./../config");

  var CyclicQueue = function () {
    var _elements = []
      , _head = 0
      , _tail = 0
      , _size = 0;


    this.insert = function (n) {
      if (this.isFull()) return false;
      this.maybeResetTail();
      var n = Math.floor(Math.random()*101);
      console.log("_elements.length: ", _elements.length);
      console.log("_elements["+_tail+1+"]: ", _elements[_tail+1]);
      _elements[_tail++].setNumber(n);
      _size++;
    },

    this.delete = function () {
      if (this.isEmpty()) return false;
      var n = _elements[_head].getNumber();
      if (n !== false) {
        _elements[_head++].clearNumber();
        _size--;
        this.maybeResetHead();
      }
    },

    this.isFull = function () {
      if (_size === app.MAX_ELEMENTS) {
        return true;
      }
      return false;
    },

    this.isEmpty = function () {
      if (!_size) {
        _tail = 0;
        _head = 0;
        return true;
      }
      return false;
    },

    this.maybeResetTail = function () {
      if (_size != app.MAX_ELEMENTS && _tail === app.MAX_ELEMENTS) {
        _tail = 0;
      }
    },

    this.maybeResetHead = function () {
      if (_size != app.MAX_ELEMENTS && _head === app.MAX_ELEMENTS) {
        _head = 0;
      }
    },

    this.draw = function () {
      var i
        , headElement
        , tailElement
        , x
        , y;

      this.isEmpty();
      for (i = 0; i < _elements.length; i++) {
          _elements[i].draw();
      }
      tailElement = _elements[_tail ? _tail - 1 : _tail];
      headElement = _elements[_head];
      if (!_size) {
       headElement = _elements[0];
       tailElement = _elements[0];
      }

      x = headElement.x + (headElement.width / 2) - app.STACK_WIDTH;
      y = headElement.y + app.ELEMENT_HEIGHT - (app.ELEMENT_HEIGHT / 2);
      pjs.fill(229, 229, 229);
      pjs.ellipse(x - 35, y, 70, 70)
      pjs.fill(0, 0, 0);
      pjs.text("Front", x - 60, y + 5);
      pjs.line( headElement.x, y, x, y);


      x = tailElement.x + (tailElement.width / 2) + app.STACK_WIDTH;
      y = tailElement.y + app.ELEMENT_HEIGHT - (app.ELEMENT_HEIGHT / 2);
      pjs.fill(229, 229, 229);
      pjs.ellipse(x + 35, y, 70, 70);
      pjs.fill(0, 0, 0);
      pjs.text("Rear", x + 15, y + 5);
      pjs.line( headElement.x + headElement.width, y, x, y);

    };


    this.createElements = function () {
      var that = this
          , i = app.MAX_ELEMENTS;
      while (i--) {
        _elements.push(new Element({
          x: (pjs.width / 2) - app.STACK_WIDTH / 3,
          y: (app.ELEMENT_HEIGHT * (_elements.length + 1)),
          width: app.ELEMENT_WIDTH,
          height: app.ELEMENT_HEIGHT,
          color: helper.generateColor(),
          pjs: pjs,
          empty: true,
        }));
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
      this.createElements();
    };

    this.createEventHandlers = function () {
      var that = this;
      $(document).ready(function () {
        $("#cqStart").click(function (e) {
          pjs.loop();
        });

        $("#cqStop").click(function (e) {
          pjs.noLoop();
        });

        $("#cqInsert").click(function (e) {
          that.insert();
        });

        $("#cqDelete").click(function (e) {
          that.delete();
        });
      });
    };
  }

  return CyclicQueue;

});