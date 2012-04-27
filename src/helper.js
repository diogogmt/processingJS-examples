define (function (require) {

	console.log("helper.js");

	var Color = require("./color");
	var _helper;

	function Helper () {

		return {
			"generateColor": function () {
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
			}
		};
	}

	if (!_helper){
    _helper = new Helper();
  } //if
  return _helper;

});