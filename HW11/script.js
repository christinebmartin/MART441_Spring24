// Play the audio when the document is fully loaded
window.onload = function() {
    var audio = document.getElementById('song');
    audio.play();
};

class Square {
    constructor(x, y, color, velocityX, velocityY, size) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.velocityX = velocityX;
      this.velocityY = velocityY;
      this.size = size;
    }
  
    update(canvas) {
      // Update the position based on velocity
      this.x += this.velocityX;
      this.y += this.velocityY;
  
      // Check boundaries to make the square bounce
      if (this.x + this.size > canvas.width || this.x < 0) {
        this.velocityX = -this.velocityX;
      }
      if (this.y + this.size > canvas.height || this.y < 0) {
        this.velocityY = -this.velocityY;
      }
    }
  
    draw(ctx) {
      // Set the fill color
      ctx.fillStyle = this.color;
  
      // Draw the square at the current position
      ctx.fillRect(this.x, this.y, this.size, this.size);
    }
  
    checkCollision(otherSquare) {
      // Check collision between this square and another square
      return (
        this.x < otherSquare.x + otherSquare.size &&
        this.x + this.size > otherSquare.x &&
        this.y < otherSquare.y + otherSquare.size &&
        this.y + this.size > otherSquare.y
      );
    }
  }
  
  // Get the canvas element
  var canvas = document.getElementById('myCanvas');
  
  // Get the 2D rendering context
  var ctx = canvas.getContext('2d');
  
  // Create blue square object
  var blueSquare = new Square(10, 10, 'blue', 2, 2, 100);
  
  // Create user-controlled square object
  var userSquare = new Square(600, 90, 'maroon', 0, 0, 50);
  var userSquareSpeed = 4; // Define speed for user-controlled square

  // Create 3rd square object
  var square3 = new Square(200, 300, 'black', 3, 3, 75);
  var square3Speed = 2; //Define speed for 3rd square
  
  // Add event listeners to handle user arrow keys
  document.addEventListener('keydown', function(event) {
    
    // Update velocity based on arrow key pressed
    switch(event.key) {
      case 'ArrowLeft':
        userSquare.velocityX = -userSquareSpeed;
        break;
      case 'ArrowRight':
        userSquare.velocityX = userSquareSpeed;
        break;
      case 'ArrowUp':
        userSquare.velocityY = -userSquareSpeed;
        break;
      case 'ArrowDown':
        userSquare.velocityY = userSquareSpeed;
        break;
    }
  });
  
  document.addEventListener('keyup', function(event) {
    // Stop moving when arrow key is released
    switch(event.key) {
      case 'ArrowLeft':
      case 'ArrowRight':
        userSquare.velocityX = 0;
        break;
      case 'ArrowUp':
      case 'ArrowDown':
        userSquare.velocityY = 0;
        break;
    }
  });
 
  
 // Animation loop
function animate() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Check collision between squares
    if (blueSquare.checkCollision(userSquare) || blueSquare.checkCollision(square3)){
      // Change size of squares when collision occurs
      blueSquare.size = 200; // Increase size of blue square
      userSquare.size = 10; // Decrease size of user-controlled square
      square3.size = 250; //Increase size of 3rd square
  
      // Change background image and size if collision occurs
      canvas.style.backgroundImage = "url('Images/UM_logo.png')";
      canvas.style.backgroundSize = "60%"; // Adjust background size as needed
      canvas.style.backgroundRepeat = "no-repeat"; // Prevent background image from repeating
      canvas.style.backgroundPosition = "center"; // Center the background image
    } else {
      // Reset size of squares when no collision
      blueSquare.size = 100; // Reset size of blue square
      userSquare.size = 50; // Reset size of user-controlled square
      square3.size = 75; //Reset size of 3rd square
  
      // Reset background image and size if no collision
      canvas.style.backgroundImage = "none";
      canvas.style.backgroundSize = "auto";
      canvas.style.backgroundRepeat = "repeat"; // Allow background image to repeat (if desired)
      canvas.style.backgroundPosition = "center"; // Center the background image
    }
  
    // Update and draw the blue square
    blueSquare.update(canvas);
    blueSquare.draw(ctx);
  
    // Update and draw the user-controlled square
    userSquare.update(canvas);
    userSquare.draw(ctx);

    // Update and draw the user-controlled square
    square3.update(canvas);
    square3.draw(ctx);
  
    // Request the next frame of animation
    requestAnimationFrame(animate);
  }
  
  // Start the animation loop
  animate();
  