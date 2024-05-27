let x;

function setup() {
    let canvas = createCanvas(1400, 100); // Adjust canvas size as needed
    canvas.parent('reel-canvas-container'); // Attach the canvas to the HTML container
    x = 0;
}

function draw() {
    background(255); // White background
    drawFilmStrip(0, 40, x, 40); // Draw the film strip
    x += 2; // Animation speed, adjust as needed
    if (x > width) { // Reset the strip once it covers the canvas
        x = 0;
    }
}

function drawFilmStrip(startX, y, w, h) {
    fill(0);
    rect(startX, y, w, h);
    for (let i = 0; i < w; i += 40) { // Adjust the spacing between the film frames
        fill(255);
        rect(startX + i + 5, y + 5, 30, h - 10); // Adjust the size of the film frames
    }
}
