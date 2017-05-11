//this visual does not have a live query, so it looks a bit different

clear_vis();

var container = d3.select(".widget2").append("div").classed("svg-container", true);
var width = parseInt(d3.select(".svg-container").style("width"));
var height = parseInt(d3.select(".svg-container").style("height"));
var svg = container.append("svg").attr("width", width).attr("height", height).attr("preserveAspectRatio", "xMidYMid meet").attr("viewBox", "0  0 " + (width) + " " + (height+25));
/***********************\
| Your visual script below
\***********************/
// scroll-over circle enlargement
var dotSize = 3.5;
var dotPadding = 5;
// setup margin
var labelPadding = 50;
var legendWidth = 200;
var tickPadding = "10";
var legendTileSize = 30;
var legendSpacing = 30;
var xUnit = "";
var xAxisLabel = "File Space ID" + xUnit;
var yUnit = "bytes";
var yAxisLabel = "Actual Size (" + yUnit + ")";
// setup x
var xValue = function(d) { return d.X;}, // data -> value
  xScale = d3.scaleLinear().range([labelPadding, width-legendWidth]), // value -> display
  xMap = function(d) { return xScale(xValue(d));}; // data -> display
  // xAxis = d3.svg.axis().scale(xScale).orient("bottom");
// setup y
var yValue = function(d) { return d["Y"];}, // data -> value
  yScale = d3.scaleLinear().range([height-labelPadding, labelPadding]), // value -> display
  yMap = function(d) { return yScale(yValue(d));}; // data -> display
  // yAxis = d3.svg.axis().scale(yScale).orient("left");
// setup fill color
var cValue = function(d) { return d.Type;},
  color = d3.scaleOrdinal(d3.schemeCategory10);
d3.selection.prototype.moveToBack = function()
{
    return this.each(function() {
        var firstChild = this.parentNode.firstChild;
        if (firstChild) {
            this.parentNode.insertBefore(this, firstChild);
        }
    });
};
var inDragBox = [];
var drag = d3.drag()
  .on('start', function()
  {
    d3.select(".dragBar").remove();
    firstX = d3.event.x;
    firstY = d3.event.y;
    svg.append("rect")
      .classed("dragBar", true)
      .attr("x", firstX)
      .attr("y", firstY)
      .attr("rx", 5)
      .attr("ry", 5)
      .attr("width", 0)
      .attr("height", 0)
      .call(drag)
      .on("click", function ()
      {
        d3.select(this).remove();
      });
    d3.select(".dragBar").moveToBack();
  })
  .on('drag', function() {
    d3.select(".dragBar").attr('width', function() {
        return (d3.event.x-firstX);
    });
    d3.select(".dragBar").attr('height', function() {
      return (d3.event.y-firstY);
    });
    var dragWidth = d3.select(".dragBar").attr("width");
    var dragHeight = d3.select(".dragBar").attr("height");
    if (dragWidth < 0 && dragHeight < 0)
    {
      d3.select(".dragBar").attr("transform", function() {
        return "translate(" + (dragWidth) + "," + (dragHeight) + ")";
      });
    }
    else if (dragWidth < 0)
    {
      d3.select(".dragBar").attr("transform", function() {
        return "translate(" + (dragWidth) + ",0)";
      });
    }
    else if (dragHeight < 0)
    {
      d3.select(".dragBar").attr("transform", function() {
        return "translate(0," + (dragHeight) + ")";
      });
    }
    d3.select(".dragBar").attr("width", Math.abs(dragWidth));
    d3.select(".dragBar").attr("height", Math.abs(dragHeight));
  })
  .on('end', function() {
    var dragBoxLength = inDragBox.length;
    for (i = 0; i < dragBoxLength; i++)
    {
      inDragBox[i].style("stroke-width", 0);
    }
    inDragBox = [];
    secondX = d3.event.x;
    secondY = d3.event.y;
    function compare(a,b)
    {
      return a-b;
    }
    var XCords = [firstX, secondX].sort(compare);
    var YCords = [firstY, secondY].sort(compare);
    d3.selectAll(".dataDot")
    .attr("cx", function ()
    {
      var x = d3.select(this).attr("cx");
      var y = d3.select(this).attr("cy");
      if (x >= XCords[0] && x <= XCords[1] && y >= YCords[0] && y <= YCords[1])
      {
        d3.select(this)
          .style("stroke-width", 1)
          .style("stroke", "black")
        inDragBox.push(d3.select(this));
      }
      return x;
    })
  });
// Dragable area for drag filtering
svg.append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", width)
  .attr("height", height)
  .style("fill-opacity", 0)
  .call(drag);
// add the tooltip area to the webpage
var tooltip = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);
// load data
d3.csv("csvs/activity_test.csv", function(error, data)
{
  if (error)
  {
    throw error;
  }
  // change string (from CSV) into number format
  data.forEach(function(d)
  {
    d.X = +d.X;
    d["Y"] = +d["Y"];
  // comment out this line before going live
  });
  // don't want dots overlapping axis, so add in buffer to data domain
  xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
  yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);
  createXAxis();
  createYAxis();
  drawDots(data);
  drawLegend();
});
function createXAxis()
{
  // x-axis
  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (height-labelPadding) + ")")
    .call(d3.axisBottom(xScale).tickPadding([10]))
  // add X Axis label
  svg.append("text")
      .attr("class", "axisLabel")
      .attr("transform", "rotate(0)")
      .attr("y", height-labelPadding/2 + 10 )
      .attr("x", width/2)
      .attr("dy", "1em")
      .text(xAxisLabel);
}
function createYAxis()
{
  // y-axis
  svg.append("g")
    .call(d3.axisLeft(yScale).tickPadding([15]))
    .attr("class", "axis")
    .attr("transform", "translate(" + labelPadding + ",0)")
  // add Y Axis label
  svg.append("text")
      .attr("class", "axisLabel")
      .attr("transform", "rotate(-90)")
      .attr("y", -10)
      .attr("x", -height/2)
      .attr("dy", ".75em")
      .text(yAxisLabel);
}
function drawDots(data)
{
  // draw dots
  svg.selectAll(".dot")
    .data(data)
    .enter().append("circle")
    .attr("type", function(d)
    {
      type =  d.Type.replace(/\s/g, '');
      d3.select(this).classed(type, true);
      return type;
    })
    .classed("dataDot", true)
    .attr("r", dotSize)
    .attr("cx", function(d)
    {
      return xScale(d.X);
    })
    .attr("cy", function(d)
    {
      return yScale(d.Y);
    })
    .style("fill", function(d)
    {
      return color(cValue(d));
    })
    .style("fill-opacity", 1)
    .on("mouseover", function(d)
    {
      d3.select(this).attr("r", dotSize + dotPadding);
      var test = d3.select(this)["_groups"][0][0]["style"]["fill-opacity"];
      if (test != 0)
      {
        tooltip.transition()
          .duration(200)
          .style("opacity", .9);
        tooltip.html(d["Name"] + "<br/> (" + xValue(d) + ", " + yValue(d) + ")")
          .style("left", (d3.event.pageX + dotSize + dotPadding + 10) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      }
    })
    .on("mouseout", function(d)
    {
      d3.select(this).attr("r", dotSize);
      tooltip.transition()
        .duration(500)
        .style("opacity", 0);
    })
}
function drawLegend()
{
  // draw legend
  var legend = svg.selectAll(".legend")
    .data(color.domain())
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i)
    {
      return "translate(" + 0 + "," + i * legendSpacing + ")";
    });
  var i = 0;
  // draw legend colored rectangles
  legend.append("rect")
    .classed(color, true)
    .classed("legend", true)
    .attr("fill-opacity", 1)
    .attr("x", width - legendTileSize)
    .attr("y", function ()
    {
      i += 1;
      return i * legendTileSize;
    })
    .attr("rx", 5)
    .attr("ry", 5)
    .attr("width", legendTileSize)
    .attr("height", legendTileSize)
    .style("stroke", color)
    .style("fill", color)
    .on("click", function (d)
    {
      var dotType = "." + d.replace(/\s/g, '');
      var dotList = d3.selectAll(dotType)
      .style("fill-opacity", function (d)
      {
        var opacity = d3.selectAll(this)["_groups"][0]["style"]["fill-opacity"];
        if (opacity == 1)
        {
          d3.select(this).attr("r", 0);
          return 0;
        }
        else
        {
          d3.select(this).attr("r", dotSize);
          return 1;
        }
      });
      var opacity = d3.select(this).attr("fill-opacity");
      if (opacity == 1)
      {
        opacity = d3.select(this).attr("fill-opacity", 0);
      }
      else
      {
        opacity = d3.select(this).attr("fill-opacity", 1);
      }
      //.style("opacity", 0);
    });
  var i = 0;
  // draw legend text
  legend.append("text")
    .classed("legend", true)
    .attr("x", width - legendTileSize - 7)
    .attr("y", function () {
      i += 1;
      return i * legendTileSize;
    })
    .attr("dy", legendTileSize/2 + 1)
    .text(function(d) {
      return d;
    })
}
//your visual title here
d3.select("#vis-title").html("Error, Info, and Warning Messages over time");
hide_filtering();
add_message("Warning", "This visual was loaded using a cached file and may not be current.");
