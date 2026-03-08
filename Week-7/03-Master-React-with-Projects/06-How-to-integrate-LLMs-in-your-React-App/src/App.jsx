import './App.css'
import Gemini from './Gemini'

/**               req (data)    
 * +----------+ --------------> +------+
 * | Frontend |                 | LLMs |
 * +----------+ <-------------- +------+
 *               res (llm data)  Gemini
 * 
 * 1. Create Gemini API Key and store the secret key in .env
 * 2. Install: npm install @google/genai
 * 3. Import and initialize the API
 * 4. 
*/

function App() {

  return (
    <div>
      <h1>How to integrate LLMs in your React App</h1>
      <Gemini />
    </div>
  )
}

export default App
