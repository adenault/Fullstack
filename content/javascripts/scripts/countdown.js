(function ($) {
    jQuery.fn.countdown = function (t, n) {

        var thisEl = $(this);
        var r = {
            name: 'Test',
            date: t.date ? t.date : null,
            format: null
        };

        t && $.extend(r, t);
        interval = setInterval(i, 1);

        myDate = r.date.split("-");
        var newDate = new Date(myDate[2], myDate[0] - 1, myDate[1]);
        eventDate = Math.round(newDate.getTime() / 1000);
        currentDate = Math.floor(Date.now() / 1000);

        if (eventDate > currentDate)
            thisEl.html('<div class="countdown"><div>Countdown to Doom</div><div class="days">00</div> <div class="timeRefDays">Days</div><div class="hours">00</div><div class="timeRefHours">:</div> <div class="minutes">00</div><div class="timeRefMinutes">:</div><div class="seconds">00</div><div class="timeRefSeconds"></div> </div>');

        function i() {
            currentDate = Math.floor(Date.now() / 1000);
            if (eventDate <= currentDate) {
                clearInterval(interval);
            }
            seconds = eventDate - currentDate;
            days = Math.floor(seconds / 86400);
            seconds -= days * 60 * 60 * 24;
            hours = Math.floor(seconds / 3600);
            seconds -= hours * 60 * 60;
            minutes = Math.floor(seconds / 60);
            seconds -= minutes * 60;
            days == 1 ? thisEl.find(".timeRefDays").text("Day") : thisEl.find(".timeRefDays").text("Days");
            hours == 1 ? thisEl.find(".timeRefHours").text(":") : thisEl.find(".timeRefHours").text(":");
            minutes == 1 ? thisEl.find(".timeRefMinutes").text(":") : thisEl.find(".timeRefMinutes").text(":");
            seconds == 1 ? thisEl.find(".timeRefSeconds").text("") : thisEl.find(".timeRefSeconds").text("");
            if (r.format == "on") {
                days = String(days).length >= 2 ? days : "0" + days + ' ';
                hours = String(hours).length >= 2 ? hours : "0" + hours;
                minutes = String(minutes).length >= 2 ? minutes : "0" + minutes;
                seconds = String(seconds).length >= 2 ? seconds : "0" + seconds;
            }
            if (!isNaN(eventDate)) {
                thisEl.find(".days").text(days);
                thisEl.find(".hours").text(hours);
                thisEl.find(".minutes").text(minutes);
                thisEl.find(".seconds").text(seconds);
            } else {
                alert("Invalid date. Example: 30 Tuesday 2013 15:50:00");
                clearInterval(interval);
            }
        }

        i();

    };
})(jQuery);