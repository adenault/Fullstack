/*
 * Dynamic Login Menu
 * @Version 1.0.0 2021-11-15
 * Developed by: Ami (亜美) Denault
 * (c) 2013 Korori - korori-gaming.com
 * license: http://www.opensource.org/licenses/mit-license.php
 */
(function ($) {
    var bootstrap_title = "Houston County";
    var reference = {
        "password": 'txtPassword',
        "username": 'txtUsername',
        "rememberme": false,
        "popup": false
    };
    jQuery.fn.login = function (options) {
        var dynamic = Math.floor(Math.random() * 4);
        var settings = $.extend({}, reference, options);
        var idPassword = (typeof settings.password == "string" ? settings.password : reference.password) + dynamic;
        var idUsername = (typeof settings.username == "string" ? settings.username : reference.username) + dynamic;
        var rememberme = (typeof settings.rememberme == "boolean" ? settings.rememberme : reference.rememberme);
        var popup = (typeof settings.popup == "boolean" ? settings.popup : reference.popup);

        var appendto = this.attr('id');
        var u = '<ul class="login_table" id="login_' + appendto + '">' +
            '<li><label for="' + idUsername + '">Username</label></li>' +
            '<li><input style="width: 100%; background-color: rgb(255, 255, 204); color: rgb(0, 0, 0);" aria-labelledby="' + idUsername + '" aria-label="username" type="text" value="" id="' + idUsername + '" name="' + idUsername + '" maxlength="30"></li>' +
            '<li><label for="' + idPassword + '">Password</label></li>' +
            '<li><div style="position: relative;display: inline-block;width: 100%;"><input style="width:100%;" aria-labelledby="password" aria-label="password" type="password" id="' + idPassword + '" name="' + idPassword + '" maxlength="30" /> <span toggle="#password-field" style=" position: absolute;right: 1px;top: 50%;transform: translateY(-50%);z-index: 100;font-size: 18px;"  class="fa fa-fw fa-eye field_icon toggle-password"></span></div></li>' +
            (rememberme ? '<li><label class="switch" data-children-count="1"><input type="checkbox" id="remember" aria-label="Remember Me"> <span class="slider"></span></label></li>' : '');

        if (popup) {
            $(document).on('click', '#' + appendto, function () {
                $.jpop.confirm(u + '</ul>', bootstrap_title, {
                    type: 'primary',
                    label: 'Login'
                }, {
                    resizable: false,
                    icon: 'check',
                    close: true
                }, function (data) {
                    console.log(data);
                    if (data) {
                        login();
                    }
                    else{
                        $.jpop.alert(data.message, bootstrap_title, {
                            type: 'warning'
                        }, {
                            resizable: false,
                            icon: 'check',
                            close: true
                        });
                    }
                });
            });

        } else {
            if ($('#login_' + appendto).length == 0) {
                $('#' + appendto).html(
                    u +
                    '<li><input class="default" type="button" value="login" id="btnLogin' + appendto + '" style="width:100%;;"></li>' +
                    '</ul>'
                );
            }
        }
        $(document).on('click', '.toggle-password', function () {
            $(this).toggleClass("fa-eye fa-eye-slash");
            var input = idPassword;
            if (input.attr('type') === 'password') input.attr('type', 'text');
            else input.attr('type', 'password');
        });

        $(document).on('focus blur', '#' + idUsername, function () {
            if ($(this).val() == settings.default_username)
                $(this).attr('value', '');
        });

        $(document).on('keypress keydown', '#' + idPassword, function (e) {
            if (e.which == 13) {
                $(this).blur();
                login();
            }
        });

        $(document).on("click", "#btnLogin" + appendto , function () {
            login();

        });
        function login(){
            var d = {
                username: $('#'+idUsername).val(),
                password: $('#'+idPassword).val(),
                remember: ($('#'+idPassword).find('.switch').find('input').prop('checked') ? '1' : '0'),
                sublogin: 1
            };
            $.post("/jquery", d, function (data) {
                if (data.status) {
                    $(location).attr("href", "/");
                } else
                    $.jpop.alert(data.message, bootstrap_title, {
                        type: 'warning'
                    }, {
                        resizable: false,
                        icon: 'check',
                        close: true
                    });

            });
        }
    };


})(jQuery);