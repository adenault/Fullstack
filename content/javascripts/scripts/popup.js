/*
 * Popup
 * @Version 1.0.0 2021-11-15
 * Developed by: Ami (亜美) Denault
 * (c) 2013 Korori - korori-gaming.com
 * license: http://www.opensource.org/licenses/mit-license.php
 */
(function ($) {
    /*
        Modal UI Hook
    */
    var theme = {
        "default": BootstrapDialog.TYPE_DEFAULT,
        "info": BootstrapDialog.TYPE_INFO,
        "primary": BootstrapDialog.TYPE_PRIMARY,
        "success": BootstrapDialog.TYPE_SUCCESS,
        "warning": BootstrapDialog.TYPE_WARNING,
        "danger": BootstrapDialog.TYPE_DANGER
    };

    var button = {
        "default": "btn-default btn-override",
        "info": "btn-info btn-override",
        "primary": "btn-primary btn-override",
        "success": "btn-success btn-override",
        "warning": "btn-warning btn-override",
        "danger": "btn-danger  btn-override"
    };

    var defaults = {
        theme: theme.primary,
        button: button.primary,
        modal: true,
        close: true
    };


    $.jpop = {
        alert: function (msg, title, button_options, options, cb) {

            var settings = $.extend({}, defaults, options);
            var settings_buttons = $.extend({}, defaults, button_options);
            var labelName = (typeof settings_buttons.label == "string" ? settings_buttons.label : "OK");

            var cssType = (typeof settings_buttons.type == "string" ? button[settings_buttons.type] : button.warning);
            var cssClass = (typeof settings_buttons.type == "string" ? button[settings_buttons.type] : button.warning);

            BootstrapDialog.show({
                title: title,
                message: msg,
                closable: settings.close,
                draggable: settings.modal,
                type: cssType,
                cssClass: cssClass,
                buttons: [{
                    label: labelName,
                    action: function (dialogRef) {
                        if(cb){
                            cb();
                        }
                        dialogRef.close();
                    }
                }]
            });

        },
        confirm: function (msg, title, button_options, options, cb) {
            var settings = $.extend({}, defaults, options);

            var settings_buttons = $.extend({}, defaults, button_options);
            var labelName = (typeof settings_buttons.label == "string" ? settings_buttons.label : "OK");
            var cssClass = (typeof settings_buttons.type == "string" ? button[settings_buttons.type] : button.primary);
            var cssType = (typeof settings_buttons.type != null && settings_buttons.type != undefined ? theme[settings_buttons.type] : theme.primary);

            BootstrapDialog.confirm({
                title: title,
                message: msg,
                closable: settings.close,
                draggable: settings.modal,
                type: cssType,
                cssClass: cssClass,
                btnOKLabel: labelName,
                btnOKClass: cssClass,
                btnCancelLabel: 'Cancel',
                callback: cb
            });
        }
    };

    $.FormErrorHandler = function (data) {

        $.jpop.alert(data.message, bootstrap_title, {
            type: 'warning'
        }, {
            resizable: false,
            icon: 'check',
            close: true
        });
    };
})(jQuery);