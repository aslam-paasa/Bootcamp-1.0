## Todo App with LocalStorage

Let's build a simple Todo App step by step!

### 1. Set up Your Page

- Start with a basic React component (e.g., `App.jsx`).

### 2. Add Input Fields

- Create two input boxes for the user to enter the todo's **title** and **description**.
   ```html
   <input type="text" placeholder="Title" />
   <input type="text" placeholder="Description" />
   ```
- Add a button to let the user **add** the todo.
   ```html
   <button>Add Todo</button>
   ```

### 3. Using Forms and useState to Add Todo Values (Step by Step)

Let's manage your input data and display your todos!

#### Step 1: Set Up State Variables

You need to use state to store the input from your form fields. Two approaches:

**A. Separate states for each input**
```jsx
const [title, setTitle] = useState("");
const [desc, setDesc] = useState("");
```

**B. Single state object for both values**
```jsx
const [singleTodo, setSingleTodo] = useState({ title: "", desc: "" });
```

> For beginners, using a single object (Option B) keeps it tidy, especially as you add more fields.

---

#### Step 2: Handle Input Changes

When a user types in the input, update the state using `onChange`.

**Example with Object State (Recommended):**
```jsx
<input 
  type="text" 
  placeholder="Title" 
  onChange={e => setSingleTodo(prev => ({ ...prev, title: e.target.value }))} 
/>

<input 
  type="text" 
  placeholder="Description" 
  onChange={e => setSingleTodo(prev => ({ ...prev, desc: e.target.value }))} 
/>
```

---

#### Step 3: What is Happening?

- `onChange` calls a function whenever the input changes.
- `e.target.value` gives you the latest value typed by the user.
- `setSingleTodo(prev => ({ ...prev, title: e.target.value }))` means:
  - Keep all previous values,
  - Update only the relevant property (here, `title` or `desc`).


### Step 4: Display Todos on the Web Page

Let's show all the todos you have added! Here’s how you can do it step by step:
1. Create State to Store All Todos
   You need an array to keep track of every todo added:
   
    const [allTodos, setTodos] = useState([{ title: "", desc: "" }])

2. Add New Todo to the List
   When the user submits a new todo, add it to the `allTodos` array:

   function handleAddTodo() {
     setAllTodos(prevTodos => [...prevTodos, singleTodo]);
   }

   > Here, `singleTodo` is the object holding the input for one todo (`{ title, desc }`).
   > singleTodo is an object, so we have to convert it to array to run map function

3. Render All Todos
   You can use the `.map()` function to display each todo in your list:

    <div>
        {
            allTodos.map((data, index) => 
            <div key={index}>
                <h1>{index+1}</h1>
                <h1>{data.title}</h1>
                <h1>{data.desc}</h1>
            </div>)
        }
    </div>

   - `map` lets you loop through each todo.
   - `key={idx}` helps React keep track of each item.
   - You can format the display however you want!


4. Delete a Todo from the List
   Let’s add the ability to remove individual todos. We’ll use the `index` to identify which todo to delete.

  Step 1: Add a Delete Button to Each Todo
  Inside your map function, add a delete `<button>` for each todo. The delete button should call a function when clicked, passing the corresponding `index`:

  <div>
    {allTodos.map((data, index) => (
      <div key={index}>
        <h1>{index + 1}</h1>
        <h1>{data.title}</h1>
        <h1>{data.desc}</h1>
        <button onClick={() => handleDeleteTodo(index)}>Delete</button>
      </div>
    ))}
  </div>

  - If you write onClick={handleDeleteTodo(index)}, it will immediately execute handleDeleteTodo as soon as the component renders, not when the button is clicked. This means todos will be deleted as soon as your component loads.
  - To prevent this, we use a callback function like `onClick={() => handleDeleteTodo(index)}` so that `handleDeleteTodo` is only called when the button is actually clicked, not on every render.

  Step 2: Write the Delete Handler
  This function should remove the item at the given index from the `allTodos` array:

function handleDeleteTodo(index) {
  const newTodos = [...allTodos];   => Create a copy of the current todos
  newTodos.splice(index, 1);        => Remove the todo at the given index
  setAllTodos(newTodos);            => Update the state
}

Key Points:
- We copy the array to avoid mutating state directly.
- `splice(index, 1)` removes one item at the given index.
- `setAllTodos` updates the list.

