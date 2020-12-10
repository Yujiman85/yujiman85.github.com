'use strict';

// Get the modal
const modal = document.querySelector('#myModal');

// Get the <span> element that closes the modal
const span = document.querySelector('.close');

//Get the <a> element that opens the modal
const about = document.querySelector('#about');

//Grab the modal header element
const headline = document.querySelector('#modalHeadline');

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    document.querySelector(".modal-content").style.textAlign = "left";
    document.querySelector("body").style.overflow = 'visible'; //Makes the main page scrollable again upon closing modal
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.querySelector(".modal-content").style.textAlign = "left";
        document.querySelector("body").style.overflow = 'visible';
    }
}

//Changes the content of modal depending on the link clicked
function openModal(id) {
    const content = document.querySelector('#modalContent');

    if (id === 'about') {
        document.querySelector("body").style.overflow = 'hidden';
        document.querySelector('h2').style.paddingTop = 0;
        document.querySelector(".modal-content").style.background = "url('/images/binding_dark.png')";
        headline.innerText = 'About Me';
        content.innerHTML = aboutMeImage + aboutMeContent;
        modal.style.display = 'block';
    }
    if (id === 'resume') {
        document.querySelector("body").style.overflow = 'hidden';
        document.querySelector('h2').style.paddingTop = 0;
        document.querySelector(".modal-content").style.background = "url('/images/binding_dark.png')";
        headline.innerText = 'Resume';
        content.innerHTML = resumeContent;
        modal.style.display = 'block';
    }
}

//Content for About Me
let aboutMeImage = `<img src="/images/tybelgium.jpg" class="bioPic" title="That's me in Belgium!" />`
let aboutMeContent = `I was born May 1985 in Philadelphia, Pennsylvania. My love of technology started when I was 5 years old and my parents bought my siblings and I an NES for Christmas. The first game I ever played was Super Mario Bros. and the second the first level started up I fell in love. I played level after level and even as the difficulty increased I became even more determined to finish the game. It became almost a tradition for my siblings to watch me play the games. Video games are a big part of my life and I have a lot of memories playing so many of them throughout the years. I even dabbled in game design a little bit in my teenage years. I designed my own Role Playing Game using a program called RPG Maker. My game had it's own title screen, characters, opening intro, and storyline that I all came up with myself. I lost that game a long time ago but part of me wishes I could fire it back up and relive the memories of putting it all together.<br><br>

As I got older my interests started to turn more towards computers and how they operated. At first my curiosity about them was mostly surface-level: Processor speed, hard drive space, monitor resolution, etc. This is what led me to major in Information Science and Technology(IST) while attending Penn State University. There my focus was on Integration and Application which mostly consisted of how best to provide end-users with a pleasant experience. In one particular group project we were tasked with designing a new healthcare website that users could use to identify their symptoms of whatever was afflicting them. Once all the symptoms were identified the website would give them a possible diagnosis and the next steps to take in remedying their situation. I took lead in designing the interface while my team members took care of the functionality. For other similar projects I was tasked with functionality.<br><br>

I currently work with children but ultimately I want to work in tech. I want to make websites and design apps that can be useful for a wide range of people. My dream is to be part of a company/team that communicates and delegates well. For a year and half starting at the beginning of 2018 I diligently studied and refreshed my knowledge in Javascript and HTML. I added a course in React and Node so that I could learn how to utilize new technologies in a field that is always expanding. I really do love technology and its applications and I hope that I can have a long and successful career creating and utilizing what I love.`;

//Content for Resume
let resumeContent = `<embed type="text/html" src="Ty-Jenkins-Resume.html" style="background-color: #d3d3d3; min-height:60vh; border-radius: 3px; width:100%">`;

//Async function to open Modal for project section
async function openProjectModal(id) {
    const content = document.querySelector('#modalContent');
    document.querySelector(".modal-content").style.textAlign = "center";
    document.querySelector('h2').style.paddingTop = 0;
    document.querySelector(".modal-content").style.background = "url('/images/memphis-mini-dark.png')";

    try {
        let response = await fetch('projects.json');
        let projects = await response.json();

        headline.innerText = projects[id].name; // Sets the name of the project
        let img = `<img src="./images/${projects[id].img}" class="modalProjectImage" /><br><br>`; //Grabs the project image
        let descrip = `<div class="modalProjectDescrip">${projects[id].description}</div>`; //Grabs the project description
        let demo = `<a href="${projects[id].link}" target="_blank">Project Demo</a><br><br>`; // Grabs the project demo link
        let source = `<a href="${projects[id].source}" target="_blank">Source Code</a><br><br>`; // Grabs the project source link
        content.innerHTML = img + descrip + demo + source; //Sets all the info for the modal
        document.querySelector("body").style.overflow = 'hidden';
        modal.style.display = 'block';

    } catch(error) {
        console.log(error);
    }
}