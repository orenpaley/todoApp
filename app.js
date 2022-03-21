let body = document.querySelector("body");
let form = document.querySelector(".todoForm");
let addInput = document.querySelector(".addInput");
let list = document.querySelector(".list");
let inputText = document.querySelector("input[type='text]");
const savedTodo = {};
let savedTodoList = [];
let localTodos = JSON.parse(localStorage.getItem("savedTodoList"));
let merged = { ...savedTodo, ...localTodos };

//check if no todos, initialize default instructions
if (localStorage.length === 0) {
  let line1 = document.createElement("li");
  let line2 = document.createElement("li");
  let line3 = document.createElement("li");
} else if (Object.keys(localTodos).length < 1) {
  let line1 = document.createElement("li");
  let line2 = document.createElement("li");
  let line3 = document.createElement("li");

  line1.innerText = "click me once to strike through";
  line2.innerText = "click me again to undo the strike";
  line3.innerText = "double click me to delete me forever";

  list.append(line1, line2, line3);
}
// Make a new Todo
form.addEventListener((type = "submit"), function (e) {
  e.preventDefault();
  let newLi = document.createElement("li");
  newLi.innerText = addInput.value;
  addInput.value = "";
  list.prepend(newLi);
  savedTodo[newLi.innerText] = true;
  merged = {
    ...savedTodo,
    ...localTodos,
  };
  localStorage.setItem("savedTodoList", JSON.stringify(merged));
  console.log("i am saved Todos :", savedTodo);
  console.log(localStorage);
});

// strike a todo as completed and unstrike a completed todo
list.addEventListener((type = "click"), function (e) {
  if (
    e.target.tagName === "LI" &&
    (e.target.style.textDecoration === "none" ||
      e.target.style.textDecoration === "")
  ) {
    e.target.style.textDecoration = "line-through";
    merged[e.target.innerText] = false;
    console.log(merged);
    localStorage.setItem("savedTodoList", JSON.stringify(merged));
  } else if (
    e.target.tagName === "LI" &&
    e.target.style.textDecoration === "line-through"
  ) {
    e.target.style.textDecoration = "none";
    merged[e.target.innerText] = true;
    console.log(merged);
    localStorage.setItem("savedTodoList", JSON.stringify(merged));
  }
});

// remove a todo with a double click
list.addEventListener((type = "dblclick"), function (e) {
  if (e.target.tagName === "LI") {
    delete merged[e.target.textContent];
    list.removeChild(e.target);
    localStorage.setItem("savedTodoList", JSON.stringify(merged));
  }
});

// Keeps todo list updated based on what is saved in local storage
// true means not complete
// false means completed
for (let key in localTodos) {
  let savedLi = document.createElement("li");
  savedLi.textContent = key;
  localTodos[key] === true
    ? (savedLi.style.textDecoration = "none")
    : localTodos[key] === false
    ? (savedLi.style.textDecoration = "line-through")
    : null;
  list.prepend(savedLi);
}
