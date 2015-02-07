
(function () {
    var container = d3.select("#resume-container");

    container.attr("width", "100%");
    container.attr("height", "100%");
    container.style("background-color", "#efefef");

    var description = container.append("div");
    description.text("Max Mustermann");

    var timeline = container.append("svg");
    var margin = {top: 10, right: 20, bottom: 10, left:10},
	width = 1000,
	height = 150;

    timeline.attr("width", width + "px");
    timeline.attr("height", height + "px");
    timeline.style("background-color", d3.hsl(250, 0.25, 0.9));


    var startDate = new Date("1984-02-23");
    var endDate = new Date();

    var scale = d3.time.scale()
    scale.domain([startDate, endDate]);
    scale.range([margin.left, width - margin.right]);

    window.s = scale;

    var ticks = Math.round((width - margin.right - margin.left) / 100);

    var line = d3.svg.axis()
	.scale(scale)
	.orient('bottom')
	.ticks(d3.time.years, 2)
	.tickFormat(d3.time.format('%Y'))
	.tickPadding(5)
	.tickSize(5, 1);

    timeline.append('g')
    	.attr('transform', 'translate(0, ' + (height/1.6) + ')')
    	.attr('class', 'x axis')
    	.call(line);

    timeline.style("font-size", "12px");
    timeline.style("font-family", "sans-serif");


})();
