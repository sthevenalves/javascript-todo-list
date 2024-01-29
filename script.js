'use strict';

let database = [
    {'task': 'Estudar JS', 'status':''},
    {'task': 'Ler', 'status': 'checked'}
]

const createItem = (task, status) => {
    const item = document.createElement('label');
    item.classList.add('todo_item');
    item.innerHTML = `
        <input type="checkbox" ${status}>
        <div>${task}</div>
        <input type="button" value="x">
    `
    document.getElementById('todoList').appendChild(item);
}

const clearTask = () => {
    const todoList = document.getElementById('todoList');
    while(todoList.firstChild){
        todoList.removeChild(todoList.lastChild);
    }
}

const render = () => {
    clearTask();
    database.forEach(item => createItem(item.task, item.status));
}

render();