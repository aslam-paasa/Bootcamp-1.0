/**
 * Challenge: Multistep Form with useReducer
 * Given the solution code to the previous "Multistep Form" challenge you
 * encountered earlier in the course, your job is to refactor the app to
 * use useReducer to manage state instead of useState.
 * 
 * Tasks:
 * 1. Enable a user to transition to the next step
 * 2. Enable a user to return to the previous step
 * 3. Keep track of the step and form state correctly
 * 4. Reset the form when the user submits it
 * 5. Use the useReducer hook to manage the component's state
 * 
 * Hint:
 * 1. Since we're refactoring to use the reducer pattern, we're going to 
 *    first need to combine both of our two state variables into one single
 *    object we'll manage. Let's do that first by updating the initialState
 *    object that has both our formData as well as our currentStep.
 * 
 *    const initialState = {
 *       currentStep: 1,
 *       formData: {
 *         name: "",
 *         email: "",
 *         address: "",
 *         city: "",
 *         zipcode: ""
 *       }
 *    };
 * 
 * 2. Now that we have our initialState, the next thing we need in order to
 *    invoke useReducer is out reducer fn. There will be four different 
 *    action types that can update the state of our reducer. next_step,
 *    prev_state, change and reset.
 * 
 *    function reducer(state, action) {
 *       if (action.type === "next_step") {
 *      
 *       } else if (action.type === "prev_step") {
 *      
 *       } else if (action.type === "change") {
 *      
 *       } else if (action.type === "reset") {
 *      
 *       } else {
 *         throw new Error("This action type isn't supported.")
 *       }
 *   }
 * 
 * 3. Now we need to build out our reducer.
 * 
 *    For the next_step and prev_step, we'll add update currentStep to be
 *    either one step higher or one step lower.
 * 
 *    change will accept two values: name and value, and will update the
 *    formData object with the new value for the given name.
 * 
 *    reset will simply return the initialState.
 * 
 *    function reducer(state, action) {
 *       if (action.type === "next_step") {
 *         return { ...state, currentStep: state.currentStep + 1 };
 *       } else if (action.type === "prev_step") {
 *         return { ...state, currentStep: state.currentStep - 1 };
 *       } else if (action.type === "change") {
 *         return {
 *           ...state,
 *           formData: { ...state.formData, [action.name]: action.value }
 *         };
 *       } else if (action.type === "reset") {
 *         return initialState;
 *       } else {
 *         throw new Error("This action type isn't supported.")
 *       }
 *     }
 * 
 * 4. Now all that's left is to invoke useReducer and correctly dispatch
 *    the type of actions that occur.
 * 
 *    function MultistepFormReducer() {
 *       const [state, dispatch] = React.useReducer(reducer, initialState);
 *      
 *       const handleNextStep = () => dispatch({ type: "next_step" });
 *       const handlePrevStep = () => dispatch({ type: "prev_step" });
 *      
 *       const handleChange = (e) => {
 *         dispatch({
 *           type: "change",
 *           name: e.target.name,
 *           value: e.target.value
 *         });
 *       };
 *      
 *       const handleSubmit = (e) => {
 *         e.preventDefault();
 *         alert("Thank you for your submission");
 *         dispatch({ type: "reset" });
 *       };
 *      
 *       .......
*/

import './App.css'

const initialState = {
  currentStep: 1,
  formData: {
    name: "",
    email: "",
    address: "",
    city: "",
    zipcode: ""
  }
};

function reducer(state, action) {
  if (action.type === "next_step") {
    return { ...state, currentStep: state.currentStep + 1 };
  } else if (action.type === "prev_step") {
    return { ...state, currentStep: state.currentStep - 1 };
  } else if (action.type === "change") {
    return {
      ...state,
      formData: { ...state.formData, [action.name]: action.value }
    };
  } else if (action.type === "reset") {
    return initialState;
  } else {
    throw new Error("This action type isn't supported.")
  }
}

function MultistepFormReducer() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleNextStep = () => dispatch({ type: "next_step" });
  const handlePrevStep = () => dispatch({ type: "prev_step" });

  const handleChange = (e) => {
    dispatch({
      type: "change",
      name: e.target.name,
      value: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your submission");
    dispatch({ type: "reset" });
  };

  const { currentStep, formData } = state;

  if (currentStep === 1) {
    return (
      <form onSubmit={handleSubmit}>
        <h2>Personal Information</h2>
        <div>
          <label>Step {currentStep} of 3</label>
          <progress value={currentStep} max={3} />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            required
            name="name"
            id="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            required
            name="email"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button type="button" className="secondary" onClick={handleNextStep}>
          Next
        </button>
      </form>
    );
  } else if (currentStep === 2) {
    return (
      <form onSubmit={handleSubmit}>
        <h2>Address</h2>
        <div>
          <label>Step {currentStep} of 3</label>
          <progress value={currentStep} max={3} />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            required
            name="address"
            id="address"
            type="address"
            placeholder="What is your address?"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            required
            name="city"
            id="city"
            placeholder="What city do you live in?"
            value={formData.city}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="zipcode">Zipcode</label>
          <input
            required
            name="zipcode"
            id="zipcode"
            type="number"
            placeholder="What is your zipcode?"
            value={formData.zipcode}
            onChange={handleChange}
          />
        </div>
        <div>
          <button className="secondary" type="button" onClick={handleNextStep}>
            Next
          </button>
          <button type="button" className="link" onClick={handlePrevStep}>
            Previous
          </button>
        </div>
      </form>
    );
  } else if (currentStep === 3) {
    return (
      <form onSubmit={handleSubmit}>
        <h2>Confirm your information:</h2>
        <div>
          <label>Step {currentStep} of 3</label>
          <progress value={currentStep} max={3} />
        </div>
        <table>
          <tbody>
            {Object.keys(formData).map((key) => {
              return (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{formData[key]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <button className="primary" type="submit">
            Submit
          </button>
          <button type="button" className="link" onClick={handlePrevStep}>
            Previous
          </button>
        </div>
      </form>
    );
  } else {
    return null;
  }
}

function App() {

  return (
    <div>
      <MultistepFormReducer />
    </div>
  )
}

export default App
