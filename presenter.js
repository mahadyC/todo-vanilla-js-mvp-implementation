import { model } from './model'
import { view } from './view'

let state = model;

let render = () => {
  console.log("hi");
  view.paragraph.append("hello");
  return document.querySelector("ul").appendChild(view.paragraph);
}

export { render }