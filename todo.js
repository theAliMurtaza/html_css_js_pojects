const form = document.querySelector("#todoForm");
const input = document.querySelector("#todoInput");
const list = document.querySelector("#todoList");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

form.addEventListener("submit", addTask);

function addTask(e) {
    e.preventDefault();

    if (input.value.trim() === "") {
        alert("Enter the task in the input field");
        return;
    }

    const task = {
        text: input.value,
        completed: false
    };

    tasks.push(task);
    saveTask();
    renderTask();
    input.value = "";
}

function renderTask() {
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        const span = document.createElement("span");
        span.textContent = task.text;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTask();
            renderTask();
        });

        li.append(span, deleteBtn);
        list.appendChild(li);
    });
}

function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render saved tasks on page load
renderTask();
