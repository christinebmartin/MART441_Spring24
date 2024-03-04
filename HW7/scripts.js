//Confirm javascript is being executed
console.log("Script file called");

//define class
   class SaveGirlsSports {
    constructor(title, image, description, author, year) {
    this.title = title;
    this.image = image;
    this.description = description;
    this.author = author;
    this.year = year;
  }
}

//create art instances
    const art1 = new SaveGirlsSports(
        "Give Girls A Chance",
        "Images/giveGirlsAChance.jpeg",
        "Facebook Cover Page For Save Women's Sports Australiasia",
        "Unknown Artist",
        "2022"
    );
    const art2 = new SaveGirlsSports(
      "Save Girls Sports",
      "Images/saveGirlsSports.jpeg",
      "Family Policy Alliance is Fighting to Save Girls Sports",
      "Family Policy Alliance",
      "2023"
    );
    const art3 = new SaveGirlsSports(
      "Save Women's Sports",
      "Images/saveWomensSports.jpeg",
      "Jack Spitser",
      "2023"
    )

//store art in an array
    const artArray = [art1, art2, art3];

// Function to display a random art object
function displayRandomArt() {
  const randomIndex = Math.floor(Math.random() * artArray.length);
  const randomArt = artArray[randomIndex];
  
  document.getElementById("art-title").textContent = randomArt.title;
  document.getElementById("art-image").src = randomArt.image;
  document.getElementById("art-description").textContent = randomArt.description;
  document.getElementById("art-author").textContent = `Author: ${randomArt.author}`;
  document.getElementById("art-year").textContent = `Year: ${randomArt.year}`;
}

// Event listener for the randomize button
document.getElementById("randomize-button").addEventListener("click", displayRandomArt);

// Display a random art object when the page loads
window.onload = displayRandomArt;