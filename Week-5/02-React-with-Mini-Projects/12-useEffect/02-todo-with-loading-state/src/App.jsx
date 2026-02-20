/**
 * Q. Kya hai useEffect?
 * => useEffect ek hook hai jo React mein side effects ko handle karne 
 *    ke liye use hota hai. Side effects woh hain jo humare component ke
 *    andar nahin hote, lekin bahar ke world se judte hain, jaise ki:
 *    (a) API calls (server se data fetch karna)
 *    (b) Setting timers (har kuch seconds ke baad kuch karna)
 *    (c) Changing DOM (web page ke elements ko update karna)
 * */ 

/**
 * Q. Kaise use kare useEffect?
 * => useEffect ko hum do cheezon ke saath use karte hain:
 *    1. Ek function (jo side effect ko handle karega)
 *    2. Ek dependency array (jo decide karega ki yeh function kab chalega)
 * => Example:
 *    Suppose hum ek todo list app bana rahe hain, aur hum chahte hain ki
 *    har 10 seconds ke baad server se new todos fetch karein.
 * 
*/

/**
 * Q. Kab use karein useEffect?
 * => useEffect ko hum following situations mein use kar sakte hain:
 *    (a) API calls (server se data fetch karna)
 *    (b) Setting timers (har kuch seconds ke baad kuch karna)
 *    (c) Changing DOM (web page ke elements ko update karna)
 *    (d) Handling user input (user ke input ke saath kuch karna)
 *    (e) Handling component lifecycle (component ke mount, update, aur 
 *        unmount ke saath kuch karna)
 * */ 

/**
 * Q. What is side effect?
 * => Side effect ek aisa effect hota hai jo humare program ke andar 
 *    nahin hota, lekin bahar ke world se judta hai. Yeh effect humare 
 *    program ke output ko change kar sakta hai.
 * => Example:
 *    Suppose hum ek todo list app bana rahe hain, aur hum chahte hain 
 *    ki har 10 seconds ke baad server se new todos fetch karein. 
 *    Yeh todo list app ka output humare screen par dikhai dega.
 * 
 * Side effect:
 * => Yeh todo list app ka server se data fetch karna ek side effect hai. 
 *    Kyunki yeh effect humare program ke andar nahin hota, lekin bahar 
 *    ke world se judta hai (server se).
 * => Other examples:
 *    (a) API calls (server se data fetch karna)
 *    (b) Setting timers (har kuch seconds ke baad kuch karna)
 *    (c) Changing DOM (web page ke elements ko update karna)
 *    (d) Handling user input (user ke input ke saath kuch karna)
 *    (e) Handling component lifecycle (component ke mount, update, aur 
 *        unmount ke saath kuch karna)
 * 
 * 
 * Side effect ko handle karna:
 * => Hum side effect ko handle karne ke liye useEffect hook ka use kar 
 *    sakte hain. useEffect hook hume side effect ko execute karne ke 
 *    liye ek function provide karta hai.
 * 
 *    useEffect(() => {
 *     => Side effect: Server se data fetch karna
 *     fetch("https://example.com/todos")
 *       .then(res => res.json())
 *       .then(todos => setTodos(todos));
 *    }, []);
 * 
 * => Yeh code useEffect hook ka use karta hai, jo server se data fetch 
 *    karta hai aur todos ko update karta hai.
*/ 


import { useState, useEffect } from 'react'

function App() {
  const [todos, setTodos] = useState([])
  
  /**
   * 1. Every few seconds our react is asking the server about new todos.
   *    But now, we are not doing that. We are sending one set of request
   *    when the component mount means when the first time this App renders,
   *    the backend request would go to the server.
   * */ 
  useEffect(() => {
    setInterval(() => {
        fetch("https://sum-server.100xdevs.com/todos")
        .then(async function(res) {
          const json = await res.json();
          setTodos(json.todos);
        })
    }, 10000)
  }, []); 

    
  
  return (
    <div>
      {todos.map(todos => <Todo key={todos.id} title={todos.title} description={todos.description} />)}
    </div>
  )
}

function Todo({title, description}) {
  return (
    <div>
      <h1>{title}</h1>
      <h4>{description}</h4>
    </div>
  )
}

export default App
