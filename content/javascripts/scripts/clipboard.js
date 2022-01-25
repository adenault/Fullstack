/*
	* Clip Board
	* @Version 1.0.0 2021-11-18
	* Developed by: Ami (亜美) Denault
	* (c) 2013 Korori - korori-gaming.com
	* license: http://www.opensource.org/licenses/mit-license.php
*/
(function ($) {

    var bootstrap_title = "Korori-Gaming";
    $.clipboard = {
        copy: function (item) {
            if (!navigator.clipboard) {
                var aux = document.createElement("input");
                aux.setAttribute("value", item);
                document.body.appendChild(aux);
                aux.select();
                document.execCommand("copy");
                document.body.removeChild(aux);
            } else {
                navigator.clipboard.writeText(item).then(
                        function () {
                            $.jpop.alert("Successfully copied to Clipboard", bootstrap_title, {
                                type: 'primary'
                            }, {
                                resizable: false,
                                icon: 'check',
                                close: true
                            });
                        })
                    .catch(
                        function (e) {
                            $.jpop.alert("Unable to copy to Clipboard", bootstrap_title, {
                                type: 'warning'
                            }, {
                                resizable: false,
                                icon: 'check',
                                close: true
                            });
                        });

            }
        }
    };


})(jQuery);