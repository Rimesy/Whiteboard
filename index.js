// DROPDOWN FUNCTIONS
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function colourButton() {
    document.getElementById("colourButton").classList.toggle("show");
}

function brushSizeButton() {
    document.getElementById("brushSizeButton").classList.toggle("show");
}

function brushTypeButton() {
    document.getElementById("brushTypeButton").classList.toggle("show");
}
  
// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.toolBar')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// CANVAS FUNCTIONS
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");