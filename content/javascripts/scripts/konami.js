/*
	* Konami Code
	* @Version 1.0.0 2013-05-30
	* Developed by: Ami (亜美) Denault
	* (c) 2013 Korori - korori-gaming.com
	* license: http://www.opensource.org/licenses/mit-license.php
*/
(function ($) {
	$.fn.konami = function (code, callback) {
		if (code == undefined) code = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
		var konami_index = 0;
		$(document).keydown(function (e) {
			if (e.keyCode === code[konami_index++]) {
				if (konami_index === code.length) {
					$(document).unbind('keydown', arguments.callee);
					if (callback) callback(true);
				}
			} else
				konami_index = 0;
		});
	};
}(jQuery));