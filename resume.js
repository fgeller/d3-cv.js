
(function () {

    var entries = [
	{
	    type: "professional",
	    start: new Date("2012-10-01"),
	    end: null,
	    title: "Plants Engineer",
	    company: "ACME",
	    location: "Austin, TX",
	},
	{
	    type: "professional",
	    start: new Date("2009-07-01"),
	    end: new Date("2012-09-30"),
	    title: "Tree Engineer",
	    company: "Example.org",
	    location: "Palo Alto, CA",
	},
	{
	    type: "professional",
	    start: new Date("2006-07-01"),
	    end: new Date("2009-01-30"),
	    title: "Tree Engineer",
	    company: "Example.org",
	    location: "Palo Alto, CA",
	},
	{
	    type: "professional",
	    start: new Date("2002-07-01"),
	    end: new Date("2005-01-30"),
	    title: "Tree Engineer",
	    company: "Example.org",
	    location: "Palo Alto, CA",
	},
	{
	    type: "academic",
	    start: new Date("1990-09-01"),
	    end: new Date("2003-06-01"),
	    degree: "High School",
	    location: "New Haven, CT",
	},
	{
	    type: "academic",
	    start: new Date("2004-08-01"),
	    end: new Date("2007-05-01"),
	    degree: "High School",
	    location: "New Haven, CT",
	}
    ];
    var container = d3.select("#resume-container");

    container.attr("width", "100%");
    container.attr("height", "100%");
    container.style("background-color", "#efefef");

    var description = container.append("div");
    description.text("Max Mustermann");

    var timeline = container.append("svg");
    var margin = {top: 20, right: 20, bottom: 10, left:10},
	width = 1000,
	height = 150;

    timeline.attr("class", "timeline");
    timeline.attr("width", width + "px");
    timeline.attr("height", height + "px");
    timeline.style("background-color", d3.hsl(220, 0.25, 0.9));


    var startDate = new Date("1984-02-23");
    var endDate = new Date();

    var scale = d3.time.scale()
    scale.domain([startDate, endDate]);
    scale.range([margin.left, width - margin.right]);

    var line = d3.svg.axis()
	.scale(scale)
	.orient('bottom')
	.ticks(d3.time.years, 1)
	.tickFormat(d3.time.format('%Y'))
	.tickPadding(5)
	.tickSize(3, 0);

    var timelineHeight = height / 1.618;

    timeline.append('g')
    	.attr('transform', 'translate(0, ' + (height/1.618) + ')')
    	.attr('class', 'x axis')
    	.call(line);

    var isDateCollision = function (entry) {
	var contains = function (entry, date) {
	    return date > entry.start && date < entry.end
	};
	var collisions = entries.filter(
	    function (other) {
		return contains(other, entry.start) || contains(other, entry.end);
	    }
	);

	return collisions.length > 0
    };

    var boxWidth = function (d) {
	if (!d.end) { // current one ends today
	    return scale(new Date()) - scale(d.start);
	}

	return scale(d.end) - scale(d.start);
    };
    var boxHeight = 10;
    var boxClass = function (d) {
	return 'timeline-' + d.type + '-box';
    };

    var boxX = function (d) {
	return scale(d.start);
    };
    var professionalYOffset = 20;
    var boxY = function (d) {
	if (isDateCollision(d) && d.type === "professional") {
	    return timelineHeight - professionalYOffset - boxHeight;
	}

	return timelineHeight - boxHeight;
    };

    timeline.selectAll('.timeline')
	.data(entries)
	.enter()
	.append('rect')
	.attr('class', boxClass)
	.attr('x', boxX)
	.attr('y', boxY)
	.attr('width', boxWidth)
	.attr('height', boxHeight);

})();
