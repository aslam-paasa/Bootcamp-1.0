function promisifiedFunction(duration) {
    const p = new Promise(function (resolve) {
        setTimeout(function () {
            resolve
        }, duration)
    });
    return p;
}

const ans = promisifiedFunction(1000)
ans.then(() => {
    console.log('Timeout is done');
})

fs.readFile('a.text', 'utf-8').then((err, data) => {

})