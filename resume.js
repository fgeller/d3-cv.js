
(function () {

    var resume = {
	name: "Donald Duck",
	summary: "Experienced functional programmer with love for immutability. Happy uncle of three.",
	email: "donald@example.com",
	github: "https://github.com/",
	linkedin: "https://www.linkedin.com/",
	professionalExperience: [
	    {
		start: new Date("2012-12-01"),
		title: "Senior Manager",
		role: "Full-time",
		company: "ACME",
		location: "New York, US",
		summary: [
		    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
		    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		    "Technologies include American, APL, Javascript, Ruby.",
		],
	    },
	    {
		start: new Date("2008-01-11"),
		end: new Date("2012-11-10"),
		title: "Manager",
		role: "Full-time",
		company: "Wooden Sand",
		location: "Edinburgh, UK",
		summary: [
		    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
		    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		    "Technologies included Scottish, Algol, PHP, R.",
		],
	    },
	    {
		start: new Date("2007-03-01"),
		end: new Date("2008-01-09"),
		title: "Senior Software Engineer",
		role: "Internship",
		company: "Blue Sky",
		location: "Paris, FR",
		summary: [
		    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
		    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		    "Technologies included French, B, Perl, C++.",
		],
	    },
	    {
		start: new Date("2005-11-11"),
		end: new Date("2007-01-15"),
		title: "Software Engineer",
		role: "Part-time",
		company: "The First",
		location: "Berlin, D",
		summary: [
		    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
		    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		    "Technologies included German, Fortran, Simula, Smalltalk.",
		],
	    },
	],
	degrees: [
	    {
		start: new Date("2004-01-01"),
		end: new Date("2007-01-01"),
		institution: "The Graduate School",
		degree: "Master of Science",
		summary: ["All distinctions in Chemical Science"],
		location: "San Diego, US",
	    },
	    {
		start: new Date("2000-08-01"),
		end: new Date("2003-10-01"),
		degree: "Bachelor of Science  ",
		summary: ["Some Distinction in Computer Science"],
		institution: "The Undergraduate School",
		location: "Philadelphia, USA",
	    },
	],
	academicExperience: [
	    {
		start: new Date("2001-10-01"),
		end: new Date("2002-03-31"),
		title: "Teaching Assistant",
		institution: "The Undergraduate School",
		location: "Philadelphia, USA",
	    },
	],
    };

    var container = d3.select("#resume-container");

    var description = container.append("div");
    description.attr('class', 'description');
    // description.style('margin-bottom', '100px');  // timeline height
    description.style('height', (window.innerHeight - 90 - 20) + 'px');
    description.style('overflow', 'scroll');
    // timeline height

    var monthYearFormat = d3.time.format("%m/%Y");

    /* ----- HEADER ------ */

    var headerDescription = function () {
	var html = '';
	html += '<div class="pure-g">'
	html += '<div class="pure-u-20-24">'
	html += '<div class="description-header-name">';
	html += resume.name;
	html += '</div>';
	html += '</div>';
	html += '<div class="pure-u-4-24">'
	html += '<div class="pure-g">'
	html += '<div class="pure-u-8-24">'
	html += '<div class="description-header-email">';
	html += '<a href="mailto:' + resume.email + '"><i class="fa fa-envelope-square"></i></a>' ;
	html += '</div>';
	html += '</div>';
	html += '<div class="pure-u-8-24">'
	html += '<div class="description-header-linkedin">';
	html += '<a href="' + resume.linkedin + '"><i class="fa fa-linkedin-square"></i></a>';
	html += '</div>';
	html += '</div>';
	html += '<div class="pure-u-8-24">'
	html += '<div class="description-header-github">';
	html += '<a href="' + resume.github + '"><i class="fa fa-github-square"></i></a>' ;
	html += '</div>';
	html += '</div>';
	html += '</div>';
	html += '</div>';
	html += '</div>';

	html += '<div class="pure-g">'
	html += '<div class="pure-u-1">'
	html += '<div class="description-header-summary">';
	html += resume.summary;
	html += '</div>';
	html += '</div>';
	html += '</div>';

	return html;
    };

    var header = description
	.append('div')
	.attr('class', 'description-section');

    // TODO: not sure why i need this selectAll vs select vs just description
    header
    	.append('div')
    	.attr('class', 'description-header')
	.html(headerDescription);

    /* ----- PROFESSIONAL EXPERIENCE ------ */

    var professionalExperienceDescription = function (d) {
	var html = '';
	html += '<div class="description-professional-experience-header">';

	html += '<div class="pure-g">'
	html += '<div class="pure-u-20-24">'
	html += '<div class="description-professional-experience-summary">';
	html += '<span class="description-professional-experience-title">' + d.title + '</span>';
	html += ' — ';
	html += ' <span class="description-professional-experience-role">' + d.role + '</span>';
	html += ' at <span class="description-professional-experience-company">' + d.company + '</span>';
	html += ' in <span class="description-professional-experience-location">' + d.location + '</span>';
	html += '</div>';
	html += '</div>';

	html += '<div class="pure-u-4-24">'
	html += '<div class="description-professional-experience-date">';
	html += '<span class="description-professional-date-start">' + monthYearFormat(d.start) + '</span>';
	html += '—<span class="description-professional-date-end">' + (d.end ? monthYearFormat(d.end) : 'present') + '</span>';
	html += '</div>';
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

    var professionalExperience = description
	.append('div')
	.attr('class', 'description-section');

    professionalExperience
        .append('div')
        .attr('class', 'description-section-header')
        .text('Professional Experience');

    // TODO: not sure why i need this selectAll vs select vs just description
    professionalExperience.selectAll(".description")
    	.data(resume.professionalExperience)
    	.enter()
    	.append('div')
    	.attr('class', 'description-professional-experience')
	.html(professionalExperienceDescription);

    /* ----- EDUCATION ------ */

    var education = description
	.append('div')
	.attr('class', 'description-section');

    education
        .append('div')
        .attr('class', 'description-section-header')
        .text('Education');

    var educationDegreeDescription = function (d) {
	var html = '';
	html += '<div class="pure-g">'
	html += '<div class="pure-u-20-24">'
	html += '<div class="description-education-degree-summary">';
	html += '<span class="description-education-degree-title">' + d.degree + '</span>';
	html += ' at <span class="description-education-degree-institution">' + d.institution + '</span>';
	html += ' <span class="description-education-degree-distinction">' + d.distinction + '</span>';
	html += ' <span class="description-education-degree-concentration">' + d.concentration + '</span>';
	html += ', <span class="description-education-degree-location">' + d.location + '</span>';
	html += '</div>';
	html += '</div>';

	html += '<div class="pure-u-4-24">'
	html += '<div class="description-education-degree-dates">';
	html += '<span class="description-education-degree-start">' + monthYearFormat(d.start) + '</span>';
	html += '—<span class="description-education-degree-end">' + (d.end ? monthYearFormat(d.end) : 'present') + '</span>';
	html += '</div>';
	html += '</div>';
	html += '</div>';

	return html;
    };

    // TODO: not sure why i need this selectAll vs select vs just description
    education.selectAll(".description")
    	.data(resume.degrees)
    	.enter()
    	.append('div')
    	.attr('class', 'description-education-degree')
	.html(educationDegreeDescription);

    /* ----- ACADEMIC EXPERIENCE ------ */

    var academicExperience = description
	.append('div')
	.attr('class', 'description-section');

    academicExperience
        .append('div')
        .attr('class', 'description-section-header')
        .text('Academic Experience');

    var academicExperienceDescription = function (d) {
	var html = '';
	html += '<div class="pure-g">'
	html += '<div class="pure-u-20-24">'
	html += '<div class="description-academic-experience-summary">';
	html += '<span class="description-academic-experience-title">' + d.title + '</span>';
	html += ' at <span class="description-academic-experience-institution">' + d.institution + '</span>';
	html += ' in <span class="description-academic-experience-location">' + d.location + '</span>';
	html += '</div>';
	html += '</div>';

	html += '<div class="pure-u-4-24">'
	html += '<div class="description-academic-experience-dates">';
	html += '<span class="description-academic-experience-start">' + monthYearFormat(d.start) + '</span>';
	html += '—<span class="description-academic-experience-end">' + (d.end ? monthYearFormat(d.end) : 'present') + '</span>';
	html += '</div>';
	html += '</div>';
	html += '</div>';

	return html;
    };

    // TODO: not sure why i need this selectAll vs select vs just description
    academicExperience.selectAll(".description")
    	.data(resume.academicExperience)
    	.enter()
    	.append('div')
    	.attr('class', 'description-academic-experience')
	.html(academicExperienceDescription);

    /* ----- TIMELINE ------ */

    var timelineContainer = container.append('div')
	.attr("class", "timeline-container")
	.style("width", "960px")
	.style("height", "90px")
	.style("position", "fixed")
	.style("bottom", 0)
	.style("overflow", "scroll")
	.style("border-top", "3pt solid #ecf0f1")
    ;

    var timeline = timelineContainer.append("svg");
    var margin = {top: 20, right: 20, bottom: 10, left:10},
	width = 2000,
	height = 90;

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

    var isDateCollision = function (entry, others) {
	var contains = function (entry, date) {
	    return date > entry.start && date < entry.end
	};

	return others.some(
	    function (other) {
		return contains(other, entry.start) || contains(other, entry.end);
	    }
	);
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
    var academicYOffset = boxHeight();
    var boxY = function (type) {
	var boxOffset = function (d) {
	    return timelineHeight - boxHeight(d) - 2;
	};

	if (type === "professional") {
	    return function (d) {
		var isCollision = isDateCollision(d, resume.degrees);
		return boxOffset(d) - (isCollision ? professionalYOffset : 0);
	    };
	}

	if (type === "academic") {
	    return function (d) {
		var isCollision = isDateCollision(d, resume.degrees);
		return boxOffset(d) - (isCollision ? academicYOffset : 0);
	    };
	}

	return function (d) {
	    return boxOffset(d);
	};
    };

    timeline.selectAll('.timeline')
	.data(resume.academicExperience.concat(resume.degrees))
	.enter()
	.append('rect')
	.attr('class', 'timeline-academic-experience')
	.attr('x', boxX)
	.attr('y', boxY("academic"))
	.attr('width', boxWidth)
	.attr('height', boxHeight)
	.text(function (d) { return d.title || d.degree; });

    function elementBottomOffset (el) {
	var rect = el.getBoundingClientRect();
	var viewHeight = window.innerHeight || document.documentElement.clientHeight;
	return rect.bottom - viewHeight + 90 + 20;
    }

    function elementTopOffset (el) {
	return el.getBoundingClientRect().top - 20;
    }

    timeline.selectAll('.timeline')
	.data(resume.professionalExperience)
	.enter()
	.append('rect')
	.attr('class', 'timeline-professional-experience')
	.attr('x', boxX)
	.attr('y', boxY("professional"))
	.attr('width', boxWidth)
	.attr('height', boxHeight)
	.on('mouseover', function (d) {
	    d3
		.selectAll(".description-professional-experience")[0]
		.forEach(function (description) {
		    if (d === description.__data__) {

			var originalScroll = d3.select(".description").property('scrollTop');
			var descriptionBottomOffset = elementBottomOffset(description);
			var descriptionTopOffset = elementTopOffset(description);

			console.log(
			    "originalScroll", originalScroll,
			    "descriptionBottomOffset", descriptionBottomOffset,
			    "descriptionTopOffset", descriptionTopOffset
			);

			function scrollTween(offset) {
			    return function() {
				var i = d3.interpolateNumber(0, offset);
				return function(t) {
				    d3
					.select(".description")
					.property('scrollTop', originalScroll + i(t));
				};
			    };
			};

			if (descriptionBottomOffset > 0) { // scroll up
			    d3.transition()
				.delay(0)
				.duration(600)
				.tween("scroll", scrollTween(descriptionBottomOffset));
			}


			if (descriptionTopOffset < 0) { // scroll down
			    d3.transition()
				.delay(0)
				.duration(600)
				.tween("scroll", scrollTween(descriptionTopOffset));
			}

			d3.select(description)
			    .style("background", "#f1c40f")
		    }
		});
	})
	.on('mouseout', function (d) {
	    d3
		.selectAll(".description-professional-experience")[0]
		.forEach(function (description) {
		    if (d === description.__data__) {
			d3.select(description)
			    .style("background", "#fff");
		    }
		});
	})
    ;

    d3.select(".timeline-container").property("scrollLeft", 2000);

})();
