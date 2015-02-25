var row = function (contents) {
  var html = '';
  html += '<div class="cv-row">';
  html += contents;
  html += '</div>';

  return html;
};

var column = function (num, denom, contents) {
  var html = '';
  html += '<div class="cv-column" style="width:' + Math.floor(100*num/denom) + '%">';
  html += contents;
  html += '</div>';

  return html;
};

var div = function (klass, contents) {
  return '<div class="' + klass + '">' + contents + '</div>';
};

var span = function (klass, contents) {
  return '<span class="' + klass + '">' + contents + '</span>';
};

var headerDescription = function (config, cv) {
  var name = '<div class="cv-description-header-name">' + cv.name + '</div>';

  var email = div(
    'cv-description-header-email',
    '<a href="mailto:' + cv.email + '"><i class="fa fa-envelope-square"></i></a>'
  );

  var linkedin = div(
    'cv-description-header-linkedin',
    '<a href="' + cv.linkedin + '"><i class="fa fa-linkedin-square"></i></a>'
  );

  var github = div(
    'cv-description-header-github',
    '<a href="' + cv.github + '"><i class="fa fa-github-square"></i></a>'
  );

  var summary = div('cv-description-header-summary', cv.summary);

  var links = row(column(8, 24, email) + column(8, 24, github) + column(8, 24, linkedin));
  return (
    row(column(20, 24, name) + column(4, 24, links)) +
      row(column(1, 1, summary))
  );
};

var drawHeader = function (config, cv) {
  var header = d3.select("#" + config.descriptionId)
        .append('div')
        .attr('class', 'description-section')
        .html(headerDescription(config, cv));
};

var professionalExperienceDescription = function (config, cv) {
  return function (d) {
    var summary = div(
      "cv-description-professional-experience-summary",
      span("cv-description-professional-experience-title", d.title) +
        ' — ' +
        span("cv-description-professional-experience-role", d.role || "") +
        ' at ' +
        span("cv-description-professional-experience-company", d.company) +
        ' in ' +
        span('cv-description-professional-experience-location', d.location)
    );

    var dates = div(
      "cv-cv-description-professional-experience-dates",
      span("description-professional-date-start", config.monthYearFormat(d.start)) +
        '—' +
        span("description-professional-date-end", (d.end ? config.monthYearFormat(d.end) : 'present'))
    );

    var header = div(
      "cv-description-professional-experience-header",
      row(column(20, 24, summary) + column(4, 24, dates))
    );

    var lines = div(
      "cv-description-professional-experience-lines",
      d.summary.map(
        function(lineContents) {
          return row(column(1,1, div("cv-description-professional-experience-line", lineContents)));
        }
      ).join("")
    );

    return header + lines;
  };
};

var drawProfessionalExperience = function (config, cv) {

  var professionalExperience = d3.select("#" + config.descriptionId)
        .append('div')
        .attr('class', 'description-section');

  professionalExperience
    .append('div')
    .attr('class', 'cv-description-section-header')
    .text('Professional Experience');

  professionalExperience.selectAll()
    .data(cv.professionalExperience)
    .enter()
    .append('div')
    .attr('class', 'cv-description-professional-experience')
    .html(professionalExperienceDescription(config, cv))
    .on('click', scrollToTimelineEntry(config, cv))
    .on('mouseover', highlightEntry(config, cv))
    .on('mouseout', unhighlightDescriptionEntry(config, cv))
  ;
};


var educationDegreeDescription = function (config, cv) {
  return function (d) {
    var html = '';

    var title = div(
      'cv-description-education-degree-summary',
      span("cv-description-education-degree-title", d.degree) +
        ' at ' +
        span("cv-description-education-degree-institution", d.institution) +
        ', ' +
        span("cv-description-education-degree-location", d.location)
    );

    var dates = div(
      'cv-description-education-degree-dates',
      span("cv-description-education-degree-start", config.monthYearFormat(d.start)) +
        '—' +
        span("cv-description-education-degree-end", (d.end ? config.monthYearFormat(d.end) : 'present'))
    );

    var header = row(column(20, 24, title) + column(4, 24, dates));

    var lines = div(
      "cv-description-education-degree-lines",
      d.summary.map(
        function(line) {
          return row(column(1, 1, div("cv-description-education-degree-line", line)));
        }
      ).join('')
    );

    return header + lines;
  };
};

var drawEducation = function (config, cv) {
  var education = d3.select("#" + config.descriptionId)
        .append('div')
        .attr('class', 'description-section');

  education
    .append('div')
    .attr('class', 'cv-description-section-header')
    .text('Education');

  education.selectAll()
    .data(cv.degrees)
    .enter()
    .append('div')
    .attr('class', 'cv-description-education-degree')
    .html(educationDegreeDescription(config, cv))
    .on('click', scrollToTimelineEntry(config, cv))
    .on('mouseover', highlightEntry(config, cv))
    .on('mouseout', unhighlightDescriptionEntry(config, cv))
  ;
};

var academicExperienceDescription = function (config, cv) {
  return function (d) {
    var summary = div(
      'cv-description-academic-experience-summary',
      span('cv-description-academic-experience-title', d.title) +
        ' at ' +
        span('cv-description-academic-experience-institution', d.institution) +
        ' in ' +
        span('cv-description-academic-experience-location', d.location)
    );

    var dates = div(
      "cv-description-academic-experience-dates",
      span("cv-description-academic-experience-start", config.monthYearFormat(d.start)) +
        '—' +
        span("cv-description-academic-experience-end", (d.end ? config.monthYearFormat(d.end) : 'present'))
    );

    return row(column(20, 24, summary) + column(4, 24, dates));
  };
};

var drawAcademicExperience = function (config, cv) {

  var academicExperience = d3.select("#" + config.descriptionId)
        .append('div')
        .attr('class', 'description-section');

  academicExperience
    .append('div')
    .attr('class', 'cv-description-section-header')
    .text('Academic Experience');

  academicExperience.selectAll()
    .data(cv.academicExperience)
    .enter()
    .append('div')
    .attr('class', 'cv-description-academic-experience')
    .html(academicExperienceDescription(config, cv))
    .on('click', scrollToTimelineEntry(config, cv))
    .on('mouseover', highlightEntry(config, cv))
    .on('mouseout', unhighlightDescriptionEntry(config, cv))
  ;
};

var elementBottomOffset = function (config, el) {
  var rect = el.getBoundingClientRect();
  var viewHeight = window.innerHeight || document.documentElement.clientHeight;
  return rect.bottom - viewHeight + config.timelineHeight + config.timelineMargin;
};

var elementTopOffset = function (config, el) {
  return el.getBoundingClientRect().top - config.timelineMargin;
};

var findDescription = function (config, d) {
  return d3.selectAll("div").filter(
    function (div) {
      return div === d;
    }
  )[0][0]; // why oh why?
};

var findTimelineEntry = function (config, d) {
  return d3.selectAll("rect").filter(
    function (rect) {
      return rect === d;
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

var scrollTimelineTween = function (config, original, offset) {
  return function() {
    var i = d3.interpolateNumber(0, offset);
    return function(t) {
      d3.select('#' + config.timelineContainerId).property('scrollLeft', original + i(t));
    };
  };
};

var scrollToTimelineEntry = function (config, cv) {
  return function (d) {
    var timeline = findTimelineEntry(config, d);
    d3.select(timeline).style("fill", '#f1c40f');

    var rightOffset = timeline.getBoundingClientRect().right;
    var viewWidth = window.innerWidth || document.documentElement.clientWidth;
    var timelineOriginalScroll = d3.select("#" + config.timelineContainerId).property('scrollLeft');

    var targetScrollLeft = -1;
    if (rightOffset > (viewWidth/2) && rightOffset < viewWidth) { // maybe scroll to center
      targetScrollLeft = timelineOriginalScroll + rightOffset - (viewWidth/2);
    }
    else if (rightOffset > viewWidth) { // hidden to the right
      targetScrollLeft = timelineOriginalScroll + (rightOffset - (viewWidth/2));
    }
    else if (rightOffset < 0) { // hidden to the left
      targetScrollLeft = timelineOriginalScroll + rightOffset - (viewWidth / 2);
    }
    else if (rightOffset < (viewWidth/2)) { // visible but right end not centered
      targetScrollLeft = timelineOriginalScroll - (viewWidth / 2) + rightOffset;
    }

    d3.select('#' + config.timelineContainerId)
      .transition()
      .delay(100)
      .duration(700)
      .tween('scrollLeft', scrollTimelineTween(config, timelineOriginalScroll, targetScrollLeft-timelineOriginalScroll))
    ;
  };
};

var scrollToDescriptionEntry = function (config, cv) {
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
  };
};

var highlightEntry = function (config, cv) {
  return function (d) {

    var timeline = findTimelineEntry(config, d);
    d3.select(timeline).style("fill", '#f1c40f');

    var descriptionEntry = findDescription(config, d);
    d3.select(descriptionEntry)
      .style("border-color", config.highlightBackground);
  };
};

var unhighlightDescriptionEntry = function (config, cv) {
  return function (d) {
    var descriptionEntry = findDescription(config, d);
    d3.select(descriptionEntry).style("border-color", config.defaultBackground);

    var timelineEntry = findTimelineEntry(config, d);
    var timelineEntryClass = d3.select(timelineEntry).attr('class');
    if (timelineEntryClass === config.timelineProfessionalExperienceClass) {
      d3.select(timelineEntry).style('fill', '#27ae60');
    } else {
      d3.select(timelineEntry).style('fill', '#2c3e50');
    }
  };
};

var isDateCollision = function (entry, others) {
  var contains = function (entry, date) {
    return date > entry.start && date < entry.end;
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
  };
};

var timelineBoxX = function (scale) {
  return function (d) {
    return scale(d.start);
  };
};

var timelineBoxY = function (cv, config, type) {
  var professionalCollisionOffset = timelineBoxHeight(config)() / 2;
  var academicCollisionOffset = timelineBoxHeight(config)();

  var boxOffset = function (d) {
    return (config.timelineHeight / 1.618) - timelineBoxHeight(config)(d) - 2;
  };

  if (type === "professional") {
    return function (d) {
      var isCollision = isDateCollision(d, cv.degrees);
      return boxOffset(d) - (isCollision ? professionalCollisionOffset : 0);
    };
  }

  if (type === "academic") {
    return function (d) {
      var isCollision = isDateCollision(d, cv.degrees);
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
  };
};

var findMinYear = function (cv) {
  var extractDates = function (d) {
    if (d.end) {
      return [d.start, d.end];
    }
    return [d.start];
  };

  var allDates = cv.degrees.map(extractDates)
        .concat(cv.professionalExperience.map(extractDates), cv.academicExperience.map(extractDates))
        .reduce(function (accum, next) { return accum.concat(next); })
  ;

  return d3.min(allDates).getFullYear();
};

var drawTimeline = function (config, cv) {
  var width = config.timelineWidth;
  var height = config.timelineHeight;

  var container = d3.select("#" + config.containerId);

  var timelineContainer = container.append('div')
        .attr("id", config.timelineContainerId)
        .style("width", '100%')
        .style("height", config.timelineHeight + "px")
  ;

  var timeline = timelineContainer.append("svg")
        .attr("id", config.timelineId)
        .attr("width", width + "px")
        .attr("height", height + "px")
  ;

  var minYear = findMinYear(cv);
  var startDate = new Date(minYear, 0, 0);
  var endDate = new Date();

  var scale = d3.time.scale()
        .domain([startDate, endDate])
        .range([config.timelineMargin, width-config.timelineMargin]);

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
    .data(cv.academicExperience.concat(cv.degrees))
    .enter()
    .append('rect')
    .attr('class', 'cv-timeline-academic-experience')
    .attr('x', timelineBoxX(scale))
    .attr('y', timelineBoxY(cv, config, "academic"))
    .attr('width', timelineBoxWidth(scale))
    .attr('height', timelineBoxHeight(config))
    .on('mouseover.scroll', scrollToDescriptionEntry(config, cv))
    .on('mouseover.highlight', highlightEntry(config, cv))
    .on('mouseout', unhighlightDescriptionEntry(config, cv))
  ;

  timeline.selectAll('.timeline')
    .data(cv.professionalExperience)
    .enter()
    .append('rect')
    .attr('class', 'cv-timeline-professional-experience')
    .attr('x', timelineBoxX(scale))
    .attr('y', timelineBoxY(cv, config, "professional"))
    .attr('width', timelineBoxWidth(scale))
    .attr('height', timelineBoxHeight(config))
    .on('mouseover.scroll', scrollToDescriptionEntry(config, cv))
    .on('mouseover.highlight', highlightEntry(config, cv))
    .on('mouseout', unhighlightDescriptionEntry(config, cv))
  ;

  var viewWidth = window.innerWidth || document.documentElement.clientWidth;
  var interpolator = d3.interpolateNumber(0, config.timelineWidth-window.innerWidth);
  var initialScrollTween = function () {
    return function (t) {
      d3.select("#" + config.timelineContainerId).property("scrollLeft", interpolator(t));
    };
  };

  d3
    .transition()
    .duration(3000)
    .tween("scroll", initialScrollTween);
};

var drawDescription = function (config, cv) {
  var height = window.innerHeight - config.timelineHeight - config.timelineMargin;
  d3.select("#" + config.containerId)
    .append("div")
    .attr('id', config.descriptionId)
    .style('width', '100%')
    .style('height', height + 'px')
  ;
};

drawCV = function (cv) {
  var config = {
    preferredBoxHeight: 20,
    containerWidth: d3.select("#cv-container").property("clientWidth"),
    timelineMargin: 20,
    timelineWidth: 3000,
    timelineHeight: 90,
    timelineProfessionalExperienceClass: 'cv-timeline-professional-experience',
    defaultColor: '#2c3e50',
    defaultBackground: '#fff',
    highlightColor: '#fff',
    highlightBackground: '#f1c40f',
    containerId: 'cv-container',
    descriptionId: 'cv-description',
    timelineContainerId: 'cv-timeline-container',
    timelineId: 'cv-timeline',
    monthYearFormat: d3.time.format('%m/%Y'),
  };

  drawDescription(config, cv);
  drawHeader(config, cv);
  drawProfessionalExperience(config, cv);
  drawEducation(config, cv);
  drawAcademicExperience(config, cv);
  drawTimeline(config, cv);
};
