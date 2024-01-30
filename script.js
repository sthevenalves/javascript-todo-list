'use strict';

let database = [
    {'task': 'Estudar JS', 'status':''},
    {'task': 'Ler', 'status': 'checked'}
]

const createItem = (task, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('todo_item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${task}</div>
        <input type="button" value="X" data-indice=${indice}>
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
    database.forEach((item, indice) => createItem(item.task, item.status, indice));
}

const insertItem = (event) => {
    const keyNow = event.key;
    if(keyNow === 'Enter'){
        database.push({'task': event.target.value, 'status': ''})
        render();
        event.target.value = ''
    }
}

const removeItem = (indice) => {
    database.splice (indice, 1);
    render();
} 

const clickItem = (event) => {
    const element = event.target;
    if(element.type === 'button'){
        const indice = element.dataset.indice;
        removeItem(indice);
    }

}

document.getElementById('newItem').addEventListener('keypress', insertItem);
document.getElementById('todoList').addEventListener('click', clickItem);

render();