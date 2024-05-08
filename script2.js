// Function to add a new task
function addTask() {
    // Get task details
    var taskInput = document.getElementById("input-box");
    var category = document.getElementById("category-select");
    var priority = document.getElementById("priority-select");
    var dueDate = document.getElementById("due-date");

    // Check if task input is empty
    if (taskInput.value.trim() === "") {
        // Show alert
        alert("Please enter a task!");
        return; 
    }

    // Create a new list item
    var listItem = document.createElement("li");

    // Determine image source based on priority
    var priorityImageSrc;
    if (priority.value === "HIGH") {
        priorityImageSrc = "Images/exclam.png"; // display exclamation image if priority is high
    } else if (priority.value === "low") {
        priorityImageSrc = "Images/down.png"; // display down image if priority is low
    } else {
        priorityImageSrc = "Images/medium.png"; // Default image 
    }

    // Add task details to the list item
    listItem.innerHTML = `
        <div class="task-details">
            <img src="${priorityImageSrc}" class="priority-image"> <!-- Image based on priority -->
            <img src="Images/unchecked.png" class="toggle-image" style="cursor: pointer;"> <!-- Image to toggle -->
            <span class="close-icon" style="cursor: pointer;">&#10006;</span> <!-- Close icon -->
            <span class="task" style="color: blue; font-weight: bold;">${taskInput.value}</span>
            <span class="category">${category.value}</span>
            <span class="dueDate">${formatDate(dueDate.value)}</span> <!-- Format due date -->
        </div>
    `;

    // Append the list item to the list container
    document.getElementById("list-container").appendChild(listItem);

    // Reset input fields
    taskInput.value = "";
    category.value = "personal"; // Assuming you want to reset to default category
    priority.value = "low"; // Assuming you want to reset to default priority
    dueDate.value = "";

    // Save the list content to localStorage
    saveListToLocalStorage();
    
    // Attach an event listener to the close icon to delete the row
    listItem.querySelector(".close-icon").addEventListener("click", function() {
        listItem.remove(); // Remove the row when the close icon is clicked
        saveListToLocalStorage(); // Update localStorage after removal
    });
}



// Attach event listener to the document body to handle click events on the toggle images and sort image
document.body.addEventListener("click", function(event) {
    if (event.target.classList.contains("toggle-image")) {
        // Toggle the image source when clicked
        toggleImage(event.target);
        // Toggle the line-through style on the task text and other details
        toggleLineThrough(event.target);
    } else if (event.target.id === "sort-date") {
        // If the up/down image is clicked, sort the tasks by due date
        sortTasksByDueDate();
    }
});

// Function to toggle the image when clicked
function toggleImage(image) {
    // Get the full URLs of the images
    var uncheckedURL = new URL("Images/unchecked.png", window.location.href).href;
    var checkedURL = new URL("Images/checked.png", window.location.href).href;

    // Toggle image source based on the current source
    if (image.src === uncheckedURL) {
        image.src = checkedURL;
    } else {
        image.src = uncheckedURL;
    }

    // Save the list state to localStorage
    saveListState();
}

// Function to toggle line-through style on task details
function toggleLineThrough(image) {
    var listItem = image.closest("li");
    // Toggle the 'completed' class on all elements within the list item
    listItem.querySelectorAll(".priority, .task, .category, .dueDate").forEach(function(element) {
        element.classList.toggle("completed");
    });

    // Save the list state to localStorage
    saveListState();
    saveListToLocalStorage()
}

// Function to sort tasks by due date
function sortTasksByDueDate() {
    var listContainer = document.getElementById("list-container");
    var tasks = Array.from(listContainer.children);
    tasks.sort(function(a, b) {
        var dueDateA = new Date(a.querySelector(".dueDate").textContent);
        var dueDateB = new Date(b.querySelector(".dueDate").textContent);
        return dueDateA - dueDateB;
    });
    // Clear the list container
    listContainer.innerHTML = "";
    // Append sorted tasks to the list container
    tasks.forEach(function(task) {
        listContainer.appendChild(task);
    });
}

// Function to save the list content to localStorage
function saveListToLocalStorage() {
    var listContainer = document.getElementById("list-container").innerHTML;
    localStorage.setItem("taskList", listContainer);
}

// Function to load the list content from localStorage
function loadListFromLocalStorage() {
    var savedList = localStorage.getItem("taskList");
    if (savedList) {
        document.getElementById("list-container").innerHTML = savedList;
        
// Reattach event listeners to close icons
    var closeIcons = document.querySelectorAll(".close-icon");
        closeIcons.forEach(function(icon) {
            icon.addEventListener("click", function() {
                icon.parentNode.parentNode.remove(); // Remove the row when the close icon is clicked
                saveListToLocalStorage(); // Update localStorage after removal
            });
        });
    }
}

// Function to save the list state to localStorage
function saveListState() {
    var listItems = document.querySelectorAll("#list-container li");
    var listState = {};
    listItems.forEach(function(item, index) {
        var taskId = "task_" + index;
        listState[taskId] = {};
        listState[taskId]["completed"] = item.classList.contains("completed");
    });
    localStorage.setItem("listState", JSON.stringify(listState));
}

// Function to load the list state from localStorage
function loadListState() {
    var listState = JSON.parse(localStorage.getItem("listState"));
    if (listState) {
        var listItems = document.querySelectorAll("#list-container li");
        listItems.forEach(function(item, index) {
            var taskId = "task_" + index;
            if (listState[taskId] && listState[taskId]["completed"]) {
                item.querySelectorAll(".priority, .task, .category, .dueDate").forEach(function(element) {
                    element.classList.add("completed");
                });
            }
        });
    }
}

// Load the list content from localStorage when the page is loaded
window.onload = function() {
    loadListFromLocalStorage();
    loadListState();
};

// Function to format date as mm/dd/yyyy
function formatDate(dateString) {
    // Parse the date string
    var date = new Date(dateString);
    
    // Get month, day, and year
    var month = date.getMonth() + 1; 
    var day = date.getDate();
    var year = date.getFullYear();
    
    // Pad single-digit month and day with leading zero if necessary
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    
    // Return formatted date string
    return month + '/' + day + '/' + year;
}

function printList() {
    // Get the list container
    var listContainer = document.getElementById("list-container");
    
    // Open a new window for printing
    var printWindow = window.open("", "_blank");
    
    // Write the content to the new window
    printWindow.document.write('<html><head><title>Print List</title>');
    printWindow.document.write('<link rel="stylesheet" type="text/css" href="print-style.css">'); // Link to a CSS file for print styling
    printWindow.document.write('</head><body>');
    printWindow.document.write('<h1>To Do List</h1>');
    printWindow.document.write('<ul>');
    
    // Iterate over each list item and write its content to the new window
    listContainer.querySelectorAll("li").forEach(function(item) {
        printWindow.document.write('<li>' + item.innerHTML + '</li>');
    });
    
    printWindow.document.write('</ul>');
    printWindow.document.write('</body></html>');
    
    // Close the document for printing
    printWindow.document.close();
    
    // Print the window
    printWindow.print();
}
