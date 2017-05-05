function init_spinner(){
    var opts = {lines: 9, length: 5, width: 6, radius: 41, scale: 0.75, corners: 1, color: '#000', opacity: 0.05, rotate: 0, direction: 1, speed: 0.8
                , trail: 42, fps: 20, zIndex: 2e9, className: 'spinner', top: '50%', left: '50%', shadow: false, hwaccel: false, position: 'absolute'
    }
    var target = document.getElementsByClassName('widget2');
    var spinner = new Spinner(opts).spin(target[0]);
    $('.spinner').after("<div class=\"longload\" style=\"display:none;\"><p><h4>Custom options were selected,</h4></p><p><h4>this may take a minute.</h4></p></div>");
    setTimeout(show_longload, 5000);
    //show_longload();

    function show_longload() {
      if ($('.spinner').length > 0){
        var pos = $(".spinner").position();
        var width = $(".spinner").outerWidth();
        $(".longload").css({
          position: "absolute",
          top: pos.top + 50 + "px"
        }).show();
      }
    }
}

(function ($) {
    $.fn.shake = function (options) {
        // defaults
        var settings = {
            'shakes': 2,
            'distance': 3,
            'duration': 200
        };
        // merge options
        if (options) {
            $.extend(settings, options);
        }
        // make it so
        var pos;
        return this.each(function () {
            $this = $(this);
            // position if necessary
            pos = $this.css('position');
            if (!pos || pos === 'static') {
                $this.css('position', 'relative');
            }
            // shake it
            for (var x = 1; x <= settings.shakes; x++) {
                $this.animate({ left: settings.distance * -1 }, (settings.duration / settings.shakes) / 4)
                    .animate({ left: settings.distance }, (settings.duration / settings.shakes) / 2)
                    .animate({ left: 0 }, (settings.duration / settings.shakes) / 4);
            }
        });
    };
}(jQuery));
