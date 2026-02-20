
/**
 * Two Jargons before we start:
 * 1. Side Effects
 * 2. Hooks
 * 
 * Side Effects:
 * => In React, the concept of side effects encompassed any operators
 *    that reach outside the functional scope of a React component.
 *    These operations can affect other components, interact with
 *    the browser, or perform asynchronous data fetching.
 * => It means the React that we are writing, we have functional
 *    components, anything which is not related to rendering/putting
 *    on the DOM or taking things out of the DOM are called side effects.
 *    Specifically, things like :
 *    (a) setTimeout
 *    (b) fetch Data
 *    (c) setInterval
 *    (d) document.getElementById("").innerHTML 
 *        (directly trying to manipulate the DOM)
 *    These are not part of main react rendering cycle.
 * => Our frontend needs to talk to backend, so this asynchronous call
 *    of fetching data from time to time can be classified as a side effect
 *    and similalry if we want to add setTimeout and setInterval in our
 *    codebase. And these concepts needs to be understood because these
 *    needs to be separate from our rendering cycle. There are some
 *    specific things happening when we are rendering a component like
 *    functions get called, components get called, and there are
 *    these other set of things like data fetching that need to happen
 *    on the side that is why they are called side effects. They don't
 *    necessarily should collude with the rendering cycle.
 * 
 * 2. Hooks: 
 * => The way we are writing components now is the fresh way of writing
 *    components from react v16 onwards, before that we would create
 *    classes, and when we create classes there was certain way to do
 *    state management, lifecycle event. To introduce all of those
 *    things in functional components from react 16.8, Hooks were
 *    introduced, which enable the functional components to have acces
 *    to stateful logic and lifecycle features, which were only
 *    possible in class components. This has led to a more concise
 *    and readable way of writing components in React. [State management
 *    and lifecycle events are difficult in functional components that
 *    is why hooks were introduced.]
 * => Some common hooks are:
 *    (a) useState
 *    (b) useEffect
 *    (c) useCallback
 *    (d) useMemo
 *    (e) useRef
 *    (f) useContext
 * */ 

/**
 * 1. useState:
 * => It let's you describe the state of your app i.e. a simple object
 *    which contains what our frontend should look like.
 * => Whenever state updates, it triggers a re-render which finally
 *    results in a DOM update.
 * 
 * function App() {
 *     const [count, setCount] = useState(0)
 *
 *     return <div>
 *         <button onClick={function() {
 *             setCount(count+1);
 *         }}>Click me {count}</button>
 *     </div>
 * }
 * 
 * => Until we are trying to use Side Effect like hit the backend and
 *    fetch data etc, useState() is the only hook we need to create
 *    a dynamic website.
 * 
*/

/**
 * 2. useEffect():
 * => The allows to perform side effects in functional components like
 *    doing a backend call, setInterval, etc.
 * => Side effects are operations that can affect other components
 *    or can't be done during rednering, such as data fetching, 
 *    subscriptions, or manually changing the DOM in React components.
 * => If we try to do data fetching or any other side effects like
 *    introducing a setTimeout during rednering, we will face issues
 *    like infinite number of fetch calls than one. This is why we need
 *    useEffect to limit or on the side it do all of the side effects.
 * => The useEffect hooks serves the same purpose as "componentDidMount",
 *    "componentDidUpdate", and "componentWillUnmount" in React class
 *    components but unified into a single API.
*/

/**
 * Let's start with an example:
 * => You are a car racer that has to do a 100 laps across a stadium.
 * => You are allowed to take a pit stop from time to time. 
 *    (Pit stop means when you are going though the laps, you feel that
 *     need to change type or refuel etc. So, you can do small pit check
 *     from time to time.)
 * => Do you take the stop in between every lap? Or do you take a stop
 *    after every 10 laps lets say? We take pit stop at some condition,
 *    even though we pass right in front of it in every lap. Making
 *    a pit stop is a side effect i.e. something we don't want to do
 *    in every render and should independently run irrespective of how
 *    many renders are happening. If certain condition met then our
 *    pit stop should be done or data fetching should be done.
 * 
 * Q. When should you fetch data from backend?
 * => When the components for the first time, after that it doesn't matter
 *    how many rerenders happend, we will not send another backend
 *    request unless we have certain condition.
 * Note: Pit Stop is data fetching and we making the fetch call is 
 *       useEffect.
 * 
 * +------------------------+
 * | Code: Todo Application |
 * +------------------------+
 * import { useState } from "react"
 * import { useEffect } from "react"
 *
 * function App() {
 *     const [Todo, setTodo] = useState([])
 *
 *     useEffect(() => {
 *         fetch("https://sum-server.100xdevs.com/todos")
 *         .then(async function(res) {
 *             const json = await res.json();
 *             setTodos(json.todos);
 *         })
 *     }, [])
 *
 *     return <div>
 *         {todos.map(todo => <Todo key={todo.id} title={todo.title} description={todo.description} />)}
 *     </div>
 * }
 * export default App
 * 
 * Q. Why did we wrap this inside useEffect?
 * Q. What is this 2nd argument "[]"?
 * => Anytime the state changes, this App function will keep getting 
 *    called again and again and a render happens. When its called
 *    do you want to again refetch the data. No! We just want to
 *    fetch data once.
 * => And the useEffect let you put a set condition under which we want
 *    this fetch code to run and that's why we fetch this call inside
 *    the useEffect(), and we ensure that the call only goes once i.e.
 *    the pitstop before staring the race and we keep on going on the
 *    race.
 * => When the 2nd argument is an empty array, it means the first time
 *    this function is called, at that time the code will run once.
 * 
 * 
 * => Dependency Array "[]" : It states when should the callback fn run.
 * Q. When would you hit the pitstop? 
 * => 1. Tyre Burst
 *    2. Tyre Pressure is up
 *    3. 10 laps have passed
 *    4. Engine is making a noise
 *    5. Want to change the car
 * => Undersome condition we hit the pitstop. Similalry, if there is 
 *    any condition under which we want to hit this specific fetch code
 *    we put that condition here => "[]"
 * 
 * Q. What do we write here?
 * => It takes state variable as input, and anytime that state variable
 *    changes, this code reruns.
*/



import { useState } from "react"
import { useEffect } from "react"
import axios from 'axios';

/**
 * We have understood:
 * (a) useState()
 * (b) useEffect()
*/
function App() {

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("https://sum-server.100xdevs.com/todos")
      .then(function(response) {
        setTodos(response.data.todos);
      })
  }, [])

  // Artificial delay of 5 sec after the delay using setTimeout():
  // useEffect(() => {
  //   setTimeout(() => {
  //     axios.get("https://sum-server.100xdevs.com/todos")
  //     .then(function(response) {
  //       setTodos(response.data.todos);
  //     }, 5000);
  //   })
  // }, [])

  return <div>
    {/* Component-1 */}
    {todos.map(todo => <Todo key={todo.id} title={todo.title} description={todo.description} />)}

    {/* Component-2 */}
    <TodoId id={1} />

    {/* Component-3 */}
    <GroceryShopping />
  </div>
}
export default App


function Todo({title, description}) {
  return <div>
    <h1>{title}</h1>
    <h1>{description}</h1>
  </div>
}


/**
 * Q. Write a component that takes a todo id as an input and fetches
 *    the data for that todo from the given endpoint and then renders
 *    it.
 * Q. How would the dependency array change?
 * => Link: https://sum-server.100xdevs.com/todo?id=1
 * */ 
function TodoId({id}) {
  const [todo, setTodo] = useState({});

  // Implement effect here
  useEffect(() => {
    axios.get("https://sum-server.100xdevs.com/todo?id=" + id)
      .then(response => {
        setTodo(response.data.todo);
      })
  }, [])

  return <div>
    <h2>Id: {id}</h2>
    <h1>{todo.title}</h1>
    <h4>{todo.description}</h4>
  </div>
}

/**
 * Grocery Button:
 * => Create a button 1,2,3,4,...
 * => When we click on button 3, in axios call, our will change from
 *    1 to 3.
 * => Basically, onClicking the button we are making a fetch call and 
 *    changing the content of the page.
 * 
 * Hint: useState
 * */ 
function GroceryShopping() {
  const [selectedId, setSelectedId] = useState(1);

  return <div>
    <button onClick={() => { setSelectedId(1) }}>1</button>
    <button onClick={() => { setSelectedId(2) }}>2</button>
    <button onClick={() => { setSelectedId(3) }}>3</button>
    <button onClick={() => { setSelectedId(4) }}>4</button>
    {/* Passing state variable to make a fetch call */}
    <TodoId id={selectedId} /> 
  </div>
}