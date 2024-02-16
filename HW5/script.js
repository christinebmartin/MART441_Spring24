//Confirm javascript is being executed
console.log("Script loaded!");


// Create array for blank images and actual images
var blankImages = [];
var actualImages = [];

// Populate blank images array with placeholder images
for (var i = 0; i < 12; i++) {
    blankImages.push("Images/grizzley.jpg"); // image to show on front of 12 cards
}

// Push actual images to array with images
actualImages.push("Images/grizPaw.png"); // image1
actualImages.push("Images/football.jpeg"); // image2
actualImages.push("Images/UM_logo.png"); // image3
actualImages.push("Images/Monty.jpeg"); // image4
actualImages.push("Images/fcs.png"); // image5
actualImages.push("Images/Gear_up.png"); // image6

// Duplicate actual images to create pairs using the concatenate method
actualImages = actualImages.concat(actualImages);

// Randomize the order of actual images array
actualImages.sort(() => Math.random() - 0.5);

// using a loop, Create image grid and display blank images
var imageGrid = document.getElementById("imageGrid");
for (var i = 0; i < 12; i++) {
    var img = document.createElement("img");
    img.src = blankImages[i];
    img.addEventListener("click", function() {
        revealImage(this);
    });
    imageGrid.appendChild(img);
}

// Function to reveal actual image on click
function revealImage(element) {
    var index = Array.from(imageGrid.children).indexOf(element);
    element.src = actualImages[index];

}

 