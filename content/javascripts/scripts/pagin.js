/*
 * Pagin
 * @Version 1.0.0 2021-11-15
 * Developed by: Ami (亜美) Denault
 * (c) 2013 Korori - korori-gaming.com
 * license: http://www.opensource.org/licenses/mit-license.php
 */
(function ($) {
    /*
        Pagin System Plugin
    */
    jQuery.fn.pagination = function (shown) {
        var appendto = this.attr('id'),
            perpage = parseInt(shown),
            table_row = $('#' + appendto).find('tbody tr'),
            rows = table_row.length,
            animationspeed = 1200,
            number_page = Math.ceil(rows / perpage),
            shownonbar = 5,
            start_pos = 0,
            end_pos = 0,
            pagin_internal = '';


        $(table_row).each(function (current, row) {
            if (current > shown - 1)
                $(this).hide();
        });
        if ($('#pagin_' + appendto).length == 0) {

            $('#' + appendto + ' tfoot tr td div').html(
                '<ul class="pagination" id="pagin_' + appendto + '">' +

                '</ul>'
            );
            generate(1);
        }

        function generate(current_page) {

            if (number_page > 1) {
                var x = 1,
                    alter = Math.ceil(shownonbar / 2);
                pagin_internal = '';
                start_pos = (current_page - alter < 0 ? 1 : current_page - alter);
                end_pos = current_page - alter < 0 ? number_page : number_page < (current_page + alter) ? number_page : current_page + alter;

                if (number_page > 1 && 1 < current_page)
                    pagin_internal += '<li class="pagin_prev_'+ appendto+'"  data-prev="' + (current_page - 1) + '" data-current="' + current_page + '"><a href="#">&laquo;</a></li>';

                for (start_pos; start_pos < end_pos + 1; start_pos++) {
                    if (shownonbar >= x && start_pos != 0)
                        pagin_internal += '<li ' + (current_page == start_pos ? 'class="active"' : 'class="pagin_selector_'+ appendto+ '"') + ' data-current="' + start_pos + '" ><a href="#">' + start_pos + '</a></li>';
                    x++;
                }

                if (end_pos > current_page)
                    pagin_internal += '<li class="pagin_next_'+ appendto+'"  data-next="' + (current_page + 1) + '" data-current="' + current_page + '"><a href="#">&raquo;</a></li>';

                $('#pagin_' + appendto).html(pagin_internal);
            }
        }

        $(document).on('click', '.pagin_selector_'+ appendto, function (e) {
            e.stopPropagation();
			e.preventDefault();
            var data_current = $(this).attr('data-current');
            $(table_row).each(function (current, row) {
                var start_pos = (data_current - 1) * perpage;
                var end_pos = start_pos + perpage - 1;

                if (start_pos <= current && end_pos >= current)
                    $(this).fadeIn(animationspeed);
                else
                    $(this).hide();

            });

            generate(parseInt(data_current));
        });
        $(document).on('click', '.pagin_prev_'+ appendto, function (e) {
            e.stopPropagation();
			e.preventDefault();
            var data_current = $(this).attr('data-prev');

            $(table_row).each(function (current, row) {
                var start_pos = (data_current - 1) * perpage;
                var end_pos = start_pos + perpage - 1;

                if (start_pos <= current && end_pos >= current)
                    $(this).fadeIn(animationspeed);
                else
                    $(this).hide();
            });

            generate(parseInt(data_current));
        });

        $(document).on('click', '.pagin_next_'+ appendto, function (e) {
            e.stopPropagation();
			e.preventDefault();
            var data_current = $(this).attr('data-next');

            $(table_row).each(function (current, row) {
                var start_pos = (data_current - 1) * perpage;
                var end_pos = start_pos + perpage - 1;

                if (start_pos <= current && end_pos >= current)
                    $(this).fadeIn(animationspeed);
                else
                    $(this).hide();
            });

            generate(parseInt(data_current));
        });
    };

})(jQuery);