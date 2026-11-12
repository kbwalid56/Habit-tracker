// Get HTML elements
const habitForm = document.getElementById("habit-form");
const habitInput = document.getElementById("habit-input");
const habitList = document.getElementById("habit-list");
const progress = document.getElementById("progress");
const todayDate = document.getElementById("today-date");

// Get today's date
function getToday() {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

// Display today's date
todayDate.innerText = new Date().toDateString();

// Load saved habits
let habits = JSON.parse(localStorage.getItem("habits")) || [];

// Save habits in LocalStorage
function saveHabits() {
    localStorage.setItem("habits", JSON.stringify(habits));
}

// Display all habits
function displayHabits() {

    // Clear previous list
    habitList.innerHTML = "";

    let completed = 0;

    // Loop through all habits
    habits.forEach((habit, index) => {

        const li = document.createElement("li");

        // Check if habit is completed today
        const isDone = habit.doneDate === getToday();

        if (isDone) {
            completed++;
        }

        // Habit name
        const habitName = document.createElement("span");
        habitName.innerText = habit.name;

        if (isDone) {
            habitName.classList.add("completed");
        }

        // Complete button
        const doneButton = document.createElement("button");

        doneButton.innerText = isDone ? "Completed" : "Complete";
        doneButton.className = "done-btn";

        doneButton.addEventListener("click", function() {

            if (habit.doneDate === getToday()) {
                habit.doneDate = "";
            } else {
                habit.doneDate = getToday();
            }

            saveHabits();
            displayHabits();

        });

        // Delete button
        const deleteButton = document.createElement("button");

        deleteButton.innerText = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function() {

            habits.splice(index, 1);

            saveHabits();
            displayHabits();

        });

        // Add elements to list item
        li.appendChild(habitName);
        li.appendChild(doneButton);
        li.appendChild(deleteButton);

        habitList.appendChild(li);

    });

    // Update progress
    progress.innerText = completed + " / " + habits.length + " Completed";
}

// Add a new habit
habitForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const habitName = habitInput.value.trim();

    if (habitName === "") {
        return;
    }

    // Create new habit object
    const newHabit = {
        name: habitName,
        doneDate: ""
    };

    // Add habit to array
    habits.push(newHabit);

    // Save and display
    saveHabits();
    displayHabits();

    // Clear input field
    habitInput.value = "";

});

// Display habits when application starts
displayHabits();
