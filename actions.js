import {Api} from "./index.js"

const fetchConfig = {
  baseUrl: 'http://37.220.80.108',
  headers: {
    "Content-Type": "application/json",
  },
  type: "fetch"
}

const xhrConfig = {
  baseUrl: 'http://37.220.80.108',
  headers: {
    "Content-Type": "application/json",
  },
  type: "xhr"
}


const form = document.querySelector('.form');
const idInput = document.querySelector('.input-id');
const nameInput = document.querySelector('.input-name');
const infoInput = document.querySelector('.input-info');
const requestTypeRadio = document.querySelectorAll('.radio-button');
const isImportantInput = document.querySelector('.checkbox');

const getTasksButton = document.querySelector('.get-tasks');
const getTaskByIdButton = document.querySelector('.get-task-by-id');
const updateTaskButton = document.querySelector('.update-task-by-id');
const addTaskButton = document.querySelector('.add-task');
const deleteTaskButton = document.querySelector('.delete-task');

let requestType = 'fetch';
let api

for (const radio of requestTypeRadio) {
  
  radio.addEventListener('change', () => {
    if (radio.checked) {
      requestType = radio.value;
      requestType === "fetch" ? api = new Api(fetchConfig) : api = new Api(xhrConfig);
    }  
  })
  
}


// get tasks list 
getTasksButton.onclick = function handleGetTasks (){
  api.getTasks().then(data => console.log(data))
}

// get task by Id
let id = idInput.value;
idInput.addEventListener('change', () => {
  id = idInput.value

  if (!id) {
    getTaskByIdButton.disabled = true;
    updateTaskButton.disabled = true;
  } else {
    getTaskByIdButton.disabled = false;
    updateTaskButton.disabled = false;
  }
})

let name = nameInput.value;
nameInput.addEventListener('change', () => {
  name = nameInput.value
})

let info = infoInput.value;
infoInput.addEventListener('change', () => {
  info = infoInput.value;
})

let isImportant = isImportantInput.checked;
isImportantInput.addEventListener('change', () => {
  isImportant = isImportantInput.checked;
})


getTaskByIdButton.onclick = function handleGetTaskById (){
  api.getTaskById(id).then(data => console.log(data))
}

// update task info

updateTaskButton.onclick = function handleUpdateTask (){
  api.updateTaskById(id, {"name": name, "info": info, "isImportant": isImportant}).then(data => console.log(data))
}

// console.log(api.addTask(brandNewTask).then(data => console.log(data)));
deleteTaskButton.onclick = function handleDeleteTask (){
  api.deleteTaskById(id).then(data => console.log(data))
}

// console.log(api.deleteTaskById(18).then(data => console.log(data)));
addTaskButton.onclick = function handleAddTask (){
  api.addTask({"name": name, "info": info, "isImportant": isImportant}).then(data => console.log(data))
}

