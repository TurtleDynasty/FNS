//build from existing temp data (filter), else fetch data for generation
if (tempData != null){
  build_from_data(tempData);
}
else {
  if(load_from_server){

    //change the database name at the end as needed
    var url = "dbscripts/getBaseQuery.php?visualName=Objects Deduplicated by Backup&queryDatabase=capstone_datavis";
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
          build_from_data(data);

        });
      },
    });
  } else {
    d3.csv("csvs/backups.csv", type, function(error, data){
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
  d.frequency = +d.frequency;
  return d;
}

function build_from_data(data){
  tempData = data;
  clear_vis();
  var margin = {top: 30, right: 40, bottom: 100, left: 80};
    var container = d3.select(".widget2")
    .append("div")
    .classed("svg-container", true);
    var width = parseInt(d3.select(".svg-container").style("width"));
    var height = parseInt(d3.select(".svg-container").style("height"));

    var xUnit = "";
    var xLabel = "File Space" + xUnit;
    var yUnit = "MB";
    var yLabel = "Actual Size (" + yUnit + ")";
    var tickPadding = "20";

    var tooltipHeight = 32;
    var tooltipWidth = 0;
    var tooltipBox = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    var formatPercent = d3.format

    var x = d3.scaleBand()
      .rangeRound([0, width])
      .padding(0.1);
    var y = d3.scaleLinear()
      .range([height, 0]);
    var xAxis = d3.axisBottom(x);
    var yAxis = d3.axisLeft(y)
      .tickFormat(formatPercent)
      .tickPadding(tickPadding);

  var svg = container.append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .attr("viewBox", "0  0 " + (width+100) + " " + (height+150))
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  x.domain(data.map(function(d)
  {
    return d.letter;
  }));
  y.domain([0, d3.max(data, function(d)
  {
    return d.frequency;
  })]);

  svg.append("g")
    .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-45)");

  svg.append("text")      // text label for the x axis
    .attr("x", width / 2 )
        .attr("y",  height + margin.bottom -10)
        .style("text-anchor", "middle")
        .text(xLabel);

  svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end");

  svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0-60)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text(yLabel);

  svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d)
    {
      return x(d.letter);
    })
        .attr("width", x.bandwidth())
        .attr("y", function(d)
    {
      return y(d.frequency);
    })
        .attr("height", function(d)
    {
      return height - y(d.frequency);
    })
    .on('mouseover', function(d)
    {
      tooltipBox.transition()
        .duration(20)
        .style("top", (d3.event.pageY - tooltipHeight) + "px")
        .style("left", (d3.event.pageX - tooltipWidth) + "px")
        .style("opacity", .9)
        .text(d.frequency + " " + yUnit)
    })
    .on('mouseout', function(d)
    {
      tooltipBox.transition()
        .duration(500)
        .style("opacity", 0)
    });

}

d3.select("#vis-title").html("Objects Deduplicated by Backup");
