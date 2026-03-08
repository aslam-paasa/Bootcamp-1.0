/**
 * Types:
*/

type TypeA = { propA: number };
const objectA: TypeA = { propA: 22 };

type TypeB = { propB: string };
const objectB: TypeB = { propB: "tanay" };

/**
 * Intersection: ('&')
 * If TypeC is an intersection of TypeA and TypeB, then all the common
 * properties of TypeA and TypeB are mandatory in TypeC i.e.
 * (a) propA
 * (b) propB
 */
type TypeC = TypeA & TypeB;
const objectC: TypeC = { propA: 33, propB: "aslam" };


/**
 * Union: OR ('|')
 * => let variableName: type1 | type2;
 * Not mandatory
*/
type TypeD = TypeA | TypeB;
const objectD: TypeD = { propB: "neha" };