import { model } from './model'
import { view } from './view'

let state = model;

let render = () => {

  const allTasksState = state.allTasks.map(item =>{
    const list = document.querySelector("ul");
    const listItem = view.listEl(item.name);
    const itemDiv1 = view.divEl(`${item.name}Name-div`);
    const checkBox = view.checkboxEl(item.complete, item.name);
    const textNd = view.textNode(item.name);
    const itemDiv2 = view.divEl(`${item.name}-rewrite-div`);
    const editInp = view.editInputEl(item.name);
    const saveChange = view.buttonEl("Save", item.name);
    const itemDiv3 = view.divEl(`${item.name}Edit-div`);
    const editBtn = view.buttonEl("Edit", item.name);
    const deleteBtn = view.buttonEl("Delete", item.name);
    list.appendChild(listItem);
    listItem.appendChild(itemDiv1);
    itemDiv1.appendChild(checkBox);
    itemDiv1.appendChild(textNd);
    listItem.appendChild(itemDiv2);
    itemDiv2.appendChild(editInp);
    itemDiv2.appendChild(saveChange);
    listItem.appendChild(itemDiv3);
    itemDiv3.appendChild(editBtn);
    itemDiv3.appendChild(deleteBtn);
    return listItem;
  });
  console.log(allTasksState);
}

export { render }