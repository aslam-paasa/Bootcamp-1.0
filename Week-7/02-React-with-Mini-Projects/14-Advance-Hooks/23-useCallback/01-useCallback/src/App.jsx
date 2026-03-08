/**
 * Performance Optimization:
 * 1. React.memo
 * 2. useCallback Hook
 * 
*/ 
/**
 * Performance Issue: 
 * - Iss Code m humein ye check krna hai ki humara kn sa component kitni
 *   baar render ho rha hai.
 * - Yha par jo performance kharab hoti hai ya optimize nhi hoti, wo
 *   in terms of rendering hoti hai. 
 * - Koi v component render kb hoti hai? Jb usme state change ho rhi ho.
 *   Aur re-render means uss component k start se le k end tk saara code
 *   dobara chalega, aur iss process m time lgta hai, aur yhi time
 *   humaare performance ka issue bnta hai.
 * 
 * Example of Performance Issue:
 * function App() {
 *   const [age, setAge] = useState(18);
 *   const [salary, setSalary] = useState(2000);
 *   const [fee, setFee] = useState(5000);
 * 
 *   const updateAgeHandler = () => {
 *     setAge(age + 1); 
 *   }
 * 
 *   const updateSalaryHandler = () => {
 *     setSalary(salary + 1);
 *   }
 * 
 *   const updateCourseHandler = () => {
 *     setFee(fee+1);
 *   }
 * 
 *   return (
 *     <div>
 *       <h1>Bio Data</h1>
 *       <DisplayAge age={age} updateAgeHandler={updateAgeHandler} />
 *       <DisplaySalary salary={salary} updateSalaryHandler={updateSalaryHandler} />
 *       <h2>Course Fee:- {fee}</h2>
 *       <button onClick={updateCourseHandler}>Click to Update Your Fee</button>
 *     </div>
 *   )
 * }
 * 
 * 
 * function DisplayAge(props) {
 *   const { age, updateAgeHandler } = props;
 *   console.log("I AM DISPLAY AGE");
 *   
 *   return (
 *     <div>
 *       <h3>Age:- {age}</h3>
 *       <button onClick={updateAgeHandler}>Click to Update Age</button>
 *     </div>
 *   )
 * }
 *
 * 
 * function DisplaySalary(props) {
 *   const { salary, updateSalaryHandler } = props;
 *   console.log("I AM DISPLAY SALARY");
 *
 *
 *   return (
 *     <div>
 *       <h3>Salary:- {salary}</h3>
 *       <button onClick={updateSalaryHandler}>Click to Update Salary</button>
 *     </div>
 *   )
 * }
 * 
 * 
 * Checking kn sa component kitni baar re-render ho rha?
 * 1. First render:
 *    a. I AM APP
 *    b. I AM DISPLAY AGE
 *    c. I AM DISPLAY SALARY
 * 2. Click to Update Age
 *    a. I AM APP
 *    b. I AM DISPLAY AGE
 *    c. I AM DISPLAY SALARY
 * 2. Click to Update Salary
 *    a. I AM APP
 *    b. I AM DISPLAY AGE
 *    c. I AM DISPLAY SALARY
 * 
 * Expectation: [Optmized]
 * 1. Click to Update Age
 *    - I AM DISPLAY AGE
 * 2. Click to Update Salary
 *    - I AM DISPLAY SALARY
*/


/** 
 * Soln: HOF (Higher Order Component) - React.memo 
 * - React.memo is Higher Order Component that helps optimize our
 *   React Apps by preventing unnecessary re-renders of a component.
 * - When we wrap a component with React.memo, React will remember
 *   (memoize) the output of that component.
 * 
 * Q. How it React.memo works?
 * Q. Aisa kya hai ki Name Component pe kaam kr rha but Age & Salary
 *    Component pe kaam ni kr rha?
 *  - Name k andr sirf name ka state as a parameter/props jaa rha hai.
 *  - Age & Salary m state k saath saath setState v jaa rha i.e. a fn
 *    jo state ko update kr rha hai. But agar state & setState fn, 
 *    dono prop hai to aisa kya ho rha ki setState fn k re-render hone
 *    se Component re-render ho rha hai?
 *  - JS m humne pdha tha ki 2 tarah ki datatypes hoti hai:
 *    a. Primitive [integer, boolean, string, null, undefined]
 *    b. Reference [Fn, Object, Reference]
 *  - Component m hm fn ko prop bhej rhe hai, aur fn reference type
 *    hota hai. First time jb saare component render ho rha to saare
 *    fn ko apna apna ek reference(unique key) assign ho gya, jisse
 *    hm usse denote kr rhe. Ab jb maine updateName() button pe click
 *    kiya to App Component re-render ho rha, means jitne v components
 *    the wo saare dobara se chl rhe, aur App Component m jitne v
 *    fns the wo dobara se chl rhe. Aur jb ye fns dobara se chl rhe to
 *    inka reference dobara se bn rha, aur fir mera new reference as a
 *    prop paas ho rha. 
 *  - React.memo usi first time wale reference ko preserve kr liya hai
 *    aur agar reference m koi change aaya hai to re-render krta hai,
 *    otherwise re-render ni krta hai. But ye case name state k saath
 *    nhi ho rha qki name state ek primitive type hai, jo reference
 *    create ni krta. Isliye React.memo() state k case m dobara render
 *    ni krta.
 *  - In Short, memo check krta hai ki previous k comparison m koi change
 *    aaya h ya nhi. Agar koi change aaya hai to React.memo sirf App 
 *    Component m sirf uske updated child ko rerender krega aur baaki 
 *    components ko as it is rkhega.
 *  - Ye Approach performance ko better bnata hai qki sirf zaroori
 *    components ko hi render krta hai, aur isse app ki speed aur
 *    efficiency improve hoti hai.
 * 
 * function App() {
 *   const [name, setName] = useState("Ahmed");
 *   const [age, setAge] = useState(18);
 *   const [salary, setSalary] = useState(2000);
 * 
 *   const updateAgeHandler = () => {
 *     setAge(age + 1); 
 *   }
 *
 *   const updateSalaryHandler = () => {
 *     setSalary(salary + 1);
 *   }
 *
 *   const updateNameHandler = () => {
 *      setName("Mohammad");
 *   }
 *
 *   return (
 *     <div>
 *       <h1>Bio Data</h1>
 *       <DisplayName name={name} />
 *       <button onClick={updateNameHandler}>Click To Update Name</button>
 *       <DisplayAge age={age} updateAgeHandler={updateAgeHandler} />
 *       <DisplaySalary salary={salary} updateSalaryHandler={updateSalaryHandler} />
 *    </div>
 *   )
 *  }
 * 
 *  const DisplayName = memo(function DisplayName(props) {
 *   const { name } = props;
 *   return (
 *     <div>Name:- {name}</div>
 *   )
 *  })
 *
 *
 *  function DisplayAge(props) {
 *   const { age, updateAgeHandler } = props;
 *   console.log("I AM DISPLAY AGE");
 * 
 *   return (
 *     <div>
 *       <h3>Age:- {age}</h3>
 *       <button onClick={updateAgeHandler}>Click to Update Age</button>
 *     </div>
 *   )
 *  }
 *
 *  function DisplaySalary(props) {
 *    const { salary, updateSalaryHandler } = props;
 *    console.log("I AM DISPLAY SALARY");
 * 
 *
 *    return (
 *      <div>
 *        <h3>Salary:- {salary}</h3>
 *        <button onClick={updateSalaryHandler}>Click to Update Salary</button>
 *      </div>
 *    )
 *  }
 * 
 * Output:
 * 1. App render:
 *    a. I AM APP
 *    b. I AM DISPLAY AGE
 *    c. I AM DISPLAY SALARY
 * 2. Click to Update Name
 *    a. I AM APP             => React.memo - Working
 * 2. Click to Update Age
 *    a. I AM APP
 *    b. I AM DISPLAY AGE
 *    c. I AM DISPLAY SALARY
 * 2. Click to Update Salary
 *    a. I AM APP
 *    b. I AM DISPLAY AGE
 *    c. I AM DISPLAY SALARY
*/


/** 
 * Issue:
 * function App() {
 *   const [name, setName] = useState("Ahmed");
 *   const [age, setAge] = useState(18);
 *   const [salary, setSalary] = useState(2000);
 * 
 *   const updateAgeHandler = () => {
 *     setAge(age + 1); 
 *   }
 *
 *   const updateSalaryHandler = () => {
 *     setSalary(salary + 1);
 *   }
 *
 *   const updateNameHandler = () => {
 *      setName("Mohammad");
 *   }
 *
 *   return (
 *     <div>
 *       <h1>Bio Data</h1>
 *       <DisplayName name={name} />
 *       <button onClick={updateNameHandler}>Click To Update Name</button>
 *       <DisplayAge age={age} updateAgeHandler={updateAgeHandler} />
 *       <DisplaySalary salary={salary} updateSalaryHandler={updateSalaryHandler} />
 *    </div>
 *   )
 *  }
 * 
 *  const DisplayName = memo(function DisplayName(props) {
 *   const { name } = props;
 *   return (
 *     <div>Name:- {name}</div>
 *   )
 *  })
 *
 *
 *  const DisplayAge = memo(function DisplayAge(props) {
 *   const { age, updateAgeHandler } = props;
 *   console.log("I AM DISPLAY AGE");
 * 
 *   return (
 *     <div>
 *       <h3>Age:- {age}</h3>
 *       <button onClick={updateAgeHandler}>Click to Update Age</button>
 *     </div>
 *   )
 *  })
 *
 *  const DisplaySalary = memo(function DisplaySalary(props) {
 *    const { salary, updateSalaryHandler } = props;
 *    console.log("I AM DISPLAY SALARY");
 * 
 *
 *    return (
 *      <div>
 *        <h3>Salary:- {salary}</h3>
 *        <button onClick={updateSalaryHandler}>Click to Update Salary</button>
 *      </div>
 *    )
 *  })
 * 
 * Q. We have applied React.memo to DisplayAge & DisplaySalary Component.
 *    State is working as per our expectations, but setState fns are
 *    recreating whenever our component re-renders. How to stop them 
 *    from re-rendering these functions?
 * 
 * Solution: useCallback Hook
 *  - To memoize functions.
 *  - Apne paas record ko preserve kr leta hai, aur iss waqt tk uss
 *    chij ko dobara se create hone nhi dega jbtk hm bataenge nhi.
 *    but how?
 * - Wrap the fns inside useCallback() Hook.
 * 
 * - useCallback is quite similar to useEffect. It takes:
 *   a. callback fn
 *   b. dependency array
 *      - Empty array rkhne pe sirf first time create hoga jb Component
 *        render hoga. Means jb hm updateName pe click krnge to sirf
 *        ek baar update krega.
 *      - Pass name in dependency array, jisse jb jb name m change ho
 *        tb tb chlna hai, otherwise nhi chlna hai.
 * 
 * function App() {
 *   const [name, setName] = useState("Ahmed");
 *   const [age, setAge] = useState(18);
 *   const [salary, setSalary] = useState(2000);
 * 
 *   const updateAgeHandler = useCallback(() => {
 *     setAge(age + 1); 
 *   }, [age])
 *
 *   const updateSalaryHandler = useCallback(() => {
 *     setSalary(salary + 1);
 *   }, [salary])
 *
 *   const updateNameHandler = useCallback(() => {
 *      setName("Mohammad");
 *   }, [name])
 *
 *   return (
 *     <div>
 *       <h1>Bio Data</h1>
 *       <DisplayName name={name} />
 *       <button onClick={updateNameHandler}>Click To Update Name</button>
 *       <DisplayAge age={age} updateAgeHandler={updateAgeHandler} />
 *       <DisplaySalary salary={salary} updateSalaryHandler={updateSalaryHandler} />
 *    </div>
 *   )
 *  }
 * 
 *  const DisplayName = memo(function DisplayName(props) {
 *   const { name } = props;
 *   return (
 *     <div>Name:- {name}</div>
 *   )
 *  })
 *
 *
 *  const DisplayAge = memo(function DisplayAge(props) {
 *   const { age, updateAgeHandler } = props;
 *   console.log("I AM DISPLAY AGE");
 * 
 *   return (
 *     <div>
 *       <h3>Age:- {age}</h3>
 *       <button onClick={updateAgeHandler}>Click to Update Age</button>
 *     </div>
 *   )
 *  })
 *
 *  const DisplaySalary = memo(function DisplaySalary(props) {
 *    const { salary, updateSalaryHandler } = props;
 *    console.log("I AM DISPLAY SALARY");
 * 
 *
 *    return (
 *      <div>
 *        <h3>Salary:- {salary}</h3>
 *        <button onClick={updateSalaryHandler}>Click to Update Salary</button>
 *      </div>
 *    )
 *  })
 * 
 * Output:
 * Output:
 * 1. First time App render:
 *    a. I AM APP
 *    b. I AM DISPLAY AGE
 *    c. I AM DISPLAY SALARY
 * 2. Click to Update Name
 *    a. I AM APP 
 * 3. Click to Update Age
 *    a. I AM APP
 *    b. I AM DISPLAY AGE
 * 4. Click to Update Salary
 *    a. I AM APP
 *    b. I AM DISPLAY SALARY
 * 
 * Note: This React.memo & useCallback Hook optimizes the performance
 *       of our App.
*/

import { useState, memo, useCallback } from 'react';

function App() {
  console.log("I AM APP");
  
  const [name, setName] = useState("Ahmed");
  const [age, setAge] = useState(18);
  const [salary, setSalary] = useState(2000);

  const updateAgeHandler = useCallback(() => {
    setAge(age + 1); 
  }, [age])

  const updateSalaryHandler = useCallback(() => {
    setSalary(salary + 1);
  }, [salary])

  const updateNameHandler = useCallback(() => {
    setName("Mohammad");
  }, [name])

  return (
    <div>
      <h1>Bio Data</h1>
      <DisplayName name={name} />
      <button onClick={updateNameHandler}>Click To Update Name</button>
      <DisplayAge age={age} updateAgeHandler={updateAgeHandler} />
      <DisplaySalary salary={salary} updateSalaryHandler={updateSalaryHandler} />
    </div>
  )
}

const DisplayName = memo(function DisplayName(props) {
  const { name } = props;
  return (
    <div>Name:- {name}</div>
  )
})


const DisplayAge = memo(function DisplayAge(props) {
  const { age, updateAgeHandler } = props;
  console.log("I AM DISPLAY AGE");
  
  return (
    <div>
      <h3>Age:- {age}</h3>
      <button onClick={updateAgeHandler}>Click to Update Age</button>
    </div>
  )
})

const DisplaySalary = memo(function DisplaySalary(props) {
  const { salary, updateSalaryHandler } = props;
  console.log("I AM DISPLAY SALARY");
  

  return (
    <div>
      <h3>Salary:- {salary}</h3>
      <button onClick={updateSalaryHandler}>Click to Update Salary</button>
    </div>
  )
})

export default App
