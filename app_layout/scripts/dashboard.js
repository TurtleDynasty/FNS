var tempString = "";
var tempData = null;
var removed = [];
var current_func;

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
      if ($(this).hasClass('ready')){
        if($("#out").val() != "")
          remove_element($("#out").val());
        var index_to_add = $("#in option:selected").val();
        if(index_to_add != ""){
          add_removed_element(removed[index_to_add][0], removed[index_to_add][1], index_to_add);
          index_to_add++;
          $("#in option:eq(" + index_to_add + ")").remove();
          if ($("#in option").length <= 1){
            $(".filter-input-container:nth-of-type(2)").addClass("hidden");
          }
        }
        current_func();
        $(".filter-button").removeClass("ready");
      } else{
        $(this).shake();
      }
    });

    $("#loader-section").fadeOut("fast");

});

//var csvTemp = d3.csv

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

    tempData = null;
    load_vis(value);
    $(".filter-input-container:nth-of-type(2)").addClass("hidden");
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
  $(".vis-list-selected").removeClass("vis-list-selected");
  $(this).addClass("vis-list-selected");

  //switch out overview
  var selected = d3.select(".vis-select-container.vis-list-selected");
  var value = selected.attr("value");
  $(".overview.overview-selected").removeClass("overview-selected").hide();
  $(".overview:eq(" + value +")").show().addClass("overview-selected");

  //switch out options
  $(".vis-options.vis-options-selected").removeClass("vis-options-selected").hide();
  $(".vis-options:eq(" + value +")").show().addClass("vis-options-selected");

  //ready generate button
  $(".generate-button").addClass("ready");

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
  refresh_build();
  $("#viewsection").animate({top: window.innerHeight + 'px'}, 500);
  $("#buildsection").animate({ top: 0 }, 500, function (){
    $("#viewsection").hide();
  });
  setTimeout(function(){
    $(".return-to-selection").animate({top: '-200px'}, {queue: true, duration: 500});
  }, 500);
}

function refresh_build(){
  $(".vis-list-selected").removeClass("vis-list-selected");
  $(".generate-button").removeClass("ready");
  $(".overview-selected").removeClass("overview-selected").hide();
  $(".vis-options-selected").removeClass("vis-options-selected").hide();
  $(".overview").first().addClass("overview-selected").show();
  $(".vis-options").first().addClass("vis-options-selected").show();
}

function change_vis_title(title){
  if ((typeof title === 'string' || title instanceof String) && title.length < 50){
    $("#vis-title").html(title);
  }
  else {
    $("#vis-title").html("There was an issue changing this title...");
  }
}

$("#out").on('input change', function (){
  if($(this).val() != ""){
    $(".filter-button").addClass("ready");
  } else {
    $(".filter-button").removeClass("ready");
  }
});

$("#in").on('change', function () {
  if($(this).val() != "" || $("#out").val() != ""){
    $(".filter-button").addClass("ready");
  } else {
    $(".filter-button").removeClass("ready");
  }
});

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
  else if (value == 8) {
    setTimeout(init_scatter_test, 1500)
  }
  else if (value == 9) {
    setTimeout(init_occupancy_test, 1500)
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

function remove_element (entry) {
  var index = object_index_with_attr(tempData, entry);
  if(index >= 0){
    var obj = tempData.splice(index, 1)[0];
    console.log("removed element at position " + index);
    removed.push([obj, index]);
    if(removed.length > 0){
      $(".filter-input-container:nth-of-type(2)").removeClass("hidden");
      $("#in").append("<option value=" + (removed.length-1) + ">" + entry + "</option>");
      advance_removed_out(index);
    }
    $("#out").val("");

  }
  else {
    console.log("failed to find an element named " + entry);
    $(".filter-button").shake();
  }
  return tempData;
}

function object_index_with_attr(array, value) {
  var property;
  if (typeof array[0].name !== 'undefined')
    property = 'name';
  else if (typeof array[0].letter !== 'undefined')
    property = 'letter';
  else if (typeof array[0].name !== 'undefined')
    property = 'Name';
  else if (typeof array[0].nodeName !== 'undefined')
    property = 'nodeName';
  else if (typeof array[0].id !== 'undefined')
    property = 'id';
  else {
    console.log("Temp storage elements are not keyd with a recognizable property.");
  }

  console.log("Finding element " + value + " in property " + property);
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][property] == value) {
            return i;
        }
    }
    return -1;
}

function advance_removed_in (index) {
  for (i = 0; i < removed.length; i++){
    if (removed[i][1] > index){
      removed[i][1] += 1;
    }
  }
}

function advance_removed_out (index) {
  for (i = 0; i < removed.length; i++){
    if (removed[i][1] > index){
      removed[i][1] -= 1;
    }
  }
}

function add_removed_element(value, position, removed_index){
  tempData.splice(position, 0, value);
  removed.splice(removed_index, 1);
  advance_removed_in(position);

  $("#in option").each(function(){
    var value = parseInt($(this).val());
    if (!isNaN(value) && value > removed_index ){
      $(this).val(value - 1);
    }
  });

}

/*
[A, B, C, D, E]

[A, E]
{C:2, D:2, B:1}

[A, B, C, D, E]

[A, E]
{C:2, B:1, D:1}



*/
