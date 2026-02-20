import './App.css'
import { Header } from './Component/Header'
import { Body } from './Component/Body'

function GithubProfile() {
  // Header
  // Body: Display 10 cards

  return (
    <>
      <Header />
      <Body />
    </>
  )
}

function App() {

  return (
    <div>
      <GithubProfile />
    </div>
  )
}

export default App
