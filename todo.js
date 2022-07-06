let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

function fetchTodos() {
    
}

function addTaskToDOM(task) {
    const li =  document.createElement('li');

    li.innerHTML = `
            <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
            <label for="${task.id}">${task.text}</label>
            <img src="bin-svgrepo-com.svg" class="delete" data-id="${task.id}">
    `;

    tasksList.append(li);
}

function renderList() {
    tasksList.innerHTML = '';

    for (let i = 0; i < tasks.length; i++){
        addTaskToDOM(tasks[i]);
    }
    tasksCounter.innerHTML = tasks.length;
}

// markTaskAsComplete
function toggleTask(taskId){
    const task = tasks.filter(function (task) {
        return task.id !== taskId
    });

    if (task.length > 0){
        const currentTask = task[0];

        currentTask.done = !currentTask.done;
        renderList();
        showNotification('Task toggle successfully');
        return;
    }

    showNotification('could not toggle the task');
}

function deleteTask(taskId) {
    const newTasks = tasks.filter(function (task) {
        return task.id !== taskId;
    });
    tasks = newTasks;
    renderList();
    showNotification('Task deleted successfully');
}
function addTask(task) {
    if (task){
        tasks.push(task);
        renderList();
        showNotification('Task added succesfully');
        return;
    }
    showNotification('Task cannot be added');
}

function showNotification(text) {
    alert(text);
}

function handleInputKeypress(e) {
    if (e.key == 'Enter'){
        const text = e.target.value;
        console.log('text', text);

        if(!text){
            showNotification('Test text cannot be empty');
            return;
        }

        const task = {
            text,
            id: Date.now().toString(),
            done: false
        }

        e.target.value = '';
        addTask(task);
    }
}

function handleClickListener(e) {
    const target = e.target;

    if (target.className == 'delete'){
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    }else if (target.className == 'custom-checkbox'){
        const taskId = target.dataset.id;
        toggleTask(taskId);
        return;
    }
}


function initializeApp() {
    fetchTodos();
    addTaskInput.addEventListener('keyup', handleInputKeypress);
    document.addEventListener('click', handleClickListener);
}

initializeApp();