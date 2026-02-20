// How we can use async function along with await?
// Async and await combo is used to handle promises. 

// Q) But before async-await how we use to handle promises?
// Q) Why do we need async-await?

// Handling promises before async-await :
const p = new Promise((resolve, reject) => {
    resolve("Promise Resolved Value!!");
});
function getData() {
    p.then(res => console.log(res)); // Promise Resolved Value!!
}

getData(); 


// Handling promises after async-await :
// We will have to use "await" keyword in front of the promise to handle promises
// With "await" keyword, this "p" promise is resolved and data will come into
// a constant variable called "val".
async function handlePromise() {
    const val = await p;
    console.log(val); // Promise Resolved Value!!
}
handlePromise(); 

// "await" is a keyword that can only be used only inside an "async" function.