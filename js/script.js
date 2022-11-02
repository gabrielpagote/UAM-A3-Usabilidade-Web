// seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;

//funções

//função para criar uma tarefa
const saveTodo = (text) => {

    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

//inserindo todo na lista geral
todoList.appendChild(todo);

//limpando campo apos escrever
todoInput.value = "";
todoInput.focus();


};


//limpando a tela para o user ter apenas a tela de "editar"
const toggleForms = () =>{
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
};

//função para atualizar tarefa apos edicao
const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) =>{
        let todoTitle = todo.querySelector("h3");

        if(todoTitle.innerText === oldInputValue){
            todo.innerText = text;
        }
    });
}


//eventos

todoForm.addEventListener("submit", (e) =>{
    e.preventDefault();

//salvar tarefa
    const inputValue = todoInput.value
    if(inputValue){
        saveTodo(inputValue)
    }
});

//completar tarefa
document.addEventListener("click", (e) =>{
   
    const targetEl = e.target;
    const parentEl = targetEl.closest("div"); //selecionando elemento "pai" div mais proximo
    let todoTitle;

    if(parentEl && parentEl.querySelector("h3")){
        todoTitle = parentEl.querySelector("h3").innerText;

    }

    if(targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done");
    }

//remover tarefa

    if(targetEl.classList.contains("remove-todo")){
        parentEl.remove();
    }

//editar tarefa

    if(targetEl.classList.contains("edit-todo")){
        toggleForms();

    //mudar e mapear a tarefa em uma memoria temporaria
    editInput.value = todoTitle;
    oldInput = todoTitle;

    }

});

//trabalhando o botao de "cancelar" no menu de edicao
cancelEditBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    toggleForms();
});

//salvando a tarefa editada
editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if(editInputValue){
    //atualizar
    updateTodo(editInputValue)
    }

    toggleForms();

});