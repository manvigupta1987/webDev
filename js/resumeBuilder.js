/*
This is empty on purpose! Your code to build the resume will go here.
 */

 /*
This is empty on purpose! Your code to build the resume will go here.
 */
(function(){
 var model = {
 	init: function(){
 	this.bio = {
 		'name': "Manvi Gupta",
 		'role' : "Front End Developer",
 		'contacts': {
 			'mobile':"919-389-6627",
 			'email':"manvigupta1987@gmail.com",
 			'github':"https://github.com/manvigupta1987",
 			'LinkedIn':"https://www.linkedin.com/in/manvi-gupta/",
 			'location':"Raleigh, North Carolina"
 		},
 		'welcomeMessage':"Thank you for your visiting my resume page!!",
 		'skills':['HTML', 'CSS', 'JavaScript', 'jQuery'],
 		'biopic': "images/fry.jpg"
 	},
 	this.work = {
 		'jobs': [{
 			'employer': 'IciDigital',
            'title': 'Software Consultant',
            'location': 'Raleigh, North Carolina',
            'dates': '2018-Present',
            'description': 'Resonsible for building customer site using AEM. Design and build AEM components, AEM targeting etc.'
 		},{
            'employer': 'Duke University',
            'title': 'Computer Engineer, Contractor',
            'location': 'Raleigh, North Carolina',
            'dates': '2017',
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
                'images': ['images/meomory1.png', 'images/memory2.png']
            }, {
                'title': 'Mobile Portfolio',
                'dates': '2018',
                'description': 'Optimizing a provided website with a number of performance - related issues. Achieving a target PageSpeed score and runs at 60 frames per second. ',
                'images': ['images/websiteoptimization.png']
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
    }
}
var view = {
	init: function(){
		this.renderBio();
        this.renderWork();
	},
	renderBio: function(){
		let topContacts = $('#topContacts');
		let footerContacts = $('#footerContacts');
		let header = $('#header');
		let bioData = octopus.getBioData();
		let formatedName = HTMLheaderName.replace(DATA, bioData.name);
		let formatedBioPic = HTMLbioPic.replace(DATA, bioData.biopic);
		let formatedRole = HTMLheaderRole.replace(DATA, bioData.role);
		header.prepend(formatedBioPic, formatedName,formatedRole);

		if(bioData.contacts){
			if(bioData.contacts.email){
				let formatedEmail = HTMLemail.replace(DATA, bioData.contacts.email);
				topContacts.append(formatedEmail);
				footerContacts.append(formatedEmail);
			}
			if(bioData.contacts.mobile){
				let formatedMobile = HTMLmobile.replace(DATA, bioData.contacts.mobile);
				topContacts.append(formatedMobile);
				footerContacts.append(formatedMobile);
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
            work.jobs.forEach(function(job, i){
                $("#workExperience").append(HTMLworkStart);
                let formatedEmployer = HTMLworkEmployer.replace(DATA, job.employer),
                    formattedTitle = HTMLworkTitle.replace(DATA, job.title);
                $(".work-entry:last").append(formatedEmployer + formattedTitle);
                var formattedWorkDates = HTMLworkDates.replace("%data%", job.dates);
            $(".work-entry:last").append(formattedWorkDates);
            var formattedWorkLocation = HTMLworkLocation.replace("%data%", job.location);
            $(".work-entry:last").append(formattedWorkLocation);
            var formattedWorkDescription = HTMLworkDescription.replace("%data%", job.description);
            $(".work-entry:last").append(formattedWorkDescription);

            });

        }
    }
};
octopus.init();
})();
