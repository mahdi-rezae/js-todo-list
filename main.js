let todoInput = document.querySelector(".todo-input");
let todoButton = document.querySelector(".todo-button");
let todoList = document.querySelector(".todo-list");
let filterTodo = document.querySelector(".filter-todo");

todoButton.addEventListener("click", addToList);
todoList.addEventListener("click",  selectedButton);
filterTodo.addEventListener("click", itemFilter);
document.addEventListener("DOMContentLoaded", loadLocalStorage);

function createElement(set) {
    let listItem = document.createElement("li");
    listItem.classList.add("todo");
    todoList.appendChild(listItem);

    let itemInput = document.createElement("div");
    itemInput.classList.add("todo", "todo-item");
    // checkInput();
    listItem.appendChild(itemInput);
    itemInput.innerText = set;

    let buttons = document.createElement("div");
    listItem.appendChild(buttons);

    let checkBtn = document.createElement("button");
    checkBtn.innerHTML = "<i class='fas fa-check'></i>";
    checkBtn.classList.add("complete-btn");
    buttons.appendChild(checkBtn);

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "<i class='fas fa-trash'></i>";
    deleteBtn.classList.add("trash-btn");
    buttons.appendChild(deleteBtn);
}

function addToList(event) {
    event.preventDefault();

    createElement(todoInput.value);
    addToLocalStorage(todoInput.value);
    todoInput.value = "";
}

function checkInput() {
    if (todoInput.value == "") {
        listItem.remove();
    } else {
        
    }
}

function selectedButton(event) {
    let element = event.target;
    let item = element.parentElement.parentElement;

    if (element.classList[0] == "complete-btn") {
        item.classList.toggle("completed");
    } else if (element.classList[0] == "trash-btn") {
        item.remove();
        removeFromLocalStorage(item);
    }
}

function itemFilter(event) {
    let item = todoList.childNodes;
    item.forEach(function (li){
        switch (event.target.value) {
            case "all":
                li.style.display = "flex";
                break;
            case "completed":
                if (li.classList.contains("completed")) {
                    li.style.display = "flex";
                } else {
                    li.style.display = "none";
                }
                break;
            case "uncompleted":
                if (li.classList.contains("completed")) {
                    li.style.display = "none";
                } else {
                    li.style.display = "flex";
                }
                break;
        }
    })
}

function addToLocalStorage(input) {
    let todosArray;

    if (localStorage.getItem("todos") === null) {
        todosArray = [];
    } else {
        todosArray = JSON.parse(localStorage.getItem("todos"));
    }

    todosArray.push(input);
    localStorage.setItem("todos", JSON.stringify(todosArray));
}

function removeFromLocalStorage(value) {
    let todosArray;

    if (localStorage.getItem("todos") === null) {
        todosArray = [];
    } else {
        todosArray = JSON.parse(localStorage.getItem("todos"));
    }

    let liInput = value.childNodes[0].innerText;
    todosArray.splice(todosArray.indexOf(liInput), 1);
    localStorage.setItem("todos", JSON.stringify(todosArray));
}

function loadLocalStorage() {
    let todosArray;

    if (localStorage.getItem("todos") === null) {
        todosArray = [];
    } else {
        todosArray = JSON.parse(localStorage.getItem("todos"));
    }

    todosArray.forEach(function (todosValue) {
        createElement(todosValue);
    })
}