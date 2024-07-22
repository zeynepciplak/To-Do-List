const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

const savedTodosJSON = localStorage.getItem("todos"); // localStorage'dan var olan görevleri kontrol et ve listeyi güncelle.
const savedTodos = savedTodosJSON ? JSON.parse(savedTodosJSON) : [];

for (const todo of savedTodos) {
    addTodoToList(todo);
}

function addTodo() {
    const todoText = todoInput.value.trim(); // trim fonksiyonu başlangıçtaki ve sondaki değerleri otomatik olarak siler.
    if (todoText === "") return;

    const todo = {
        id: Date.now(),
        text: todoText,
        completed: false,
    };
    savedTodos.push(todo);
    localStorage.setItem("todos", JSON.stringify(savedTodos));
    addTodoToList(todo);
    todoInput.value = "";
}

function toggleComplete(id) { // görev tamamlandı durumunu değiştirmek için fonksiyon
    const todo = savedTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed; // true=false, false=true
    localStorage.setItem("todos", JSON.stringify(savedTodos));
    const todoElement = document.getElementById(id);
    todoElement.classList.toggle("completed", todo.completed);
}

function editTodo(id) { // görevi düzenleme fonksiyonu
    const todo = savedTodos.find(todo => todo.id === id);
    const newText = prompt("Görevi Düzenleyin:", todo.text);
    if (newText !== null) {
        todo.text = newText.trim();
        localStorage.setItem("todos", JSON.stringify(savedTodos));
        const todoElement = document.getElementById(id);
        todoElement.querySelector('span').textContent = newText;
    }
}

function removeTodo(id) { // görevi listeden kaldırma fonksiyonu
    const todoElement = document.getElementById(id);
    todoElement.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
        savedTodos.splice(savedTodos.findIndex((todo) => todo.id === id), 1);
        localStorage.setItem('todos', JSON.stringify(savedTodos));
        todoElement.remove();
    }, 300);
}

function addTodoToList(todo) { // listeye ekleme fonksiyonu
    const li = document.createElement("li");
    li.setAttribute("id", todo.id);
    li.innerHTML = `
        <span title="${todo.text}">${todo.text}</span>
        <button onclick="toggleComplete(${todo.id})"><i class="fas fa-check"></i></button>
        <button onclick="editTodo(${todo.id})"><i class="fas fa-edit"></i></button>
        <button onclick="removeTodo(${todo.id})"><i class="fas fa-trash"></i></button>
    `;
    li.classList.toggle("completed", todo.completed); // bu kısımda görevlerin tamamlanıp tamamlanmaması kontrol edilir
    todoList.appendChild(li);
}
