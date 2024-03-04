//Confirm javascript is being executed
console.log("Script loaded!");


document.addEventListener("DOMContentLoaded", function() {
    //trigger createImageGrid function
    createImageGrid();

    // Add event listener to the End Game button
    var endGameButton = document.getElementById("endGameButton");
    endGameButton.addEventListener("click", function() {
        // Redirect to GameOver.html
        window.location.href = "GameOver.html";
    });
});

//Function to create image grid
function createImageGrid() {
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

    // Using a loop, create image grid and display card front
    var imageGrid = document.getElementById("imageGrid");
    for (var i = 0; i < 12; i++) {
        var img = document.createElement("img");
        img.src = blankImages[i];
        img.addEventListener("click", function() {
            revealImage(this, actualImages);
        });
        imageGrid.appendChild(img);
    }
}

// Variable to store the currently flipped image and its index
var flippedImage = null;
var flippedIndex = null;

// Variable to store the click count
var clickCount = 0;

// Function to reveal actual image on click
function revealImage(element, actualImages) {
    var index = Array.from(element.parentNode.children).indexOf(element);
    var clickedImage = actualImages[index];
    element.src = clickedImage;

    // Increment click count
    clickCount++;

    // Save click count to local storage
    localStorage.setItem("clickCount", clickCount);

    // Update click count display
    updateClickCountDisplay();

    // Check if there is a flipped image already
    if (flippedImage === null) {
        // If there is no flipped image, store the current image
        flippedImage = element;
        flippedIndex = index;
    } else {
        // If there is a flipped image, compare with the current image
        if (actualImages[index] !== actualImages[flippedIndex]) {
            // If the images are not the same, flip them back after a delay
            setTimeout(function() {
                element.src = "Images/grizzley.jpg"; 
                flippedImage.src = "Images/grizzley.jpg"; 
                // Reset flipped image and index
                flippedImage = null;
                flippedIndex = null;
            }, 1000); // delay timing of flip for no match
        } else {
            // If the images are the same, keep them flipped
            flippedImage = null;
            flippedIndex = null;
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // Retrieve clickCount from local storage
    var clickCount = localStorage.getItem('clickCount');
    var clickCountDisplay = document.getElementById('clickCountDisplay');

    if (clickCountDisplay) { 
        if (clickCount) {
            // Display clickCount on the page
            clickCountDisplay.innerHTML = "Click Count: " + clickCount;
        } else {
            // Handle case when clickCount is not found in local storage
            clickCountDisplay.textContent = "Click Count: 0";
        }
    }

    // Retrieve playerInfo from local storage
    const playerInfoString = localStorage.getItem('playerInfo');
    const playerInfoDisplay = document.getElementById('playerInfoDisplay');

    if (playerInfoString) {
        try {
            const playerInfo = JSON.parse(playerInfoString);

            // Display playerInfo on the page
            playerInfoDisplay.innerHTML = `
            <h2>Player Information:</h2>
            <p>First Name: ${playerInfo.firstName}</p>
            <p>Last Name: ${playerInfo.lastName}</p>
            <p>Age: ${playerInfo.age}</p>

                        `;
        } catch (error) {
            // Handle JSON parsing error
            playerInfoDisplay.innerHTML = "<p>Error parsing player information.</p>";
            console.error(error);
        }
    } else {
        // Handle case when playerInfo is not found in local storage
        playerInfoDisplay.innerHTML = "<p>No player information found.</p>";
    }
});

// Function to update click count display
function updateClickCountDisplay() {
    var clickCountDisplay = document.getElementById("clickCountDisplay");
    if (clickCountDisplay) {
        clickCountDisplay.textContent = "Click Count: " + clickCount;
    }
}

// Listen for IntroForm submit button to be clicked
document.getElementById("introForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

// Call the addPlayer() function
    addPlayer();
});

function addPlayer() {
    var nameFirst = document.getElementById("firstName").value;
    var nameLast = document.getElementById("lastName").value;
    var yrAge = document.getElementById("age").value;

    // Create player object
    var player = {
        firstName: nameFirst,
        lastName: nameLast,
        age: yrAge,
        attempts: clickCount
    };

// Save player data to local storage
    localStorage.setItem("playerInfo", JSON.stringify(player));

// Redirect to the memory game page
    window.location.href = "index.html";
}

/// Retrieve playerInfo from local storage
const playerInfoString = localStorage.getItem('playerInfo');
const playerInfoDisplay = document.getElementById('playerInfoDisplay');

