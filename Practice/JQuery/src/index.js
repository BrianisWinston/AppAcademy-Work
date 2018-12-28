const DOMNodeCollections = require("./dom_node_collection.js");

window.$l = function (hello) {
  if (hello instanceof Function) {
    let queue = [];
    queue.push(hello);
    while (queue.length !== 0) {
      let shifted = queue.shift();
      document.addEventListener("DOMContentLoaded", shifted());
    }
    return null;
  } else if (hello instanceof HTMLElement) {
    let elements = document.querySelectorAll(`${hello}`);
    let newEls = new DOMNodeCollections(elements);
    return newEls;
  } else {
    let elements = document.querySelectorAll(`${hello}`);
    let converted = Array.from(elements);
    let newEls = new DOMNodeCollections(converted);
    return newEls;
  }
};
