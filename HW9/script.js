
$(document).ready(function(){
        // Define animation properties
    function animateImage() {
        $('#animated-image').animate({
            left: '100%' // Move to the right edge of the screen
            }, 8000, 'linear', function() { //change speed 
                // Animation complete
                // Reset image position to the left edge
            $(this).css('left', '-100px'); // Adjust the value based on image width
                // Restart the animation
            animateImage();
        });
        }
    
    // Start the animation when the document is ready
    animateImage();

    $("button").click(function(){
        $(this).addClass('animate__animated animate__bounce'); // Add Animate.css classes for animation of button
        setTimeout(() => {
            $(this).removeClass('animate__animated animate__bounce'); // Remove Animate.css classes after the animation completes
        }, 1000); // duration of animation
        
        // JSON request to pull data and display it
        $.getJSON("http://api.open-notify.org/astros.json", function(result){
            if (result.message === "success") {
                $("div").empty(); // Clear previous data
                $("div").append("Current number of people in space: " + result.number + "<br>"); //display number of people in space
                $("div").append("<hr>"); //add line
                $("div").append("<hr>"); //add line

                $.each(result.people, function(person){
                    $("div").append("Name: " + person.name + "<br>"); // Display persons name
                    $("div").append("Location: " + person.craft + "<br>"); // Display craft person is on
                    $("div").append("<hr>"); // Add a horizontal line after each person's data
                });
            } else {
                $("div").append("Failed to retrieve data."); //error handling
            }
        });
    });
});



