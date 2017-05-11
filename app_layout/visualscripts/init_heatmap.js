
		var maxColor = -Infinity;
		var minColor = Infinity;

		//build from existing temp data (filter), else fetch data for generation
		if (tempData != null){
			build_from_data(tempData);
		}
		else {
			if(load_from_server){

				//change the database name at the end as needed
				var url = "dbscripts/getBaseQuery.php?visualName=Object References by Container&queryDatabase=capstone_datavis";
				$.ajax({
					url: url,
					async: true,
					success: function (result) {
						add_message("Warning", "This visual querys a very large amount of data and may take up to 2 minutes to load.");
						url = "dbscripts/queryString.php?queryString=" + result + "&queryDatabase=capstone_datavis"
						d3.csv(url, function(d) {
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
						}, function(error, data){
							if (error)
							{
								throw error;
							}
							build_from_data(data);

						});
					},
				});
			} else {
				d3.csv("csvs/heatmapContainersRef.csv", function(d) {
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
				}, function(error, data){
					if (error)
					{
						throw error;
					}
					build_from_data(data);
				});
			}
		}

function build_from_data(classes){
	clear_vis();
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
	svg.append("rect")
		.classed("backGround", true)
		.attr("x", 0)
		.attr("width", width)
		.attr("y", 0)
		.attr("height", height)
		.attr("fill", "#eff3f7")
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
}


//your visual title here
d3.select("#vis-title").html("Object References by Container");
hide_filtering();
