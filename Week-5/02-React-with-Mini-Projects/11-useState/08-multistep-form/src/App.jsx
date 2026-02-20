/**
 * Challenge: Multistep Form
 * In this challenge, you're given a multistep for getting data from the
 * user. With the JSX already in place, update the component's state and
 * functions in order to allow the user to progress through the form,
 * updating the state as necessary.
 * 
 * Tasks:
 * 1. Allow the user to transition to the next step
 * 2. Allow the user to return to the previous step
 * 3. Update the 'formData' as the user progresses through the form
 * 4. When finished, submit the form and reset the component's state
 * 
 * Hint:
 * 1. We want to persist 'formData' across different renders of the 
 *    'MultiStepForm'. Therefore, we'll need to store it as component
 *    state using useState.
 * 
 *    const [formData, setFormData] = useState({
 *       name: "",
 *       email: "",
 *       address: "",
 *       city: "",
 *       zipcode: ""
 *    });
 * 
 * 2. Since 'currentStep' is what allows us to dynamically show or hide
 *    different sections of our form, we'll want to store it as component
 *    state as well and update it whenever 'handleNextStep' or
 *    'handlePreviousStep' are called.
 * 
 *    const [currentStep, setCurrentStep] = useState(1);
 * 
 *    ...
 * 
 *    const handleNextStep = () => {
 *      setCurrentStep(currentStep + 1);
 *    };
 * 
 *    const handlePreviousStep = () => {
 *      setCurrentStep(currentStep - 1);
 *    };
 * 
 * 3. We can encapsulate all the logic for updating our 'formData' state
 *    into our 'handleChange' function. You can use the 'name' attrbute
 *    on the input elements to determine which property of 'formData' to
 *    update.
 * 
 *    const handleChange = (e) => {
 *       setFormData({
 *         ...formData,
 *         [e.target.name]: e.target.value
 *       });
 *    }; 
 * 
 *    Remember, since 'formData' is an object, we need to use the spread
 *    operator to copy over all the existing properties and values before
 *    updating the one that changed.
 * 
 * 4. When the user submits the form, we want to reset 'formData' and
 *    'currentStep' back to their initial values.
 * 
 *    const handleSubmit = (e) => {
 *      e.preventDefault();
 *      alert("Thank you for your submission!");
 *      setCurrentStep(1);
 *      setFormData(initialFormData);
 *    };
 * 
 *    Also, don't forget to call 'preventDefault' when the form is submitted
 *    to prevent the page from submitting the form and reloading.
*/

import './App.css'
import { useState } from 'react'


const initialFormData = {
  name: "",
  email: "",
  address: "",
  city: "",
  zipcode: ""
};


function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your submission");
    setCurrentStep(1);
    setFormData(initialFormData);
  };

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
      <MultiStepForm />
    </div>
  )
}

export default App
