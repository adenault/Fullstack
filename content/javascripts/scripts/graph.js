/*
 * Graph Code
 * @Version 1.0.0 2022-01-19
 * Developed by: Ami (亜美) Denault
 * (c) 2013 Korori - korori-gaming.com
 * license: http://www.opensource.org/licenses/mit-license.php
 */

/*jshint esversion: 6 */
(function ($) {

    jQuery.fn.graph = function (data) {
        var appendto = typeof $(this).attr('class') !== 'undefined' && $(this).attr('class') !== false ? '.' + $(this).attr('class') : '#' + $(this).attr('id');

        var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        var colour = (typeof data.color == "string" ? data.color : randomColor);
        var total = jQuery.map(data.data, function (n, i) {
            return n.value;
        }).reduce((a, b) => a + b, 0);
        var offset = 0,
            i = 0,
            pieElement = appendto + " .pie-chart__pie",
            dataElement = appendto + " .pie-chart__legend";
        $(this).css({
            'text-align': 'center'
        });
        switch (data.type.toLowerCase()) {
            case "pie":
                $(appendto).html('<div class="pie-chart__pie"></div><ul class="pie-chart__legend"></ul>');
                for (const [key, value] of Object.entries(data.data)) {
                    var size = sliceSize(value.value, total);
                    colour = (typeof value.color == "string" && value.color !== "" ? value.color : '#' + Math.floor(Math.random() * 16777215).toString(16));
                    iterateSlices(appendto, size, pieElement, offset, i, 0, colour, data.data);
                    $('<li><em>' + key.toUpperCase() + '</em><span>' + value.value + '</span></li>').appendTo(dataElement);
                    $(dataElement + " li:nth-child(" + (i + 1) + ")").css("border-color", colour);
                    offset += size;
                    i++;
                }
                break;
            case "circle":
                data =data.data[Object.keys(data.data)[0]];
                var percentage = data.value;
                colour = (typeof data.color == "string" && data.color !== "" ? data.color : '#' + Math.floor(Math.random() * 16777215).toString(16));
                $(appendto).html('<div class="hue-wheel" style="background-image:conic-gradient(' + colour + ' 0, ' + colour + ' ' + percentage + '%, #ffffff 0, #ffffff 100%),radial-gradient(#fff 50%, transparent calc(50% + 2px));"><h3 class="caption-inside">' + percentage + '%</h3></div>');
                break;
            default:
                $(appendto).html('<ul class="jsgraph"></ul>');
                for (const [key, value] of Object.entries(data.data)) {
                    colour = (typeof value.color == "string" && value.color !== "" ? value.color : '#' + Math.floor(Math.random() * 16777215).toString(16));
                    var th = (value.value / total) * 100 + "%";
                    $('<li><em>' + key.toUpperCase() + '</em><span style="height:' + th + ';background:' + colour + '">' + value.value + '</span></li>').appendTo((appendto + ' .jsgraph'));
                }
                break;
        }
    };
})(jQuery);


function sliceSize(dataNum, dataTotal) {
    return (dataNum / dataTotal) * 360;
}

function addSlice(id, sliceSize, pieElement, offset, sliceID, color, dataCount, data) {
    var key = Object.keys(data)[dataCount].escapeSpecialChars();


    offset = offset - 1;
    var sizeRotation = -179 + sliceSize;
    $(pieElement).append("<div class='slice " + sliceID + "' data-name='" + key + "' data-value='" + data[key].value + "' data-deg='" + offset + "'><span></span></div>");
    $(id + " ." + sliceID).css({
        "transform": "rotate(" + offset + "deg) translate3d(0,0,0)"
    });

    $(id + " ." + sliceID + " span").css({
        "transform": "rotate(" + sizeRotation + "deg) translate3d(0,0,0)",
        "background-color": color
    });
}

function iterateSlices(id, sliceSize, pieElement, offset, dataCount, sliceCount, color, data) {
    var maxSize = 179,
        sliceID = "s" + dataCount + "-" + sliceCount;

    if (sliceSize <= maxSize) {
        addSlice(id, sliceSize, pieElement, offset, sliceID, color, dataCount, data);
    } else {
        addSlice(id, maxSize, pieElement, offset, sliceID, color, dataCount, data);
        iterateSlices(id, sliceSize - maxSize, pieElement, offset + maxSize, dataCount, sliceCount + 1, color, data);
    }
}

String.prototype.escapeSpecialChars = function () {
    return this.replace(/\\n/g, "\\n")
        .replace(/\\'/g, "\\'")
        .replace(/\\"/g, '\\"')
        .replace(/\\&/g, "\\&")
        .replace(/\\r/g, "\\r")
        .replace(/\\t/g, "\\t")
        .replace(/\\b/g, "\\b")
        .replace(/\\f/g, "\\f");
};