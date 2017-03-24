/** This function is executed when the page is odne loading*/
$(document).ready(function(){

    //disable scroll bars
    document.documentElement.style.overflow = 'hidden';  // firefox, chrome
    document.body.scroll = "no"; // ie only

    //set initial position for second section
    $("#viewsection").css("top", window.innerHeight + 'px').hide();

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

    $("#loader-section").fadeOut("fast");
});

//On click events
//Slide dashboard up and load in visualization
$(".generate").on("click", function(){
  var selected = d3.select(".vis-select-container.vis-list-selected");
  if (!selected.empty()){
    clear_vis();
    goto_view();
    init_spinner();
    change_vis_title("Loading Visualization...");

    var value = selected.attr("value");
    //placeholder loading till data retreived from the database
    setTimeout(clear_vis, 1500);
    load_vis(value);
  } else {
    $(this).shake();
  }
});

//Back to Selection button animations
$(".return-to-selection").on("click", function(){
  goto_build();
});

//Back to schedule page, address may be different on your machine
$("#brand").on("click", function(){
  window.location.href = "index.html";
});

$(".logout").on("click", function(){
  window.location.href = "login.php";
});

//User settings modal
$(".user-settings").click(function () {
  $('#myModal').modal('toggle');
});
$(".save").click(function () {
  $('#myModal').modal('toggle');
});

//Selection list on the build section
$(".vis-select-container").click(function () {
  $(".vis-select-container").removeClass("vis-list-selected");
  $(this).addClass("vis-list-selected");
  var selected = d3.select(".vis-select-container.vis-list-selected");
  var value = selected.attr("value") - 1;
  $(".overview.overview-selected").show().hide();
  $(".overview:eq(" + value +")").show().addClass("overview-selected");

});


function clear_vis(){
    $( ".spinner" ).remove();
    $( ".svg-container" ).remove();
}

function goto_view(){
  $("#viewsection").show();
  $("#buildsection").animate({top:'-' + window.innerHeight + 'px'}, 500);
  $("#viewsection").animate({top: 0 }, 500, function(){
    $("#viewsection").css("top", 0);
    //workaround for hide() and attr.(hidden) causing animation problems
    $("#buildsection").hide();
  });

  setTimeout(function(){
    $(".return-to-selection ").animate({top: '0px'}, {queue: true, duration: 500});
  }, 500);
}

function goto_build(){
  $("#buildsection").show();
  $("#viewsection").animate({top: window.innerHeight + 'px'}, 500);
  $("#buildsection").animate({ top: 0 }, 500, function (){
    $("#viewsection").hide();
  });
  setTimeout(function(){
    $(".return-to-selection").animate({top: '-200px'}, {queue: true, duration: 500});
  }, 500);
}

function change_vis_title(title){
  if ((typeof title === 'string' || title instanceof String) && title.length < 50){
    $("#vis-title").html(title);
  }
  else {
    $("#vis-title").html("There was an issue changing this title...");
  }
}

function clear_messages(){
  $(".messages-box").html("");
}

function load_vis(value){
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
  else if (value == 7) {
    setTimeout(init_heatmap, 1500)
  }
  else {
    change_vis_title("A visualization with that index could not be found...");
  }
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
