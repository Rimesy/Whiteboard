// DROPDOWN FUNCTIONS
// When the user clicks on the button, toggle between hiding and showing the dropdown content 
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

// SLIDER FUNCTIONS
var slider = document.getElementById("brushSizeRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value // MARKER

// Update the current slider value
slider.oninput = function() {
  output.innerHTML = this.value;
  console.log(slider.value);
}

// CANVAS FUNCTIONS
// Set up canvas
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
ctx.strokeStyle = 'black';
ctx.lineWidth = 5;

// Adjust canvas for high DPI
adjustCanvasForHighDPI();

var isMouseDown = false;

// Listen for mousedown event
canvas.addEventListener('mousedown', function(event) {
    isMouseDown = true;
    console.log('Mouse down:', isMouseDown);

    ctx.beginPath();

    // Drawing on canvas when mouse is down
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.moveTo(x, y);
});

// Listen for mouseup event
canvas.addEventListener('mouseup', function(event) {
    isMouseDown = false;
    console.log('Mouse down:', isMouseDown);

    // End drawing path
    ctx.closePath();
});

// Listen for mousemove event
canvas.addEventListener('mousemove', function(event) {
    if (isMouseDown) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        console.log('Moved to:', (x, y));

        // Draw on canvas
        ctx.lineTo(x, y);
        ctx.stroke();
    }
});

// Function to adjust for high DPI screens
function adjustCanvasForHighDPI() {
    // Get the device pixel ratio, which indicates how many device pixels correspond to one CSS pixel. Defaults to 1 if the browser doesn't support it.
    const dpr = window.devicePixelRatio || 1;

    // Get the size of the canvas as it appears on the screen (in CSS pixels).
    const rect = canvas.getBoundingClientRect();

    // Set the canvas width and height in actual device pixels to match the high DPI screen.
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Scale the drawing context to ensure that drawings are rendered at the correct size and are not too small on high DPI screens.
    ctx.scale(dpr, dpr);

    // Set the canvas's CSS width and height to match the original dimensions (in CSS pixels) to avoid any stretching of the canvas element.
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
}