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
    let cb = function() {
        this.arrayOfEls.forEach( el => {
          let converted = Array.prototype.slice.call(el.children);
          converted.forEach(el1 => listOfEls.push(el1));
        })
      }.bind(this);
    this.finder(cb)
  }

  parent() {
    let cb = function() {
        this.arrayOfEls.forEach(el => {
          if (!listOfEls.includes(el.parentNode)) {
            listOfEls.push(el.parentNode);
          }
        })
      }.bind(this);
      this.finder(cb)
  }

  finder(cb) {
    let listOfEls = [1];
    cb();
    let newCollection = new NodeCollection(listOfEls);
    // return newCollection;
    return listOfEls;
  }
};

module.exports = NodeCollection;
