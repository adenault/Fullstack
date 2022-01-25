
/*
	* Scroller
	* @Version 1.0.0 2021-11-15
	* Developed by: Ami (亜美) Denault
	* (c) 2013 Korori - korori-gaming.com
	* license: http://www.opensource.org/licenses/mit-license.php
*/

(function ($) {
    $.Scroller = {
        up: function (speed) {
            $("html, body").animate({
                scrollTop: 0
            }, speed);
        },
        down: function (speed) {
            $("html, body").animate({
                scrollTop: $(document).height()
            }, speed);
        }
    };

})(jQuery);