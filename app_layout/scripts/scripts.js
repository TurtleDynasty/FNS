$(document).ready(function(){
    console.log("document ready");

    var sample = [{ id: 0, text: 'TSMGUI12' }, { id: 1, text: 'TSMGUI11' }, { id: 2, text: 'File Domain' }, { id: 3, text: 'TSMGUI18' }];
    $(".select-objects").select2({
      data: sample
    });

    $(".select-objects").select2({
      placeholder: "Click Here to Select Objects"
    });

    $(".filter-button").on("click", function(){
      /*if($(".widget2").has("svg").length > 0){
        clear_vis();
        $("#vis-title").html("Filtering Data...");
        init_spinner();
        setTimeout(init_sunburst, 1500);
      }*/
    });

    //Modal elements
    $(".generate").on("click", function(){
        clear_vis();
        var sel = document.getElementById('sel1');
        var selected = sel.options[sel.selectedIndex].value;

        $('.widget2-container-inner').addClass('hidden');
        $('#myModal').modal('toggle');
        clear_vis();
        $("#vis-title").html("Loading Visualization...");
        init_spinner();
        //setTimeout(init_sunburst, 1500);
        setTimeout(clear_vis, 1500);
        if (selected == 1)
          setTimeout(init_sunburst, 1500)
        else if (selected == 2) {
          setTimeout(init_replicated_objects, 1500)
        }
        else if (selected == 3) {
          setTimeout(init_af_segments, 1500)
        }
        else if (selected == 4) {
          setTimeout(init_backup_test, 1500)
        }
        else if (selected == 5) {
          setTimeout(init_pie_test, 1500)
        }
        else if (selected == 6) {
          setTimeout(init_pool_test, 1500)
        }
    });

    $(".continue").click(function () {
      $(".back").removeClass('hidden');
      $(".generate").removeClass('hidden');
      $(".continue").addClass('hidden');

      $(".modal-step1").addClass('hidden');
      $(".modal-step2").removeClass('hidden');
      $('.myModalLabel1').addClass('hidden');
      $('.myModalLabel2').removeClass('hidden');
    });

    $(".back").click(function () {
      $(".back").addClass('hidden');
      $(".generate").addClass('hidden');
      $(".continue").removeClass('hidden');

      $(".modal-step1").removeClass('hidden');
      $(".modal-step2").addClass('hidden');
      $('.myModalLabel1').removeClass('hidden');
      $('.myModalLabel2').addClass('hidden');
    });

    $('#myModal').on('hidden.bs.modal', function () {
      $(".back").addClass('hidden');
      $(".generate").addClass('hidden');
      $(".continue").removeClass('hidden');

      $(".modal-step1").removeClass('hidden');
      $(".modal-step2").addClass('hidden');
      $('.myModalLabel1').removeClass('hidden');
      $('.myModalLabel2').addClass('hidden');
    })

    $(".search-icon").click(function () {
      $('#myModal').modal('toggle');
    });
});

function clear_vis(){
    $( ".spinner" ).remove();
    $( ".svg-container" ).remove();
    $("#vis-title").html("Select a Visualization");
}

function clear_messages(){
  $(".messages-box").html("");
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

function init_replicated_objects(){
  clear_vis();
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

  var svg = d3.select(".widget2").append("div")
          .classed("svg-container", true)
          .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
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


      var svg = d3.select(".widget2").append("div")
              .classed("svg-container", true)
              .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
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

      var svg = d3.select(".widget2").append("div")
              .classed("svg-container", true)
              .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
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

function type(d) {
  d.frequency = +d.frequency;
  return d;
}

function init_spinner(){
    var opts = {lines: 9, length: 5, width: 6, radius: 41, scale: 0.75, corners: 1, color: '#000', opacity: 0.05, rotate: 0, direction: 1, speed: 0.8
                , trail: 42, fps: 20, zIndex: 2e9, className: 'spinner', top: '50%', left: '50%', shadow: false, hwaccel: false, position: 'absolute'
    }
    var target = document.getElementsByClassName('widget2');
    var spinner = new Spinner(opts).spin(target[0]);
}


//https://bl.ocks.org/maybelinot/5552606564ef37b5de7e47ed2b7dc099
function init_sunburst() {
    clear_vis();
    var width = d3.select(".widget2").node().getBoundingClientRect().width,
    height = d3.select(".widget2").node().getBoundingClientRect().height,
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


    var svg = d3.select(".widget2")
        .append("div")
        .classed("svg-container", true)
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 " + width + " " + height)
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
    d3.select("#vis").style("margin-top", "-25px");

    //change vis title
    d3.select("#vis-title").html("Backup Domains Distribution");
}

function init_pie_test() {
  var url = "http://localhost/";
	var margin = {top: 50, right: 50, bottom: 50, left: 50};
	var width = d3.select(".widget2").node().getBoundingClientRect().width,
	    height = d3.select(".widget2").node().getBoundingClientRect().height;
	var outerRadius = Math.min(width, height) / 4;
	var innerRadius = outerRadius - outerRadius/3;
	var letterLineLength = 11;
	var lineToLabelEnd = outerRadius * .2;
	var lineToLabelStart = outerRadius; //innerRadius + (outerRadius -innerRadius)/2;
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
	var svg = d3.select(".widget2").append("div")
          .classed("svg-container", true).append("svg")
	.attr("width", width)
	.attr("height", height)
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
		var toggle = 0;
		data = parseData(data);
		var g = svg.selectAll(".arc")
		.data(pie(data))
		.enter().append("g")
		.attr("class", "arc");
		g.append("path")
		.attr("d", arc)
		.style("fill", function(d) { return color(d.data.name); })
		.on("mouseenter", function(d) {
			if (toggle == 0)
			{
				text = g.append("text")
					.attr("transform", arc.centroid(d))
					.attr("dy", ".5em")
					.style("text-anchor", "middle")
					.style("fill", "black")
					.style("font-size", "35px")
					.attr("class", "on")
					.text(" ");
				toggle += 1;
			}
			text.text(d.data.name + ": " + d.data.count);
		})
		.on("mouseout", function(d) {
				text.text("Total: " + total);
		});

    for(i = 0; i < data.length; i++){

			total += data[i].count;
    }
    d3.select("path").each(function(p){
      total = total + p.data.count;
    })
		// text
		g.append("text")
		.attr("text-anchor", "middle")
		.attr("x", function(d) {
			var a = d.startAngle + (d.endAngle - d.startAngle)/2 - Math.PI/2;
			if (Math.cos(a) * (outerRadius + lineToLabelEnd) > 0)
			{
				return Math.cos(a) * (outerRadius + lineToLabelEnd) + letterLineLength*d.data.name.length/2;
			}
			else
			{
				return Math.cos(a) * (outerRadius + lineToLabelEnd) - letterLineLength*d.data.name.length/2;
			}
		})
		.attr("y", function(d) {
			var a = d.startAngle + (d.endAngle - d.startAngle)/2 - Math.PI/2;
			return Math.sin(a) * (outerRadius + lineToLabelEnd) - 5;
		})
		.style("font-size", "14px")
		.text(function(d) { return d.data.name; });
		// pie2labelline
		g.append("line")
		.attr("x1", function(d) {
			var a = d.startAngle + (d.endAngle - d.startAngle)/2 - Math.PI/2;
			return Math.cos(a) * (lineToLabelStart);
		})
		.attr("y1", function(d) {
			var a = d.startAngle + (d.endAngle - d.startAngle)/2 - Math.PI/2;
			return Math.sin(a) * (lineToLabelStart);
		})
		.attr("x2", function(d) {
			var a = d.startAngle + (d.endAngle - d.startAngle)/2 - Math.PI/2;
			return Math.cos(a) * (outerRadius + lineToLabelEnd);
		})
		.attr("y2", function(d) {
			var a = d.startAngle + (d.endAngle - d.startAngle)/2 - Math.PI/2;
			return Math.sin(a) * (outerRadius + lineToLabelEnd);
		})
		.attr("stroke-width", 2)
        .attr("stroke", "black");
		// label underline
		g.append("line")
		.attr("x1", function(d) {
			var a = d.startAngle + (d.endAngle - d.startAngle)/2 - Math.PI/2;
			return Math.cos(a) * (outerRadius + lineToLabelEnd);
		})
		.attr("y1", function(d) {
			var a = d.startAngle + (d.endAngle - d.startAngle)/2 - Math.PI/2;
			return Math.sin(a) * (outerRadius + lineToLabelEnd);
		})
		.attr("x2", function(d) {
			var a = d.startAngle + (d.endAngle - d.startAngle)/2 - Math.PI/2;
			if (Math.cos(a) * (outerRadius + lineToLabelEnd) > 0)
			{
				return Math.cos(a) * (outerRadius + lineToLabelEnd) + letterLineLength*d.data.name.length;
			}
			else
			{
				return Math.cos(a) * (outerRadius + lineToLabelEnd) - letterLineLength*d.data.name.length;
			}
		})
		.attr("y2", function(d) {
			var a = d.startAngle + (d.endAngle - d.startAngle)/2 - Math.PI/2;
			return Math.sin(a) * (outerRadius + lineToLabelEnd);
		})
		.attr("stroke-width", 2)
		.attr("stroke", "black");
		svg.attr("transform", "translate(" + (width/ 2) + "," + (height/ 2) + ")");
	});
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
					copy[j].count += original[i].count;
				}
			}
			if (notFound)
			{
				copy.push(original[i]);
			}
		}
		return copy;
	}
	function customFilterData(data)
	{
		// Custom data filters go here.
		var copy = []
		for(i = 0; i < data.length; i++)
		{
			// Filter goes here. console.log(data[i]) to know the poperties of said data
			console.log(data[i]);
			copy.push(data[i]);
		}
		return copy;
	}

  d3.select("#vis-title").html("Pie Chart Test");
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

var svg = d3.select(".widget2").append("div")
        .classed("svg-container", true).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
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
function type(d) {
  d.frequency = +d.frequency;
  return d;
}

}
