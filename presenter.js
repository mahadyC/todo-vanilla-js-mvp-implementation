import { model } from './model'
import { view } from './view'

let state = model;

let render = () => {
  const list = document.querySelector("ul");
  const listItem = view.listEl("item-name");
  const itemDiv1 = view.divEl("item-name-div");
  const checkBox = view.checkboxEl(false);
  const textNd = view.textNode("item-name");
  const itemDiv2 = view.divEl("itemEdit-div");
  const editBtn = view.buttonEl("Edit", "list-item-name");
  const deleteBtn = view.buttonEl("Delete", "list-item-name");
  list.appendChild(listItem);
  listItem.appendChild(itemDiv1);
  itemDiv1.appendChild(checkBox);
  itemDiv1.appendChild(textNd);
  listItem.appendChild(itemDiv2);
  itemDiv2.appendChild(editBtn);
  itemDiv2.appendChild(deleteBtn);
}

export { render }