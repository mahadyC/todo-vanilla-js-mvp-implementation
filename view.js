const listEl = (taskName) =>{
  let el = document.createElement("li");
  el.id = taskName;
  return el;
}
const divEl = (id) =>{
  let el = document.createElement("div");
  el.id = id;
  return el;
}
const checkboxEl = (complete) =>{
  let el = document.createElement("input");
  el.id = `checkbox-input-name`;
  el.type = "checkbox";
  el.checked = complete;
  return el;
}
const textNode = (text) =>{
  let textNd = document.createTextNode(text);
  return textNd;
}
const buttonEl = (buttonType, buttonName) =>{
  let el = document.createElement("button");
  el.id = `button-item-name`;
  el.type = "button";
  el.textContent = `${buttonType} ${buttonName}`;
  return el;
}
const view = {
  listEl: listEl,
  divEl: divEl,
  checkboxEl: checkboxEl,
  textNode: textNode,
  buttonEl: buttonEl
}
export { view }