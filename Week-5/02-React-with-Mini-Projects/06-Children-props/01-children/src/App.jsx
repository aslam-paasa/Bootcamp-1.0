/**
 * Children props: 
 * The children prop allows you to pass elements or components to other 
 * components.
 * 
 * Q. Can we create a generic Card Component jiske andar we can pass the
 *    internal contents as a prop? 
 * >  It means we are reusing the same component for different types of cards
 *    by sending the internal contents as a prop.
*/

import PropTypes from 'prop-types'


function App() {

  /**
   * Inner body is different, but outer wrapping structure is same.
  */
  return (
    <div style={{display: 'flex', background: 'gray'}}>

      <Card>
        <div style={{color: 'red'}}>
          What do you want to post <br/> <br/>
          <input type={"text"} />
        </div>
      </Card>

      <Card>
        <div style={{color: 'blue'}}>
          Hi there 
        </div>
      </Card>

    </div>
  )
}

/**
 * Wrapper Component: 
 * - This is creating the outside structure for all the cards. And whatever 
 *   is inside is the dynamic part. 
 * - So, I want to take something as an input i.e. Children, which I will 
 *   render inside the wrapper component. 
 *   a. Input will be dynamic
 *   b. Outer Structure of the Card is static.
 * - We can insert dynamic prop inside the Card but my generic Card Component
 *   Structure is same for all the cards. Means if we change even the 
 *   color of the card, it will reflect to all the cards. And that is why
 *   this generic card component is a life saver for us.
 * 
 *   a. <Card innerContent={"hello there"} />
 *   b. <Card innerContent={<div style={{color: 'red'}}>
 *       What do you want to post <br/> <br/>
 *       <input type={"text"} />
 *       </div>} />
 * 
 * - For components like this where we know we want to wrap inside some
 *   inner react component div, we can use children prop.
 * - Rather than naming it innerContent, we can name it children.  
 * 
 * Q. How to use this?
 * -  <Card>
 *       <div style={{color: 'red'}}>
 *         What do you want to post <br/> <br/>
 *         <input type={"text"} />
 *       </div>
 *    </Card>
*/

function Card({ children }) {
  return <div style={{background: 'white', borderRadius: 10, color: 'white', padding: 10, margin: 10}}>
    Upper topbar
    {children}
    Lower bottombar
  </div>
}

Card.propTypes = {
  children: PropTypes.node.isRequired
}

export default App
