const userInput = document.querySelector(".userinput");
const taskList = document.querySelector('.task-list');
const clearAll= document.querySelector(".clear-btn");
const addButton = document.querySelector(".add-btn");

// getting localstorage todo-list
let todoList = JSON.parse(localStorage.getItem("todo-list"));

function displayTask() {
    let li = "";
    if(todoList){
        todoList.forEach((todo, id) => {
            // if todo status is completed, set the isCompleted value to checked
            let isCompleted = todo.status == "completed" ? "checked" : "";
            li += `<li class="task-item">
        
                        <label for="${id}">
                            <input type="checkbox" onclick="changeStatus(this)" id="${id}" ${isCompleted}>
                            <p class="${isCompleted}">${todo.name}</p>
                        </label>
        
                        <div class="actions">
                            <button class="edit" onclick="editTask(${id}, '${todo.name}')">Edit</button>
                            <button class="delete" onclick="delTask(${id})">Delete</button>
                        </div>
        
                    </li>`;
            });
    }
    // if li is not empty, insert this value inside tasklist else insert p text
    taskList.innerHTML = li || `<p style = "color: #adb5bd;">No task here.</p>`;
}
displayTask();

let editId;
let isEditedTask = false;

function editTask(taskId, taskName) {
    editId = taskId;
    isEditedTask = true;
    userInput.value = taskName;
    addButton.innerText = "Save";
}

function delTask(deleteId) {
    todoList.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todoList));
    displayTask();
}

clearAll.addEventListener("click", () => {
    todoList.splice(0, todoList.length);
    localStorage.setItem("todo-list", JSON.stringify(todoList));
    displayTask();
});

function changeStatus(checkedTask) {
    // getting paragraph that contains task name
    let taskName = checkedTask.parentElement.lastElementChild;
    if(checkedTask.checked) {
        taskName.classList.add("checked");
        todos[checkedTask.id].status = "completed";
    } else{
        taskName.classList.remove("checked");
        todos[checkedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todoList));
}

function check(userTask) {
    if(!isEditedTask) {
        if(!todoList){ // if todoList doesn't exist, pass an empty array to todoList
            todoList = [];
        }
        let taskInfo = {name: userTask, status: "pending"};
        todoList.push(taskInfo); //adding new task to todoList
    }
    else {
        isEditedTask = false;
        todoList[editId].name = userTask;
        addButton.innerText = "+Add Task";
    }
    userInput.value = "";
    localStorage.setItem("todo-list", JSON.stringify(todoList));
    displayTask();
}

userInput.addEventListener("keyup", e => {
    let userTask = userInput.value.trim();
    if(e.key == "Enter" && userTask){
        check(userTask);
    }
});

addButton.addEventListener("click", () => {
    let userTask = userInput.value.trim();
    if(userTask){
        check(userTask);
    }
});