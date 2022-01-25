/*
	* Sound
	* @Version 1.0.0 2013-05-30
	* Developed by: Ami (亜美) Denault
	* (c) 2013 Korori - korori-gaming.com
	* license: http://www.opensource.org/licenses/mit-license.php
*/

(function ($) {
	/*
			Sound Play Embedded
		*/
	$.sound = {
		volume: 100,
		enabled: true,
		autostart: true,
		loop: false,
		template: function (src, volume, autostart, loop) {
			return '<embed style="height:0px;width:0px;position:absolute;top:-50px;" loop="' + loop + '" src="' + src + '" volume="' + volume + '" autostart="' + autostart + '" hidden="true"/>';
		},
		play: function (url, options) {
			if (!this.enabled)
				return;
			var settings = $.extend({
				url: url
			}, options);

			if (settings.volume)
				$.sound.volume = settings.volume;

			if (settings.autostart == false)
				$.sound.autostart = false;

			if (settings.loop == false)
				$.sound.loop = false;

			var element = $(this.template(settings.url, $.sound.volume, $.sound.autostart, $.sound.loop));

			element.prependTo("body");
			return element;
		},
		stop: function (url, options) {
			if (!this.enabled)
				return;
			var settings = $.extend({
				url: url
			}, options);
			$("embed").each(function (index) {
				if ($(this).attr('src') == settings.url)
					$(this).remove();
			});
		}
	};


}(jQuery));