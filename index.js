// BUTTON FUNCTIONS

// When saved button is pressed, the current state of the canvas is turned into an image and the users file management save window comes up
function saveImageButton() {
    // Convert the canvas content to a Blob
    canvas.toBlob(function(blob) {
        // Create a new URL for the Blob
        const url = URL.createObjectURL(blob);

        // Create a temporary link element
        const link = document.createElement('a');
        link.href = url;
        link.download = 'canvas-image.png';

        // Programmatically click the link to trigger the download
        link.click();

        // Release the object URL to free memory
        URL.revokeObjectURL(url);
    }, 'image/png');
}

// When clear canvas button is pressed, fill the whole canvas with a clear colour
function clearButton() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clearRect creates a rect of transparent colour
}

// FIXME Buttons aren't in one row

// When the user clicks on these buttons, toggle between hiding and showing the dropdown content 
function colourButton() {
    document.getElementById("colourButton").classList.toggle("show");
    ctx.strokeStyle = colourPicker.value; // When the button is pressed, the previous colour is selected
}

function brushSizeButton() {
    document.getElementById("brushSizeButton").classList.toggle("show");
}

function brushTypeButton() {
    document.getElementById("brushTypeButton").classList.toggle("show");
}

// When eraser button is pressed, set brush colour to white as to hide(erase) other drawings
function eraserButton() {
    ctx.strokeStyle = "white"; // Set the brush colour to that of the canvas background
}

// DROPDOWN FUNCTIONS
// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.toolBar') && !event.target.matches('.dropdown-content')) {
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
// Set up canvas
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
ctx.strokeStyle = 'black';

// Make dpr accessible outside it's main function
// Get the device pixel ratio, which indicates how many device pixels correspond to one CSS pixel. Defaults to 1 if the browser doesn't support it.
let dpr = window.devicePixelRatio || 1;

// Set an initial value for brush type
let currentBrush = 'solid';

// Adjust canvas for high DPI
adjustCanvasForHighDPI();

// Initial canvas is white
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

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
        if (currentBrush === 'solid') {
            ctx.lineTo(x, y);
            ctx.stroke();
        } else if (currentBrush === 'dashed') {
            ctx.setLineDash([5, 15]); // 5px dash, 15px gap
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.setLineDash([]); // Reset to solid line
        } else if (currentBrush === 'spray') {
            sprayPaint(x, y);
        } else if (currentBrush === 'blurred') {
            ctx.globalAlpha = 0.1; // Set lower opacity for a blurred effect
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.globalAlpha = 1.0; // Reset to full opacity
        }
    }
});

// Function to adjust for high DPI screens
function adjustCanvasForHighDPI() {
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

    ctx.lineWidth = document.getElementById("brushSizeRange").value / dpr;
}

// SLIDER FUNCTIONS
var slider = document.getElementById("brushSizeRange");
var output = 5;
console.log("Default slider value is: " + slider.value);
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value
slider.oninput = function() {
    output.innerHTML = this.value;
    console.log("Slider value is: " + slider.value);
    ctx.lineWidth = this.value / dpr;
}

// COLOUR PICKER FUNCTIONS
const colourPicker = document.getElementById("colourPicker");

// Output the selected colour
colourPicker.addEventListener('input', function() {
    console.log('Selected colour: ' + colourPicker.value);
    ctx.strokeStyle = colourPicker.value;
});

// BRUSH TYPE FUNCTIONS
const brushType = document.getElementById('brushTypeButton');

// Update brush type
brushType.addEventListener('change', function() {
    currentBrush = this.value;
});

// Function for spray paint effect
function sprayPaint(x, y) {
    const density = 50; // Number of spray particles
    const radius = ctx.lineWidth * 2;

    for (let i = 0; i < density; i++) {
        const offsetX = (Math.random() - 0.5) * radius * 2;
        const offsetY = (Math.random() - 0.5) * radius * 2;
        ctx.fillRect(x + offsetX, y + offsetY, 1, 1);
    }
} // FIXME Spray paint is always black
