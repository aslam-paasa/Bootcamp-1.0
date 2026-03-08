function square(n) {
    return n * n;
}

function cube(n) {
    return n * n * n;
}

function sumOfSomething(a, b, callback) {
    console.log(callback);
    const val1 = callback(a);
    const val2 = callback(b);

    const finalValue = val1 + val2;
    console.log(finalValue);
}

sumOfSomething(2, 3, square);
sumOfSomething(3, 4, cube);
