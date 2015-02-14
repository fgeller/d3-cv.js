var row = function (contents) {
    var html = '';
    html += '<div class="pure-g">'
    html += contents;
    html += '</div>';

    return html;
};

var column = function (num, denom, contents) {
    var html = '';
    html += '<div class="pure-u-' + num + '-' + denom + '">';
    html += contents;
    html += '</div>';

    return html;
};

var div = function (klass, contents) {
    return '<div class="' + klass + '">' + contents + '</div>';
}

var span = function (klass, contents) {
    return '<span class="' + klass + '">' + contents + '</span>';
};

var headerDescription = function (config, resume) {
    var name = '<div class="description-header-name">' + resume.name + '</div>';

    var email = div(
	'description-header-email',
	'<a href="mailto:' + resume.email + '"><i class="fa fa-envelope-square"></i></a>'
    );

    var linkedin = div(
	'description-header-linkedin',
	'<a href="' + resume.linkedin + '"><i class="fa fa-linkedin-square"></i></a>'
    );

    var github = div(
	'description-header-github',
	'<a href="' + resume.github + '"><i class="fa fa-github-square"></i></a>'
    );

    var summary = div('description-header-summary', resume.summary);

    var links = row(column(8, 24, email) + column(8, 24, github) + column(8, 24, linkedin));
    return (
	row(column(20, 24, name) + column(4, 24, links)) +
	    row(column(1, 1, summary))
    );
}

var drawHeader = function (config, resume) {
    var header = d3.select("#" + config.descriptionId)
	.append('div')
	.attr('class', 'description-section')
	.html(headerDescription(config, resume));
};

var professionalExperienceDescription = function (config, resume) {
    return function (d) {
	var summary = div(
	    "description-professional-experience-summary",
	    span("description-professional-experience-title", d.title) +
		' — ' +
		span("description-professional-experience-role", d.role || "") +
		' at ' +
		span("description-professional-experience-company", d.company) +
		' in ' +
		span('description-professional-experience-location', d.location)
	);

	var dates = div(
	    "description-professional-experience-dates",
	    span("description-professional-date-start", config.monthYearFormat(d.start)) +
		'—' +
		span("description-professional-date-end", (d.end ? config.monthYearFormat(d.end) : 'present'))
	);

	var header = div(
	    "description-professional-experience-header",
	    row(column(20, 24, summary) + column(4, 24, dates))
	);

	var lines = div(
	    "description-professional-experience-lines",
	    d.summary.map(
		function(lineContents) {
		    return row(column(1,1, div("description-professional-experience-line", lineContents)));
		}
	    ).join("")
	);

	return header + lines;
    }
};

var drawProfessionalExperience = function (config, resume) {

    var professionalExperience = d3.select("#" + config.descriptionId)
	.append('div')
	.attr('class', 'description-section');

    professionalExperience
        .append('div')
        .attr('class', 'description-section-header')
        .text('Professional Experience');

    professionalExperience.selectAll()
    	.data(resume.professionalExperience)
    	.enter()
    	.append('div')
    	.attr('class', 'description-professional-experience')
	.html(professionalExperienceDescription(config, resume));
};


var educationDegreeDescription = function (config, resume) {
    return function (d) {
	var html = '';

	var title = div(
	    'description-education-degree-summary',
	    span("description-education-degree-title", d.degree) +
		' at ' +
		span("description-education-degree-institution", d.institution) +
		', ' +
		span("description-education-degree-location", d.location)
	);

	var dates = div(
	    'description-education-degree-dates',
	    span("description-education-degree-start", config.monthYearFormat(d.start)) +
		'—' +
		span("description-education-degree-end", (d.end ? config.monthYearFormat(d.end) : 'present'))
	);

	var header = row(column(20, 24, title) + column(4, 24, dates));

	var lines = div(
	    "description-education-degree-lines",
	    d.summary.map(
		function(line) {
		    return row(column(1, 1, div("description-education-degree-line", line)));
		}
	    ).join('')
	);

	return header + lines;
    }
};

var drawEducation = function (config, resume) {
    var education = d3.select("#" + config.descriptionId)
	.append('div')
	.attr('class', 'description-section');

    education
        .append('div')
        .attr('class', 'description-section-header')
        .text('Education');

    education.selectAll()
    	.data(resume.degrees)
    	.enter()
    	.append('div')
    	.attr('class', 'description-education-degree')
	.html(educationDegreeDescription(config, resume));
};

var academicExperienceDescription = function (config, resume) {
    return function (d) {
	var summary = div(
	    'description-academic-experience-summary',
	    span('description-academic-experience-title', d.title) +
		' at ' +
		span('description-academic-experience-institution', d.institution) +
		' in ' +
		span('description-academic-experience-location', d.location)
	);

	var dates = div(
	    "description-academic-experience-dates",
	    span("description-academic-experience-start", config.monthYearFormat(d.start)) +
		'—' +
		span("description-academic-experience-end", (d.end ? config.monthYearFormat(d.end) : 'present'))
	);

	return row(column(20, 24, summary) + column(4, 24, dates));
    }
};

var drawAcademicExperience = function (config, resume) {

    var academicExperience = d3.select("#" + config.descriptionId)
	.append('div')
	.attr('class', 'description-section');

    academicExperience
        .append('div')
        .attr('class', 'description-section-header')
        .text('Academic Experience');

    academicExperience.selectAll()
    	.data(resume.academicExperience)
    	.enter()
    	.append('div')
    	.attr('class', 'description-academic-experience')
	.html(academicExperienceDescription(config, resume));
};


function elementBottomOffset (config, el) {
    var rect = el.getBoundingClientRect();
    var viewHeight = window.innerHeight || document.documentElement.clientHeight;
    return rect.bottom - viewHeight + config.timelineHeight + config.timelineMargin;
}

function elementTopOffset (config, el) {
    return el.getBoundingClientRect().top - config.timelineMargin;
}

var findDescription = function (config, d) {
    return d3.selectAll("div").filter(
	function (div) {
	    return div === d;
	}
    )[0][0]; // why oh why?
};

var scrollDescriptionTween = function (config, original, offset) {
    return function() {
	var i = d3.interpolateNumber(0, offset);
	return function(t) {
	    d3
		.select("#" + config.descriptionId)
		.property('scrollTop', original + i(t));
	};
    };
};

var scrollToDescriptionEntry = function (config, resume) {
    return function (d) {
	var descriptionEntry = findDescription(config, d);
	var originalScroll = d3.select("#" + config.descriptionId).property('scrollTop');
	var descriptionBottomOffset = elementBottomOffset(config, descriptionEntry);
	var descriptionTopOffset = elementTopOffset(config, descriptionEntry);

	if (descriptionBottomOffset > 0) { // scroll up
	    d3.transition()
		.duration(600)
		.tween("scroll", scrollDescriptionTween(config, originalScroll, descriptionBottomOffset));
	}

	if (descriptionTopOffset < 0) { // scroll down
	    d3.transition()
		.duration(600)
		.tween("scroll", scrollDescriptionTween(config, originalScroll, descriptionTopOffset));
	}

	d3.select(descriptionEntry)
	    .style("background", config.highlightColor)
    }
};

var unhighlightDescriptionEntry = function (config, resume) {
    return function (d) {
	var descriptionEntry = findDescription(config, d);
	d3.select(descriptionEntry).style("background", "#fff");
    }
};

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

var timelineBoxWidth = function (scale) {
    return function (d) {
	if (!d.end) { // current one ends today
	    return scale(new Date()) - scale(d.start);
	}

	return scale(d.end) - scale(d.start);
    }
};

var timelineBoxX = function (scale) {
    return function (d) {
	return scale(d.start);
    };
};

var timelineBoxY = function (config, type) {
    var professionalCollisionOffset = timelineBoxHeight(config)() / 2;
    var academicCollisionOffset = timelineBoxHeight(config)();

    var boxOffset = function (d) {
	return (config.timelineHeight / 1.618) - timelineBoxHeight(config)(d) - 2;
    };

    if (type === "professional") {
	return function (d) {
	    var isCollision = isDateCollision(d, resume.degrees);
	    return boxOffset(d) - (isCollision ? professionalCollisionOffset : 0);
	};
    }

    if (type === "academic") {
	return function (d) {
	    var isCollision = isDateCollision(d, resume.degrees);
	    return boxOffset(d) - (isCollision ? academicCollisionOffset : 0);
	};
    }

    return function (d) {
	return boxOffset(d);
    };
};

var timelineBoxHeight = function (config) {
    return function (d) {
	return config.preferredBoxHeight;
    }
};

var findMinYear = function (resume) {
    var extractDates = function (d) {
	if (d.end) {
	    return [d.start, d.end];
	}
	return [d.start];
    };

    var allDates = resume.degrees.map(extractDates)
	.concat(resume.professionalExperience.map(extractDates), resume.academicExperience.map(extractDates))
	.reduce(function (accum, next) { return accum.concat(next); })
    ;

    return d3.min(allDates).getFullYear();
};

var drawTimeline = function (config, resume) {
    var width = config.timelineWidth;
    var height = config.timelineHeight;

    var container = d3.select("#" + config.containerId);

    var timelineContainer = container.append('div')
	.attr("id", config.timelineContainerId)
	.style("width", config.containerWidth + "px")
	.style("height", config.timelineHeight + "px")
    ;

    var timeline = timelineContainer.append("svg")
	.attr("id", config.timelineId)
	.attr("width", width + "px")
	.attr("height", height + "px")
    ;

    var minYear = findMinYear(resume);
    var startDate = new Date(minYear, 0, 0);
    var endDate = new Date();

    var scale = d3.time.scale()
	.domain([startDate, endDate])
	.range([0, width]);

    var axis = d3.svg.axis()
	.scale(scale)
	.orient('bottom')
	.ticks(d3.time.years, 1)
	.tickFormat(d3.time.format("'%y"))
	.tickPadding(7)
	.tickSize(5, 0);

    timeline.append('g')
    	.attr('transform', 'translate(0, ' + (height / 1.618) + ')')
    	.attr('class', 'axis')
    	.call(axis);

    timeline.selectAll('.timeline')
	.data(resume.academicExperience.concat(resume.degrees))
	.enter()
	.append('rect')
	.attr('class', 'timeline-academic-experience')
	.attr('x', timelineBoxX(scale))
	.attr('y', timelineBoxY(config, "academic"))
	.attr('width', timelineBoxWidth(scale))
	.attr('height', timelineBoxHeight(config))
	.on('mouseover', scrollToDescriptionEntry(config, resume))
	.on('mouseout', unhighlightDescriptionEntry(config, resume))
    ;

    timeline.selectAll('.timeline')
	.data(resume.professionalExperience)
	.enter()
	.append('rect')
	.attr('class', 'timeline-professional-experience')
	.attr('x', timelineBoxX(scale))
	.attr('y', timelineBoxY(config, "professional"))
	.attr('width', timelineBoxWidth(scale))
	.attr('height', timelineBoxHeight(config))
	.on('mouseover', scrollToDescriptionEntry(config, resume))
	.on('mouseout', unhighlightDescriptionEntry(config, resume))
    ;

    var interpolator = d3.interpolateNumber(0, config.timelineWidth);
    var initialScrollTween = function () {
	return function (t) {
	    d3.select("#" + config.timelineContainerId).property("scrollLeft", interpolator(t));
	};
    };

    d3
	.transition()
	.duration(3000)
	.tween("scroll", initialScrollTween);
}

var drawDescription = function (config, resume) {
    var height = window.innerHeight - config.timelineHeight - config.timelineMargin;
    d3.select("#" + config.containerId)
	.append("div")
	.attr('id', config.descriptionId)
	.style('width', config.containerWidth)
	.style('height', height + 'px')
    ;
};

drawResume = function (resume) {
    var config = {
	preferredBoxHeight: 20,
        containerWidth: d3.select("#resume-container").property("clientWidth"),
	timelineMargin: 20,
	timelineWidth: 3000,
	timelineHeight: 90,
	highlightColor: "#f1c40f",
	containerId: "resume-container",
	descriptionId: "resume-description",
	timelineContainerId: "timeline-container",
	timelineId: "resume-timeline",
	monthYearFormat: d3.time.format("%m/%Y"),
    };

    drawDescription(config, resume);
    drawHeader(config, resume);
    drawProfessionalExperience(config, resume);
    drawEducation(config, resume);
    drawAcademicExperience(config, resume);
    drawTimeline(config, resume);
};
