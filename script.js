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
    document.querySelector("html").style.overflowY = 'visible'; //Makes the main page scrollable again upon closing modal
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.querySelector(".modal-content").style.textAlign = "left";
        document.querySelector("html").style.overflowY = 'visible';
    }
}

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
        document.querySelector("html").style.overflow = 'hidden';
        modal.style.display = 'block';

    } catch(error) {
        console.log(error);
    }
}