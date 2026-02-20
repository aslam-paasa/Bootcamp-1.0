/**
 * Challenge: Form Builder
 * In this challenge, we're going to get meta and build a form builder.
 * It looks complex, but with the JSX already in place, your primary job
 * is to manage the 'formFields' array. The user will need to be able to
 * add items to it, update items in it, and remove items from it.
 * 
 * All of the functions with their parameters are in place, you'll just
 * need to examine the JSX and update each accordingly.
 * 
 * Tasks:
 * 1. Allow users to add a form field
 * 2. Allow users to delete form fields
 * 3. Allow users to update form field values
 * 4. Allow users to submit the dynamic form with the new values
 * 
 * Hint:
 * 1. Since we need to persist our 'formFields' array across different
 *    renders of 'FormBuilder', we'll update it to be a piece of React
 *    state using 'useState'. 
 * 
 *    const [formFields, setFormFields] = useState([]);
 * 
 * 2. Since 'formFields' is an array, when we update it, we want to make
 *    sure we're passing it an array with the new value, after we've spread
 *    all the existing values into it.
 * 
 *    const handleAddFormField = (e) => {
 *       e.preventDefault();
 *       const formData = new FormData(e.target);
 * 
 *       const newField = {
 *          id: new Date().getTime(),
 *          type: formData.get('type'),
 *          label: formData.get('label'),
 *          placeholder: formData.get('placeholder'),
 *          required: formData.get('required'),
 *          value: ""
 *       };
 * 
 *       setFormFields([...formFields, newField]);
 *       e.target.reset();
 *    };
 * 
 *    Also be sure to call 'preventDefault' on the event object as well
 *    as 'reset' on the form element.
 * 
 * 3. To delete an element from an array, we can use JavaScript's filter
 *    method.
 * 
 *    We'll filter out the element with the 'id' that matches the argument
 *    that's passed to the 'handleDeleteFormField'. 
 * 
 *    const handleDeleteFormField = (id) => {
 *       const updatedFormFields = formFields.filter(field => field.id !== id);
 *       setFormFields(updatedFormFields);
 *    };
 * 
 * 4. To update an element, use JavaScript's map method to create a new
 *    array, updating the specific element where appropriate. 
 * 
 *    Mapping over our formFields, whenever the 'id' matches the first
 *    argument passed to handleUpdateFormField, we'll update that value
 *    by spreading the existing fields into a new object, and then spreading
 *    the updatedField object into it as well - creating the new object
 *    with the updated values.
 * 
 *    const handleUpdateFormField = (id, updatedField) => {
 *       const updatedFormFields = formFields.map(field => 
 *          field.id === id ? { ...field, ...updatedField } : field
 *       );
 *       setFormFields(updatedFormFields);
 *    };
 * 
 * 
*/

import './App.css'
import { useState } from 'react';

function FormBuilder() {
  const [formFields, setFormFields] = useState([]);

  const handleAddFormField = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newField = {
      id: new Date().getTime(),
      type: formData.get("type"),
      label: formData.get("label"),
      placeholder: formData.get("placeholder"),
      required: formData.get("required"),
      value: ""
    };

    setFormFields([...formFields, newField]);
    e.target.reset();
  };

  const handleUpdateFormField = (id, updatedField) => {
    const updatedFormFields = formFields.map((field) =>
      field.id === id ? { ...field, ...updatedField } : field
    );
    setFormFields(updatedFormFields);
  };

  const handleDeleteFormField = (id) => {
    const updatedFormFields = formFields.filter((field) => field.id !== id);
    setFormFields(updatedFormFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(formFields, null, 2));
  };

  return (
    <div>
      <h1>Form Builder</h1>
      <form id="form-builder" onSubmit={handleAddFormField}>
        <fieldset>
          <legend>Add a field</legend>
          <label htmlFor="type">Field Type</label>
          <select name="type" id="type">
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="email">Email</option>
            <option value="password">Password</option>
          </select>
          <div>
            <label htmlFor="required">Required</label>
            <input type="checkbox" name="required" id="required" />
          </div>
          <label htmlFor="label">Label</label>
          <input
            required
            type="text"
            name="label"
            id="label"
            placeholder="Enter a label"
          />
          <label htmlFor="placeholder">Placeholder</label>
          <input
            required
            type="text"
            id="placeholder"
            name="placeholder"
            placeholder="Enter a placeholder"
          />
          <button type="submit" className="secondary">
            Add Form Field
          </button>
        </fieldset>
      </form>
      <form id="form-fields" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Form Fields</legend>
          <ul>
            {formFields.map((field) => (
              <li key={field.id}>
                <label htmlFor={`input-${field.id}`}>{field.label}</label>
                <input
                  id={`input-${field.id}`}
                  required={field.required}
                  placeholder={field.placeholder}
                  type={field.type}
                  value={field.value}
                  onChange={(e) =>
                    handleUpdateFormField(field.id, { value: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="secondary"
                  onClick={() => handleDeleteFormField(field.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <span>Your form fields will show here : </span>
          <button className="primary">Submit</button>
        </fieldset>
      </form>
    </div>
  );
}


function App() {

  return (
    <div>
      <FormBuilder />
    </div>
  )
}

export default App
