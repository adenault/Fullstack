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

    var slides = $('#' + id).children();
    var amount = slides.length;
    var i = 0;
    var seconds = 1;
    interval = seconds * 1000;


    setTimeout(run, interval);

    function run() {
        $(slides[i]).fadeOut(interval - 200);
        i++;
        if (i >= amount) i = 0;
        $(slides[i]).fadeIn(interval);
        setTimeout(run, interval);
    }
};


})(jQuery);