/*
This is empty on purpose! Your code to build the resume will go here.
 */

 /*
This is empty on purpose! Your code to build the resume will go here.
 */
 var model = {
 	init: function(){
 	this.bio = {
 		'name': "Manvi Gupta",
 		'role' : "Front End Developer",
 		'contacts': {
 			'mobile':"919-389-6627",
 			'email':"manvigupta1987@gmail.com",
 			'github':"manvigupta1987",
 			'LinkedIn':"manvi-gupta",
 			'location':"Raleigh, NC"
 		},
 		'welcomeMessage':"An experienced software engineer efficient in different coding languages including Java, C, Android technologies and exposed to a wide range of development practices. I am a hustler and a passionate android developer. I enjoy building efficient software and learning new technologies and tools. I am looking for a Software Engineering position where I may use well-honed skills in planning, coding, and testing in order to develop state-of-the-art software.",
 		'skills':['AEM','Sling','Slightly','Groovy','HTML', 'CSS', 'JavaScript', 'jQuery'],
 		'biopic': "images/fry.jpg"
 	},
 	this.work = {
 		'jobs': [{
 			'employer': 'iCiDigital',
            'title': 'Software Consultant',
            'location': 'Raleigh, NC',
            'dates': '2018-Present',
            'description': 'Resonsible for building customer site using AEM. Design and build AEM components, AEM targeting etc.'
 		},{
            'employer': 'Duke University',
            'title': 'Computer Engineer, Contractor',
            'location': 'Raleigh, NC',
            'dates': 'Nov 2017-Jan 2018',
            'description': 'Designed an android app used for monitoring the users posture'
        }]
 	},
 	this.projects = {
        'projects': [{
                'title': 'Classic Arcade Game Clone',
                'dates': '2018',
                'description': 'Recreating the classic arcade game Frogger and adding a number of entities to the game including the player characters and enemies. Developing with Object-Oriented JavaScript and HTML5 Canvas.',
                'images': ['images/arcade1.png', 'images/arcade2.png']
            }, {
                'title': 'Memory Game',
                'dates': '2018',
                'description': 'A game where user has to remember the icons and match with the other icon to score a point',
                'images': ['images/memory1.png', 'images/memory2.png']
            }, {
                'title': 'Portfolio Site',
                'dates': '2018',
                'description': 'Optimizing a provided website with a number of performance - related issues. Achieving a target PageSpeed score and runs at 60 frames per second. ',
                'images': ['images/portfolio1.png', 'images/portfolio2.png']
            }, {
                'title': 'Pixel Art Maker',
                'dates': '2018',
                'description': 'A game which allows you to select desired height and width to make a grid and you can fill each grid with your favourite colors',
                'images': ['images/pixelart1.png', 'images/pixelart2.png']
            }]
        },
    this.education = {
            'schools': [{
                'name': 'SRMS College',
                'location': 'Bareilly, India',
                'degree': 'Bachelor',
                'majors': 'Electronics and Communication Engineering',
                'dates': '2008',
                'url': 'http://www.srms.ac.in/'
            }],
            'onlineCourses': [{
                'title': 'Front End Developer NanoDegree',
                'school': 'Udacity',
                'date': '2018',
                'url': 'https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001'
            }, {
                'title': 'Resposnsive images',
                'school': 'Udacity',
                'date': '2018',
                'url': 'https://www.udacity.com/courses/responsive-images--ud882'
            }, {
                'title': 'Resposnsive Web Design Fundamentals',
                'school': 'Udacity',
                'date': '2018',
                'url': 'https://www.udacity.com/courses/responsive-web-design-fundamentals--ud893'
            }, {
                'title': 'Website Performance Optimization',
                'school': 'Udacity',
                'date': '2015',
                'url': 'https://www.udacity.com/courses/website-performance-optimization--ud884'
            }, {
                'title': 'Browser Rendering Optimization',
                'school': 'Udacity',
                'date': '2015',
                'url': 'https://www.udacity.com/courses/browser-rendering-optimization--ud860'
            }]
        }
    }
};

var DATA = '%data%';
var octopus = {
	init : function(){
		model.init();
		view.init();
	},
	getBioData: function(){
		return model.bio;
	},
    getWorkData: function(){
        return model.work;
    },
    getProjectsData: function() {
        return model.projects;
    },
    getEducationData: function() {
        return model.education;
    }
}
var view = {
	init: function(){
		this.renderBio();
        this.renderWork();
        this.renderProjects();
        this.renderEducation();
        this.renderGoogleMap();
	},
	renderBio: function(){
		let topContacts = $('#topContacts');
		let footerContacts = $('#footerContacts');
		let header = $('#header');
		let bioData = octopus.getBioData();
		let formatedName = HTMLheaderName.replace(DATA, bioData.name);
		let formatedBioPic = HTMLbioPic.replace(DATA, bioData.biopic);
		let formatedRole = HTMLheaderRole.replace(DATA, bioData.role);
		header.prepend(formatedName,formatedRole);

		if(bioData.contacts){
			if(bioData.contacts.mobile){
                let formatedMobile = HTMLmobile.replace(DATA, bioData.contacts.mobile);
                topContacts.append(formatedMobile);
                footerContacts.append(formatedMobile);
            }
            if(bioData.contacts.email){
				let formatedEmail = HTMLemail.replace(DATA, bioData.contacts.email);
				topContacts.append(formatedEmail);
				footerContacts.append(formatedEmail);
			}
			if(bioData.contacts.LinkedIn){
				let formatedLink = HTMLLinkedin.replace(DATA, bioData.contacts.LinkedIn);
				topContacts.append(formatedLink);
				footerContacts.append(formatedLink);
			}
			if(bioData.contacts.location){
				let formatedLoc = HTMLlocation.replace(DATA, bioData.contacts.location);
				topContacts.append(formatedLoc);
				footerContacts.append(formatedLoc);
			}
			if(bioData.contacts.github){
				let formatedGit = HTMLgithub.replace(DATA, bioData.contacts.github);
				topContacts.append(formatedGit);
				footerContacts.append(formatedGit);
			}
		}
        header.append(formatedBioPic);
		let formattedWelcomeMsg = HTMLwelcomeMsg.replace("%data%", bioData.welcomeMessage);
		header.append(formattedWelcomeMsg);

		if(bioData.skills.length > 0){
			header.append(HTMLskillsStart);
			for(let i =0; i<bioData.skills.length; i++){
				let formatedSkils = HTMLskills.replace(DATA ,bioData.skills[i]);
				$("#skills").append(formatedSkils);
			}
		}
	},
    renderWork: function(){
        let work = octopus.getWorkData();
        if(work.jobs.length > 0){
            work.jobs.forEach(function(job, i) {
                $("#workExperience").append(HTMLworkStart);
                let formatedEmployer = HTMLworkEmployer.replace(DATA, job.employer),
                    formattedTitle = HTMLworkTitle.replace(DATA, job.title);
                $(".work-entry:last").append(formatedEmployer + formattedTitle);
                let formattedWorkDates = HTMLworkDates.replace("%data%", job.dates);
                $(".work-entry:last").append(formattedWorkDates);
                let formattedWorkLocation = HTMLworkLocation.replace("%data%", job.location);
                $(".work-entry:last").append(formattedWorkLocation);
                let formattedWorkDescription = HTMLworkDescription.replace("%data%", job.description);
                $(".work-entry:last").append(formattedWorkDescription);
            });
        }
    },
    renderProjects: function() {
        let projectData = octopus.getProjectsData();
        if(projectData.projects.length>0){
            projectData.projects.forEach( function(project, i) {
                $('#projects').append(HTMLprojectStart);
                let formattedProjectName = HTMLprojectTitle.replace(DATA, project.title);
                $('.project-entry:last').append(formattedProjectName);
                let formatedDates = HTMLprojectDates.replace(DATA, project.dates);
                $('.project-entry:last').append(formatedDates);
                let formatedDes = HTMLprojectDescription.replace(DATA, project.description);
                $('.project-entry:last').append(formatedDes);
                if(project.images.length > 0){
                    project.images.forEach( function(image, i) {
                        let formatedImage = HTMLprojectImage.replace(DATA, image);
                        $('.project-entry:last').append(formatedImage);
                    });
                }
            });
        }
    },
    renderEducation: function() {
        let eduData = octopus.getEducationData();
        if(eduData.schools.length > 0) {
            eduData.schools.forEach(function(school, i){
                $('#education').append(HTMLschoolStart);
                let formattedHTMLschoolName = HTMLschoolName.replace("%data%", school.name),
                    formattedHTMLschoolDegree = HTMLschoolDegree.replace("%data%", school.degree);
                $('.education-entry:last').append(formattedHTMLschoolName + formattedHTMLschoolDegree );
                $('.education-entry:last').append(HTMLschoolDates.replace(DATA,school.dates));
                $('.education-entry:last').append(HTMLschoolLocation.replace(DATA,school.location));
                $('.education-entry:last').append(HTMLschoolMajor.replace(DATA,school.majors));
            });
        }
        if(eduData.onlineCourses.length > 0) {
            $('#education').append(HTMLonlineClasses);
            eduData.onlineCourses.forEach(function(course, i){
                $('#education').append(HTMLschoolStart);
                $('.education-entry:last').append(HTMLonlineTitle.replace(DATA,course.title));
                $('.education-entry:last').append(HTMLonlineSchool.replace(DATA,course.school));
                $('.education-entry:last').append(HTMLonlineDates.replace(DATA,course.date));
                $('.education-entry:last').append(HTMLonlineURL.replace(DATA,course.url));
            });
        }
    },
    renderGoogleMap: function() {
        $('#mapDiv').append(googleMap);
    }

};
octopus.init();
