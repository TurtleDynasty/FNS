function type(d)
{
	d.frequency = +d.frequency;
	return d;
}

function init_replicated_objects()
{
	var margin = {top: 30, right: 40, bottom: 100, left: 80};
	var container = d3.select(".widget2").append("div").classed("svg-container", true);
	var width = parseInt(d3.select(".svg-container").style("width"));
	var height = parseInt(d3.select(".svg-container").style("height"));

	var xLabel = "Node Names";
	var yLabel = "Number of Replicated Objects";
	var tickPadding = "20";

	var tooltipHeight = 32;
	var tooltipWidth = 0;
	var tooltipBox = d3.select("body").append("div")
    	.attr("class", "tooltip")
    	.style("opacity", 0);

	var formatPercent = d3.format("");

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
		.attr("viewBox", "0  0 " + (width+100) + " " + (height+100))
		.append("g")
    	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  	d3.csv("csvs/replicatedObjects.csv", type, function(error, data)
	{
    	x.domain(data.map(function(d)
		{
			return d.nodeName;
		}));
    	y.domain([0, d3.max(data, function(d)
		{
			return d.replCount;
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
        	.attr("y",  height + margin.bottom )
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
        	.attr("y", 0 -60)
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
				return x(d.nodeName);
			})
        	.attr("width", x.bandwidth())
        	.attr("y", function(d)
			{
				return y(d.replCount);
			})
        	.attr("height", function(d)
			{
				return height - y(d.replCount);
			})
        	.on('mouseover', function(d)
			{
				tooltipBox.transition()
  		  			.duration(20)
    				.style("top", (d3.event.pageY - tooltipHeight) + "px")
  					.style("left", (d3.event.pageX - tooltipWidth) + "px")
  					.style("opacity", .9)
  					.text(d.replCount + " " + "replicated")
  	  		})
        	.on('mouseout', function(d)
			{
  				tooltipBox.transition()
  		  			.duration(500)
  					.style("opacity", 0)
  	  		});
  	});
	function type(d) {
    	d.replCount = +d.replCount;
    	return d;
  	}

d3.select("#vis-title").html("Replicated Objects By Node");
}

function init_af_segments()
{
	var margin = {top: 30, right: 40, bottom: 100, left: 80};
    var container = d3.select(".widget2").append("div").classed("svg-container", true);
    var width = parseInt(d3.select(".svg-container").style("width"));
    var height = parseInt(d3.select(".svg-container").style("height"));

	var xUnit = "";
	var xLabel = "Volume ID's" + xUnit;
	var yUnit = "MB";
    var yLabel = "Segment Size (" + yUnit + ")";
    var tickPadding = "20";

	var tooltipHeight = 32;
    var tooltipWidth = 0;
    var tooltipBox = d3.select("body").append("div")
  		.attr("class", "tooltip")
  		.style("opacity", 0);

	var formatPercent = d3.format("");

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
		.attr("viewBox", "0  0 " + (width+100) + " " + (height+100))
    	.append("g")
    	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	d3.csv("csvs/af_segments.csv", type, function(error, data)
	{
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
        	.attr("y",  height + (margin.bottom/2))
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
  	});
d3.select("#vis-title").html("AF Segments");
}

function init_backup_test(){
	var margin = {top: 30, right: 40, bottom: 100, left: 80};
    var container = d3.select(".widget2").append("div").classed("svg-container", true);
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
    var formatPercent = d3.format("");
    var x = d3.scaleBand()
  		.rangeRound([0, width])
  		.padding(0.1);
    var y = d3.scaleLinear()
  		.range([height, 0]);
    var xAxis = d3.axisBottom(x);
    var yAxis = d3.axisLeft(y)
  		.tickFormat(formatPercent)
  		.tickPadding(tickPadding);
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
        	.attr("x", function(d) { return x(d.letter); })
        	.attr("width", x.bandwidth())
        	.attr("y", function(d) { return y(d.frequency); })
        	.attr("height", function(d) { return height - y(d.frequency); })
			.on('mouseover', function(d) {
				tooltipBox.transition()
					.duration(20)
					.style("top", (d3.event.pageY - tooltipHeight) + "px")
					.style("left", (d3.event.pageX - tooltipWidth) + "px")
					.style("opacity", .9)
					.text(d.frequency + " " + yUnit)
			})
			.on('mouseout', function(d) {
				tooltipBox.transition()
					.duration(500)
					.style("opacity", 0)
			});
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

/*    var container = d3.select(".widget2").append("div").classed("svg-container", true);
    var width = parseInt(d3.select(".svg-container").style("width"));
    var height = parseInt(d3.select(".svg-container").style("height"));
    var svg = container.append("svg").attr("width", width).attr("height", height).attr("preserveAspectRatio", "xMidYMid meet").attr("viewBox", "0  0 " + (width+100) + " " + (height+100))
  */
function init_pie_test() {
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
	var pieSegmentPullOut = 5;
	var piePullOutDuration = 500;
	// --------------------
	var color = d3.scaleOrdinal()
		.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
	var arc = d3.arc()
		.innerRadius(innerRadius)
		.outerRadius(outerRadius);
	var arcOver = d3.arc()
		.innerRadius(innerRadius)
		.outerRadius(outerRadius + pieSegmentPullOut);
	var labelArc = d3.arc()
		.innerRadius(innerRadius)
		.outerRadius(outerRadius);
	var pie = d3.pie()
		.sort(null)
		.value(function(d) { return d.count; });
	var svg = container.append("svg").attr("width", width).attr("height", height).attr("preserveAspectRatio", "xMidYMid meet").attr("viewBox", "0  0 " + (width+100) + " " + (height+100))
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform", "translate(" + width / 2  + "," + height / 2 + ")");
	function type(d)
	{
		d.count = +d.count;
		return d;
	}
	//outer most circle
	svg.append("circle")
		.attr("r", outerRadius + pieSegmentPullOut)
		.style("fill", "#eff3f7")
		.attr("transform", function(d) {
			return "translate(" + 0 + "," + 0 + ")";
		});
	//white circle within the pie
	svg.append("circle")
		.attr("r", innerRadius + 1)
		.style("fill", "#eff3f7")
		.style("stroke", "black")
		.style("stroke-width", 2)
		.attr("transform", function(d) {
			return "translate(" + 0 + "," + 0 + ")";
		});
	function changeArc(className, arc)
	{
		d3.select(className)
			.transition()
			.duration(piePullOutDuration)
			.attr("d", arc);
	}
	function changeLine(d, offset)
	{
		className = "." + d.data.name;
		d3.select(className)
			.transition()
			.duration(piePullOutDuration)
			.attr("x1", function(d) {
				var a = calculateAngle(d);
				return Math.cos(a) * (lineToLabelStart + offset);
			})
			.attr("y1", function(d) {
				var a = calculateAngle(d);
				return Math.sin(a) * (lineToLabelStart + offset);
			})
	}
	function addPieSegments()
	{
		console.log("here");
		g.append("path")
		.attr("d", arc)
		.style("fill", function(d) { return color(d.data.name); })
		.on("mouseenter", function(d) {
			innerLabelEnter(d);
			changeArc(this, arcOver);
			changeLine(d, pieSegmentPullOut);
		})
		.on("mouseout", function(d) {
			innerLabelExit(d);
			changeArc(this, arc);
			changeLine(d, 0);
		});
	}
	function addLabel()
	{
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
	}
	function addPieToLabelLine()
	{
		// pie2labelline
		g.append("line")
		.attr("class", function (d) {
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
		.attr("stroke-width", 2)
		.attr("stroke", "black");
	}
	function moveGraphToCenter()
	{
		svg.attr("transform", "translate(" + (width/ 2 + margin.left) + "," + (height/ 2 + margin.top) + ")");
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
		.attr("stroke-width", 2)
		.attr("stroke", "black");
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
		addPieSegments();
		addLabel();
		addPieToLabelLine();
		addPieLabelUnderLine();
		moveGraphToCenter();
		setTextBoxes(data);
	});
	function createTextBoxes(g)
	{
		text = g.append("text")
			.attr("transform", 0)
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
	var margin = {top: 30, right: 40, bottom: 65, left: 80};
	var container = d3.select(".widget2").append("div").classed("svg-container", true);
	var width = parseInt(d3.select(".svg-container").style("width"));
	var height = parseInt(d3.select(".svg-container").style("height"));
	var xUnit = "";
	var xLabel = "Storage Pool" + xUnit;
	var yUnit = "MB"
	var yLabel = "Actual Size" + " " + "(" + yUnit + ")";
	var tickPadding = "15";
	var tooltipHeight = 32;
	var tooltipWidth = 0;
	var tooltipBox = d3.select("body").append("div")
    	.attr("class", "tooltip")
    	.style("opacity", 0);
	var formatPercent = d3.format("");
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
		.attr("viewBox", "0  0 " + (width+100) + " " + (height+100))
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
        	.attr("x", function(d) { return x(d.letter); })
        	.attr("width", x.bandwidth())
    		.attr("y", function(d) { return y(d.frequency); })
        	.attr("height", function(d) { return height - y(d.frequency); })
  			.on('mouseover', function(d) {
  				tooltipBox.transition()
  					.duration(20)
  					.style("top", d3.event.pageY - tooltipHeight + "px")
  					.style("left", d3.event.pageX - tooltipWidth + "px")
  					.style("opacity", .9)
  					.text(d.frequency + " " + yUnit)
  	  		})
  			.on('mouseout', function(d) {
  			tooltipBox.transition()
  				.duration(500)
  				.style("opacity", 0)
  	  		});

	});

	function type(d) {
    	d.frequency = +d.frequency;
    	return d;
  	}

  d3.select("#vis-title").html("Storage Pool Test");
}

function init_heatmap() {
  var circleInView = {"darkblue": false,
  					"blue": false,
  					"seagreen": false,
  					"Turquoise": false,
  					"SpringGreen": false,
  					"greenyellow": false,
  					"yellow": false,
  					"orange": false,
  					"orangered":false,
  					"red": false};

  var circleColors = ["darkblue",
  					"blue",
  					"seagreen",
  					"Turquoise",
  					"SpringGreen",
  					"greenyellow",
  					"yellow",
  					"orange",
  					"orangered",
  					"red"];

  var distro = ["0 - 10",
  			"10 - 20",
  			"20 - 30",
  			"30 - 40",
  			"40 - 50",
  			"50 - 60",
  			"60 - 70",
  			"70 - 80",
  			"80 - 90",
  			"90 - 100"];

  var container = d3.select(".widget2").append("div").classed("svg-container", true);
  var width = parseInt(d3.select(".svg-container").style("width"));
  var height = parseInt(d3.select(".svg-container").style("height"));
  container.append("svg").classed("heatmap", true).attr("width", width).attr("height", height).attr("preserveAspectRatio", "xMidYMid meet").attr("viewBox", "0  0 " + (width+100) + " " + (height+100));
  //.attr("width", widgetwidth - 32).attr("height", widgetheight + 87)
  var svg = d3.select("svg");
  var bubblePadding = 3;
  var format = d3.format(",d");
  var legendTileSize = 50;
  var deletionCircleSize = 10;
  var bubbleGraphYOffset = 0;
  var infoBubblePadding = 15;
  var infoBubbleFontSize = "10px";
  var legendXTextPadding = -5; // Negative shifts text to the left.
  var r = 80;
  var offset = 80;
  var x = r + 1;
  var y = height * .9;
  var deletionCirclePadding = 25;
  function moveCircle(offset, xCord)
  {
  	d3.selectAll(".bubbleCircle")
  	.transition()
    	.duration(50)
  	.attr("transform", function(d) {
  		var x = d3.select(this)["_groups"][0][0]["transform"]["baseVal"][0]["matrix"]["e"];
  		var y = d3.select(this)["_groups"][0][0]["transform"]["baseVal"][0]["matrix"]["f"];
  		if (x > xCord)
  		{
  			var y = d3.select(this)["_groups"][0][0]["transform"]["baseVal"][0]["matrix"]["f"];
  			return "translate(" + (x + 2*offset) + "," + y + ")";
  		}
  		else if (x < xCord)
  		{
  			return "translate(" + x + "," + y + ")";
  		}
  		else
  		{
  			return "translate(-200,9001)";
  		}

  	});
  }
  function moveText(offset, xCord)
  {
  	d3.selectAll(".bubbleText")
  	.transition()
  	.duration(50)
  	.attr("y", function (d) {
  		var x = d3.select(this)["_groups"][0][0]["x"]["baseVal"][0]["value"];
  		var y = d3.select(this)["_groups"][0][0]["y"]["baseVal"][0]["value"];
  		if (x != xCord)
  		{
  			return y;
  		}
  		else
  		{
  			return 9001;
  		}
  	})
  	.attr("x", function (d) {
  		var x = d3.select(this)["_groups"][0][0]["x"]["baseVal"][0]["value"];
  		if (x > xCord)
  		{
  			x = x + 2*offset;
  			return x;
  		}
  		else if (x < xCord)
  		{
  			return x;
  		}
  		else
  		{
  			return -200;
  		}
  	});
  }
  function addCircle(d, className)
  {
  	addLargeCircle(d, className);
  	addTextBackground(d, className)
  	addTopText(d, className);
  	addBottomText(d, className);
  	addDeletionCircle(d, className)
  }
  function highlightCircle(className)
  {
  	var opacity = d3.select(className)["_groups"][0][0]["style"]["opacity"];
  	var to = [1,0];
  	var from = [0,1];
  	if (to[opacity] != null)
  	{
  		d3.select(className)
  		.style("opacity", to[opacity])
  		.transition()
  		.duration(200)
  		.style("opacity", from[opacity])
  		.transition()
  		.duration(300);
  	}
  }
  function addLargeCircle(d, className)
  {
  	svg.append("circle")
  		.attr("r", r)
  		.style("fill", grabColor(d.value, circleColors))
  		.style("stroke", "black")
  		.style("stroke-width", 2)
  		.attr("transform", function(d) {
  			return "translate(" + r + "," + (y - bubbleGraphYOffset) + ")";
  		})
  		.attr("class", "bubbleCircle")
  		.on("click", function(d) {
  			highlightCircle(className);
  		});
  }
  function addDeletionCircle(d, className)
  {
  	svg.append("circle")
  		.attr("r", deletionCircleSize)
  		.style("fill", "red")
  		.style("stroke", "black")
  		.style("stroke-width", 2)
  		.attr("transform", function(d) {
  			return "translate(" + r + "," + (y - bubbleGraphYOffset + r + deletionCirclePadding) + ")";
  		})
  		.attr("class", "bubbleCircle")
  		.on("click", function(d) {
  					var x = d3.select(this)["_groups"][0][0]["transform"]["baseVal"][0]["matrix"]["e"];
  					moveCircle(-offset, x);
  					moveText(-offset, x);
  				});
  	var whiteWidth = 15;
  	var whiteHeight = 7;
  	svg.append("rect")
  		.attr("width", whiteWidth)
  		.attr("height", whiteHeight)
  		.style("fill", "white")
  		.style("stroke", "black")
  		.style("stroke-width", 1)
  		.attr("transform", function(d) {
  			return "translate(" + (r - whiteWidth/2) + "," + (y + r - whiteHeight/2 + deletionCirclePadding) + ")";
  		})
  		.attr("class", "bubbleCircle")
  		.on("click", function(d) {
  					var x = d3.select(this)["_groups"][0][0]["transform"]["baseVal"][0]["matrix"]["e"];
  					moveCircle(-offset, x);
  					moveText(-offset, x);
  				});
  }
  function addTextBackground(d, className)
  {
  	svg.append("circle")
  		.attr("r", r - 10)
  		.style("fill", "#eff3f7")
  		.style("stroke", "black")
  		.style("stroke-width", 2)
  		.attr("transform", function(d) {
  			return "translate(" + r + "," + (y - bubbleGraphYOffset) + ")";
  		})
  		.attr("class", "bubbleCircle")
  		.on("click", function(d) {
  			highlightCircle(className);
  		});
  }
  function addTopText(d, className)
  {
  	svg.append("text")
  		.attr("x", x)
  		.attr("y", y - bubbleGraphYOffset)
  		.attr("dy", - infoBubblePadding)
  		.attr("width", legendTileSize)
  		.attr("height", legendTileSize)
  		.style("text-anchor", "middle")
  		.style("font-weight", "bolder")
  		.style("font-size", infoBubbleFontSize)
  		.text(d.class)
  		.style("fill", "black")
  		.attr("class", "bubbleText")
  		.on("click", function(d) {
  			highlightCircle(className);
  		});
  }
  function addBottomText(d, className)
  {
  	svg.append("text")
  		.attr("x", x)
  		.attr("y", y - bubbleGraphYOffset)
  		.attr("dy", infoBubblePadding)
  		.attr("width", legendTileSize)
  		.attr("height", legendTileSize)
  		.style("text-anchor", "middle")
  		.style("font-size", infoBubbleFontSize)
  		.text(d.value)
  		.style("fill", "black")
  		.attr("class", "bubbleText")
  		.on("click", function(d) {
  			highlightCircle(className);
  		});
  }
  function grabClassColor(number)
  {
  	var divideColor = d3.scaleLinear().domain([minColor, maxColor+1]).range([0, 1]);
  	var index = Math.floor(divideColor(number) * 10);
  	return circleColors[index];
  }
  function grabColor(number, colors)
  {
  	var divideColor = d3.scaleLinear().domain([minColor, maxColor]).range([0, 1]);
  	var pickColor = d3.scaleLinear().domain([0, .1, .2, .3, .4, .5, .6, .7, .8, .9]).range(colors);
  	var color = divideColor(number);
  	return pickColor(color);
  }
  var legendWidth = 100;
  var pack = d3.pack()
  .size([width - legendWidth, height/1.175])
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

  		addDataCircles(root);
  		createColorLegend();

  	});
  	function applyBoader(data, className, strokeWidth, offset)
  	{
  		d3.select(className).attr("r", data.r + offset)
  		.style("stroke", "black")
  		.style("stroke-width", strokeWidth);
  	}
  	function addDataCircles(root)
  	{
  		var node = svg.selectAll(".node")
  		.data(pack(root).leaves())
  		.enter().append("g")
  		.attr("class", "node")
  		.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  		node.append("circle")
  		.attr("id", function(d) { return d.id; })
  		.attr("r", function(d) { return d.r; })
  		.attr("transform", function (d)
  		{
  			return "translate(0," + bubbleGraphYOffset + ")";
  		})
  		.attr("class", function(d) { return grabClassColor(d.value); })
  		.style("fill", function(d) { return grabColor(d.value, circleColors); })
  		.style("opacity", 1)
  		.on("dblclick", function(d) {
  			var opacity = d3.select(this)["_groups"][0][0]["style"]["opacity"];
  			if (opacity == 1)
  			{
  				moveCircle(offset, 0);
  				moveText(offset, 0);
  				addCircle(d, this);
  			}
  		})
  		.on("mouseover", function(d) {
  			applyBoader(d, this, 2, bubblePadding);
  			var legendTile = "." + grabClassColor(d.value) + "L";
  			d3.select(legendTile)
  			.style("stroke-width", function (d)
  			{
  				var opacity = d3.select(legendTile)["_groups"][0][0]["style"]["fill-opacity"];
  				if (opacity == 1)
  				{
  					return 5;
  				}
  				else
  				{
  					return 3;
  				}
  			});
  		})
  		.on("mouseout", function(d) {
  			applyBoader(d, this, 0, 0);
  			var className = "." + grabClassColor(d.value) + "L";
  			d3.select(className)
  			.style("stroke-width", 3);
  		});
  	}
  	function createColorLegend()
  	{
  		var legendPadding = 20;
  		for(i = 0; i < circleColors.length; i++)
  		{
  			var offset = 20;
  			// Colored rectangles for legend
  			legendTile = svg.append("rect")
  			.attr("class", circleColors[i] + "L")
  			.attr("rx", 10)
  			.attr("ry", 10)
  			.attr("x", width - legendTileSize-30)
  			.attr("y", legendTileSize * i + legendPadding * i)
  			.attr("width", legendTileSize)
  			.attr("height", legendTileSize)
  			.style("fill", circleColors[i])
  			.style("stroke", circleColors[i])
  			.style("stroke-width", 3)
  			.style("fill-opacity", 1)
  			.on("click", function(d) {
  				var fillColor = d3.select(this)["_groups"][0][0]["style"]["fill"];
  				var strokeColor = d3.select(this)["_groups"][0][0]["style"]["stroke"];
  				toggleVisibility(d, "." + fillColor);
  			})
  			// Text labels for the colored rectangles.
  			svg.append("text")
  			.attr("x", width - legendTileSize + legendXTextPadding-30)
  			.attr("y", (legendTileSize * i) + legendTileSize/2 + legendPadding*i)
  			.attr("dy", ".5em")
  			.attr("width", legendTileSize)
  			.attr("height", legendTileSize)
  			.style("text-anchor", "end")
  			.text(distro[i] + "%");
  		}
  	}
  	function toggleVisibility(data, color)
  	{
  		// Toggles whether a color is visible or not. aka makes it invisible
  		subColor = color.substring(1);
  		circleInView[subColor] = !circleInView[subColor];
  		d3.selectAll(color)
  		.style("opacity", function(d) {
  			if (circleInView[subColor])
  			{
  				return 0;
  			}
  			else
  			{
  				return 1;
  			}
  		})
  		.transition()
  		.duration(0);
  		var legendTile = color + "L";
  		d3.select(legendTile)
  		.style("fill-opacity", function(d) {
  			if (circleInView[subColor])
  			{
  				return 0;
  			}
  			else
  			{
  				return 1;
  			}
  		})
  	}

  d3.select("#vis-title").html("Heat Map Test");
}

function init_scatter_test(){
	// scroll-over circle enlargement
	var dotSize = 3.5;
	var dotPadding = 5;
	// setup margin
    var margin = {top: 20, right: 20, bottom: 30, left: 50};
    var margin = {top: 20, right: 20, bottom: 30, left: 50};
    var container = d3.select(".widget2").append("div").classed("svg-container", true);
    var width = parseInt(d3.select(".svg-container").style("width"));
    var height = parseInt(d3.select(".svg-container").style("height"));
    container.append("svg").classed("svg-container", true).attr("width", width).attr("height", height).attr("preserveAspectRatio", "xMidYMid meet").attr("viewBox", "0  0 " + (width+100) + " " + (height+100));
	var tickPadding = "10";
	var xUnit = "";
	var xAxisLabel = "File Space ID" + xUnit;
	var yUnit = "bytes";
	var yAxisLabel = "Actual Size (" + yUnit + ")";
	// setup x
	var xValue = function(d) { return d.X;}, // data -> value
    	xScale = d3.scaleLinear().range([0, width]), // value -> display
    	xMap = function(d) { return xScale(xValue(d));}; // data -> display
    	// xAxis = d3.svg.axis().scale(xScale).orient("bottom");
		// setup y
		var yValue = function(d) { return d["Y"];}, // data -> value
    		yScale = d3.scaleLinear().range([height, 0]), // value -> display
    		yMap = function(d) { return yScale(yValue(d));}; // data -> display
    	// yAxis = d3.svg.axis().scale(yScale).orient("left");
		// setup fill color
		var cValue = function(d) { return d.Type;},
    		color = d3.scaleOrdinal(d3.schemeCategory10);
		// add the graph canvas to the body of the webpage
		var svg = d3.select("svg")
			.append("g")
    		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		// add the tooltip area to the webpage
		var tooltip = d3.select("body").append("div")
			.attr("class", "tooltip")
			.style("opacity", 0);
		// load data
		d3.csv("csvs/cereal.csv", function(error, data) {
			if (error)
			{
				throw error;
			}
		// change string (from CSV) into number format
		data.forEach(function(d) {
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
	function drawLegend()
	{
		// draw legend
		var legend = svg.selectAll(".legend")
			.data(color.domain())
			.enter().append("g")
			.attr("class", "legend")
			.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
		// draw legend colored rectangles
		legend.append("rect")
			.attr("class", color)
			.attr("fill-opacity", 1)
			.attr("x", width - 18)
			.attr("width", 18)
			.attr("height", 18)
			.style("stroke", "black")
			.style("stroke-fill", 2)
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
				//.style("opacity", 0);
			});
		// draw legend text
		legend.append("text")
			.attr("x", width - 24)
			.attr("y", 9)
			.attr("dy", ".35em")
			.style("text-anchor", "end")
			.text(function(d) { return d;})
	}
	function createXAxis()
	{
		// x-axis
		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(xScale))
		svg.append("text")
			.attr("class", "label")
			.attr("transform", "rotate(0)")
			.attr("y", height + 20)
			.attr("x", width/2)
			.attr("dy", "1em")
			.style("text-anchor", "middle")
			.text(xAxisLabel);
	}
	function createYAxis()
	{
		// y-axis
		svg.append("g")
			.call(d3.axisLeft(yScale).tickPadding(["10"]))
			.attr("class", "y axis");
		svg.append("text")
			.attr("class", "label")
			.attr("transform", "rotate(-90)")
			.attr("y", 0 - margin.left)
			.attr("x", 0 - (height / 2) - 5)
			.attr("dy", "1em")
			.style("text-anchor", "middle")
			.text(yAxisLabel);
	}
	function drawDots(data)
	{
		// draw dots
		svg.selectAll(".dot")
			.data(data)
			.enter().append("circle")
			.attr("class", function(d) { return d.Type.replace(/\s/g, '');})
			.attr("r", dotSize)
			.attr("cx", function(d) { return xScale(d.X);})
			.attr("cy", function(d) { return yScale(d.Y);})
			.style("fill", function(d) { return color(cValue(d));})
			.style("fill-opacity", 1)
			.on("mouseover", function(d) {
				console.log(d3.select(this)["_groups"][0][0]);
				d3.select(this).attr("r", dotSize + dotPadding);
				var test = d3.select(this)["_groups"][0][0]["style"]["fill-opacity"];
				console.log(test);
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
			.on("mouseout", function(d) {
				d3.select(this).attr("r", dotSize);
				tooltip.transition()
					.duration(500)
					.style("opacity", 0);
			});
	}

  d3.select("#vis-title").html("Scatter Plot Test");
}

function init_occupancy_test(){
    var margin = {top: 30, right: 40, bottom: 100, left: 80};
    var container = d3.select(".widget2").append("div").classed("svg-container", true);
    var width = parseInt(d3.select(".svg-container").style("width"));
    var height = parseInt(d3.select(".svg-container").style("height"));
    container.append("svg").classed("svg-container", true).attr("width", width).attr("height", height).attr("preserveAspectRatio", "xMidYMid meet").attr("viewBox", "0  0 " + (width+100) + " " + (height+100));
  	var xLabel = "Node Names";
  	var yLabel = "Number of Files";
  	var tickPadding = "20";
  	var tooltipHeight = 32;
  	var tooltipWidth = 0;
  	var tooltipBox = d3.select("body").append("div")
      	.attr("class", "tooltip")
      	.style("opacity", 0);
  	var formatPercent = d3.format("");
  	var x = d3.scaleBand()
      	.rangeRound([0, width])
  		.padding(0.1);
  	var y = d3.scaleLinear()
      	.range([height, 0]);
  	var xAxis = d3.axisBottom(x);
  	var yAxis = d3.axisLeft(y)
      	.tickFormat(formatPercent)
  		.tickPadding(tickPadding);
  	var svg = d3.select("svg")
    	.append("g")
      	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  	d3.csv("csvs/occupancy.csv", type, function(error, data) {
    	x.domain(data.map(function(d) { return d.nodeName; }));
    	y.domain([0, d3.max(data, function(d) { return d.numFiles; })]);
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
          	.attr("y", 0 -60)
          	.attr("x",0 - (height / 2))
          	.attr("dy", "1em")
          	.style("text-anchor", "middle")
          	.text(yLabel);
  		svg.selectAll(".bar")
        	.data(data)
      		.enter().append("rect")
        	.attr("class", "bar")
        	.attr("x", function(d) { return x(d.nodeName); })
        	.attr("width", x.bandwidth())
        	.attr("y", function(d) { return y(d.numFiles); })
        	.attr("height", function(d) { return height - y(d.numFiles); })
        	.on('mouseover', function(d) {
  				tooltipBox.transition()
  		  			.duration(20)
    				.style("top", (d3.event.pageY - tooltipHeight) + "px")
  					.style("left", (d3.event.pageX - tooltipWidth) + "px")
  					.style("opacity", .9)
  					.text(d.numFiles + " " + "Files")
  	  		})
        	.on('mouseout', function(d) {
  				tooltipBox
  		    	.transition()
  		  		.duration(500)
  				.style("opacity", 0)
  	  		});
  	});
	function type(d) {
		d.numFiles = +d.numFiles;
	    return d;
  	}
 d3.select("#vis-title").html("Occupancy Test");
}
