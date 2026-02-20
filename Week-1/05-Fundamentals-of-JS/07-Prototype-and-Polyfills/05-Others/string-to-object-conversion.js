/**
 * String to Object Conversion:
 * Input : a.b.c.d.e 
 * Output: {a: {b: {c: {d: e}}}};
 *        [Last character is added as value]
*/

const inputString = 'a.b.c.d.e';

function unpack(str) {
    const parts = str.split('.');
    const lastPart = parts.pop();

    return parts.reduceRight(function (acc, next) {
        return { [next]: acc };
    }, lastPart);
}




function pack(obj) {
    let result = '';

    while (typeof obj === 'object' && obj !== null) {
        const key = Object.keys(obj)[0];
        result += key + '.';
        obj = obj[key];
    }

    result += obj; // Add the final value
    return result;
}



const newObj = unpack(inputString);
console.log("Unpacked Object:", newObj);  // ✅ Output object

const packedStr = pack(newObj);
console.log("Packed String:", packedStr); // ✅ Should be "a.b.c.d.e"