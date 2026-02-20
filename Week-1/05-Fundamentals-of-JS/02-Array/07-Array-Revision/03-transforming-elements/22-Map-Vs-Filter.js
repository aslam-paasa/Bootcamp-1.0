let arr = [5, 83, 24, 67, 71, 12, 24, 7];

//return cubes of values whose squares <= 1000
let cubes = arr.filter(v => v * v <= 1000).map(v => v * v * v);
console.log(cubes);

// Q1 give me cubes of numbers whose cubes are less than 10000

// Q2 what is this returning = v6 for elements whose square <= 1000
let ans2 = arr.map(val => val * val)
    .filter(v2 => v2 <= 1000)
    .map(v2 => v2 * v2 * v2);
console.log(ans2);