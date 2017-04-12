function type(d)
{
	d.frequency = +d.frequency;
	return d;
}

function init_replicated_objects()
{
	clear_vis();
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

	//build from existing temp data (filter), else fetch data for generation
	if (tempData != null){
		build_from_data(tempData);
	}
	else {
		d3.csv("csvs/replicatedObjects.csv", type, function(error, data){
			build_from_data(data);
		});
	}

	function build_from_data(data){
		tempData = data;
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
}

function type(d) {
		d.replCount = +d.replCount;
		return d;
}

current_func = init_replicated_objects;
d3.select("#vis-title").html("Objects Replicated by Storage Pool");
}

function init_af_segments()
{
	clear_vis();
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


	//build from existing temp data (filter), else fetch data for generation
	if (tempData != null){
		build_from_data(tempData);
	}
	else {
		d3.csv("csvs/af_segments.csv", type, function(error, data){
			build_from_data(data);
		});
	}

	function build_from_data(data){
		tempData = data;
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
	}

	current_func = init_af_segments;
	d3.select("#vis-title").html("AF Segments");
}

function init_backup_test()
{
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
		.attr("viewBox", "0  0 " + (width+100) + " " + (height+100))
    	.append("g")
    	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	if (tempData != null){
		build_from_data(tempData);
	}
	else {
		d3.csv("csvs/backups.csv", type, function(error, data){
			build_from_data(data);
		});
	}

	function build_from_data(data){
		tempData = data;
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

	current_func = init_backup_test;
	d3.select("#vis-title").html("Backup Test");
}

//https://bl.ocks.org/maybelinot/5552606564ef37b5de7e47ed2b7dc099
function init_sunburst()
{
    clear_vis();
    var container = d3.select(".widget2")
		.append("div")
		.classed("svg-container", true);
    var width = parseInt(d3.select(".svg-container").style("width"));
    var height = parseInt(d3.select(".svg-container").style("height"));
    var radius = (Math.min(width, height) / 2) - 10;

    var formatNumber = d3.format(",d");

    var x = d3.scaleLinear()
        .range([0, 2 * Math.PI]);

    var y = d3.scaleSqrt()
        .range([0, radius]);

    var color = d3.scaleOrdinal(d3.schemeCategory20);

    var partition = d3.partition();

    var arc = d3.arc()
	    .startAngle(function(d)
		{
			return Math.max(0, Math.min(2 * Math.PI, x(d.x0)));
		})
	    .endAngle(function(d)
		{
			return Math.max(0, Math.min(2 * Math.PI, x(d.x1)));
		})
	    .innerRadius(function(d)
		{
			return Math.max(0, y(d.y0));
		})
	    .outerRadius(function(d)
		{
			return Math.max(0, y(d.y1));
		});

    var svg = container.append("svg")
		.attr("width", width)
		.attr("height", height)
		.attr("preserveAspectRatio", "xMidYMid meet")
		.attr("viewBox", "0  0 " + (width+100) + " " + (height+100))
        .attr("id", "vis")
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

    d3.json("scripts/falseData.json", function(error, root)
	{
     	if (error)
		{
			throw error;
		}
		root = d3.hierarchy(root);
		root.sum(function(d)
		{
			return d.size;
		});
		svg.selectAll("path")
			.data(partition(root).descendants())
			.enter().append("path")
			.attr("d", arc)
			.style("fill", function(d)
			{
				return color((d.children ? d : d.parent).data.name);
			})
			.on("click", click)
			.append("title")
  			.text(function(d)
			{
				return d.data.name + "\n" + formatNumber(d.value);
			});
    });

    function click(d)
	{
      svg.transition()
        	.duration(750)
        	.tween("scale", function()
			{
            	var xd = d3.interpolate(x.domain(), [d.x0, d.x1]);
                var yd = d3.interpolate(y.domain(), [d.y0, 1]);
                var	yr = d3.interpolate(y.range(), [d.y0 ? 20 : 0, radius]);
            	return function(t)
				{
					x.domain(xd(t)); y.domain(yd(t)).range(yr(t));
				};
          	})
	        .selectAll("path")
	        .attrTween("d", function(d)
			{
				return function()
				{
					return arc(d);
				};
			});
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
function init_pie_test()
{
	clear_vis();
	var margin = {top: 50, right: 50, bottom: 50, left: 50};
	var container = d3.select(".widget2")
		.append("div")
		.classed("svg-container", true);
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
		.value(function(d)
		{
			return d.count;
		});

	var svg = container.append("svg")
		.attr("width", width)
		.attr("height", height)
		.attr("preserveAspectRatio", "xMidYMid meet")
		.attr("viewBox", "0  0 " + (width+100) + " " + (height+100))
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
		.attr("transform", function(d)
		{
			return "translate(" + 0 + "," + 0 + ")";
		});
	//white circle within the pie
	svg.append("circle")
		.attr("r", innerRadius + 1)
		.style("fill", "#eff3f7")
		.style("stroke", "black")
		.style("stroke-width", 2)
		.attr("transform", function(d)
		{
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
			.attr("x1", function(d)
			{
				var a = calculateAngle(d);
				return Math.cos(a) * (lineToLabelStart + offset);
			})
			.attr("y1", function(d)
			{
				var a = calculateAngle(d);
				return Math.sin(a) * (lineToLabelStart + offset);
			})
	}
	function addPieSegments()
	{
		g.append("path")
			.attr("d", arc)
			.style("fill", function(d)
			{
				return color(d.data.name);
			})
			.on("mouseenter", function(d)
			{
				innerLabelEnter(d);
				changeArc(this, arcOver);
				changeLine(d, pieSegmentPullOut);
			})
			.on("mouseout", function(d)
			{
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
			.attr("x", function(d)
			{
				var a = calculateAngle(d);
				var quadrant = Math.cos(a) * (outerRadius + lineToLabelEnd);
				return quadrantCalculator(quadrant, letterLineLength*d.data.name.length/2);
			})
			.attr("y", function(d)
			{
				var a = calculateAngle(d);
				return Math.sin(a) * (outerRadius + lineToLabelEnd) - 5;
			})
			.style("font-size", labelFontSize)
			.text(function(d)
			{
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
			.attr("x1", function(d)
			{
				var a = calculateAngle(d);
				return Math.cos(a) * (lineToLabelStart);
			})
			.attr("y1", function(d)
			{
				var a = calculateAngle(d);
				return Math.sin(a) * (lineToLabelStart);
			})
			.attr("x2", function(d)
			{
				var a = calculateAngle(d);
				return Math.cos(a) * (outerRadius + lineToLabelEnd);
			})
			.attr("y2", function(d)
			{
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
			.attr("x1", function(d)
			{
				var a = calculateAngle(d);
				return Math.cos(a) * (outerRadius + lineToLabelEnd);
			})
			.attr("y1", function(d)
			{
				var a = calculateAngle(d);
				return Math.sin(a) * (outerRadius + lineToLabelEnd);
			})
			.attr("x2", function(d)
			{
				var a = calculateAngle(d);
				var quadrant = Math.cos(a) * (outerRadius + lineToLabelEnd);
				return quadrantCalculator(quadrant, letterLineLength*d.data.name.length);
			})
			.attr("y2", function(d)
			{
				var a = calculateAngle(d);
				return Math.sin(a) * (outerRadius + lineToLabelEnd);
			})
			.attr("stroke-width", 2)
			.attr("stroke", "black");
	}
	var total = 0;

	if (tempData != null){
		build_from_data(tempData);
	}
	else {
		d3.csv("csvs/data.csv", type, function(error, data){
			if(error){
				throw error;
			}
			build_from_data(data);
		});
	}

	function build_from_data (data) {
		tempData = data;
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
	}

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

	current_func = init_pie_test;
	d3.select("#vis-title").html("Object Count by Container");
}

function init_pool_test() {
	clear_vis();
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

	if (tempData != null){
		build_from_data(tempData);
	}
	else {
		d3.csv("csvs/stgPool.csv", type, function(error, data){
			if(error){
				throw error;
			}
			build_from_data(data);
		});
	}

	function build_from_data (data) {
		tempData = data;
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
	}

	function type(d) {
    	d.frequency = +d.frequency;
    	return d;
  	}

	current_func = init_pool_test;

  d3.select("#vis-title").html("Storage Pool Test");
}

function init_heatmap() {

var container = d3.select(".widget2").append("div").classed("svg-container", true);
var width = parseInt(d3.select(".svg-container").style("width"));
var height = parseInt(d3.select(".svg-container").style("height"));
var svg = container.append("svg").attr("width", width).attr("height", height).attr("preserveAspectRatio", "xMidYMid meet").attr("viewBox", "0  0 " + (width+25) + " " + (height+25));

// scroll-over square enlargement
var squareColors = ["darkblue",
					"blue",
					"seagreen",
					"Turquoise",
					"SpringGreen",
					"greenyellow",
					"yellow",
					"orange",
					"orangered",
					"red"];
var legendTileSize = height/(squareColors.length*2);
var legendSize = 120;
var legendOffset = height/squareColors.length;
var infoTileSize = width * .1;
var infoTilePadding = 5;
var infoTileOffset = infoTilePadding + 1;
var heatMapWidth = width-legendSize;
var heatMapHeight = height - infoTileSize - 2* infoTileOffset;
var squarePadding = 2;
var x = 0;
var xIndex = 0;
var y = 0;
var yIndex = 0;
var maxColor = -Infinity;
var minColor = Infinity;
svg.append("rect")
	.classed("backGround", true)
	.attr("x", 0)
	.attr("width", width)
	.attr("y", 0)
	.attr("height", height)
	.attr("fill", "#eff3f7")
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
	classes = parseData(classes);
	function parseData(data)
	{
		function compare(a,b)
		{
			return a.value - b.value;
		}
		data = data.sort(compare);
		return data;
	}
	squareRadius = Math.sqrt((heatMapWidth * heatMapHeight / classes.length));
	squareRadius -= squarePadding;
	var classLength = classes.length;
	for(i = 0; i < classLength; i++)
	{
		svg.append("rect")
			.classed(grabColor(classes[i]["value"])[1], true)
			.attr("color", grabColor(classes[i]["value"])[1])
			.classed("dataPoint", true)
			.attr("value", classes[i]["value"])
			.attr("id", classes[i]["id"])
			.attr("x", x)
			.attr("y", y)
			.attr("rx", squareRadius)
			.attr("ry", squareRadius)
			.attr("width", squareRadius)
			.attr("height", squareRadius)
			.attr("fill-opacity", 1) // used for legend filtering
			.attr("stroke-opacity", 0)
			.style("fill", function() { return grabColor(classes[i]["value"], squareColors)[0]; })
			.on("mouseover", function() {
				mouseEnterSquare(this);
			})
			.on("mouseout", function() {
				mouseExitSquare(this);
			})
			.on("click", function(d)
			{
				moveInfoSquares(infoTileSize + infoTilePadding);
				drawInfoSquare(this, d3.select(this).attr("color"));
			});
		calculateNextXYCords();
	}
	drawLegend();
});
function calculateNextXYCords()
{
	x += squareRadius + squarePadding;
	xIndex += 1;
	if (x >= heatMapWidth)
	{
		x = 0;
		y += squareRadius + squarePadding;
		xIndex = 0;
		yIndex += 1;
	}
}
function grabColor(number, colors)
{
	colors = colors || [];
	var divideColor = d3.scaleLinear().domain([minColor, maxColor+1]).range([0, 1]);
	var pickColor = d3.scaleLinear().domain([0, .1, .2, .3, .4, .5, .6, .7, .8, .9]).range(colors);
	var color = pickColor(divideColor(number));
	var index = Math.floor(divideColor(number) * 10);
	return [color, squareColors[index]];
}
function mouseEnterSquare(object)
{
	d3.select(object).attr('width', squareRadius + squarePadding);
	d3.select(object).attr('height', squareRadius + squarePadding);
	var opacity = d3.select(object).attr("fill-opacity");
	if (opacity == 1)
	{
		d3.select(object).attr("stroke-opacity", 1);
	}
	d3.select(object).attr('x', function ()
	{
		var x = parseFloat(d3.select(object).attr('x'));
		return (x-squarePadding/2);
	})
	.attr('y', function ()
	{
		var y = parseFloat(d3.select(object).attr('y'));
		return (y-squarePadding/2);
	})
}
function mouseExitSquare(object)
{
	d3.select(object).attr('width', squareRadius);
	d3.select(object).attr('height', squareRadius);
	d3.select(object).attr("stroke-opacity", 0);
	d3.select(object).attr('x', function ()
	{
		var x = parseFloat(d3.select(object).attr('x'));
		return (x+squarePadding/2);
	})
	.attr('y', function ()
	{
		var y = parseFloat(d3.select(object).attr('y'));
		return (y+squarePadding/2);
	})
}
function moveInfoSquares(offset)
{
	var list = [];
	d3.selectAll(".infoNode").attr('x', function ()
	{
		var x = parseFloat(d3.select(this).attr('x'));
		x += offset;
		if (x > heatMapWidth - 2 * squareRadius)
		{
			list.push(this)
			if (list.length == 4)
			{
				for (i = 0; i < 4; i++)
				{
					d3.select(list[i]).remove();
				}
			}
		}
		return x;
	})
}
function drawInfoSquare(d, color)
{
	var value = d3.select(d).attr("value");
	var id = d3.select(d).attr("id");
	var id = id.split(".");
	var id = id[id.length-1];
	svg.append("rect")
		.classed("infoNode", true)
		.attr("x", 0)
		.attr("y", heatMapHeight + infoTileOffset/2)
		.attr("rx", 5)
		.attr("ry", 5)
		.attr("width", infoTileSize)
		.attr("height", infoTileSize)
		.style("fill", color)
	svg.append("rect")
		.classed("infoNode", true)
		.attr("x", 0 + infoTilePadding)
		.attr("y", heatMapHeight + infoTileOffset/2 + infoTilePadding)
		.attr("rx", 5)
		.attr("ry", 5)
		.attr("width", infoTileSize-2*infoTilePadding)
		.attr("height", infoTileSize-2*infoTilePadding)
		.style("fill", "#eff3f7")
	svg.append("text")
		.classed("infoNode", true)
		.attr("x", 0 + (infoTileSize-infoTilePadding)/2)
		.attr("y", heatMapHeight + infoTileSize/2 + infoTilePadding/2)
		.attr("dy", "-1.5em")
		.text(id)
	svg.append("text")
		.classed("infoNode", true)
		.attr("x", 0 + (infoTileSize-infoTilePadding)/2)
		.attr("y", heatMapHeight + infoTileSize/2 + infoTilePadding/2)
		.attr("dy", "1.5em")
		.text(value)
}
function drawLegend()
{
	var squareColorsLength = squareColors.length;
	var increment = ((heatMapHeight - infoTileSize) / squareColorsLength+10);
	for (i = 0; i < squareColorsLength; i++)
	{
		svg.append("rect")
			.classed("legend", true)
			.classed(squareColors[i], true)
			.attr("color", squareColors[i])
			.attr("x", heatMapWidth + (width - heatMapWidth)/2)
			.attr("y", squareRadius + i * increment)
			.attr("fill-opacity", 1)
			.attr("stroke", squareColors[i])
			.attr("rx", 5)
			.attr("ry", 5)
			.attr("height", legendTileSize)
			.attr("width", legendTileSize)
			.style("fill", squareColors[i])
			.on("mouseover", function() {
				toggleBoarder(d3.select(this).attr("color"));
			})
			.on("mouseout", function() {
				toggleBoarder(d3.select(this).attr("color"));
			})
			.on("click", function(d)
			{
				filterColor(d3.select(this).attr("color"));
			});
	}
}
function toggleBoarder(color)
{
	var color2filter = "." + color;
	d3.selectAll(color2filter).attr("stroke-opacity", function()
	{
		var opacity = d3.select(this).attr("stroke-opacity");
		if (opacity == 0)
		{
			return 1;
		}
		else if (opacity == 1)
		{
			return 0;
		}
	})
}
function filterColor(color)
{
	var color2filter = "." + color;
	colorSqaureList = d3.selectAll(color2filter).attr("fill-opacity", function()
	{
		var opacity = d3.select(this).attr("fill-opacity");
		if (opacity == 0)
		{
			return 1;
		}
		else if (opacity == 1)
		{
			return 0;
		}
	});
	for (i = 0; i < colorSqaureList.length; i++)
	{
		var opacity = colorSqaureList[i]["fill-opacity"];
	}
}
//your visual title here
d3.select("#vis-title").html("Heatmap V2");
}

function init_scatter_test(){
	/*these 4 lines set up a responsive viewbox for the visual , note the use of .widget2 instead of body.
		Keep this and eliminate the lines in your code that set the width and height, as well as the svg var declaration up to .append(g)
		Make sure to change the location of your csv to "/pathfromroot/.../yourcsv.csv". That should be it.
		*/
		var container = d3.select(".widget2").append("div").classed("svg-container", true);
		var width = parseInt(d3.select(".svg-container").style("width"));
		var height = parseInt(d3.select(".svg-container").style("height"));
		var svg = container.append("svg").attr("width", width).attr("height", height).attr("preserveAspectRatio", "xMidYMid meet").attr("viewBox", "0  0 " + (width+25) + " " + (height+25));
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
		d3.csv("csvs/cereal.csv", function(error, data)
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
		d3.select("#vis-title").html("Scatter Plot V1");
}

function init_occupancy_test(){
		clear_vis();
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

		if (tempData != null){
			build_from_data(tempData);
		}
		else {
			d3.csv("csvs/occupancy.csv", type, function(error, data){
				build_from_data(data);
			});
		}

		function build_from_data(data){
			tempData = data;
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
		}

	function type(d) {
		d.numFiles = +d.numFiles;
	    return d;
  	}
		current_func = init_occupancy_test;
		d3.select("#vis-title").html("Occupancy Test");
}
