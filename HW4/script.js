  // Prompt the user for their name
  var userName = prompt("Please enter your name:");

  // Log the name to the console
  console.log("User's name:", userName);

  // Display a greeting message using the entered name
  document.getElementById("greeting").innerHTML = "Hello, " + userName + "!";

function goLeft() {
 // Change the text color
 document.getElementById("outcome").innerHTML = "<span style='color: green;'>You decided to go left. You encounter a beautiful forest.</span>";
  var img = document.createElement("img");
  img.src = "Images/forest.jpeg";
  var block = document.getElementById("x");
block.appendChild(img);

// Call the function to hide the buttons
hideButtons();
}

function goRight() {
 
  document.getElementById("outcome").innerHTML = "<span style='color: blue;'>You decided to go right. You stumble upon a quaint little village.";
  var img2 = document.createElement("img");
  img2.src = "Images/village.jpeg";
  var block = document.getElementById("x2");
block.appendChild(img2);

// Call the function to hide the buttons
hideButtons();
}

// Function to hide the buttons
function hideButtons() {
  document.getElementById("button1").style.display = "none";
  document.getElementById("button2").style.display = "none";
 
// Simulate some task
  setTimeout(function() {
    console.log("Task done!");
    
// Call the function to create buttons after the task is done
    createButtons();
}, 1000); // Simulated delay of 2 seconds
}

// Function to create buttons dynamically
function createButtons() {
    var buttonContainer = document.getElementById("buttonContainer");

// Create button 1
    var button1 = document.createElement("button");
    button1.textContent = "Keep Walking";
    button1.onclick = function() {
        chooseOption('option1');
    };
    buttonContainer.appendChild(button1);

// Create button 2
    var button2 = document.createElement("button");
    button2.textContent = "Stop and Eat";
    button2.onclick = function() {
        chooseOption('option2');
    };
    buttonContainer.appendChild(button2);
}

// Function to handle option selection
function chooseOption(option) {
  var resultDiv = document.getElementById("result");
  var imageElement = document.getElementById("image");

// Check the user's choice and display picture
  if (option === 'option1') {
      resultDiv.textContent = "You chose to keep walking.";
  
  // Display image when button 1 is clicked
      imageElement.src = "Images/walking.jpeg"; // Image source
      imageElement.style.display = "block"; // Show the image

  // Reset image display
      imageElement.style.display = "none";
  } 

  //if Option 1 isn't chosen
  else if (option === 'option2') {
      resultDiv.textContent = "You chose to stop and eat.";
      
  // Display image when button 2 is clicked
      imageElement.src = "Images/cafe.jpeg"; // Image source
      imageElement.style.display = "block"; // Show the image
  }
}

