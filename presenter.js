import { model } from './model'
import { paragraph } from './view'

let state = model;

let render = () => {
  console.log("hi");
  paragraph.append("hello");
  return document.querySelector("ul").appendChild(paragraph);
}

export { render }