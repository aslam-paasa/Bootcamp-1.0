// useCallback():
// => If you want to memoize a function, we use callback.
// => But whatever useCallback provide us, we can do with useMemo() as well.

import { useCallback, useState, useState } from 'react';

function App() {
    const [exchange1Data, setExchange1Data] = useState({});
    const [exchange2Data, setExchange2Data] = useState({});
    const [bankData, setBankData] = useState({});


    useEffect(() => {
        // Some operation to get the data
        setExchange1Data({
            return: 100
        });
    }, []);

    useEffect(() => {
        // Some operation to get the data
        setExchange2Data({
            return: 100
        });
    }, []);

    useEffect(() => {
        // Some operation to get the data
        setTimeout(() => {
            setBankData({
                income: 100
            });
        }, 5000)
    }, []);


    // useEffect, useMemo
    const cryptoReturns = function () {
        return exchange1Data.returns + exchange2Data.returns;
    };

    const incomeTax = (cryptoReturns + bankData.income) * 0.3;

    return (
        <div>
            hi there, your income tax returns are {incomeTax}
        </div>
    )
}


// No useEffect, noMemo, just simple function
// What will happen during re-rendering?

const cryptoReturns = function () {
    return exchange1Data.returns + exchange2Data.returns;
};

const incomeTax = (cryptoReturns + bankData.income) * 0.3;


// => Across re-render this "cryptoReturns" will get called again, control
//    will reach here "exchange1Data.returns + exchange2Data.returns" again.
// => useCallback is not about minimizing the amount of code that is run.
// => useCallback is about not rendering a child component, if the function 
//    hasn't/doesn't need to change across renders.

return (
    <div>
        <CryptoGainsCalculator cryptoReturns={cryptoReturns} />
    </div>
)

// Child Component: Here we are only worried about how much crypto we gain in a year
function CryptoGainsCalculator({ cryptoReturns }) {
    console.log("Crypto Child re-rendered");
    return <div>
        Your crypto returns are {cryptoReturns}
    </div>
}

// => The child component accepts a function as an argument. When we call
//    this function, it will return the crypto gain of the year. But did
//    you notice there is a problem:



import { useCallback, useState, useState } from 'react';

function App() {
    const [exchange1Data, setExchange1Data] = useState({});
    const [exchange2Data, setExchange2Data] = useState({});
    const [bankData, setBankData] = useState({});


    useEffect(() => {
        // Some operation to get the data
        setExchange1Data({
            return: 100
        });
    }, []);

    useEffect(() => {
        // Some operation to get the data
        setExchange2Data({
            return: 100
        });
    }, []);

    useEffect(() => {
        // Some operation to get the data
        setTimeout(() => {
            setBankData({
                income: 100
            });
        }, 5000)
    }, []);


    // useEffect, useMemo
    const cryptoReturns = function () {
        return exchange1Data.returns + exchange2Data.returns;
    };

    const incomeTax = (cryptoReturns + bankData.income) * 0.3;

    return (
        <div>
            <CryptoGainsCalculator cryptoReturns={cryptoReturns} />
            <Dummy />
        </div>
    )
}

function CryptoGainsCalculator({ cryptoReturns }) {
    console.log("Crypto Child re-rendered");
    return <div>
        Your crypto returns are {cryptoReturns}
    </div>
}

function Dummy() {
    return <div>
        hi
    </div>
}

export default App;


// Q) After 5 second when I reset the bankData and this component re-renders.
//    Does the child componenet i.e. "CryptoGainsCalculator" re-render we will?
// => Yes!, Console: "crypto child re-rendered"
// => If a parent component re-renders, all of its child components also
//    re-render, uska child will also re-render, irrespective of if the 
//    props have been changed.
// => Even if there is "dummy component" which doesn't accept any input or
//    state variable, but if the parent re-renders then the dummy also 
//    re-renders.
// => This is how react works. If parent re-renders then child also re-renders
//    until we introduced "memo" which is different from "useMemo()".
// (a) useMemo() is a hook which make sure that certain code base only runs
//     if some dependency have changed in a re-render.
// (b) "memo" let's us skip re-rendering a component when its props are
//     unchanged.

return (
    <div>
        <CryptoGainsCalculator cryptoReturns={cryptoReturns} />
        <Dummy />
    </div>
)

// => Here "dummy component" re-rendering even though its props haven't changed
//    across re-renders.
// => Similarly, "CryptoGainsCalculator" is taking in a function as an input
//    functions don't change (the same function read theoretically).
// => Then these two doesn't re-render as long as I use "memo". 


import { useCallback, useState, useState, memo } from 'react';

function App() {
    const [exchange1Data, setExchange1Data] = useState({});
    const [exchange2Data, setExchange2Data] = useState({});
    const [bankData, setBankData] = useState({});


    useEffect(() => {
        // Some operation to get the data
        setExchange1Data({
            return: 100
        });
    }, []);

    useEffect(() => {
        // Some operation to get the data
        setExchange2Data({
            return: 100
        });
    }, []);

    useEffect(() => {
        // Some operation to get the data
        setTimeout(() => {
            setBankData({
                income: 100
            });
        }, 5000)
    }, []);


    // useEffect, useMemo
    const cryptoReturns = function () {
        return exchange1Data.returns + exchange2Data.returns;
    };

    const incomeTax = (cryptoReturns + bankData.income) * 0.3;

    return (
        <div>
            <CryptoGainsCalculator cryptoReturns={cryptoReturns} />
            <Dummy />
        </div>
    )
}

// This should only change when the input prop changes
const CryptoGainsCalculator = memo (function({ cryptoReturns }) {
    console.log("Crypto Child re-rendered");
    return <div>
        Your crypto returns are {cryptoReturns}
    </div>
})

// Only re-render this function if an input to the function changes which for
// dummy it will never happen which means it will only render once.
const Dummy = memo(function() {
    return <div>
        hi
    </div>
})




// => This function looks the same, doesn't change between re-renders 
//    specifically the last re-render i.e. 
useEffect(() => {
    // Some operation to get the data
    setTimeout(() => {
        setBankData({
            income: 100
        });
    }, 5000)
}, []);

// => And so this should not re-render, because the function that is going
//    in is same, so this should not re-render after 5 seconds:
<CryptoGainsCalculator cryptoReturns={cryptoReturns} />

// => This should not change after 5 second because we have memo here:
const CryptoGainsCalculator = memo (function({ cryptoReturns }) {
    console.log("Crypto Child re-rendered");
    return <div>
        Your crypto returns are {cryptoReturns}
    </div>
})

// => Let's see if that happens or not:
// => After 5 seconds: "crypto child re-rendered".

// If the parent render, child render as well. We have said it doesn't matter
// if the parent renders, if the props that has been passed has changes then
// this child component will re-render. But if the props that has been 
// passed to child component doesn't change then this child component will
// not re-render. That is what memo let's us do

// Q) Why did this re-rendered even?
// Q) Why does this printed, even though the input that we sending him looks
//    the same, hasn't really changed across re-renders or has it?
// => If we ever define a function like this across re-renders, it will change
//    because how does react know ki something has changed? :

const cryptoReturn = function () {
    return exchange1Data.returns + exchange2Data.returns;
};

// => It will just be like pehle "cryptoReturns" turned into something, and
//    now it is this. So, we will check LHS=RHS.

function a() {
    console.log("hi");
}

function b() {
    console.log("hi");
}

// => Both of these functions does the exact same thing. And if we do a==b
//    it says false, even though the functions are exactly the same but
//    they are not equal because they are referentially not equal.
console.log(a == b); // false

// => If I do this, it is true, but functions are never equal even if their
//    bodies is the same.
const x = 1;
const y = 1;
console.log(x == y);

// => Thats is why react doesn't understand that "cryptoReturns" hasn't 
//    changed across re-render and this is where "useCallback" comes into 
//    the picture.
// => "useCallback" says if you do want to tell me my function hasn't 
//    changed across re-render, please wrap that function inside callback,
//    give me the dependency, when either exchange1Data or exchange2Data 
//    changes is when this "cryptoReturns" function will actually change
//    because this function does depend on "exchange1Data & exchange2Data".
//    But if "bankData" changes then this function doesn't need to change.
//    This is the benefit of using "useCallback".
// => Notice: This "cryptoReturns" store a function which will still get called
//    When we were using "useMemo" the thing on the left i.e. "cryptoReturns"
//    got a value, but if we use callback, then thing on the left get
//    the "whole function", only it referentially changes if "exchange1Data"
//    or "exchange2Data" dependency changes, Which gives us the benefit of
//    not re-rendering the child if the dependency of that function hasn't
//    changed.

const cryptoReturnsss = function () {
    return exchange1Data.returns + exchange2Data.returns;
};