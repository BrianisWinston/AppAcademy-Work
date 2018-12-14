class NodeCollection {
  constructor(arrayHtml = []) {
    this.arrayOfEls = arrayHtml;
  }

  elements() {
    return this.arrayOfEls;
  }

  html(string) {
    if (string !== undefined) {
      this.arrayOfEls.map( el => {
        el.innerHTML = string;
      });
      return this.arrayOfEls;
    } else {
      return this.arrayOfEls[0].innerHTML;
    }
  }

  empty() {
    let newArr = this.arrayOfEls.map( el => el.innerHTML = "");
    return newArr;
  }

  append(str) {
    if (str !== undefined) {
      let newArr = this.arrayOfEls.map( el => {
        el.innerHTML += str;
        return el;
      })
      return newArr;
    }
  }

  attr(str) {
    if (arguments.length === 1) {
      return this.arrayOfEls[0].getAttribute(`${str}`);
    } else if (str instanceof Object) {
      this.arrayOfEls.forEach(el => {
        for(key in str) {
            el.setAttribute(key, str[key]);
        }
      })
      return this.arrayOfEls;
    }
  }
};

module.exports = NodeCollection;
