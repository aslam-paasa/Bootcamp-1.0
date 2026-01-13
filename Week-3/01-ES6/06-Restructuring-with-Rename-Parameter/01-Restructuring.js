// Restructuring With Rename Parameters :
// => In the "destructExample" function, the "a" and "b" properties are
//    renamed to "aaloo" and "bhaaloo", using the destructuring assignment
//    syntax. However, in the commented-out "console.log(a,b)" statement,
//    "a" and "b" are used instead of "aaloo" and "bhaaloo", which will give
//    an error.
// => Since, "a" and "b" are not defined in the function, the code will
//    throw a ReferenceError when trying to access those variables in the
//    commented-out line.


// Will we get an error?
const destructExample = ({ a: aaloo, b: bhaaloo }) => {
    // console.log(a,b);
    console.log(aaloo, bhaaloo);
}
const obj = { a: 1, b: 2 }
destructExample(obj);

