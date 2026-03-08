import User from './components/User'

const App = () => {
  return (
    <div>
      <User username="alex" email="alex@gmail.com" age={20} location={["New York", "Los Angeles"]} />
    </div>
  )
}

export default App
