window.$l = function idk(hello) {
  let elements = document.querySelectorAll(`${hello}`).innerHTML;
  return Array.from(elements);
};
