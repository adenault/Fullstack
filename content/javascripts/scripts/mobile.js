/*
 * Moble Menu
 * @Version 1.0.0 2021-11-15
 * Developed by: Ami (亜美) Denault
 * (c) 2013 Korori - korori-gaming.com
 * license: http://www.opensource.org/licenses/mit-license.php
 */
(function ($) {
    var mobileVar = {
        content: '#layout',
        bars: '.mobile_bars_background',
        mobile: '.mobile',
        baritems: '.bar1, .bar2, .bar3',
        mobile_bars: '.mobile_bars',
        title_casing: false,
        location: {
            pre: {
                'bottom': '30px',
                'right': '20px'
            },
            after: {
                'bottom': '30px',
                'right': '20px'
            }
        },
        colors: {
            hamburger: '#ff007c',
            mobile_background: '#29313a',
            mobile_text: '#fff',
        },
        style: 'full'
    };

    var link = document.createElement('meta');
    link.setAttribute('name', 'viewport');
    link.content = "width=device-width, initial-scale=1, shrink-to-fit=no";
    document.getElementsByTagName('head')[0].appendChild(link);

    $.mobilemenu = function (mobile_links, options) {
        var settings = $.extend({}, mobileVar, options);
        var content = (typeof settings.content == "string" ? settings.content : mobileVar.content);
        var bars = (typeof settings.bars == "string" ? settings.bars : mobileVar.bars);
        var mobile = (typeof settings.mobile == "string" ? settings.mobile : mobileVar.mobile);
        var baritems = (typeof settings.baritems == "string" ? settings.baritems : mobileVar.baritems);
        var mobile_bars = (typeof settings.mobile_bars == "string" ? settings.mobile_bars : mobileVar.mobile_bars);
        var location_pre = (typeof settings.location.pre == "string" ? settings.location.pre : mobileVar.location.pre);
        var location_after = (typeof settings.location.after == "string" ? settings.location.after : mobileVar.location.after);
        var style = (typeof settings.style == "string" ? settings.style : mobileVar.style);
        var title_casing = (typeof settings.title_casing == "boolean" ? settings.title_casing : mobileVar.title_casing);

        var hamburger = (typeof settings.colors.hamburger == "string" ? settings.colors.hamburger : mobileVar.colors.hamburger);
        var mobile_background = (typeof settings.colors.mobile_background == "string" ? settings.colors.mobile_background : mobileVar.colors.mobile_background);
        var mobile_text = (typeof settings.colors.mobile_text == "string" ? settings.colors.mobile_text : mobileVar.colors.mobile_text);
        $('body').append('<div class="' + bars.trim().substring(1) + '"><div class="' + mobile_bars.substring(1).trim() + '"><div class="' + baritems.split(",")[0].trim().substring(1) + '"></div><div class="' + baritems.split(",")[1].trim().substring(1) + '"></div><div class="' + baritems.split(",")[2].trim().substring(1) + '"></div></div></div>');


        $(baritems).css({
            'background': hamburger
        });
        $(mobile).css({
            'background': mobile_background,
            'color': mobile_text
        });
        $(bars).css(location_pre);
        switch (style) {
            case "top":
                $(baritems.split(",")[0].trim()).css({
                    'width': '35px'
                });
                break;
            case "middle":
                $(baritems.split(",")[1].trim()).css({
                    'width': '35px'
                });
                break;
            case "bottom":
                $(baritems.split(",")[2].trim()).css({
                    'width': '35px'
                });
                break;
            default:
                break;

        }

        var links = '<li><a href="/">' + (title_casing ? 'Home' : 'HOME') + '</a></li>';
        $.each(mobile_links, function (key, value) {
            links += '<li><a href="' + value + '">' + (title_casing ? titleCase(key) : key.titleCase()) + '</a></li>';
        });

        $('body').append('<ul class="' + mobile.trim().substring(1) + '">' + links + '</ul><div class="mobile-nav-overly"></div>');

        $(window).resize(function () {
            mobileScroll();
        });

        mobileScroll();

        $(document).on('click',mobile_bars,function (event) {
            event.stopPropagation();
            event.preventDefault();
            $(this).toggleClass("change");


            if ($(this).hasClass("change")) {
                $(bars).css(location_after);
                $(mobile).css({
                    'visibility': 'visible',
                    'opacity': '1'
                });

                $(baritems).css({
                    'width': '50px'
                });

            } else {
                $(bars).css(location_pre);
                $(mobile).css({
                    'visibility': 'hidden',
                    'opacity': '0'
                });
                switch (style) {
                    case "top":
                        $(baritems.split(",")[0].trim()).css({
                            'width': '35px'
                        });
                        break;
                    case "middle":
                        $(baritems.split(",")[1].trim()).css({
                            'width': '35px'
                        });
                        break;
                    case "bottom":
                        $(baritems.split(",")[2].trim()).css({
                            'width': '35px'
                        });
                        break;
                    default:
                        break;

                }
            }
        });

        function mobileScroll() {

            $(mobile).css({
                'visibility': 'hidden',
                'opacity': '0'
            });
            $(mobile_bars).removeClass("change");
            $(content).css({
                'margin-top': '0px'
            });
            $(mobile).css({
                'overflow-y': 'auto'
            });


        }

        function titleCase(str) {
            str = str.toLowerCase().split(' ');
            for (var i = 0; i < str.length; i++) {
                str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
            }
            return str.join(' ');
        }

    };

})(jQuery);