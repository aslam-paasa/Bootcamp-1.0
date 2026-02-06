var btn = document.querySelector("button");
var percent = document.querySelector("#percent");
var growth = document.querySelector("#growth");

var grow = 0;

/**
 * 1. We have written 50ms because we want to increase the progress bar by
 *    1% every 50ms.
 * 2. We have written 5000ms because we want to show the progress bar for 
 *    5 seconds.
*/
btn.addEventListener("click", function() {
    var int = setInterval(() => {
        console.log(grow);
        grow++;
        percent.innerHTML = grow + "%";
        growth.style.width = grow + "%";
    }, 50);

    setTimeout(() => {
        clearInterval(int);
        btn.innerHTML = "Downloaded";
        btn.style.opacity = "0.5";
        btn.style.cursor = "not-allowed";
    }, 5000);
});
