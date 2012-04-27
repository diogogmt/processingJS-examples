define (function (require) {

  console.log("queueCanvas.js");


  var canvas = document.getElementById('queueCanvas');
  var pjs = new Processing(canvas);

  return pjs;

});