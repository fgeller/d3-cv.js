
(function () {

    var entries = [
	{ // Abi
	    type: "academic",
	    start: new Date("1994-09-01"),
	    end: new Date("2003-06-01"),
	    degree: "Abitor",
	    institution: "Gymnasium",
	    location: "Bad Königshofen",
	},
	{ // Zivi
	    type: "academic",
	    start: new Date("2003-09-01"),
	    end: new Date("2004-06-01"),
	    degree: "Abitor",
	    institution: "Gymnasium",
	    location: "Bad Königshofen",
	},
	{ // B.Sc.
	    type: "academic",
	    start: new Date("2004-08-01"),
	    end: new Date("2007-05-01"),
	    degree: "Bachelor of Science",
	    institution: "Worcester Polytechnic Institute",
	    location: "Worcester, USA",
	},
	{ // M.Sc.
	    type: "academic",
	    start: new Date("2007-10-01"),
	    end: new Date("2010-04-01"),
	    institution: "Hasso Plattner Institut",
	    degree: "Master of Science",
	    location: "Potsdam, D",
	},
	{ // Ph.D.
	    type: "academic",
	    start: new Date("2010-04-01"),
	    end: new Date("2011-02-01"),
	    institution: "Hasso Plattner Institut",
	    degree: "",
	    location: "Potsdam, D",
	},

	{
	    type: "professional",
	    start: new Date("2012-12-10"),
	    end: null,
	    title: "Software Engineer",
	    company: "Movio Ltd.",
	    location: "Auckland, NZ",
	},
	{
	    type: "professional",
	    start: new Date("2011-09-01"),
	    end: new Date("2012-10-30"),
	    title: "Software Developer",
	    company: "IPTEGO GmbH",
	    location: "Berlin, D",
	},
	{
	    type: "professional",
	    start: new Date("2011-02-01"),
	    end: new Date("2011-04-30"),
	    title: "Software Developer",
	    company: "SAP Labs",
	    location: "Palo Alto, CA",
	},
	{
	    type: "professional",
	    start: new Date("2008-11-01"),
	    end: new Date("2010-02-28"),
	    title: "Software Developer",
	    company: "Finn GmbH",
	    location: "Berlin, D",
	},
	{
	    type: "professional",
	    start: new Date("2008-03-01"),
	    end: new Date("2008-09-30"),
	    title: "Software Developer",
	    company: "SAP Research",
	    location: "St. Gallen, CH",
	},
	{
	    type: "professional",
	    start: new Date("2005-03-01"),
	    end: new Date("2006-03-30"),
	    title: "Web Developer",
	    company: "Worcester Polytechnic Institute",
	    location: "Worcester, USA",
	},
	{
	    type: "professional",
	    start: new Date("2003-07-01"),
	    end: new Date("2003-08-31"),
	    title: "Software Developer",
	    company: "Charles River Laboratories",
	    location: "Wilmington, USA",
	},
    ];
    var container = d3.select("#resume-container");

    container.attr("width", "100%");
    container.attr("height", "100%");
    container.style("background-color", "#efefef");

    var description = container.append("div");
    description.text("Max Mustermann");

    var timeline = container.append("svg");
    var margin = {top: 20, right: 20, bottom: 10, left:10},
	width = 2000,
	height = 150;

    timeline.attr("class", "timeline");
    timeline.attr("width", width + "px");
    timeline.attr("height", height + "px");
    timeline.style("background-color", "white");

    var startDate = new Date("1994-01-01");
    var endDate = new Date();

    var scale = d3.time.scale()
    scale.domain([startDate, endDate]);
    scale.range([margin.left, width - margin.right]);

    var line = d3.svg.axis()
	.scale(scale)
	.orient('bottom')
	.ticks(d3.time.years, 1)
	.tickFormat(d3.time.format("'%y"))
	.tickPadding(7)
	.tickSize(5, 0);

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
    var boxHeight = function (d) {
	var preferredHeight = 40;

	return preferredHeight;
    };
    var boxClass = function (d) {
	return 'timeline-' + d.type + '-box';
    };

    var boxX = function (d) {
	return scale(d.start);
    };
    var professionalYOffset = boxHeight() / 2;
    var boxY = function (d) {
	if (isDateCollision(d) && d.type === "professional") {
	    return timelineHeight - professionalYOffset - boxHeight(d);
	}

	return timelineHeight - boxHeight(d) - 2;
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
