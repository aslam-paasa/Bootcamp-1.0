let counter = 0;
function incrementCounter() {
  counter++;
  console.log(counter);
  if (counter < 30) {
    setTimeout(incrementCounter, 1000);
  }
}

incrementCounter();