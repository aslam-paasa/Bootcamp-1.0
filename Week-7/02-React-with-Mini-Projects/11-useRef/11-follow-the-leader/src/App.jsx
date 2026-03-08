/**
 * Challenge: Follow the Leader
 * The concept is simple, animate the center of the box to the coordinates
 * that the user clicks.
 * 
 * To do this, you'll need to update the 'position' array to include the
 * new 'x' and 'y' positions of where the box should 'transform' to.
 * 
 * Tasks:
 * 1. Animate the box to the coordinates that the user clicks
 * 
 * Hint:
 * 1. Create a Ref:
 *    In order to get the width and height of the box, you'll first need to
 *    create a 'ref' and attach it to the 'box' element.
 * 
 *    const ref = useRef(null);
 * 
 *    return (
 *       <div className="wrapper">
 *          <div 
 *            className="box"
 *            ref={ref}
 *            style={{
 *              transform: `tranlate(${position[0]}px, ${position[1]}px)`,
 *              transition: "transform 1s"
 *            }}
 *          />
 *       </div>)
 * 
 * 2. handleClick:
 *    The goal of 'handleClick' is to update the position array to include
 *    the new 'x' and 'y' positions of where the box should transform to.
 *    To do that, whenever handleClick is invoked, you'' first want to get
 *    the width and height of the box which can do by calling getBoundingClientReact
 *    on the ref that you created in the previous step.
 * 
 *    const handleClick = ({ clientX, clientY }) => {
 *       const { width, height } = ref.current.getBoundingClientReact()
 *    };
 * 
 *    From here, you'll first want to update position to be a piece of React
 *    state so it'll trigger a re-render when it changes.
 * 
 *    const [position, setPosition] = useState([0, 0]);
 * 
 *    Now inside of handleClick, you can use clientX and clientY along with
 *    the box's width and height to calculate the new 'x' and 'y' positions.
 * 
 *    clientX is the 'x' position of where the user clicked and 'clientY'
 *    is the 'y' position of where the user clicked.
 * 
 *    const handleClick = ({ clientX, clientY }) => {
 *       const { width, height } = ref.current.getBoundingClientReact()
 *       setPosition([clientX - width/2, clientY - height/2])
 *    }
 * 
 *    Notice that we're diving the 'width' and 'height' by 2. That way, the
 *    box will animate to the center of where the user clicked.
*/

import './App.css'
import { useRef, useState } from 'react'

function FollowTheLeader() {
  const ref = useRef(null);
  const [position, setPosition] = useState([0,0]);
  
  const handleClick = ({ clientX, clientY }) => {
    const { width, height } = ref.current.getBoundingClientRect();
    setPosition([clientX - width / 2, clientY - height / 2]);
  };

  return (
    <div className="wrapper" onClick={handleClick}>
      <div className="box" ref={ref} style={{
        transform:`translate(${position[0]}px, ${position[1]}px)`,
        transition: 'transform 1s'
      }}/>
    </div>
  );
}

function App() {

  return (
    <div>
      <FollowTheLeader />
    </div>
  )
}

export default App
