require(
  [
    "./config",
    "./stack",
  ],
  function () {

    console.log("main.js");
    var Stack = require("./stack");

    var canvas = document.getElementById('stackCanvas');
    pjs = new Processing(canvas);

    stack = new Stack();
    pjs.setup = function() {
      pjs.size(500, 500);
      pjs.frameRate(64);
      pjs.stroke("#003300");
      pjs.fill("#0000FF");
      var fontA = pjs.loadFont("Arial");
      pjs.textFont(fontA, 20);
    }

    pjs.draw = function() {
      pjs.background(33, 66, 99);
      stack.draw();
    }

    pjs.setup();

    $(document).ready(function () {

      $("#start").click(function (e) {
        pjs.loop();
      });

      $("#stop").click(function (e) {
        pjs.noLoop();
      });

      $("#stackPush").click(function (e) {
        stack.push();
      });

      $("#stackPop").click(function (e) {
        stack.pop();
      });

    });
});


