class Clock {
  constructor() {
    const date = new Date();
    this.hours = date.getHours();
    this.minutes = date.getMinutes();
    this.seconds = date.getSeconds();
    this.printTime();
    setInterval(this._tick.bind(this), 1000);
  }

  printTime() {
    const time = `${this.hours}:${this.minutes}:${this.seconds}`;
    console.log(time);
  }

  _tick() {
    this.seconds++;
    this.printTime();
  }
}

const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addNumbers(sum, numsLeft, completionCallback) {
  if(numsLeft > 0) {
    reader.question("Give a number.", function (answer) {
      let parse = parseInt(answer);
      sum += parse;
      console.log(sum);
      addNumbers(sum, numsLeft-1, completionCallback);
    });
  }
  if(numsLeft === 0) {
    completionCallback(sum);
  }
}

// addNumbers(0, 10, sum => console.log(`Total Sum: ${sum}`));

function askIfGreaterThan(el1, el2, callback) {
  reader.question(`Is ${el1} greater than ${el2}?`, function (answer) {

    if(answer === "yes") {
      [el1, el2] = [el2, el1];
      return true;
    } else {
      return false;
    }
  });



function absurdBubbleSort(arr, sortCompletionCallback) {

  }

  function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {
    if(i === arr.length-1) {
      outerBubbleSortLoop(madeAnySwaps);
    } else {
      madeAnySwaps = askIfGreaterThan(arr[i], arr[i+1]);
      innerBubbleSortLoop(arr, i+1, madeAnySwaps);
    }
  }
}
