var h5 = document.querySelector("h5");
var button = document.querySelector("button");

var flag = 0;

button.addEventListener("click", function () {
    if (flag === 0) {
        h5.innerHTML = "Friend";
        h5.style.color = "green";
        button.innerHTML = "Remove Friend";
        flag = 1;
    } else {
        h5.innerHTML = "Stranger";
        h5.style.color = "red";
        button.innerHTML = "Add Friend";
        flag = 0;
    }
});

