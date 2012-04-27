define (function (require) {

  console.log("cyclic-queueCanvas.js");


  var canvas = document.getElementById('cqCanvas');
  var pjs = new Processing(canvas);

  return pjs;

});