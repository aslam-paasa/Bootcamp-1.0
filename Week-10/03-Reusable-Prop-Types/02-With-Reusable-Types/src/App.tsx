import User from './components/User'

const App = () => {
  return (
    <div>
      <User name="alex" age={20} isStudent={true} location={["New York", "Los Angeles"]} />
    </div>
  )
}

export default App
