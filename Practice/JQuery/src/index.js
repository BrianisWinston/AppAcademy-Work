const DOMNodeCollections = require("./dom_node_collection.js");

const callbackQueue = [];

window.$l = function (hello) {
  if (hello instanceof Function) {
    callbackQueue.push(hello);
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

document.addEventListener("DOMContentLoaded", () => {
  callbackQueue.forEach( func => {
    func();
    return func;
  });
})
