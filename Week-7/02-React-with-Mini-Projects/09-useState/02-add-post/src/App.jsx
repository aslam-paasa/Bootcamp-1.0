/**
 * Q. When I click on Add Post, how can I add a new card on the screen?
 * A. We can use useState to store the posts and then use that to render the 
 *    posts on the screen.
*/

import { useState } from 'react'
import { PostComponent } from './Post'
function App() {

  const [posts, setPosts] = useState([])

  /**
   * Based on the posts, I want to create an array of List of Components:
  */
  const postComponents = posts.map(post => <PostComponent 
    key={post.id}
    name={post.name}
    subtitle={post.subtitle}
    time={post.time}
    image={post.image}
    description={post.description}
  />);

  function addPost() {
    setPosts([...posts, {
      name: 'harkirat',
      subtitle: '10,000 followers',
      time: '2m ago',
      image: 'https://appx-wsb-gcp-mcdn.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg',
      description: 'What to know how to win big? Check out how folks won $6000 in bounties.'
    }])
  }

  return (
      <div style={{background: '#dfe6e9', height: "100vh"}}>
        <button onClick={addPost}>Add Post</button>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div>
            {postComponents}
          </div>
        </div>
      </div>
  )
}

export default App
