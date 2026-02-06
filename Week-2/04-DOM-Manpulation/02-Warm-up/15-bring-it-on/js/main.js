/**
 * Q. Bonus can you make it print '21' 21 times to the dom?
*/
function savege21() {
    for(let i = 0; i < 21; i++) {
        document.querySelector("#savageSays").innerText += " 21 ";
    }
}
savege21();