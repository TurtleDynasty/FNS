if (tempData != null){
  build_from_data(tempData);
}
else {
  if(load_from_server){

    //change the database name at the end as needed
    var url = "dbscripts/getBaseQuery.php?visualName=Object Count by Storage Pool&queryDatabase=capstone_datavis";
    $.ajax({
      url: url,
      async: true,
      success: function (result) {
        url = "dbscripts/queryString.php?queryString=" + result + "&queryDatabase=capstone_datavis"
        d3.csv(url, type, function(error, data){
          if (error)
          {
            throw error;
          }
          setTimeout(function(){
              build_from_data(data);
          }, 7000);

        });
      },
    });
  } else {
    d3.csv("csvs/data.csv", type, function(error, data){
      if (error)
      {
        throw error;
      }
      build_from_data(data);
    });
  }
}

function type(d)
{
  d.count = +d.count;
  return d;
}

function build_from_data (data){
  clear_vis();
  var container = d3.select(".widget2").append("div").classed("svg-container", true);
  var width = parseInt(d3.select(".svg-container").style("width"));
  var height = parseInt(d3.select(".svg-container").style("height"));
  var svg = container.append("svg").attr("width", width).attr("height", height).attr("preserveAspectRatio", "xMidYMid meet").attr("viewBox", "0  0 " + (width+25) + " " + (height+25));
  /*these 4 lines set up a responsive viewbox for the visual , note the use of .widget2 instead of body.
  Keep this and eliminate the lines in your code that set the width and height, as well as the svg var declaration up to .append(g)
  Make sure to change the location of your csv to "/pathfromroot/.../yourcsv.csv". That should be it.
  */
  /***********************\
  | Your visual script below
  \***********************/
  var pieSegmentPullOut = 15;
  var piePullOutDuration = 500;
  var innerRadius = Math.min(width, height) / 4;
  var outerRadius = Math.min(width, height) / 3 - pieSegmentPullOut;
  var cornerRadius = 7.5;
  // -------------------
  // ---- Inner Text STUFF
  var units = "objects";
  var numDecimalPlaces = 3;
  var labelXOffset = "0em";
  var labelYOffset = "-.5em";
  var topXOffset = "0em";
  var topYOffset = ".5em";
  var bottomXOffset = "0em";
  var bottomYOffset = "1.5em";
  // --------------------
  // --------------------
  // --- linelabels STUFF
  var letterLineLength = 11;
  var lineToLabelEnd = outerRadius * .2;
  var lineToLabelStart = outerRadius;
  // --------------------
  var color = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
  var arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .cornerRadius(cornerRadius);
  var arcOver = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius + pieSegmentPullOut)
    .cornerRadius(cornerRadius);
  var labelArc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);
  var pie = d3.pie()
    .sort(null)
    .value(function(d) {
      return d.count;
    });
  d3.selection.prototype.moveToBack = function()
  {
      return this.each(function() {
          var firstChild = this.parentNode.firstChild;
          if (firstChild) {
              this.parentNode.insertBefore(this, firstChild);
          }
      });
  };
  var total = 0;

  tempData = data;
  data = parseData(data);
  g = svg.selectAll(".arc")
    .data(pie(data))
    .enter().append("g")
    .attr("class", "arc");
  addPieLabels();
  addPieToLabelLine();
  addPieLabelUnderLine();
  addPieSegments();
  moveGraphToCenter();
  createTextBoxes(g);
  setTextBoxes(data);

  function addPieSegments()
  {
    var baseOpacity = .95;
    g.append("path")
      .attr("d", arc)
      .attr('opacity', baseOpacity)
      .style("fill", function(d)  {
        return color(d.data.name);
      })
      .on("mouseenter", function(d)  {
        d3.select(this)
          .attr('opacity', 1)
          .transition()
          .duration(piePullOutDuration)
          .attr("d", arcOver);
        innerLabelEnter(d);
      })
      .on("mouseout", function(d)  {
        d3.select(this)
          .transition()
          .duration(piePullOutDuration)
          .attr("d", arc)
          .attr('opacity', baseOpacity);
        innerLabelExit(d);
      });
  }
  function innerLabelEnter(d)
  {
    text.text(d.data.count + "/" + total + " " + units);
    bottomText.text(((d.data.count/total)*100).toFixed(numDecimalPlaces) + "%");
    labelText.text(d.data.name);
  }
  function innerLabelExit(d)
  {
    text.text(total + " " + units);
    bottomText.text("");
    labelText.text("");
  }
  function changeArc(className, arc)
  {
    d3.select(className)
      .transition()
      .duration(piePullOutDuration)
      .attr("d", arc);
  }
  function addPieLabels()
  {
    // text
    g.append("text")
      .classed("labelTextBox", true)
      .attr("x", function(d) {
        var a = calculateAngle(d);
        var quadrant = Math.cos(a) * (outerRadius + lineToLabelEnd);
        return quadrantCalculator(quadrant, letterLineLength*d.data.name.length/2);
      })
      .attr("y", function(d) {
        var a = calculateAngle(d);
        return Math.sin(a) * (outerRadius + lineToLabelEnd) - 5;
      })
      .text(function(d) {
        return d.data.name;
      });
  }
  function addPieToLabelLine()
  {
    // pie2labelline
    g.append("line")
      .attr("class", function (d)
      {
        return d.data.name;
      })
      .attr("x1", function(d) {
        var a = calculateAngle(d);
        return Math.cos(a) * (lineToLabelStart);
      })
      .attr("y1", function(d) {
        var a = calculateAngle(d);
        return Math.sin(a) * (lineToLabelStart);
      })
      .attr("x2", function(d) {
        var a = calculateAngle(d);
        return Math.cos(a) * (outerRadius + lineToLabelEnd);
      })
      .attr("y2", function(d) {
        var a = calculateAngle(d);
        return Math.sin(a) * (outerRadius + lineToLabelEnd);
      })
  }
  function addPieLabelUnderLine()
  {
    // label underline
    g.append("line")
      .attr("x1", function(d) {
        var a = calculateAngle(d);
        return Math.cos(a) * (outerRadius + lineToLabelEnd);
      })
      .attr("y1", function(d) {
        var a = calculateAngle(d);
        return Math.sin(a) * (outerRadius + lineToLabelEnd);
      })
      .attr("x2", function(d) {
        var a = calculateAngle(d);
        var quadrant = Math.cos(a) * (outerRadius + lineToLabelEnd);
        return quadrantCalculator(quadrant, letterLineLength*d.data.name.length);
      })
      .attr("y2", function(d) {
        var a = calculateAngle(d);
        return Math.sin(a) * (outerRadius + lineToLabelEnd);
      })
  }
  function calculateAngle(data)
  {
    return data.startAngle + (data.endAngle - data.startAngle)/2 - Math.PI/2;
  }
  function quadrantCalculator(quadrant, offset)
  {
    if (quadrant > 0)
    {
      return quadrant + offset;
    }
    else
    {
      return quadrant - offset;
    }
  }
  function moveGraphToCenter()
  {
    svg.attr("transform", "translate(" + (width/ 2) + "," + (height/ 2) + ")");
  }
  function createTextBoxes(g)
  {
    text = g.append("text")
      .classed("statTextBox", true)
      .attr("transform", 0)
      .attr("dx", topXOffset)
      .attr("dy", topYOffset)
      .text(" ");
    bottomText = g.append("text")
      .classed("statTextBox", true)
      .attr("dx", bottomXOffset)
      .attr("dy", bottomYOffset)
      .text(" ");
    labelText = g.append("text")
      .classed("statTextBox", true)
      .attr("dx", labelXOffset)
      .attr("dy", labelYOffset)
      .text(" ");
  }
  function setTextBoxes(data)
  {
    text.text(total + " " + units);
  }
  function parseData(data)
  {
    var compressed = compressArray(data);
    var parsedData = customFilterData(compressed);
    return parsedData;
  }
  function compressArray(original)
  {
    var copy = [original[0]]
    var originalLength = original.length;
    for(i = 1; i < originalLength; i++)
    {
      var notFound = true;
      for(j = 0; j < copy.length; j ++)
      {
        if (original[i].name == copy[j].name)
        {
          notFound = false;
          total += parseInt(original[i].count);
          copy[j].count += original[i].count;
        }
      }
      if (notFound)
      {
        total += parseInt(original[i].count);
        copy.push(original[i]);
      }
    }
    return copy;
  }
  function customFilterData(data)
  {
    // Custom data filters go here.
    return data;
  }

  d3.select("#vis-title").html("Object Count by Storage Pool");
}
