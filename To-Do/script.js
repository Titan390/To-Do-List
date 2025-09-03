const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
let tasks = JSON.parse(localStorage.getItem("tasks"))||[];


addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function(e){
  if (e.key === "Enter") addTask();
});

renderTasks();

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  tasks.push({ text: taskText, done: false });
  renderTasks(); // we'll define this function next
  taskInput.value = "";
  saveTasks();
}


function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.done) li.classList.add("completed");

    li.addEventListener("click", () => {
      tasks[index].done = !tasks[index].done;
      renderTasks();
      saveTasks();
    });
    const delBtn = document.createElement("button");
    delBtn.id = "delBtn";
    delBtn.textContent = "X";
    delBtn.style.marginLeft = "10px";
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      tasks.splice(index, 1);
      renderTasks();
      saveTasks();
    });

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}