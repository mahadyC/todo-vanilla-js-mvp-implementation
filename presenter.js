import { model } from './model'
import { view } from './view'

let state = model;
const deleteItem = (itemName) =>{
  let itemObj = state.allTasks.filter(item => item.name === itemName);
  let itemIndex = state.allTasks.findIndex(item => item === itemObj[0]);
  state.allTasks.splice(itemIndex, 1);
};
const updateItem = (previousName, newName, completeValue) =>{
  let itemIndex = state.allTasks.findIndex(item => item.name === previousName);
  let newObj = {
    id:"unique-id",
    name: newName,
    complete: completeValue
  };
  state.allTasks.splice(itemIndex, 1, newObj);
};
const addItem = (itemName) =>{
  let newObj = {
    id: "unique-id",
    name: itemName,
    complete: false
  }
  state.allTasks.push(newObj);
};
const addInp = document.getElementById("task-name-input");
const addBtn = document.getElementById("add-task");
addBtn.addEventListener("click", (event) =>{
  console.log(state.allTasks);
  addItem(addInp.value);
  console.log(state.allTasks);
  document.querySelector("ul").innerHTML = "";
  render();
});
let render = () => {
  const allTasksState = state.allTasks.map(item =>{
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
    editBtn.addEventListener("click", (event) =>{
      const item = document.getElementById(`${event.target.id.substring(12)}-rewrite-div`);
      item.hidden ? item.hidden = false : item.hidden = true;
    });
    deleteBtn.addEventListener("click", (event) => {
      const item = document.getElementById(`${event.target.id.substring(14)}`);
      item.remove();
      deleteItem(item.id);
    });
    saveBtn.addEventListener("click", (event) =>{
      const item = document.getElementById(`${event.target.id.substring(12)}-rewrite-div`);
      const previousName = document.getElementById(`${event.target.id.substring(12)}`).id;
      const newName = item.firstChild.value;
      const checkedValue = item.previousElementSibling.firstElementChild.checked ;
      updateItem(previousName, newName, checkedValue);
      document.querySelector("ul").innerHTML = "";
      render();
    });
    return listItem;
  });
  console.log(allTasksState);
}

export { render }