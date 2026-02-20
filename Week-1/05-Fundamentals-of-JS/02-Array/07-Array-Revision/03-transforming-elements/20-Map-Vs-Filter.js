let arr = [11, 16, 18, 17, 23, 42, 11, 37];

let mres = arr.map(v => v % 2 == 1);
let fres = arr.filter(v => v % 2 == 1);

// read the code of myMap and myFilter before predicting the answer
console.log(mres);  //t , f, f, t, t, f, t, t   (whether true or false sb values aaenge)
console.log(fres);  //11, 17, 23, 11, 37    (jitne true honge uske hi values bss aaenge)

/*
Output : Custom map and Custom Filter dekh k analyze krna h fir answer predict krna h -
[
  true,  false,
  false, true, 
  true,  false,
  true,  true
]
[ 11, 17, 23, 11, 37 ]
*/