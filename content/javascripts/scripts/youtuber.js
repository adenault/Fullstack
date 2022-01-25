/*
 * Youtube List
 * @Version 1.0.0 2021-12-28
 * Developed by: Ami (亜美) Denault
 * (c) 2013 Korori - korori-gaming.com
 * license: http://www.opensource.org/licenses/mit-license.php
 */

(function ($) {
    $.getScript('https://www.youtube.com/iframe_api', function () {
        console.log("Loaded: " + 'Youtube API');
    });

    var jsonApi = {
        part: "snippet",
        playlistId: '',
        key: '',
        maxResults: 5
    };


    jQuery.fn.youtubeList = function (options) {

        var settings = $.extend({}, jsonApi, options);
        var appendto = typeof $(this).attr('class') !== 'undefined' && $(this).attr('class') !== false ? '.' + $(this).attr('class') : '#' + $(this).attr('id');
        if ($(appendto).length > 0) {
            $(appendto).html('<div class="youtube-wrapper"><div><div class="save_spinner"></div></div><div><ul></ul></div></div>');

            var youtubeVar = {
                player: $('.youtube-wrapper div')[0],
                thumb: $('.youtube-wrapper div ul'),
                apiURL: '//www.googleapis.com/youtube/v3/playlistItems',
                playlist: '',
                defaultVideoIndex: 0
            };


            jsonApi.key = (typeof settings.apiKey == "string" ? settings.apiKey : jsonApi.key);
            jsonApi.maxResults = (typeof settings.maxResults == "number" ? settings.maxResults : jsonApi.maxResults);
            jsonApi.playlistId = (typeof settings.playlistId == "string" ? settings.playlistId : jsonApi.playlistId);

            $.getJSON(youtubeVar.apiURL, jsonApi, function (response) {

                    response.items.sort(function (a, b) {
                        var keyA = new Date(a.snippet.title.split('(').pop().slice(0, -1)),
                            keyB = new Date(b.snippet.title.split('(').pop().slice(0, -1));
                        if (keyA > keyB) return -1;
                        if (keyA < keyB) return 1;
                        return 0;
                    });

                    var youtubeItem = {
                        item: response.items[youtubeVar.defaultVideoIndex],
                        medium: response.items[youtubeVar.defaultVideoIndex].snippet.thumbnails.medium,
                        videoId: response.items[youtubeVar.defaultVideoIndex].snippet.resourceId.videoId,
                        title: response.items[youtubeVar.defaultVideoIndex].snippet.title,
                        meeting_date: response.items[youtubeVar.defaultVideoIndex].snippet.title.split('(').pop().slice(0, -1)
                    };

                    youtubeVar.player.innerHTML = '<iframe id="iframe-player" data-id="' + youtubeItem.videoId + '" width="100%" height="100%"  src="//www.youtube.com/embed/' + youtubeItem.videoId + '?rel=0;enablejsapi=1&version=3&playerapiid=ytplayer1" frameborder="0" sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"></iframe>';
                    for (var i = 0; i < response.items.length; i++) {
                        youtubeItem.item = response.items[i];
                        youtubeItem.medium = response.items[i].snippet.thumbnails.medium;
                        youtubeItem.title = response.items[i].snippet.title.split('(').shift();
                        youtubeItem.meeting_date = response.items[i].snippet.title.split('(').pop().slice(0, -1);
                        youtubeItem.videoId = response.items[i].snippet.resourceId.videoId;

                        $(youtubeVar.thumb).append('<li id="video-icon" data-vid="' + youtubeItem.videoId + '">' + youtubeItem.title + '<br/>' + youtubeItem.meeting_date + '</li>');
                    }


                $(document).on('click', '[data-vid]', function () {
                    youtubeItem.videoId = this.dataset.vid;
                    if (!youtubeItem.videoId) return;
                    var iframe = document.getElementById('iframe-player');
                    if (!iframe) return;
                    if (iframe.dataset.id === youtubeItem.videoId) return;
                    youtubeVar.player.innerHTML = '<iframe id="iframe-player" data-id="' + youtubeItem.videoId + '" width="100%" height="100%" src="https://www.youtube.com/embed/' + youtubeItem.videoId + '?rel=0;enablejsapi=1&version=3&playerapiid=ytplayer1" frameborder="0" sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"></iframe>';
                    /*$(youtubeVar.player).append('<div class="save_spinner"></div>');*/


                }); $(document).on('onload', '#iframe-player', function () {
                    $('.save_spinner').remove();
                    $('#iframe-player').contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                });

            });
        }
    };



})(jQuery);