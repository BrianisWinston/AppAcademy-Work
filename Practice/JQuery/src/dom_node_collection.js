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
    let cb = function(listOfEls) {
        this.arrayOfEls.forEach( el => {
          let converted = Array.prototype.slice.call(el.children);
          converted.forEach(el1 => listOfEls.push(el1));
        })
        return listOfEls
      };
    return this.finder(cb)
  }

  parent() {
    let cb = function(listOfEls) {
        this.arrayOfEls.forEach(el => {
          if (!listOfEls.includes(el.parentNode)) {
            listOfEls.push(el.parentNode);
          }
        })
        return listOfEls
      };
    return this.finder(cb);
  }

  finder(cb) {
    let listOfEls = [];
    let ye = cb.call(this, listOfEls);
    let newCollection = new NodeCollection(ye);
    return newCollection;
  }

  find(el) {
    let childEls = [];
    this.arrayOfEls.forEach( el1 => {
      let pickedEls = el1.querySelectorAll(el);
      if (pickedEls.length !== 0) {
        pickedEls.forEach( oneEl =>{
          childEls.push(oneEl);
        })
      }
    })
    let newCollection = new NodeCollection(childEls);
    return newCollection;
  }

  remove() {
    let newEls = this.empty();
    this.arrayOfEls.forEach(el => el.remove());
    return this.arrayOfEls;
  }

  on(event, cb) {
    this.arrayOfEls.map( el => {
      el.addEventListener(event, cb.bind(this));
      el.cb = cb;
      console.log(el.cb)
    });
    return this.arrayOfEls;
  }

  off(event) {
    this.arrayOfEls.map( el => {
      console.log(el.cb);
      el.removeEventListener(event, el.cb);
    });
    return this.arrayOfEls;
  }
};


module.exports = NodeCollection;
