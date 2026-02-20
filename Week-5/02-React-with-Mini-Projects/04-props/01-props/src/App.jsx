/**
 * Props: 
 * - Props are read-only data that are passed from parent to child components.
 * - Immutable and are used to communicate between components.
 * 
 * Conditional Rendering:
 * 1. If-Else
 * 2. Ternary Operator
 * 3. Logical &&
 * 4. Switch
 * 5. Map
 * 
*/

import './App.css'

function App() {

  return (
    <div style={{background: '#dfe6e9', height: '100vh'}}>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <div>
          <div>
            <PostComponent
              name={"100xdevs"}
              subtitle={"23 followers"}
              time={"12m ago"}
              image={"https://appx-wsb-gcp-mcdn.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg"}
              description={"What to know how to win big? Check out how folks won $6000 in bounties."}
            />
          </div>
          <br />
          <div>
            <PostComponent
              name={"Raman"}
              subtitle={"Promoted"}
              image={"https://appx-wsb-gcp-mcdn.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg"}
              description={"How to get hired in 2024? I lost my job in 2023, this is the roadmap I followed to get a job"}
            />
          </div>
        </div>
      </div>
    </div>
  )
}


function PostComponent({ name, subtitle, time, image, description }) {
  return (
    <div style={{width: 200, backgroundColor: 'white', borderRadius: 10, border: '1px gray', padding: 20}}>
      <div style={{display: 'flex', fontSize: 14}}>
        <img src={image}
          style={{width: 30, height: 30, borderRadius: 20}}
          alt="post-image"
        />
        <div>
          <b>
            {name}
          </b>
          <div>{subtitle}</div>

           {time !== undefined ? <div style={{display: 'flex'}}>
            <div> {time} </div>
            <img src={"https://media.istockphoto.com/id/931336618/vector/clock-vector-icon-isolated.jgp?s=612x612&w=0&k=20&c=I8EBJl8i6olqcrhAtKko74ydFEVbfCQ6s5Pbsx6vfas="}
              style={{width: 18, height: 18}}
            />
          </div> : null}

        </div>
      </div>
      <br />
      <div style={{fontSize: 14}}>
        {description}
      </div>
    </div>
  )
}

export default App
