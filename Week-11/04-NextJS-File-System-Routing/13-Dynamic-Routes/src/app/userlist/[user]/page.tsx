/**
 * http://localhost:3000/userlist/john
 * 
 * 1. Annotating the params
 * 2. Destructuring the params
 * 3. Displaying the params
*/
const User = async ({params}: {params: {user: string}}) => {
    const { user } = await params;

    console.log(user); // john
    
  return (
    <div>
       <h1>Info About {user}</h1>
       <p>Hello I'm {user}</p>
    </div>
  )
}

export default User
