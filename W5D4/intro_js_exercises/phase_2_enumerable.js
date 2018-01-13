Array.prototype.myEach = function(callback) {
  for(let i = 0; i < this.length; i++) {
    callback(this[i]);
  }
};

function logIfEven(num) {
  if (num % 2 === 0) {
    console.log(`${num} is an even number!`);
  }
}

// console.log([1, 2, 3, 4].myEach(logIfEven));

Array.prototype.myMap = function(callback) {
  let results = [];
  this.myEach((el) => {
    results.push(callback(el));
  });
  return results;
};

let double = function double(num) {
  return num * 2;
};

// console.log([2, 3, 4, 5, 6, 7].myMap(double));

Array.prototype.myReduce = function(callback, initialValue) {
  let arr = this;
  let result = initialValue || 0;
  arr.myEach(el => result = callback(result, el));
  return result;
};

let reduce = function(acc, el) {
  return acc + el;
};

console.log([1, 2, 3].myReduce(reduce, 25));
