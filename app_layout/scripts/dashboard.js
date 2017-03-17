$(document).ready(function(){

    //disable scroll bars
    document.documentElement.style.overflow = 'hidden';  // firefox, chrome
    document.body.scroll = "no"; // ie only

    //populate filter selects
    var sample = [{ id: 0, text: 'TSMGUI12' }, { id: 1, text: 'TSMGUI11' }, { id: 2, text: 'File Domain' }, { id: 3, text: 'TSMGUI18' }];
    $(".select-objects").select2({
      data: sample
    });
    $(".select-objects").select2({
      placeholder: "Click Here to Select Objects"
    });
    $(".filter-button").on("click", function(){
      $(this).shake();
    });

    //Back to schedule page, address may be different on your machine
    $("#brand").on("click", function(){
      window.location.href = "index.html";
    });

    //Load in visualization and slide dashboard up
    $(".generate").on("click", function(){
      console.log("debug1");
      var selected = d3.select(".vis-select-container.vis-list-selected");
      console.log("debug2");
      if (!selected.empty()){
        console.log(selected);
        var value = selected.attr("value");
        clear_vis();
        $("#buildsection").animate({top:'-' + window.innerHeight + 'px'}, {queue: true, duration: 500});
        $("#viewsection").animate({top:'-' + window.innerHeight + 'px'}, {queue: true, duration: 500});


        d3.select("#viewsection").attr("hidden", null);

        $('.widget2-container-inner').addClass('hidden');
        clear_vis();
        $("#vis-title").html("Loading Visualization...");
        init_spinner();
        //setTimeout(init_sunburst, 1500);
        setTimeout(clear_vis, 1500);
        if (value == 1)
          setTimeout(init_sunburst, 1500)
        else if (value == 2) {
          setTimeout(init_replicated_objects, 1500)
        }
        else if (value == 3) {
          setTimeout(init_af_segments, 1500)
        }
        else if (value == 4) {
          setTimeout(init_backup_test, 1500)
        }
        else if (value == 5) {
          setTimeout(init_pie_test, 1500)
        }
        else if (value == 6) {
          setTimeout(init_pool_test, 1500)
        }

        setTimeout(function(){
          $(".return-to-selection ").animate({top: '0px'}, {queue: true, duration: 500});
        }, 500);
      } else {
        $(this).shake();
        //$(this).animate({backgroundColor: "#c94e36" }, {queue: false, duration: 200});
      }
    });

    //Back to Selection button animations
    $(".return-to-selection").on("click", function(){
      if (d3.select("#viewsection").attr("hidden") != "hidden"){
        $("#viewsection").animate({top: '0px'}, {queue: true, duration: 500});
        $("#buildsection").animate({top: '0px'}, {queue: true, duration: 500});
        setTimeout(function(){
          $(".return-to-selection").animate({top: '-200px'}, {queue: true, duration: 500});
          d3.select("#viewsection").attr("hidden", "hidden");
        }, 500);
      }
    });

    $(".logout").on("click", function(){
      window.location.href = "login.php";
    });

    $(".user-settings").click(function () {
      $('#myModal').modal('toggle');
    });
    $(".save").click(function () {
      //update user settings here if changed
      $('#myModal').modal('toggle');
    });

    //
    $(".vis-select-container").click(function () {
      $(".vis-select-container").removeClass("vis-list-selected");
      $(this).addClass("vis-list-selected");
    });
});

function clear_vis(){
    $( ".spinner" ).remove();
    $( ".svg-container" ).remove();
    $("#vis-title").html("Select a Visualization");
}

function clear_messages(){
  $(".messages-box").html("");
}

function add_message(type, text){
  if (type == "Warning") {
    $(".messages-box").append("<div class=\"message\">"
    + "<img class=\"message-icon\" src=\"resources/warning.svg\" alt=\"\" style=\"width:16px;height:16px;padding-right:3px;\">"
    + text
    + "</div>"
    );
  }
  else if (type == "Suggestion") {
    $(".messages-box").append("<div class=\"message\">"
    + "<img class=\"message-icon\" src=\"resources/thought.svg\" alt=\"\" style=\"width:16px;height:16px;padding-right:3px;\">"
    + text
    + "</div>"
    );
  }
}
