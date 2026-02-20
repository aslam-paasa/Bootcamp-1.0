/**
 * Linking: Relation between Add button and input field
 * a. Create a ref in input field. (id = "todo-input")
 * b. Create a ref in button. (id = "add-btn")
 * c. Link the ref with the input field and button.
 * d. Add event listener on button.
 * e. When user clicks on button, get the value of input field. (input.value)
 * f. Create a new li element.
 * g. Add the value of input field to the li element.
 * h. Append the li element to the ul element.
 * i. Clear the input field.
 * 
 * Note: Whatever we write in input field, it will be stored in input.value.
 *       And now we can access it using input.value.
*/

const addBtn = document.getElementById("add-btn");
const todoInput = document.getElementById("todo-input");
const todoItemsContainer = document.getElementById("todo-items-container");

addBtn.addEventListener("click", () => {

    /**
     * 1. Add a new todo item to the list.
     *    - Create a new li element.
     *    - Add the value of input field to the li element.
     *    - Append the li element to the ul element.
     *    - Clear the input field.
    */
    const value = todoInput.value;            // Get the value of input field
    const li = document.createElement("li");  // <li></li>
    li.innerText = value;                     // <li>value</li>
    todoItemsContainer.appendChild(li);       // <ul><li>value</li></ul>
    todoInput.value = "";                     // Clear the input field

    /**
     * 2. Add a delete button to the todo item.
     *    - Create a delete button.
     *    - Add event listener on delete button.
     *    - When user clicks on delete button, delete the todo item.
    */
   const delBtn = document.createElement("button");
   delBtn.innerText = "X";

   delBtn.addEventListener("click", () => {
    li.remove();
   });

   li.appendChild(delBtn); 

   todoItemsContainer.appendChild(li);
   todoInput.value = ""; 


});

