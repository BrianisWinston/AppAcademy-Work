class NodeCollection {
  constructor(arrayHtml = []) {
    this.arrayOfEls = arrayHtml;
  }

  elements() {
    return this.arrayOfEls;
  }

  html(string) {
    if (string !== undefined) {
      let newArr = this.arrayOfEls.map( el => {
        el.innerHTML = string;
      });
      return newArr;
    } else {
      return this.arrayOfEls[0].innerHTML;
    }
  }
};

module.exports = NodeCollection;
