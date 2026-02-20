import { useState } from 'react'
import './App.css'

function Display(props) {
  return (
    <div>
      <table 
        border="1" 
        cellSpacing="0" 
        cellPadding="5" 
        align='center' 
        style={
          {
            width:"90%", 
            color:"white", 
            fontFamily:"candara"
          }
        }>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {
            props.list.map((obj, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{obj.username}</td>
                  <td>{obj.email}</td>
                  <td>{obj.password}</td>
                  <td>{obj.address}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

function Form() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [student, setStudent] = useState([]);

  let handleSubmit = (event) => {
    event.preventDefault();
    
    let obj = {
      username: username,
      email: email,
      password: password,
      address: address,
    }
    setStudent([...student, obj]);  
    // Reset form fields by resetting the state
    // event.target.reset();
    setUsername('');
    setEmail('');
    setPassword('');
    setAddress('');
  }

  return (
    <div>
      <center>
        <h2>Example of Adding User and Show List in a Table</h2>
      </center>

      <div id='leftDiv'>
        <center>
          <h2>Fill Details</h2>
          <form action="" onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder='Enter Username' 
              onChange={(event) => {setUsername(event.target.value)}} 
              value={username}
            />
            <input 
              type="email" 
              placeholder='Enter Email' 
              onChange={(event) => {setEmail(event.target.value)}} 
              value={email}
            />
            <input 
              type="password" 
              placeholder='Enter Password' 
              onChange={(event) => {setPassword(event.target.value)}} 
              value={password}
            />
            <input 
              type="text" 
              placeholder='Enter Address' 
              onChange={(event) => {setAddress(event.target.value)}} 
              value={address}
            />
            <input type="submit" value="Submit Details" />
          </form>
        </center>
      </div>

      <div id='rightDiv'>
        <center>
          <h2>Users List in a Table</h2>  
          <Display list={student} />
        </center>
      </div>
    </div>
  )
}

function App() {

  return (
    <div>
      <Form />
    </div>
  )
}

export default App
