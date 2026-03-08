/**
 * Keys in React:
 * 1. Let's create a simple todo app that renders 3 todos
 * 2. Create a Todo component that accepts title, description as input. 
 * 3. Initialize a state array that has 3 todos: id, title, description
 * 4. Iterate over the array to render all the TODOs
 * 5. A button in the top level App component to add a new TODO
 * */ 



import React from 'react';
import { useState } from 'react';

let counter = 4;

function App() {
  const [todos, setTodos] = useState([{
    id: 1,
    title: "go to gym",
    description: "go to gym today"
  },
  {
    id: 2,
    title: "eat food",
    description: "eat food"
  },
  {
    id: 3,
    title: "go to class",
    description: "go to class"
  }]);


  
  function addTodo() {
    // Way-1: Spread Syntax: 
    // Spreads all the exisiting data and add the new data to it.
    setTodos([...todos, {
      id: counter++,
      title: Math.random(),
      description: Math.random()
    }]) 

  // // Way-2: 
  //   const newTodos = [];
  //   for(let i = 0; i < todos.length; i++) {
  //     newTodos.push(todos[i]);
  //   }
  //   // newTodos == todos
  //   newTodos.push({
  //     id: 4,
  //     title: Math.random(),
  //     description: Math.random()
  //   })
  //   // existing ones + 1
  //   setTodos(newTodos)
  }

  return (
    <div>

      <button onClick={addTodo}>Add a todo</button>

      {/* Way-1: Naive Way
          <Todo title={todo[0].title} description={todo[0].description} />;
          <Todo title={todo[1].title} description={todo[1].description} />;
          <Todo title={todo[2].title} description={todo[2].description} />;
      */}

      {/* Way-2: Better Way
          {todos.map(function(todo) {
            return <Todo title={todo.title} description={todo.description} />;
          })}
      */}

      {/* 3. Optimal Way: 
          {todos.map(todo => <Todo title={todo.title} description={todo.description} />)}
      */}
    
      {/* Keep list items in order with key: 
        =>Each child should have a unique "key" prop to uniquely 
          identify among other items in the array. This becomes important
          if your array items can move (e.g. due to sorting), get inserted 
          or get deleted. A well chosen key helps React infer what exactly 
          has happened, and make the correct updates on the DOM tree.
      */}
      {todos.map(todo => <Todo key={todo.id} title={todo.title} description={todo.description} />)}

    </div>
  )
}


function Todo({title, description}) {
  return(
    <div>
      <h1>{title}</h1>
      <h5>{description}</h5>
    </div>
  )
}

export default App


/**
 * Way-1: Spread Syntax
 * => Yeh code spread syntax ka use karta hai, jo existing todos ko copy 
 *    karta hai aur new todo item ko add karta hai.
 * 
 *    setTodos([...todos, { ... }])
 * 
 * => Yahaan, ...todos existing todos ko copy karta hai, aur { ... } 
 *    new todo item ko add karta hai.
 * 
 * Way-2: Manual Loop
 * => Yeh code manual loop ka use karta hai, jo existing todos ko copy 
 *    karta hai aur new todo item ko add karta hai.
 * 
 *    const newTodos = [];
 *    for(let i = 0; i < todos.length; i++) {
 *      newTodos.push(todos[i]);
 *    }
 *    newTodos.push({ ... });
 *    setTodos(newTodos)
 * 
 * => Yahaan, loop existing todos ko copy karta hai, aur 
 *    newTodos.push({ ... }) new todo item ko add karta hai.
 * 
 * 
 * Concept: Immutability
 * => Yeh code immutability concept ko follow karta hai, jo kahta hai ki 
 *    existing data ko modify nahin karna chahiye, balki new data ko 
 *    create karna chahiye.
 * => Yeh code existing todos ko modify nahin karta, balki new todos array
 *    ko create karta hai, jo existing todos ko include karta hai aur 
 *    new todo item ko add karta hai.
 * */ 