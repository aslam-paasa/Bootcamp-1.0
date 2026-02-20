/**
 * Function with discriminated unions:
 * 
 * type Type1 = {
 *    ***
 *    ***
 * }
 * 
 * type Type2 = {
 *    ***
 *    ***
 * };
 * 
 * type Type3 = Type1 | Type2;
 * 
 * function functionName(parameter: Type3): functionReturnType {}
*/

/**
 * Q. Define a function getArea that takes a parameter shape with a
 *    discriminated union type. The shape can be either a circle or
 *    a rectangle. If it's a circle, the function should calculate and
 *    return the area of the circle using the formula n*radius^2. If it's
 *    a rectangle, it should calculate and return the area using the
 *    formula length * width.
 * 
 * Note: Defining our own custom types. If there are two types and both
 *       the types have same key and we put them in an or(|) then that
 *       or(|) becomes a discriminated union.
*/

type Circle = {
    kind: "circle";
    radius: number;
};

type Rectangle = {
    kind: "rectangle";
    length: number;
    width: number;
};

type Shape = Circle | Rectangle;

function getArea(shape: Shape): number {
    if(shape.kind === "circle") {
        return Math.PI * shape.radius ** 2;
    } else {
        return shape.length * shape.width;
    }
}

console.log("Area of the Circle is ", getArea({ kind: "circle", radius: 22 }));
console.log("Area of the Rectangle is ", getArea({ kind: "rectangle", length: 5, width: 5 }));
