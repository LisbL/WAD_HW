/*------Scroll to top button------*/ 
// Get the button
let topButton = document.getElementById("topBtn");

// When user clicks on the button, scroll to the top
function topFunction() {
    document.body.scrollTop = 0; // For Safari users
    document.documentElement.scrollTop = 0 // For Chrome etc
}