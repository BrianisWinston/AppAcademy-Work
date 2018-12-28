const DOMNodeCollections = require("./dom_node_collection.js");

window.$l = function (hello) {
  debugger
  if (hello instanceof Function) {
    debugger
    console.log(hello instanceof Function);
    let queue = [];
    queue.push(hello);
    while (queue.length !== 0) {
      let shifted = queue.shift();
      document.addEventListener("DOMContentLoaded", shifted);
    }
    return null;
  } else if (hello instanceof HTMLElement) {
    debugger
    let elements = document.querySelectorAll(`${hello}`);
    let newEls = new DOMNodeCollections(elements);
    console.log('in htmlelement');
    return newEls;
  } else {
    debugger
    let elements = document.querySelectorAll(`${hello}`);
    let converted = Array.from(elements);
    let newEls = new DOMNodeCollections(converted);
    console.log('in else');
    return newEls;
  }
};
