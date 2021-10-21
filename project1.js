var input = document.querySelector("input");
var add_button = document.getElementById("addtask");
var list = document.querySelector("ul");
var total_tasks = document.querySelector("#totaltasks");
listOftasks = [];
var all = document.querySelector("div#listheader div:nth-child(2) div:nth-child(1)");
var pending = document.querySelector("div#listheader div:nth-child(2) div:nth-child(2)");
var completed = document.querySelector("div#listheader div:nth-child(2) div:nth-child(3)");

del = (event) => {
  tasks = document.querySelectorAll("li div button:nth-child(1)");
  lielems = document.querySelectorAll("li");
  tasks.forEach((elem, index) => {
    if (elem == event.target) {
      lielems[index].remove();
      listOftasks.splice(index, 1);
      updated = JSON.stringify(listOftasks);
      localStorage.setItem("task", updated);
      let total = JSON.parse(localStorage.getItem("task")).length;
      total_tasks.innerHTML = `${total} tasks`;
    }
  })
}
done = (event) => {
  tasks = document.querySelectorAll("li div button:nth-child(2)");
  lielems = document.querySelectorAll("li");
  tasks.forEach((elem, index) => {
    if (elem == event.target) {
      listOftasks[index].status = "completed";
      updated = JSON.stringify(listOftasks);
      localStorage.setItem("task", updated);
    }
  })
}
change_mode = (event) => {
  event.target.classList.toggle("shift");
  header = document.querySelector("header");
  header.classList.toggle("darkmode");
  h1 = document.querySelector("h1");
  h1.classList.toggle("darkmode");
  footer = document.querySelector("footer");
  footer.classList.toggle("darkmode");
}

add_task = () => {
  task = { task: input.value, status: "pending" }
  if (listOftasks.includes(task)) {
    alert(`${task} already exists !`);
  }
  else if (input.value == "") {
    alert(`task cannot be blank`)
  }
  else {
    listOftasks.push(task);
    element = document.createElement("li");
    textnode = document.createTextNode(input.value);
    element.appendChild(textnode);
    delete_btn = document.createElement("button");
    delete_btn.innerHTML = "X";
    delete_btn.classList.add("btns")
    completed_btn = document.createElement("button");
    completed_btn.innerHTML = "C";
    delete_btn.classList.add("noback");
    delete_btn.style.color = "red";
    completed_btn.style.color = "green";
    completed_btn.classList.add("noback");
    div = document.createElement("div");
    div.appendChild(delete_btn);
    div.appendChild(completed_btn);
    div.classList.add("flexbox");
    element.appendChild(div);
    list.appendChild(element);
    delete_btn.addEventListener("click", del);
    completed_btn.addEventListener("click", done);
    // element.addEventListener("click",delete_task);
    json_string = JSON.stringify(listOftasks);
    localStorage.setItem("task", json_string);
    total_tasks.innerHTML = `${listOftasks.length} tasks`;
  }
}
add_button.addEventListener("click", add_task);
clear = document.getElementById("clearAll");
clear_all = () => {
  list.remove();
  total_tasks.innerHTML = "0 tasks";
  for (i = 0; i < listOftasks.length; i++) {
    listOftasks.splice(i, 1);
  }
  localStorage.setItem("task", "");
}
clear.addEventListener("click", clear_all);
mode_btn = document.querySelector("#mode");
mode_btn.addEventListener("click", change_mode);

if (localStorage.length != 0) {
  json_string = localStorage.getItem("task");
  data = JSON.parse(json_string);

  data.forEach((task) => {
    listOftasks.push(task);
  })
}
else {
  let empty = [];
  let json_string = JSON.stringify(empty);
  localStorage.setItem("task", json_string);
  alert("no tasks in localstorage!");
}
let total = JSON.parse(localStorage.getItem("task")).length;
total_tasks.innerHTML = `${total} tasks`;
const display = (section = "all") => {
  list.innerHTML = "";
  tasks = JSON.parse(localStorage.getItem("task"));
  tasks.forEach((element) => {
    if (section == "all") {
      li = document.createElement("li");
      data = element.task;
      text = document.createTextNode(`${data}`);
      li.appendChild(text);
      delete_btn = document.createElement("button");
      delete_btn.innerHTML = "X";
      delete_btn.classList.add("btn");
      completed_btn = document.createElement("button");
      completed_btn.innerHTML = "C";
      completed_btn.classList.add("btn");
      div = document.createElement("div");
      div.classList.add("flexbox");
      delete_btn.classList.add("noback");
      completed_btn.classList.add("noback");
      delete_btn.style.color = "red";
      completed_btn.style.color = "green";
      delete_btn.addEventListener("click", del);
      completed_btn.addEventListener("click", done);
      div.appendChild(delete_btn);
      div.appendChild(completed_btn);
      li.appendChild(div);
      list.appendChild(li);
    }
    else {
      if (element.status == section) {
        li = document.createElement("li");
        data = element.task;
        text = document.createTextNode(`${data}`);
        li.appendChild(text);
        delete_btn = document.createElement("button");
        delete_btn.innerHTML = "X";
        delete_btn.classList.add("btn");
        delete_btn.classList.add("noback");
        delete_btn.addEventListener("click",del);
        completed_btn = document.createElement("button");
        completed_btn.innerHTML = "C";
        completed_btn.classList.add("noback");
        completed_btn.classList.add("btn");
        delete_btn.style.color = "red";
        completed_btn.style.color = "green";
        div = document.createElement("div");
        div.classList.add("flexbox");
        div.appendChild(delete_btn);
        div.appendChild(completed_btn);
        li.appendChild(div);
        list.appendChild(li);
      }
    }
  })
}
all.addEventListener("click", () => { display("all") })
pending.addEventListener("click", () => { display("pending") })
completed.addEventListener("click", () => { display("completed") })
display();