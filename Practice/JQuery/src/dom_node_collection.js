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
    if (str instanceof Object) {
      this.arrayOfEls.forEach(el => {
        for (let k in str) {
            el.setAttribute(k, str[k]);
        }
      })
      return this.arrayOfEls;
    } else if (arguments.length === 1) {
      return this.arrayOfEls[0].getAttribute(`${str}`);
    } else if (arguments.length === 2) {
      this.arrayOfEls.forEach( el => el.setAttribute(str, arguments[1]));
      return this.arrayOfEls;
    }
  }

  addClass(newClass) {
    this.arrayOfEls.forEach( el => el.classList.add(newClass));
    return this.arrayOfEls
  }

  removeClass(newClass) {
    this.arrayOfEls.forEach( el => el.classList.remove(newClass));
    return this.arrayOfEls
  }

  children() {
    let listOfChildren = [];
    this.arrayOfEls.forEach( el => {
      let converted = Array.prototype.slice.call(el.children);
      converted.forEach(el1 => listOfChildren.push(el1));
    })
    let hi = new NodeCollection(listOfChildren);
    return hi;
  }

  parent() {
    let listOfParents = [];
    this.arrayOfEls.forEach(el => {
      if (!listOfParents.includes(el.parentNode)) {
        listOfParents.push(el.parentNode);
      }
    })
    let newCollection = new NodeCollection(listOfParents);
    return newCollection;
  }
};

module.exports = NodeCollection;
