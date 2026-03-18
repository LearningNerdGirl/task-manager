const API_URL = "http://localhost:5000/api/tasks";

const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}



const form = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

let allTasks = [];

async function loadTasks() {

  const res = await fetch(API_URL, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  const tasks = await res.json();

  allTasks = tasks;

  renderTasks(tasks);

}

function renderTasks(tasks){

const pending = document.getElementById("pendingTasks");
const progress = document.getElementById("progressTasks");
const completed = document.getElementById("completedTasks");

const pendingEmpty = document.getElementById("pendingEmpty");
const progressEmpty = document.getElementById("progressEmpty");
const completedEmpty = document.getElementById("completedEmpty");

const pendingCount = document.getElementById("pendingCount");
const progressCount = document.getElementById("progressCount");
const completedCount = document.getElementById("completedCount");

pending.innerHTML = "";
progress.innerHTML = "";
completed.innerHTML = "";

let pendingTasksCount = 0;
let progressTasksCount = 0;
let completedTasksCount = 0;

tasks.forEach(task => {

const li = document.createElement("li");

li.className = "task-card";

li.dataset.id = task.id;

const priority = task.priority || 'medium';
const dueDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString('id-ID', {day: 'numeric', month: 'short'}) : '';

li.innerHTML = `
<div class="task-title">${task.title}</div>
${task.description ? `<div class="task-desc">${task.description}</div>` : ''}
<div class="task-meta">
  <span class="priority-badge priority-${priority}">${priority}</span>
  <div class="task-actions">
    <button class="btn-action btn-edit" onclick="editTask(${task.id})" title="Edit">
      <i class="bi bi-pencil"></i>
    </button>
    <button class="btn-action btn-delete" onclick="deleteTask(${task.id})" title="Delete">
      <i class="bi bi-trash"></i>
    </button>
  </div>
</div>
${dueDate ? `<div class="due-date"><i class="bi bi-calendar3 me-2"></i>${dueDate}</div>` : ''}`;

const status = task.status.toLowerCase();

if(status === "pending"){
  pending.appendChild(li);
  pendingTasksCount++;
}

else if(status === "in-progress" || status === "in_progress"){
  progress.appendChild(li);
  progressTasksCount++;
}

else if(status === "completed"){
  completed.appendChild(li);
  completedTasksCount++;
}

console.log("STATUS FROM DB:", task.status);
});

// Update counters
pendingCount.textContent = pendingTasksCount;
progressCount.textContent = progressTasksCount;
completedCount.textContent = completedTasksCount;

// Show/hide empty states
pendingEmpty.style.display = pendingTasksCount === 0 ? 'block' : 'none';
progressEmpty.style.display = progressTasksCount === 0 ? 'block' : 'none';
completedEmpty.style.display = completedTasksCount === 0 ? 'block' : 'none';

}

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const status = document.getElementById("status").value.toLowerCase();
  const priority = document.getElementById("priority").value;
  const dueDate = document.getElementById("dueDate").value;

  console.log(title, description, status, priority, dueDate);

  await fetch(API_URL,{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization": `Bearer ${token}`
    },
    body:JSON.stringify({
      title,
      description,
      status,
      priority,
      dueDate
    })
  });

  form.reset();
  const modal = bootstrap.Modal.getInstance(document.getElementById("taskModal"));
  modal.hide();
  enableDrag();
  loadTasks();

});

const editForm = document.getElementById("editForm");
editForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("editId").value;
  const title = document.getElementById("editTitle").value;
  const description = document.getElementById("editDescription").value;
  const status = document.getElementById("editStatus").value.toLowerCase();
  const priority = document.getElementById("editPriority").value;
  const dueDate = document.getElementById("editDueDate").value;

  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      title,
      description,
      status,
      priority,
      dueDate
    })
  });

  editForm.reset();
  const modal = bootstrap.Modal.getInstance(document.getElementById("editModal"));
  modal.hide();
  enableDrag();
  loadTasks();
});

async function deleteTask(id) {

  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  loadTasks();

}

function editTask(id){

const task = allTasks.find(t => t.id === id);

document.getElementById("editId").value = task.id;
document.getElementById("editTitle").value = task.title;
document.getElementById("editDescription").value = task.description;
document.getElementById("editStatus").value = task.status;
document.getElementById("editPriority").value = task.priority || 'medium';
document.getElementById("editDueDate").value = task.dueDate || '';

const modal = new bootstrap.Modal(document.getElementById("editModal"));
modal.show();

} 

function logout() {

  localStorage.removeItem("token");

  window.location.href = "login.html";

}

function enableDrag(){

const pending = document.getElementById("pendingTasks");
const progress = document.getElementById("progressTasks");
const completed = document.getElementById("completedTasks");

[pending, progress, completed].forEach(column => {

new Sortable(column, {

group: "tasks",

animation: 150,

onEnd: async function(evt){

const taskId = evt.item.dataset.id;

let newStatus;

if(evt.to.id === "pendingTasks"){
newStatus = "pending";
}

if(evt.to.id === "progressTasks"){
newStatus = "in-progress";
}

if(evt.to.id === "completedTasks"){
newStatus = "completed";
}

await fetch(`${API_URL}/${taskId}`,{

method:"PUT",

headers:{
"Content-Type":"application/json",
"Authorization": `Bearer ${token}`
},

body:JSON.stringify({
status:newStatus
})

});

}

});

});

}

if(!token){
alert("Please login first");
}else{

loadTasks();
enableDrag();
}