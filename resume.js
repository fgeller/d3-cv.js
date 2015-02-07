
(function () {

    var resume = {
	professionalExperience: [
	    {
		start: new Date("2012-12-10"),
		title: "Software Engineer",
		company: "Movio Ltd.",
		location: "Auckland, NZ",
		summary: [
		    "Technologies include Scala, Java, akka, Apache Cassandra.",
		],
	    },
	    {
		start: new Date("2011-09-01"),
		end: new Date("2012-10-30"),
		title: "Software Developer",
		company: "IPTEGO GmbH",
		location: "Berlin, D",
		summary: [
		    "Developed a learning, multi-process software to detect and prevent fraudulent use of VoIP networks.",
		    "Independently designed and developed web application for monitoring, inspection and configuration.",
		    "Technologies included Python, Redis, Flask, SQLAlchemy, ExtJS, ZMQ, Javascript.",
		],
	    },
	    {
		start: new Date("2011-02-01"),
		end: new Date("2011-04-30"),
		title: "Software Developer",
		internship: true,
		company: "SAP Labs",
		location: "Palo Alto, CA",
		summary: [
		    "Developed compiler-frontend and AST transformer for research database access language.",
		    "Technologies included the <a href='http://www.newspeaklanguage.org/'>Newspeak</a> programming language and Javascript.",
		],
	    },
	    {
		start: new Date("2008-11-01"),
		end: new Date("2010-02-28"),
		title: "Software Developer",
		company: "Finn GmbH",
		location: "Berlin, D",
		summary: [
		    "Transformation of semi-structured dictionary data for optimized search access on pons.eu.",
		    "Developed web application interface for community-driven dictionary.",
		    "Technologies included XSLT, JEE, Ruby on Rails and Javascript.",
		],
	    },
	    {
		start: new Date("2008-03-01"),
		end: new Date("2008-09-30"),
		title: "Software Developer",
		internship: true,
		company: "SAP Research",
		location: "St. Gallen, CH",
		summary: [
		    "Developed a mobile phone application to enable end-user access to SAP business services.",
		    "Developed an OASIS standard-compliant web-service messaging component to integrate SAP services.",
		    "Technologies included SAP’s Netweaver JEE (JAX-WS, JAXB, etc.) and Google’s Android platforms.",
		],
	    },
	    {
		start: new Date("2005-03-01"),
		end: new Date("2006-03-30"),
		title: "Web Developer",
		company: "Worcester Polytechnic Institute",
		location: "Worcester, USA",
		summary: [
		    "Developed web based interface for managing sensor readings from fire safety experiments.",
		    "Technologies included Apache Tomcat, Java Servlets, JSP and Oracle Database.",
		],
	    },
	    {
		start: new Date("2003-09-01"),
		end: new Date("2004-06-01"),
		title: "Zivildienstleistender",
		company: "Bayrisches Rotes Kreuz",
		location: "Bad Neustadt an der Saale, D",
		summary: [
		    "Assisted transport as community service.",
		],
	    },
	    {
		start: new Date("2003-07-01"),
		end: new Date("2003-08-31"),
		title: "Software Developer",
		internship: true,
		company: "Charles River Laboratories",
		location: "Wilmington, USA",
		summary: [
		    "Designed and implemented a phone directory with support for user-level privileges.",
		    "Technologies included Apache Tomcat, Java Servlets, JSP, MS SQL Database and MS Access.",
		],
	    },
	],
	academicExperience: [
	    { // Abi
		start: new Date("1994-09-01"),
		end: new Date("2003-06-01"),
		degree: "Abitur",
		institution: "Gymnasium",
		location: "Bad Königshofen im Grabfeld",
	    },
	    { // B.Sc.
		start: new Date("2004-08-01"),
		end: new Date("2007-05-01"),
		degree: "Bachelor of Science",
		institution: "Worcester Polytechnic Institute",
		location: "Worcester, USA",
	    },
	    { // M.Sc.
		start: new Date("2007-10-01"),
		end: new Date("2010-04-01"),
		institution: "Hasso Plattner Institut",
		degree: "Master of Science",
		location: "Potsdam, D",
	    },
	    { // Ph.D.
		start: new Date("2010-04-01"),
		end: new Date("2011-02-01"),
		institution: "Hasso Plattner Institut",
		degree: "",
		location: "Potsdam, D",
	    },
	],
    };

    var container = d3.select("#resume-container");

    var description = container.append("div");
    description.attr('class', 'description');

    var professionalExperienceDescription = function (d) {
	var monthYearFormat = d3.time.format("%m/%Y");

	var html = '';
	html += '<div class="description-professional-experience-header">'
	html += '<div class="description-professional-experience-summary">'
	html += '<span class="description-professional-experience-title">' + d.title + '</span>';
	html += ' - at <span class="description-professional-experience-company">' + d.company + '</span>';
	html += ' in <span class="description-professional-experience-location">' + d.location + '</span>';
	html += '</div>';
	html += '<div class="description-professional-experience-date">'
	html += '<span class="description-professional-date-start">' + monthYearFormat(d.start) + '</span>';
	html += '—<span class="description-professional-date-end">' + (d.end ? monthYearFormat(d.end) : 'present') + '</span>';
	html += '</div>';
	html += '</div>';
	html += '<div class="description-professional-experience-lines">'
	d.summary.forEach(
	    function(line) {
		html += '<div class="description-professional-experience-line">'
		html += line;
		html += '</div>';
	    }
	);
	html += '</div>';

	return html;
    };

    description
        .append('div')
        .attr('class', 'description-header')
        .text('Professional Experience');

    // TODO: not sure why i need this selectAll vs select vs just description
    description.selectAll(".description")
    	.data(resume.professionalExperience)
    	.enter()
    	.append('div')
    	.attr('class', 'description-professional-experience')
	.html(professionalExperienceDescription);

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
	var experience = resume.professionalExperience.concat(resume.academicExperience);
	var collisions = experience.filter(
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
	var preferredHeight = 12;

	return preferredHeight;
    };

    var boxX = function (d) {
	return scale(d.start);
    };
    var professionalYOffset = boxHeight() / 2;
    var boxY = function (type) {
	var boxOffset = function (d) {
	    return timelineHeight - boxHeight(d) - 2;
	};

	if (type === "professional") {
	    return function (d) {
		return boxOffset(d) - (isDateCollision(d) ? professionalYOffset : 0);
	    };
	}

	return function (d) {
	    return boxOffset(d);
	};
    };

    timeline.selectAll('.timeline')
	.data(resume.academicExperience)
	.enter()
	.append('rect')
	.attr('class', 'timeline-academic-experience')
	.attr('x', boxX)
	.attr('y', boxY("academic"))
	.attr('width', boxWidth)
	.attr('height', boxHeight);

    timeline.selectAll('.timeline')
	.data(resume.professionalExperience)
	.enter()
	.append('rect')
	.attr('class', 'timeline-professional-experience')
	.attr('x', boxX)
	.attr('y', boxY("professional"))
	.attr('width', boxWidth)
	.attr('height', boxHeight);

})();
