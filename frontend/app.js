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

pending.innerHTML = "";
progress.innerHTML = "";
completed.innerHTML = "";

tasks.forEach(task => {

const li = document.createElement("li");

li.className = "list-group-item";

li.dataset.id = task.id;

li.innerHTML = `
<strong>${task.title}</strong>
<div class="small text-muted">${task.description}</div>
<div class="mt-2">
<button class="btn btn-sm btn-warning me-1" onclick="editTask(${task.id})">Edit</button>
<button class="btn btn-sm btn-danger" onclick="deleteTask(${task.id})">Delete</button>
</div>`;

const status = task.status.toLowerCase();

if(status === "pending"){
  pending.appendChild(li);
}

else if(status === "in-progress" || status === "in_progress"){
  progress.appendChild(li);
}

else if(status === "completed"){
  completed.appendChild(li);
}

console.log("STATUS FROM DB:", task.status);
});

}

form.addEventListener("submit", async (e) => {

e.preventDefault();

const title = document.getElementById("title").value;
const description = document.getElementById("description").value;
const status = document.getElementById("status").value.toLowerCase();

console.log(title, description, status);

await fetch(API_URL,{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization": `Bearer ${token}`
},
body:JSON.stringify({
title,
description,
status
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

  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      title,
      description,
      status
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