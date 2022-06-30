/*
 * Javascript Loader
 * @Version 1.0.0 2021-11-22
 * Developed by: Ami (亜美) Denault
 * (c) 2013 Korori - korori-gaming.com
 * license: http://www.opensource.org/licenses/mit-license.php
 */
/*jshint esversion: 6 */
var javascripts = {
    "browser.min.js": true,
    "konami.min.js": false,
    "sounds.min.js": false,
    "mobile.min.js": false,
    "popup.min.js": true,
    "scroller.min.js": true,
    "slidecontrainer.min.js": true,
    "clipboard.min.js": true,
    "pagin.min.js": true,
    "login.min.js": false,
    "youtuber.min.js": true,
    "validator.min.js": true,
    "graph.min.js": true,
    "dynuploader.min.js": true,
    "bbcode.min.js": true,
    "mobileswipper.min.js": false,
    "countdown.min.js": true,
    "timer.min.js": true
};

var css = {
    "graph.min.css": javascripts["graph.min.js"],
    "dynuploader.min.css": javascripts["dynuploader.min.js"],
    "bbcode.min.css": javascripts["bbcode.min.js"],
    "mobile.min.css": javascripts["mobile.min.js"],
    "countdown.min.css": javascripts["countdown.min.js"]
};


$.each(javascripts, function (url, value) {
    if (value) {
        $.getScript('/content/javascripts/scripts/' + url, function () {
            console.log("Loaded: " + url);
        });
    }
});

setTimeout(() => {
    $.getScript('/content/javascripts/app.min.js', function () {
        console.log("Loaded: " + 'app.js');
    });
}, 100);

$.each(css, function (url, value) {
    if (value) {
        $("head").append("<link>");
        var css = $("head").children(":last");
        css.attr({
            rel: "stylesheet",
            type: "text/css",
            href: '/content/css/' + url
        });
    }
});