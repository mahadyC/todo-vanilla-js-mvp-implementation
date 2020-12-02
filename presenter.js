import { model } from './model'
import { view } from './view'

let state = model;

let render = () => {
  const list = document.querySelector("ul");
  list.appendChild(view.listEl("itemName")).appendChild(view.divEl("itemName-div"));
  const listItem = document.querySelector("li");
  const itemDiv1 = document.getElementById("itemName-div");
  itemDiv1.appendChild(view.checkboxEl(false));
  itemDiv1.appendChild(view.textNode("item 1"));
}

export { render }