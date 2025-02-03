document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
    const allTasksTab = document.getElementById("all-tasks-tab");
    const completedTasksTab = document.getElementById("completed-tasks-tab");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


    function renderTasks(filter = "all") {
        taskList.innerHTML = "";

        let displayedTasks = tasks.filter(task => filter === "completed" ? task.completed : true);

        displayedTasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.classList.add("task");
            if (task.completed) li.classList.add("completed");

            li.innerHTML = `
                <span onclick="toggleTask(${index})">${task.text}</span>
                <button class="delete-btn" onclick="deleteTask(${index})">X</button>
            `;
            taskList.appendChild(li);
        });

        saveTasks();
    }

    window.addTask = function () {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        tasks.push({ text: taskText, completed: false });
        taskInput.value = "";
        renderTasks();
    };


    window.toggleTask = function (index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    };


    window.deleteTask = function (index) {
        tasks.splice(index, 1);
        renderTasks();
    };


    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }


    allTasksTab.addEventListener("click", () => {
        allTasksTab.classList.add("active");
        completedTasksTab.classList.remove("active");
        renderTasks("all");
    });

    completedTasksTab.addEventListener("click", () => {
        completedTasksTab.classList.add("active");
        allTasksTab.classList.remove("active");
        renderTasks("completed");
    });

    renderTasks();
});
