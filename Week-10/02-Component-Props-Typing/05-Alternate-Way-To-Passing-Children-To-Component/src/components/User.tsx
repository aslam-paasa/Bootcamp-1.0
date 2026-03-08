/**
 * Approach-2: React Component ko Type karne ka ek aur tarika
 * 
 * 1. FC (Function Component) type React se import kiya jata hai
 *    - FC ek generic type hai jo component props ko define karta hai
 * 
 * 2. Interface banaya gaya hai 'Shape' naam se:
 *    - name: string type ka prop
 *    - age: number type ka prop  
 *    - isStudent: boolean type ka prop
 * 
 * 3. Component declaration:
 *    - User component ko FC type diya gaya hai
 *    - FC ke andar Shape interface pass kiya gaya hai: FC<Shape>
 *    - Props ko destructure kiya gaya hai
 * 
 * 4. Component JSX return karta hai:
 *    - article tag ke andar teen h1 tags hain
 *    - har h1 tag ek prop ki value display karta hai
*/

import { FC } from "react";

interface Shape {
  name: string;
  age: number;
  isStudent: boolean;
}

const User: FC<Shape> = ({ name, age, isStudent }) => {
  return (
    <article>
      <h1>{name}</h1>
      <h1>{age}</h1>
      <h1>{isStudent}</h1>
    </article>
  );
};

export default User;