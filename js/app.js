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
// Selecting all section elements
const allSections = document.querySelectorAll("section");
// Slecting Unordered List
const navMenu = document.querySelector("#navbar__list");

/**
 * End Global Variables
 * Start Helper Functions
 *
*/

/*
 * Creating the nav bar
*/
function createNavItem(section) {
  const listItemText = section.getAttribute("data-nav");
  const sectionId = section.getAttribute("id");
  const listItem = document.createElement("li");
  const anchor = document.createElement("a");
// Creating hyperlinks to sections locations
  anchor.setAttribute("href", `#${sectionId}`);
// Applying style to anchor elements (styling nav bar)
  anchor.setAttribute("class", "menu__link");
// anchor elements content indicating its location
  anchor.textContent = listItemText;
// Scroll to section on link click
  anchor.onclick = scrollToSection;
// appending child elements to their parents
  listItem.appendChild(anchor);
  navMenu.appendChild(listItem);
}

// Scroll to anchor ID
function scrollToSection(event) {
  event.preventDefault();
  const navItem = event.target;
  const sectionId = navItem.getAttribute("href").slice(1);
  const selectedSection = document.getElementById(sectionId);
  selectedSection.scrollIntoView({behavior: "smooth", block: "center"});
}


/*
 * Add class 'active' to section when near top of viewport
 * idea from the code snippet provided in the guide presentation
 * viewed MDN docs on Intersection Observer API to get a better understanding of the snippet code
 * finally, I was able to implement the code to my project
 * learned about lambda functions as well!
*/
let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
    entry.target.classList.remove("your-active-class");
    if(entry.isIntersecting){
      console.log(entry);
      entry.target.classList.add("your-active-class");
      entry.target.nav = entry.target.dataset.nav;
	}
	});
}, {rootMargin: "-400px 0px -200px 0px"});

for (let section of allSections) {
// Build menu
  createNavItem(section);
// Set sections as active
  observer.observe(section);
}
