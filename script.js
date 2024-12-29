const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value.trim() === '') {
        alert("You must write something!");
        return;
    }

    const tasks = Array.from(listContainer.children).map(li => li.textContent.replace("\u00d7", "").trim());
    if (tasks.includes(inputBox.value.trim())) {
        alert("This task already exists!");
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = inputBox.value.trim();
    li.classList.add(document.getElementById("priority-selector").value); 
    listContainer.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7"; 
    li.appendChild(span);

    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
});

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data") || "";
}
showTask();

function clearAllTasks() {
    if (confirm("Are you sure you want to delete all tasks?")) {
        listContainer.innerHTML = "";
        saveData();
    }
}

function filterTasks(filter) {
    const tasks = listContainer.children;
    for (let task of tasks) {
        if (filter === "all") {
            task.style.display = "block";
        } else if (filter === "active" && task.classList.contains("checked")) {
            task.style.display = "none";
        } else if (filter === "completed" && !task.classList.contains("checked")) {
            task.style.display = "none";
        } else {
            task.style.display = "block";
        }
    }
}

function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString(undefined, options);
    const timeString = now.toLocaleTimeString();
    document.getElementById("date-time").innerText = `${dateString} - ${timeString}`;
}
setInterval(updateDateTime, 1000);

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}
