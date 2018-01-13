Array.prototype.uniq = function () {
  const result = [];
  for(let i = 0; i < this.length; i++) {
    if (result.indexOf(this[i]) === -1) {
      result.push(this[i]);
    }
  }
  return result;
};

// console.log([1, 2, 1, 3, 5].uniq());

Array.prototype.twoSum = function () {
  for(let i = 0; i < this.length; i++) {
    for(let j = i + 1; j < this.length; j++) {
      if (this[i] + this[j] === 0) {
        return [i, j];
      }
    }
  }
};

// console.log([1, 2, 3, -1, 5].twoSum());

Array.prototype.transpose = function () {
  let result = [];
  for(let i = 0; i < this.length; i++) {
    let subArray = [];
    for(let j = 0; j < this.length; j++) {
      subArray.push(this[j][i]);
    }
    result.push(subArray);
  }
  return result;
};

// console.log([[1, 2, 3], [4, 5, 6], [7, 8, 9]].transpose());
