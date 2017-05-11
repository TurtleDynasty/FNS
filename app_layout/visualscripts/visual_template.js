//build from existing temp data (filter), else fetch data for generation
if (tempData != null){
  build_from_data(tempData);
}
else {
  if(load_from_server){

    //change the visual name and database name at the end as needed
    var url = "dbscripts/getBaseQuery.php?visualName=VisualName Filed in Database&queryDatabase=your Database Name";
    $.ajax({
      url: url,
      async: true,
      success: function (result) {
        url = "dbscripts/queryString.php?queryString=" + result + "&queryDatabase=your Database Name"
        d3.csv(url, type, function(error, data){
          if (error)
          {
            throw error;
          }
          build_from_data(data);

        });
      },
    });
  } else {
    d3.csv("csvs/yourcahcefile.csv", type, function(error, data){
      if (error)
      {
        throw error;
      }
      build_from_data(data);
    });
  }
}

//This function is for typing the output columns of the d3.csv function into objects, you may need it
/*
function type(d) {
    d.replCount = +d.replCount;
    return d;
}
*/

function build_from_data(data){
  //This is chaching the visual data for filtering
  tempData = data;
  //clear anything in the viewing widget before proceeding
  clear_vis();

  /*==============================================================\
  || The code that generates your visual goes below
  || Include any helper functions as nested functions here as well
  || Refer to other visuals in this folder for examples:
  || init_replicated_objects is a good simple one
  \===============================================================*/

  }

//This changes the title of the view visual widget
d3.select("#vis-title").html("Change This To Say What You Want");

//This disables disables the filtering widget for this visual
//hide_filtering();
