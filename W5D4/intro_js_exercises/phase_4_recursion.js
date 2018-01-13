function range(start, end) {
  if (start === end) {
    return [start];
  }
  return [start].concat(range(start + 1, end));
}

// console.log(range(0, 900));

function sumRec(arr) {
  if (arr.length === 1) {
    return arr[0];
  }
  return arr.pop() + sumRec(arr);
}

// console.log(sumRec([1,2,3,50,1000]));

function exponent(base, exp) {
  if (exp === 1) {
    return base;
  }
  return base * exponent(base, exp - 1);
}

// console.log(exponent(5, 3));

function fibonacci(n) {
  if (n < 3) {
    return [0, 1].slice(0, n);
  }

  let fibs = fibonacci(n - 1);
  fibs.push(fibs[fibs.length - 1] + fibs[fibs.length - 2]);

  return fibs;
}

console.log(fibonacci(10))
