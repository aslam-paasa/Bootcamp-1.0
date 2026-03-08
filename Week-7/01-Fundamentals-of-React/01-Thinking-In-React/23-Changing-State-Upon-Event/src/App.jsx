/**
 * If in our handleClick fn we change the value of title, we observed
 * that the Random Title naming is not changed to "Mohammad".
 * 
 * Now, the problem is that we are not rendering the compoent. So, we
 * change the value and we're not rendering the component. That's the
 * reason why we cannot see any changes.
 * 
 * Now, the second thing is that we have no way to preserve this value 
 * in between the renders as well. So, essentially, we would want two
 * things.
 * 
 * We would want to keep the value between the renders, but also we 
 * would want to trigger that and this is where teh useState cime
*/
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
