function type(d) {
  d.frequency = +d.frequency;
  return d;
}

function init_replicated_objects(){
  clear_vis();
  var margin = {top: 30, right: 40, bottom: 65, left: 80},
  container = d3.select(".widget2").append("div").classed("svg-container", true),
  width = parseInt(d3.select(".svg-container").style("width")),
  height = parseInt(d3.select(".svg-container").style("height"));

  var formatPercent = d3.format("");

  var x = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1);

  var y = d3.scaleLinear()
      .range([height, 0]);

  var xAxis = d3.axisBottom()
      .scale(x);

  var yAxis = d3.axisLeft()
      .scale(y)
      .tickFormat(formatPercent);

  var svg = container.append("svg").attr("width", width).attr("height", height).attr("preserveAspectRatio", "xMidYMid meet").attr("viewBox", "0  0 " + (width+100) + " " + (height+100))
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  d3.csv("csvs/replicatedobjects.csv", type, function(error, data) {
    x.domain(data.map(function(d) { return d.letter; }));
    y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

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
          .attr("y",  height + margin.bottom )
          .style("text-anchor", "middle")
          .text("Node ID's");

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
          .attr("y", 0 -60)
          .attr("x",0 - (height / 2))
          .attr("dy", "1em")
          .style("text-anchor", "middle")
          .text("# Replicated Objects");

  svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.letter); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.frequency); })
        .attr("height", function(d) { return height - y(d.frequency); });

  });

  d3.select("#vis-title").html("Replicated Objects By Node");
}

function init_af_segments() {
  var margin = {top: 30, right: 40, bottom: 65, left: 80},
  container = d3.select(".widget2").append("div").classed("svg-container", true),
  width = parseInt(d3.select(".svg-container").style("width")),
  height = parseInt(d3.select(".svg-container").style("height"));

  var formatPercent = d3.format("");

  var x = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1);

  var y = d3.scaleLinear()
      .range([height, 0]);

  var xAxis = d3.axisBottom()
      .scale(x);

  var yAxis = d3.axisLeft()
      .scale(y)
      .tickFormat(formatPercent);


  var svg = container.append("svg").attr("width", width).attr("height", height).attr("preserveAspectRatio", "xMidYMid meet").attr("viewBox", "0  0 " + (width+100) + " " + (height+100))
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  d3.csv("csvs/af_segments.csv", type, function(error, data) {
    x.domain(data.map(function(d) { return d.letter; }));
    y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

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
          .attr("y",  height + margin.bottom )
          .style("text-anchor", "middle")
          .text("Volume ID's");

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
          .text("Segment Size (MB)");

  svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.letter); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.frequency); })
        .attr("height", function(d) { return height - y(d.frequency); })
  });

  d3.select("#vis-title").html("AF Segments");
}

function init_backup_test(){
  var margin = {top: 30, right: 40, bottom: 65, left: 80},
  container = d3.select(".widget2").append("div").classed("svg-container", true),
  width = parseInt(d3.select(".svg-container").style("width")),
  height = parseInt(d3.select(".svg-container").style("height"));

  var formatPercent = d3.format("");

  var x = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1);

  var y = d3.scaleLinear()
      .range([height, 0]);

  var xAxis = d3.axisBottom()
      .scale(x);

  var yAxis = d3.axisLeft()
      .scale(y)
      .tickFormat(formatPercent);

  var svg = container.append("svg").attr("width", width).attr("height", height).attr("preserveAspectRatio", "xMidYMid meet").attr("viewBox", "0  0 " + (width+100) + " " + (height+100))
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.csv("csvs/backups.csv", type, function(error, data) {
    x.domain(data.map(function(d) { return d.letter; }));
    y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

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
          .text("File Space");

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
          .text("Actual Size (MB)");

  svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.letter); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.frequency); })
        .attr("height", function(d) { return height - y(d.frequency); })

  });

  d3.select("#vis-title").html("Backup Test");
}

//https://bl.ocks.org/maybelinot/5552606564ef37b5de7e47ed2b7dc099
function init_sunburst() {
    clear_vis();
    var container = d3.select(".widget2").append("div").classed("svg-container", true),
    width = parseInt(d3.select(".svg-container").style("width")),
    height = parseInt(d3.select(".svg-container").style("height")),
    radius = (Math.min(width, height) / 2) - 10;

    var formatNumber = d3.format(",d");

    var x = d3.scaleLinear()
        .range([0, 2 * Math.PI]);

    var y = d3.scaleSqrt()
        .range([0, radius]);

    var color = d3.scaleOrdinal(d3.schemeCategory20);

    var partition = d3.partition();

    var arc = d3.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x0))); })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x1))); })
    .innerRadius(function(d) { return Math.max(0, y(d.y0)); })
    .outerRadius(function(d) { return Math.max(0, y(d.y1)); });


    var svg = container.append("svg").attr("width", width).attr("height", height).attr("preserveAspectRatio", "xMidYMid meet").attr("viewBox", "0  0 " + (width+100) + " " + (height+100))
        .attr("id", "vis")
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

    d3.json("scripts/falseData.json", function(error, root) {
      if (error) throw error;

      root = d3.hierarchy(root);
      root.sum(function(d) { return d.size; });
      svg.selectAll("path")
          .data(partition(root).descendants())
        .enter().append("path")
          .attr("d", arc)
          .style("fill", function(d) { return color((d.children ? d : d.parent).data.name); })
          .on("click", click)
        .append("title")
          .text(function(d) { return d.data.name + "\n" + formatNumber(d.value); });
    });

    function click(d) {
      svg.transition()
          .duration(750)
          .tween("scale", function() {
            var xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
                yd = d3.interpolate(y.domain(), [d.y0, 1]),
                yr = d3.interpolate(y.range(), [d.y0 ? 20 : 0, radius]);
            return function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
          })
        .selectAll("path")
          .attrTween("d", function(d) { return function() { return arc(d); }; });
    }

    d3.select(self.frameElement).style("height", height + "px");

    //change vis title
    d3.select("#vis-title").html("Backup Domains Distribution");
}

function init_pie_test() {
  var url = "http://localhost/";
  	var margin = {top: 50, right: 50, bottom: 50, left: 50};
    var container = d3.select(".widget2").append("div").classed("svg-container", true);
    var width = parseInt(d3.select(".svg-container").style("width"));
    var height = parseInt(d3.select(".svg-container").style("height"));
  	var innerRadius = Math.min(width, height) / 4;
  	var outerRadius = Math.min(width, height) / 3;
  	// ---- label Text STUFF
  	var labelFontSize = "14px"
  	// -------------------
  	// ---- Inner Text STUFF
  	var units = "objects";
  	var numDecimalPlaces = 3;
  	var innerFontSize = "35px";
  	var labelXOffset = "0em";
  	var labelYOffset = "-.5em";
  	var topXOffset = "0em";
  	var topYOffset = ".5em";
  	var bottomXOffset = "0em";
  	var bottomYOffset = "1.5em";
  	// --------------------
  	// --- linelabels STUFF
  	var letterLineLength = 11;
  	var lineToLabelEnd = outerRadius * .2;
  	var lineToLabelStart = outerRadius;
  	// --------------------
  	var color = d3.scaleOrdinal()
  	.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
  	var arc = d3.arc()
  	.outerRadius(outerRadius)
  	.innerRadius(innerRadius);
  	var labelArc = d3.arc()
  	.outerRadius(outerRadius)
  	.innerRadius(innerRadius);
  	var pie = d3.pie()
  	.sort(null)
  	.value(function(d) { return d.count; });
    var svg = container.append("svg").attr("width", width).attr("height", height).attr("preserveAspectRatio", "xMidYMid meet").attr("viewBox", "0  0 " + (width+100) + " " + (height+100))
  	.append("g")
  	.attr("transform", "translate(" + width / 2  + "," + height / 2 + ")");
  	function type(d)
  	{
  		d.count = +d.count;
  		return d;
  	}
  	var total = 0;
  	d3.csv("csvs/data.csv", type, function(error, data)
  	{
  		if (error)
  		{
  			throw error;
  		}
  		data = parseData(data);
  		g = svg.selectAll(".arc")
  		.data(pie(data))
  		.enter().append("g")
  		.attr("class", "arc");
  		createTextBoxes(g);
  		g.append("path")
  		.attr("d", arc)
  		.style("fill", function(d) { return color(d.data.name); })
  		.on("mouseenter", function(d) {
  			innerLabelEnter(d);
  		})
  		.on("mouseout", function(d) {
  			innerLabelExit(d);
  		});
  		// text
  		g.append("text")
  		.attr("text-anchor", "middle")
  		.attr("x", function(d) {
  			var a = calculateAngle(d);
  			var quadrant = Math.cos(a) * (outerRadius + lineToLabelEnd);
  			return quadrantCalculator(quadrant, letterLineLength*d.data.name.length/2);
  		})
  		.attr("y", function(d) {
  			var a = calculateAngle(d);
  			return Math.sin(a) * (outerRadius + lineToLabelEnd) - 5;
  		})
  		.style("font-size", labelFontSize)
  		.text(function(d) { return d.data.name; });
  		// pie2labelline
  		g.append("line")
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
  		.attr("stroke-width", 2)
          .attr("stroke", "black");
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
  		.attr("stroke-width", 2)
  		.attr("stroke", "black");
  		svg.attr("transform", "translate(" + (width/ 2 + margin.left) + "," + (height/ 2 + margin.top) + ")");
  		setTextBoxes(data);
  	});
  	function createTextBoxes(g)
  	{
  		text = g.append("text")
  			.attr("dx", topXOffset)
  			.attr("dy", topYOffset)
  			.style("text-anchor", "middle")
  			.style("fill", "black")
  			.style("font-size", innerFontSize)
  			.attr("class", "on")
  			.text(" ");
  		bottomText = g.append("text")
  		.attr("dx", bottomXOffset)
  		.attr("dy", bottomYOffset)
  		.style("text-anchor", "middle")
  		.style("fill", "black")
  		.style("font-size", innerFontSize)
  		.attr("class", "on")
  		.text(" ");
  		labelText = g.append("text")
  		.attr("dx", labelXOffset)
  		.attr("dy", labelYOffset)
  		.style("text-anchor", "middle")
  		.style("fill", "black")
  		.style("font-size", innerFontSize)
  		.attr("class", "on")
  		.text(" ");
  	}
  	function setTextBoxes(data)
  	{
  		text.text(total + " " + units);
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
  	function calculateAngle(data)
  	{
  		return data.startAngle + (data.endAngle - data.startAngle)/2 - Math.PI/2;
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
  	function parseData(data)
  	{
  		var compressed = compressArray(data);
  		var parsedData = customFilterData(compressed);
  		return parsedData;
  	}
  	function compressArray(original)
  	{
  		var copy = [original[0]]
  		for(i = 1; i < original.length; i++)
  		{
  			var notFound = true;
  			for (j = 0; j < copy.length; j ++)
  			{
  				if (original[i].name == copy[j].name)
  				{
  					notFound = false;
  					total += original[i].count;
  					copy[j].count += original[i].count;
  				}
  			}
  			if (notFound)
  			{
  				total += original[i].count;
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

  d3.select("#vis-title").html("Object Count by Container");
}

function init_pool_test() {
  var margin = {top: 30, right: 40, bottom: 65, left: 80},
    width = 1100 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;
    var formatPercent = d3.format("");

    var x = d3.scaleBand()
      .rangeRound([0, width])
      .padding(0.1);

    var y = d3.scaleLinear()
        .range([height, 0]);

    var xAxis = d3.axisBottom()
        .scale(x);

    var yAxis = d3.axisLeft()
        .scale(y)
        .tickFormat(formatPercent);

    var color = d3.scaleOrdinal(d3.schemeCategory20);

    var partition = d3.partition();

    var container = d3.select(".widget2").append("div").classed("svg-container", true);
    var widgetwidth = parseInt(d3.select(".svg-container").style("width"));
    var widgetheight = parseInt(d3.select(".svg-container").style("height"));
    var svg = container.append("svg").attr("width", widgetwidth).attr("height", widgetheight).attr("preserveAspectRatio", "xMidYMid meet").attr("viewBox", "0  0 " + (widgetwidth+100) + " " + (widgetheight+100))
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.csv("csvs/stgPool.csv", type, function(error, data) {
  x.domain(data.map(function(d) { return d.letter; }));
  y.domain([0, d3.max(data, function(d) { return d.frequency; })]);
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
        .text("Storage Pool");
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
        .text("Actual Size (MB)");

svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.letter); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.frequency); })
      .attr("height", function(d) { return height - y(d.frequency); })
});

d3.select("#vis-title").html("Storage Pool Test");
}

function init_heatmap() {
  var circleColors = ["darkblue", "blue", "seagreen", "Turquoise", "SpringGreen", "greenyellow", "yellow", "orange", "orangered", "red"];
  var textColors = ["white", "white", "black", "black", "black", "black", "black", "black", "black", "black"];
  var distro = ["0 - 10", "10 - 20", "20 - 30", "30 - 40", "40 - 50", "50 - 60", "60 - 70", "70 - 80", "80 - 90", "90 - 100"];
  var container = d3.select(".widget2").append("div").classed("svg-container", true);
  var widgetwidth = parseInt(d3.select(".svg-container").style("width"));
  var widgetheight = parseInt(d3.select(".svg-container").style("height"));
  container.append("svg").classed("heatmap", true).attr("width", widgetwidth).attr("height", widgetheight).attr("preserveAspectRatio", "xMidYMid meet").attr("viewBox", "0  0 " + (widgetwidth+100) + " " + (widgetheight+100));
  //.attr("width", widgetwidth - 32).attr("height", widgetheight + 87)
  var svg = d3.select("svg");
  var bubblePadding = 3;
  var format = d3.format(",d");
  var legendTileSize = 50;
  var infoBubblePadding = 15;
  var infoBubbleFontSize = "10px";
  var legendXTextPadding = -5; // Negative shifts text to the left.
  var r = 75;
  var offset = 150;
  var x = r + 1;
  var y = widgetheight * .9;
  function addCircle(d)
  {
  	svg.append("circle")
  		.attr("r", r)
  		.style("fill", grabCicleColor(d.value))
  		.style("stroke", "black")
  		.style("stroke-width", 2)
  		.attr("transform", function(d) {
  			return "translate(" + r + "," + y + ")";
  		})
  		.attr("class", "bubbleCircle");
  	svg.append("text")
  		.attr("x", x)
  		.attr("y", y)
  		.attr("dy", - infoBubblePadding)
  		.attr("width", legendTileSize)
  		.attr("height", legendTileSize)
  		.style("text-anchor", "middle")
  		.style("font-size", infoBubbleFontSize)
  		.text(d.class)
  		.attr("class", "bubbleText");
  	svg.append("text")
  		.attr("x", x)
  		.attr("y", y)
  		.attr("dy", infoBubblePadding)
  		.attr("width", legendTileSize)
  		.attr("height", legendTileSize)
  		.style("text-anchor", "middle")
  		.style("font-size", infoBubbleFontSize)
  		.text(d.value)
  		.attr("class", "bubbleText");
  }
  function moveCircle(offset)
  {
  	d3.selectAll(".bubbleCircle")
  	.transition()
    	.delay(100)
  	.attr("transform", function(d) {
  		var x = d3.select(this)["_groups"][0][0]["transform"]["baseVal"][0]["matrix"]["e"];
  		return "translate(" + (x + 2*offset) + "," + y + ")";
  	});
  }
  function moveText(offset)
  {
  	d3.selectAll(".bubbleText")
  	.transition()
  	.delay(100)
  	.attr("x", function (d) {
  		var x = d3.select(this)["_groups"][0][0]["x"]["baseVal"][0]["value"] + 2*offset;
  		return x;
  	})
  }
  function grabTextColor(number)
  {
  	var divideColor = d3.scaleLinear().domain([minColor, maxColor]).range([0, 1]);
  	var pickColor = d3.scaleLinear().domain([0, .1, .2, .3, .4, .5, .6, .7, .8, .9]).range(textColors);
  	var color = divideColor(number);
  	return pickColor(color);
  }
  function grabCicleColor(number)
  {
  	var divideColor = d3.scaleLinear().domain([minColor, maxColor]).range([0, 1]);
  	var pickColor = d3.scaleLinear().domain([0, .1, .2, .3, .4, .5, .6, .7, .8, .9]).range(circleColors);
  	var color = divideColor(number);
  	return pickColor(color);
  }
  var pack = d3.pack()
  .size([widgetwidth, widgetheight*.8])
  .padding(bubblePadding);
  var maxColor = 0;
  var minColor = 9999999999999;
  d3.csv("csvs/heatmap.csv", function(d) {
  	d.value = +d.value;
  	if (d.value > 1)
  	{
  		if (d.value < minColor)
  		{
  			minColor = d.value;
  		}
  		if (d.value > maxColor)
  		{
  			maxColor = d.value;
  		}
  		return d;
  	}
  }, function(error, classes)
  	{
  		if (error)
  		{
  			throw error;
  	 	}
  		var root = d3.hierarchy({children: classes})
  		.sum(function(d) { return d.value; })
  		.each(function(d) {
  			if (id = d.data.id) {
  				var id, i = id.lastIndexOf(".");
  				d.id = id;
  				d.package = id.slice(0, i);
  				d.class = id.slice(i + 1);
  			}
  		});
  		var node = svg.selectAll(".node")
  		.data(pack(root).leaves())
  		.enter().append("g")
  		.attr("class", "node")
  		.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  		node.append("circle")
  		.attr("id", function(d) { return d.id; })
  		.attr("r", function(d) { return d.r; })
  		.style("fill", function(d) { return grabCicleColor(d.value); })
  		.on("click", function(d) {
  			moveCircle(offset);
  			moveText(offset);
  			addCircle(d);
  		})
  		.on("mouseover", function(d) {
  		  d3.select(this).attr("r", d.r + bubblePadding)
  		  .style("stroke", "black")
  		  .style("stroke-width", 2);
  		})
  		.on("mouseout", function(d) {
  		  d3.select(this).attr("r", d.r)
  		  .style("stroke-width", 0);
  		});
  		node.append("clipPath")
  		.attr("id", function(d) { return "clip-" + d.id; })
  		.append("use")
  		.attr("xlink:href", function(d) { return "#" + d.id; });
  		node.append("title")
  		.text(function(d) { return d.id + "\n" + format(d.value); });
  		createColorLegend();
  	});
  	function createColorLegend()
  	{
  		for(i = 0; i < circleColors.length; i++)
  		{
  			var offset = 20;
  			// Colored rectangles for legend
  			svg.append("rect")
  			.attr("x", widgetwidth - legendTileSize)
  			.attr("y", legendTileSize * i)
  			.attr("width", legendTileSize)
  			.attr("height", legendTileSize)
  			.style("fill", circleColors[i])
  			// Text labels for the colored rectangles.
  			svg.append("text")
  			.attr("x", widgetwidth - legendTileSize + legendXTextPadding)
  			.attr("y", (legendTileSize * i) + legendTileSize/2)
  			.attr("dy", ".5em")
  			.attr("width", legendTileSize)
  			.attr("height", legendTileSize)
  			.style("text-anchor", "end")
  			.text(distro[i] + "%");
  		}
  	}

  d3.select("#vis-title").html("Heat Map Test");
}
