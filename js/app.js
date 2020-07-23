/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const navigationBar = document.getElementById("navbar__list");
const allSections = document.getElementsByTagName("section");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
let isInViewport = function(el) {
    const rect = el.getBoundingClientRect();
    return (
        (rect.top >= 0) && (rect.top < (window.innerHeight / 2))
    );
}

let setSecAsActive = function(currentActiveSecion) {
    const previousActiveSecion = document.querySelector(".your-active-class");
    if(previousActiveSecion !== currentActiveSecion) {
        previousActiveSecion.classList.remove("your-active-class");
        currentActiveSecion.classList.add("your-active-class");
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
let buildNavigationBar = function() {
    const liOfSections = document.createDocumentFragment();
    for(const sec of allSections) {
        const secName = sec.getAttribute("data-nav");
        const secId = sec.getAttribute("id");
        const liOfsec = document.createElement("li");
        liOfsec.innerHTML = `<a href=#${secId} class="menu__link">${secName}</a>`;
        liOfSections.appendChild(liOfsec);
    }
    navigationBar.appendChild(liOfSections);
}

// Add class 'active' to section when near top of viewport
let isSectionTopOfView = function () {
    for(const sec of allSections){
        if(isInViewport(sec) === true) {
            setSecAsActive(sec);
        }
    }
}

// Scroll to anchor ID using scrollTO event
let defineAnchorListeners = function() {
    let menuLinks = document.querySelectorAll('.menu__link'); 
         
    menuLinks.forEach(sec => { 
        sec.onclick = function (ev) { 
            ev.preventDefault(); 
            let destinationSection = document.querySelector(this.hash); 
            destinationSection.scrollIntoView({ 
                behavior: 'smooth' 
            }); 
        } 
    }); 
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.addEventListener("DOMContentLoaded", buildNavigationBar);

// Scroll to section on link click
window.addEventListener("load", defineAnchorListeners);

// Set sections as active
document.addEventListener('scroll', isSectionTopOfView);