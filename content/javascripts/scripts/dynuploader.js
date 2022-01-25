/*
 * DynUploader
 * @Version 1.0.0 2021-11-15
 * Developed by: Ami (亜美) Denault
 * (c) 2013 Korori - korori-gaming.com
 * license: http://www.opensource.org/licenses/mit-license.php
 */



var reader = {};
var file = {};
var slice_size = 1000 * 1024;


(function (e) {
    var reference = {
        "file": '#file'
    };

    e.fn.uploader = function (options) {
        var dynamic = Math.floor(Math.random() * 4);
        var settings = $.extend({}, reference, options);
        var idFile = (typeof settings.file == "string" ? settings.file : reference.file) + dynamic;
        var appendto = this.attr('id') + dynamic;

        if ($(idFile + '_' + appendto).length == 0) {
            $('#' + appendto + ' tfoot tr td div').html(
                '<form id="' + idFile.trime().substring(1) + '_form" class="frmComItem">' +
                '<div class="fileupload">' +
                '<input type="file" name="file" id="' + idFile + '" style="outline: none;">' +
                '<span class="button" id="' + idFile + 'button">Browse for a File</span>' +
                '<div id="' + idFile.trime().substring(1) + '_uploadedImg" class="uploadedImg">' +
                '<span class="unveil" style="--data-bottom:0px"></span>' +
                '</div>' +
                '</div>' +
                '</form>'
            );
        }


        $(function () {
            $(document).on("change", idFile, function () {
                readFile(this);
            });
        });


        function readFile(input) {
            if (input.files && input.files[0]) {
                reader = new FileReader();
                file = input.files[0];

                $.post('/jquery', {
                    file_name: file.name,
                    ajaxClearFile: true
                }, function (data) {
                    upload_file(0);
                });
            }
        }

        function upload_file(start) {
            var next_slice = start + slice_size + 1;
            var blob = file.slice(start, next_slice);

            reader.onloadend = function (event) {
                if (event.target.readyState !== FileReader.DONE) {
                    return;
                }

                $.ajax({
                    url: "/jquery",
                    type: 'POST',
                    data: {
                        file_data: event.target.result,
                        file: file.name,
                        file_type: file.type,
                        ajaxUploadFile: true
                    },
                    cache: false,
                    error: function (data) {},
                    success: function (data) {
                        $(idFile + '_form').addClass('loading');
                        var size_done = start + slice_size;
                        var percent_done = Math.floor((size_done / file.size) * 100);
                        var bar_height = (($(idFile.trime().substring(1) + '_uploadedImg').height() / 100) * percent_done);

                        if (next_slice < file.size) {
                            $( idFile + '_form').find('.imageUploadForm.loading .unveil').attr("style", "--data-bottom:" + bar_height + "px;--data-percent:" + percent_done + " Percent");

                            upload_file(next_slice);
                        } else {
                            $.post('/jquery', {
                                file_name: file.name,
                                ajaxMoveFile: true
                            }, function (data) {
                                $(idFile + '_uploadedImg').addClass('loaded');
                                setTimeout(function () {
                                    $(idFile).val('');
                                    $(idFile + '_uploadedImg').removeClass('loading').removeClass('loaded');
                                }, 5000);
                            });
                        }
                    }
                });
            };
            reader.readAsDataURL(blob);
        }
    };
})(jQuery);