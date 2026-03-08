/**
 * Challenge:
 * There's a problem with our Layout Component which is preventing it from
 * rendering correctly.
 * 
 * Task:
 * 1. Fix the error so the component renders correctly.
*/

import './App.css'

function Layout() {
  return (
    <div>
      <header>Header</header>
      <main>Main</main>
      <aside>Aside</aside>
      <footer>Footer</footer>
    </div>
  );
}

function App() {

  return (
    <div>
      <Layout />
    </div>
  )
}

export default App
