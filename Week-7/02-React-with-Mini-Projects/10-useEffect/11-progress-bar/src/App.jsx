/**
 * Progress Bar:
 * - Progress bars are a crucial UI element for providing users with a 
 *   visual representation of task progress, whether it’s a file upload, 
 *   download, or even a countdown timer. 
 * - Here, we’ll create a dynamic progress bar in React that showcases 
 *   essential concepts like state updates, animations, and interval handling.
 * - Mastering these concepts not only prepares you for machine coding 
 *   interviews but also equips you with skills essential for building 
 *   polished, user-friendly interfaces in modern web development.
 * 
 * - This implementation also focuses on modular design, making the component
 *   reusable across different scenarios. 
 * - Building a progress bar tests key front-end development skills frequently
 *   evaluated in technical interviews, helping you prepare for real-world
 *   challenges while mastering this practical feature.
 */

/**
 * Problem Statement:
 * We need to create a progress bar with the following features:
 * 1. The bar dynamically fills to represent progress as a percentage.
 * 2. Progress increments automatically until it reaches 100%.
 * 3. The interval stops when the progress reaches 100%, ensuring clean
 *    performance.
 * 4. The bar and its display should be modular, reusable, and visually
 *    appealing.
*/

import './App.css'
import { useState, useEffect } from 'react'
import ProgressBar from './components/ProgressBar'

function App() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100;
        }
        return prev + 1
      })
    }, 100)

    return () => {
      clearInterval(interval)
    }
  }, [])


  return (
    <div className="App">
      Progress Bar
      <ProgressBar text={progress} width={progress} />
    </div>
  );
}

export default App
