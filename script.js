'use strict';

// let database = [
//     {'task': 'Estudar JS', 'status':''},
//     {'task': 'Ler', 'status': 'checked'}
// ]

const getBase = () => JSON.parse(localStorage.getItem('todoList')) ?? [];

const setBase = (database) => localStorage.setItem('todoList', JSON.stringify(database));

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
    const database = getBase();
    database.forEach((item, indice) => createItem(item.task, item.status, indice));
}

const insertItem = (event) => {
    const keyNow = event.key;
    if(keyNow === 'Enter'){
        const database = getBase();
        database.push({'task': event.target.value, 'status': ''})
        setBase(database);
        render();
        event.target.value = ''
    }
}

const removeItem = (indice) => {
    const database = getBase();
    database.splice (indice, 1);
    setBase(database);
    render();
} 

const updateItem = (indice) => {
    const database = getBase();
    database[indice].status = database[indice].status === '' ? 'checked' : '';
    setBase(database);
    render()
}

const clickItem = (event) => {
    const element = event.target;
    if(element.type === 'button'){
        const indice = element.dataset.indice;
        removeItem(indice);
    }else if(element.type === 'checkbox'){
        const indice = element.dataset.indice;
        updateItem(indice);
    }

}

document.getElementById('newItem').addEventListener('keypress', insertItem);
document.getElementById('todoList').addEventListener('click', clickItem);

render();