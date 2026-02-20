/**
 * Challenge-1: Setting Up Your Redux Project
 * Create a Redux store with a reducer and initial state.
 * You can use a simple counter reducer for this exercise.
*/

import { useSelector, useDispatch } from "react-redux";
export default function App() {
    let counter = useSelector((state) => state.counter);

    let dispatch = useDispatch();

    let handleClick = (type) => {
        dispatch({ type });
    };

    return (
        <div className="App">
            <div> Counter: {counter} </div>
            <button onClick={(e) => handleClick("add")}> add </button>
            <button onClick={(e) => handleClick("minus")}> minus </button>
        </div>
    );
}
