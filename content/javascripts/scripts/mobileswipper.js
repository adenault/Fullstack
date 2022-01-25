(function ($) {
    $.fn.swipeDetector = function (options) {
        var swipeState = 0,
            startX = 0,
            startY = 0,
            pixelOffsetX = 0,
            pixelOffsetY = 0;

        var swipeTarget = this;
        var defaultSettings = {
            swipeThreshold: 120,
            useOnlyTouch: true
        };

        (function init() {
            options = $.extend(defaultSettings, options);
            swipeTarget.on("mousedown touchstart", swipeStart);
            $("html").on("mouseup touchend", swipeEnd);
            $("html").on("mousemove touchmove", swiping);
        })();

        function swipeStart(event) {
            if (options.useOnlyTouch && !event.originalEvent.touches) return;
            if (event.originalEvent.touches) event = event.originalEvent.touches[0];
            if (swipeState === 0) {
                swipeState = 1;
                startX = event.clientX;
                startY = event.clientY;
            }
        }

        function swipeEnd(event) {
            if (swipeState === 2) {
                swipeState = 0;
                if (Math.abs(pixelOffsetX) > Math.abs(pixelOffsetY) && Math.abs(pixelOffsetX) > options.swipeThreshold) {
                    swipeTarget.trigger(pixelOffsetX < 0 ? $.Event("swipeLeft.sd") : $.Event("swipeRight.sd"));
                } else if (Math.abs(pixelOffsetY) > options.swipeThreshold) {
                    swipeTarget.trigger(pixelOffsetY < 0 ? $.Event("swipeUp.sd") : $.Event("swipeDown.sd"));
                }
            }
        }

        function swiping(event) {

            if (swipeState !== 1) return;

            if (event.originalEvent.touches) {
                event = event.originalEvent.touches[0];
            }

            var swipeOffsetX = event.clientX - startX;
            var swipeOffsetY = event.clientY - startY;

            if (Math.abs(swipeOffsetX) > options.swipeThreshold || Math.abs(swipeOffsetY) > options.swipeThreshold) {
                swipeState = 2;
                pixelOffsetX = swipeOffsetX;
                pixelOffsetY = swipeOffsetY;
            }
        }

        return swipeTarget;
    };

})(jQuery);