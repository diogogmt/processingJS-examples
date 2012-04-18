define(function () {
  console.log("color.js");

  var Color = function (color) {

    var _r = (color && color.r) || 255;
    Object.defineProperty( this, 'r', {
      get: function() {
          return _r;
      }
    });

    var _b = (color && color.b) || 255;
    Object.defineProperty( this, 'b', {
      get: function() {
          return _b;
      }
    });

    var _g = (color && color.g) || 255;
    Object.defineProperty( this, 'g', {
      get: function() {
          return _g;
      }
    });

  }

  return Color;
});