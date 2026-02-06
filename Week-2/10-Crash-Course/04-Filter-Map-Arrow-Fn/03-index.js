// Filtering :
// What if I tell you, give me an input, give me back all the even values
// from it.

const arr = [1, 2, 3, 4, 5]

// Solution-1 : Filtering using for-loop
const newArr = [];
for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 == 0) {
        newArr.push(arr[i]);
    }
}

console.log(newArr);


// Solution-2 : Filtering logic
function filterLogic(n) {
    if (n % 2 == 0) {
        return true;
    } else {
        return false;
    }
}

const ans = arr.filter(filterLogic);
console.log(ans);


// We can also write it as :
const filteredArr = arr.filter(function (n) {
    if (n % 2 == 0) {
        return true;
    } else {
        return false;
    }
});

console.log(filteredArr);

// We can also write it as using Arrow Functions :
const filteredArr2 = arr.filter((n) => {
    if (n % 2 == 0) {
        return true;
    } else {
        return false;
    }
});

console.log(filteredArr2);


// Create a map fn that takes an input and a transform fn as input and
// returns the transformed array as output.