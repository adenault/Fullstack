/*
	* Slide Container
	* @Version 1.0.0 2014-05-30
	* Developed by: Ami (亜美) Denault
	* (c) 2013 Korori - korori-gaming.com
	* license: http://www.opensource.org/licenses/mit-license.php
*/
(function ($) {
    e.fn.SlideContainer = function (interval) {

        var id = this.attr('id'); 
		var slides;
		var amount;
		var i;
		interval *= 6000;
		
		slides = $('#' + id).children();
		
		i = 0;
		amount = slides.length;
		setTimeout(run, interval);
		
		function run() {
			$(slides[i]).fadeOut(1000);
			i++;
			if (i >= amount) i = 0;
			$(slides[i]).fadeIn(1000);
			setTimeout(run, interval);
		}
};


})(jQuery);