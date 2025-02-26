import { model } from './model'
import { view } from './view'

/*------------------------------------------------Data-State-Of-The-Application----------------------------------------------------*/
let state = model.allTasks;
/*------------------------------------------------Route-State-Of-The-Application---------------------------------------------------*/
let router = { currentRoute: "main ui"};
/*-----------------------------------------------------Route-State-Handler---------------------------------------------------------*/
const updateRoute = (routeName) =>{
  router.currentRoute = routeName;
};
/*----------------------------------------------Data-State-Handlers(State-Data-Manipulation)---------------------------------------*/
const deleteItem = (itemName) =>{
  let itemObj = state.filter(item => item.name === itemName);
  let itemIndex = state.findIndex(item => item === itemObj[0]);
  state.splice(itemIndex, 1);
};
const updateItemName = (previousName, newName, completeValue) =>{
  let itemIndex = state.findIndex(item => item.name === previousName);
  let newObj = {
    id:"unique-id",
    name: newName,
    complete: completeValue
  };
  state.splice(itemIndex, 1, newObj);
};
const updateComplete = (itemName, completeValue) =>{
  let itemIndex = state.findIndex(item => item.name === itemName);
  let newObj = {
    id: "unique-id",
    name: itemName,
    complete: completeValue
  };
  state.splice(itemIndex, 1, newObj);
};
const addItem = (itemName) =>{
  let newObj = {
    id: "unique-id",
    name: itemName,
    complete: false
  }
  state.push(newObj);
};
/*----------------------------------------------Data-Binders(State-Data+View/UI-Components)---------------------------------------*/
const addInp = document.getElementById("task-name-input");
const addBtn = document.getElementById("add-task");
addBtn.addEventListener("click", (event) =>{
  if(addInp.value !== ""){
    addItem(addInp.value)
    addInp.value = "";
    document.querySelector("ul").innerHTML = "";
    router.currentRoute === "main ui" ? render.allTasksState() : render.activeTasks();
  }else{
    alert("Write a task name");
  }
});
const allTasksBtn = document.getElementById("show-all-tasks");
allTasksBtn.addEventListener("click", (event) => {
  document.querySelector("ul").innerHTML = "";
  render.allTasksState();
  updateRoute("main ui");
});
const activeTasksBtn = document.getElementById("show-active-tasks");
activeTasksBtn.addEventListener("click", (event) => {
  document.querySelector("ul").innerHTML = "";
  render.activeTasks();
  updateRoute("active ui");
});
const completeTasksBtn = document.getElementById("show-complete-tasks");
completeTasksBtn.addEventListener("click", (event) => {
  document.querySelector("ul").innerHTML = "";
  render.completeTasks();
  updateRoute("complete ui");
});
const changeHandler = (event) =>{
  const itemName = event.target.id.substring(9);
  let checkedValue = event.target.checked;
  updateComplete(itemName, checkedValue);
  document.querySelector("ul").innerHTML = "";
  router.currentRoute === "main ui" ? render.allTasksState() : router.currentRoute === "active ui" ? render.activeTasks() : render.completeTasks();
};  
const editBtnHandler = (event) =>{
  const item = document.getElementById(`${event.target.id.substring(12)}-rewrite-div`);
  item.hidden ? item.hidden = false : item.hidden = true;
};
const deleteBtnHandler = (event) =>{
  const item = document.getElementById(`${event.target.id.substring(14)}`);
  item.remove();
  deleteItem(item.id);
  document.querySelector("ul").innerHTML = "";
  router.currentRoute === "main ui" ? render.allTasksState() : router.currentRoute === "active ui" ? render.activeTasks() : render.completeTasks();
};
const saveBtnHandler = (event) =>{
  const item = document.getElementById(`${event.target.id.substring(12)}-rewrite-div`);
  const previousName = document.getElementById(`${event.target.id.substring(12)}`).id;
  const newName = item.firstChild.value;
  const checkedValue = item.previousElementSibling.firstElementChild.checked ;
  if(newName !== ""){
    updateItemName(previousName, newName, checkedValue);
    document.querySelector("ul").innerHTML = "" ;
    router.currentRoute === "main ui" ? render.allTasksState() : render.activeTasks();
  }else{
    alert("write a task name");
  }
};
/*------------------------------------------------------UI-Component-List-Construction----------------------------------------------*/
const allTasksUI = (item) => {
  const list = document.querySelector("ul");
  const listItem = view.listEl(item.name);
  const itemDiv1 = view.divEl(`${item.name}Name-div`);
  const checkBox = view.checkboxEl(item.complete, item.name);
  const textNd = view.textNode(item.name);
  const itemDiv2 = view.divEl(`${item.name}-rewrite-div`);
  const editInp = view.editInputEl(item.name);
  const saveBtn = view.buttonEl("Save", item.name);
  const itemDiv3 = view.divEl(`${item.name}Edit-div`);
  const editBtn = view.buttonEl("Edit", item.name);
  const deleteBtn = view.buttonEl("Delete", item.name);
  list.appendChild(listItem);
  listItem.appendChild(itemDiv1);
  itemDiv1.appendChild(checkBox);
  itemDiv1.appendChild(textNd);
  listItem.appendChild(itemDiv2);
  itemDiv2.appendChild(editInp);
  itemDiv2.appendChild(saveBtn);
  listItem.appendChild(itemDiv3);
  itemDiv3.appendChild(editBtn);
  itemDiv3.appendChild(deleteBtn);
  itemDiv2.hidden = true;
  /*---------------------------------Bind-Handlers-With-UI------------------------------------*/
  checkBox.addEventListener("change", (event) => {
    changeHandler(event);
  });
  editBtn.addEventListener("click", (event) =>{
    editBtnHandler(event);
  });
  deleteBtn.addEventListener("click", (event) => {
    deleteBtnHandler(event);
  });
  saveBtn.addEventListener("click", (event) =>{
    saveBtnHandler(event);
  });
  return listItem;
}
/*---------------------------------------------------Style-Handler----------------------------------------------------------------*/
const completeTasksStyle = (taskId) =>{
  const completeEl = document.getElementById(taskId);
  completeEl.style.textDecoration = "line-through";
  completeEl.lastElementChild.firstElementChild.disabled = true;
}
/*--------------------------------------------UI-Constructor(View-Generator-For-Different-Routes/Tabs)----------------------------*/ 
let render ={
  allTasksState: () => {
    const listHeading = document.getElementById("list-heading");
    state.length > 1 ? listHeading.innerText = `${state.length} tasks in the list` : listHeading.innerText = `${state.length} task in the list`;
    state.forEach(element =>{
      allTasksUI(element);
      element.complete === true ? completeTasksStyle(element.name) : "" ;
    }); 
  },
  activeTasks: () => {
    const activeList = state.filter(item => item.complete === false);
    const listHeading = document.getElementById("list-heading");
    activeList.length > 1 ? listHeading.innerText = `${activeList.length} tasks remaining` : listHeading.innerText = `${activeList.length} task remaining`;
    activeList.forEach(element =>{
      allTasksUI(element);
    });
  },
  completeTasks: () => {
    const completeList = state.filter(item => item.complete === true);
    const listHeading = document.getElementById("list-heading");
    completeList.length > 1 ? listHeading.innerText = `${completeList.length} tasks complete` : listHeading.innerText = `${completeList.length} task complete`;
    completeList.forEach(element =>{
      allTasksUI(element);
      completeTasksStyle(element.name);
    });
  }
}

export { render }