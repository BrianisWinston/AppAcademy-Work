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

$l.extend = (...objects) => {
  let merged = {};
  objects.forEach( obj => {
    for (let key in obj) {
      merged[key] = obj[key]
    }
  });
  return merged;
}

document.addEventListener("DOMContentLoaded", () => {
  callbackQueue.forEach( func => {
    func();
    return func;
  });
})
