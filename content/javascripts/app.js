/*
 * Houston County NavBar Hover
 * @Version 1.0.0 2021-11-22
 * Developed by: Ami (亜美) Denault
 * (c) 2021 Ami - houstoncountyal.gov
 * license: http://www.opensource.org/licenses/mit-license.php
 */

$(function (e) {
    $('body').on('keydown', 'a[href]', function(e) {
        var keyCode = e.keyCode || e.which;

        if (keyCode == 32) {
            if($(this).attr('href')){
                $(location).attr('href',$(this).attr('href'));
                e.preventDefault();
            }
        }
    });


    var topNav = $('#navhover'),
        drop = topNav.find('.navmenuitem'),
        myTimer;
        $('body').on('keydown', '.navmenu', function(e) {
            var keyCode = e.keyCode || e.which;
            if (keyCode == 27) {
                drop.find(".navbox").removeClass('hover');
            }
        });

        $('body').on('keydown', '#navhover', function(e) {
            var keyCode = e.keyCode || e.which;

        if (keyCode == 40) {
            var obj = $(':focus').parent();
            var subMenu = obj.find(".navbox");
            clearTimeout(myTimer);
            if (subMenu.hasClass('hover')) {
                //do nothing
            } else {
                drop.find(".navbox").removeClass('hover');
                subMenu.addClass('hover');
                $('.navbox').focus();
                e.preventDefault();
            }
        }
    });

    drop.hover(function () {

        var obj = $(this);
        var subMenu = obj.find(".navbox");
        clearTimeout(myTimer);
        if (subMenu.hasClass('hover')) {
            //do nothing
        } else {
            drop.find(".navbox").removeClass('hover');
            subMenu.addClass('hover');
        }
    }, function () {
        myTimer = setTimeout(function () {
            drop.find(".navbox").removeClass('hover');
        }, 600);
    });

});

/*
 * Houston County Search
 * @Version 1.0.0 2021-11-22
 * Developed by: Ami (亜美) Denault
 * (c) 2021 Ami - houstoncountyal.gov
 * license: http://www.opensource.org/licenses/mit-license.php
 */
$(function () {
    $('#buttonGo').click(function () {
        searchItem();
    });
    $(document).on("keydown", "#searchword", function (e) {
        if (e.which == 13) {
            searchItem();
        }
    });

    function searchItem() {
        $.post("/jquery", {
            searchword: $("#searchword").val(),
            sitesearch: 1
        }, function (e) {
            $(location).attr("href", "/search/" + e);
        });
    }

});

/*
 * Houston County Login
 * @Version 1.0.0 2021-11-29
 * Developed by: Ami (亜美) Denault
 * (c) 2021 Ami - houstoncountyal.gov
 * license: http://www.opensource.org/licenses/mit-license.php
 */

$(function () {
    $('#navlogin').login({
        popup: true
    });
});

/*
 * Houston County Calendar Month
 * @Version 1.0.0 2021-11-29
 * Developed by: Ami (亜美) Denault
 * (c) 2021 Ami - houstoncountyal.gov
 * license: http://www.opensource.org/licenses/mit-license.php
 */
function calendarMonth(year, month) {
    $.post('/jquery', {
        year: year,
        month: month,
        'action': 'calendarmonth'
    }, function (data) {
        $('#calendar_events').html(data);
    });
}

/*
 * Houston County Navigation
 * @Version 1.0.0 2021-11-29
 * Developed by: Ami (亜美) Denault
 * (c) 2021 Ami - houstoncountyal.gov
 * license: http://www.opensource.org/licenses/mit-license.php
 */

$(function () {

    $('#header').click(function (event) {
        if (event.target.id == "header")
            $(location).attr('href', '/');
    });


    $('.mobile_tri').click(function (event) {
        event.stopPropagation();
        event.preventDefault();
        $(this).toggleClass("change_tri");
        var text = $('.mobile_tri').text();
        $('.mobile_tri').text(text == "Dept. Navigation" ? "Hide Navigation" : "Dept. Navigation");
        $('.mobile_sub_dept').slideToggle();
    });
    $('.mobile_admin').click(function (event) {
        event.stopPropagation();
        event.preventDefault();
        $(this).toggleClass("change_mobileA");
        var text = $('.mobile_admin').text();
        $('.mobile_admin').text(text == "Admin Menu" ? "Hide Menu" : "Admin Menu");

        $('.m_admin').slideToggle();
    });
});

/*
 * Houston County Delete Icon
 * @Version 1.0.0 2021-12-06
 * Developed by: Ami (亜美) Denault
 * (c) 2021 Ami - houstoncountyal.gov
 * license: http://www.opensource.org/licenses/mit-license.php
 */
$(function () {
    $(document).on('click', '.delete_icon', function (e) {
        e.stopPropagation();
        e.preventDefault();
    });

});

/*
 * Houston County Disable Textarea Resize
 * @Version 1.0.0 2021-12-06
 * Developed by: Ami (亜美) Denault
 * (c) 2021 Ami - houstoncountyal.gov
 * license: http://www.opensource.org/licenses/mit-license.php
 */
$(function () {
    $('textarea').css('resize', 'none');
});


/*
 * Houston County Print Page Content
 * @Version 1.0.0 2021-12-06
 * Developed by: Ami (亜美) Denault
 * (c) 2021 Ami - houstoncountyal.gov
 * license: http://www.opensource.org/licenses/mit-license.php
 */
function printPageContent(area) {
    window.print();
}

/*
 * Houston County Toggle
 * @Version 1.0.0 2021-12-06
 * Developed by: Ami (亜美) Denault
 * (c) 2021 Ami - houstoncountyal.gov
 * license: http://www.opensource.org/licenses/mit-license.php
 */
function toggleItem(id){
    $("#"+id).toggle(1500);
      
        if($("#toggle_"+id).html() =='Show')
            $("#toggle_"+id).html('Hide');
        else
            $("#toggle_"+id).html('Show');
    
    
    }

/*
 * Houston County Mobile Menu
 * @Version 1.0.0 2021-12-06
 * Developed by: Ami (亜美) Denault
 * (c) 2021 Ami - houstoncountyal.gov
 * license: http://www.opensource.org/licenses/mit-license.php
 */
$(function(){
    var mobile_links = {
        'Departments':'/departments',
        'Online Payments':'/payments',
        'Jobs':'/jobs',
        'County Information':'/county-information'
    };
    $.mobilemenu(mobile_links);
});

/*
 * Houston County Youtube list
 * @Version 1.0.0 2021-12-06
 * Developed by: Ami (亜美) Denault
 * (c) 2021 Ami - houstoncountyal.gov
 * license: http://www.opensource.org/licenses/mit-license.php
 */
$(function(){

    $('#youtuber').youtubeList({
        apiKey:'AIzaSyBYn-tV5h3bpfr73Yc0kA34CPAkHtrx5LE',
        maxResults:500,
        playlistId:'PLX5UO1zUWoaYdS2Gp6Vi-_HWgUogIp1sO'
    });
});