class NodeCollection {
  constructor(arrayHtml = []) {
    this.arrayOfEls = arrayHtml;
  }

  elements() {
    return this.arrayOfEls;
  }
};

module.exports = NodeCollection;
