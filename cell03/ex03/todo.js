window.onload = loadTodos;

function newTodo() {
  const text = prompt("New TO DO:");
  if (!text) return;

  addTodo(text);
  saveTodos();
}

function addTodo(text) {
  const div = document.createElement("div");
  div.textContent = text;

  div.onclick = function () {
    if (confirm("Remove this TO DO?")) {
      this.remove();
      saveTodos();
    }
  };

  const list = document.getElementById("ft_list");
  list.prepend(div);
}

function saveTodos() {
  const todos = [];
  document.querySelectorAll("#ft_list div").forEach(d => {
    todos.push(d.textContent);
  });
  document.cookie = "todos=" + encodeURIComponent(JSON.stringify(todos));
}

function loadTodos() {
  const match = document.cookie.match(/todos=([^;]+)/);
  if (!match) return;

  const todos = JSON.parse(decodeURIComponent(match[1]));
  todos.reverse().forEach(t => addTodo(t));
}
