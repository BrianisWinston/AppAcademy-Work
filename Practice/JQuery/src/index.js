const DOMNodeCollections = require("./dom_node_collection.js");

window.$l = function (hello) {
  let elements = document.querySelectorAll(`${hello}`);
  return elements;
};
