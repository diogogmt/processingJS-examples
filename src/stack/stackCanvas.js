define (function (require) {

  console.log("stackCanvas.js");


  var canvas = document.getElementById('stackCanvas');
  var pjs = new Processing(canvas);

  return pjs;

});