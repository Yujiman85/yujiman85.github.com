'use strict';

// Get the modal
const modal = document.querySelector('#myModal');

// Get the <span> element that closes the modal
const span = document.querySelector('.close');

//Get the <a> element that opens the modal
const about = document.querySelector('#about');

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

//Function to change content of modal depending on the link clicked
function openModal(id) {
    const content = document.querySelector('#modalContent');
    if (id === 'about') {
        content.innerText = 'This is About Me.';
        modal.style.display = 'block';
    }
    if (id === 'resume') {
        content.innerText = 'This is my Resume.';
        modal.style.display = 'block';
    }
}