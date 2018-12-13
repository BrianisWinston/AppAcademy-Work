const DOMNodeCollections = require("./dom_node_collection.js");

window.$l = function (hello) {
  if (hello instanceof HTMLElement) {
    let elements = document.querySelectorAll(`${hello}`);
    let newEls = new DOMNodeCollections(elements);
    return newEls;
  } else {
    let elements = document.querySelector(`${hello}`);
    let converted = Array.from(elements);
    return converted
  }
};
