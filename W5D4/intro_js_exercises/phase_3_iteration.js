Array.prototype.bubbleSort = function () {
  var sorted = false;
  while (sorted === false) {
    sorted = true;
    for (let i = 0; i < this.length - 1; i++) {
      var j = i + 1;
      if (this[i] > this[j]) {
        this[j] = [this[i], this[i] = this[j]][0];
        sorted = false;
      }
    }
  }
  return this;
};

console.log([5,6,2,1,7,9,3,8,1,2,6,7,3,2,1,7,9,3,4,1].bubbleSort());

// b = [a, a = b][0];


String.prototype.substrings = function () {
  let result = [];
  for(let i = 0; i < this.length; i++) {
    for(let j = i + 1; j < this.length + 1; j++) {
      if (j === undefined) {
        continue;
      }
      let subString = this.slice(i, j);
      if (result.indexOf(subString) === -1) {
        result.push(subString);
      }
    }
  }
  return result;
};

// console.log("hello".substrings());
