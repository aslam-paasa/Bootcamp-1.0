// write code of Custom Flat
Array.prototype.myFlat = function(td){
    let oarr = this;
    let res = [];

    customFlat(oarr, td, res);

    return res;
}

function customFlat(node, td, res){
    if(Array.isArray(node)){
        if(td > 0){
            for(let i = 0; i < node.length; i++){
                customFlat(node[i], td - 1, res);
            }
        } else {
            for(let i = 0; i < node.length; i++){
                res.push(node[i]);
            }   
        }
    } else {
        res.push(node);
    }
}


let arr = [10, 20, [30, [50, [70, 80, 90], 60], 40], 100, [120, [150, [170, 180, 190], 160], 140, 200], 110];

let res1 = arr.flat(0);
// [10, 20, [ 30, [ 50, [Array], 60 ], 40 ], 100, [ 120, [ 150, [Array], 160 ], 140, 200 ], 110]

let res2 = arr.flat(1);
// [10, 20, 30, [ 50, [ 70, 80, 90 ], 60 ], 40, 100, 120, [ 150, [ 170, 180, 190 ], 160 ], 140, 200, 110  ]

let res3 = arr.flat(2);
// [10, 20, 30, 50, [ 70, 80, 90 ], 60, 40, 100, 120, 150, [ 170, 180, 190 ], 160, 140, 200, 110]

let res4 = arr.flat(3);
// [10,  20,  30,  50,  70,  80,  90,  60,  40, 100, 120, 150, 170, 180, 190, 160, 140, 200, 110]

console.log(res1);
console.log(res2);
console.log(res3);
console.log(res4);

// (converts multidimensional array to single dimension)
let res5 = arr.flat(Infinity);
console.log(res5);
// [10,  20,  30,  50,  70,  80,  90,  60,  40, 100, 120, 150, 170, 180, 190, 160, 140, 200, 110]