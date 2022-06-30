(function (e) {
    e.fn.countdown = function (t, n) {
        
      var interval;
      function i() {
        var eventDate = Date.parse(r.date) / 1e3;
        var currentDate = Math.floor(e.now() / 1e3);
  
        if (eventDate <= currentDate) {
          clearInterval(interval);
          $('.counter_site').hide();
        }
        seconds = eventDate - currentDate;
        days = Math.floor(seconds / 86400);
        seconds -= days * 60 * 60 * 24;
        hours = Math.floor(seconds / 3600);
        seconds -= hours * 60 * 60;
        minutes = Math.floor(seconds / 60);
        seconds -= minutes * 60;
        if(days == 1) thisEl.find(".timeRefDays").text("Day"); else thisEl.find(".timeRefDays").text("Days");
        if(hours == 1) thisEl.find(".timeRefHours").text(":"); else thisEl.find(".timeRefHours").text(":");
        if( minutes == 1) thisEl.find(".timeRefMinutes").text(":"); else thisEl.find(".timeRefMinutes").text(":");
        if(seconds == 1) thisEl.find(".timeRefSeconds").text(""); else thisEl.find(".timeRefSeconds").text("");
  
        if (r.format == "on") {
          days = String(days).length >= 2 ? days : "0" + days;
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
          console.log("Invalid date. Example: 3 November 2020 07:00:00");
          $('.counter_site').hide();
          clearInterval(interval);
        }
      }
      var thisEl = e(this);
      var r = {
          name:null,
          date: null,
          format: null
          };
      e.extend(r, t);
    
      if($(thisEl).length && thisEl.attr('class') != 'counter_site'){
        thisEl.attr('class','counter_site');
        $(thisEl).html(
          '<div style="font-size:24px;"><strong><span style="font-size:24px">' + r.name +'</span></strong></div>' +
            '<div style="display:inline;">' +
            '<div class="days" style="display:inline;">00</div>' +
            '<div class="timeRefDays" style="display:inline;padding-left:2px;padding-right:5px;">Days</div>' +
            '<div class="hours" style="display:inline;">00</div>' +
            '<div class="timeRefHours" style="display:inline;">:</div>' +
            '<div class="minutes" style="display:inline;">00</div>' +
            '<div class="timeRefMinutes" style="display:inline;">:</div>' +
            '<div class="seconds" style="display:inline;">00</div>' +
            '<div class="timeRefSeconds" style="display:inline;"></div>' +
          '</div>');
      }
      
        i();
        interval = setInterval(i, 1e3);
    };
  })(jQuery);
  
    $(document).ready(function () {
      function e() {
        var e = new Date();
        e.setDate(e.getDate());
        dd = e.getDate();
        mm = e.getMonth() + 1;
        y = e.getFullYear();
        futureFormattedDate = mm + "/" + dd + "/" + y;
        return futureFormattedDate;
      }
    });