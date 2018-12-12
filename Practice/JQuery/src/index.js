const DOMNodeCollections = require("./dom_node_collection.js");

window.$l = function (hello) {
  if (hello instanceof HTMLElement) {

  } else {
    let elements = document.querySelectorAll(`${hello}`);
    let newEls = new DOMNodeCollections(elements);
    return newEls;
  }
};
