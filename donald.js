var data = {
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


drawCV(data);
