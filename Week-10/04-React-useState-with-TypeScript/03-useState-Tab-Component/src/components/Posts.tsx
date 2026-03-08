import React from "react";
import '../App.css';

const Posts = () => {
  /**
   * Generate a lot of posts:
   * > We don't need data, we only need the index.
   * > We can use the index to generate the post.
   */
  const posts: string[] = Array.from(
    { length: 1000 },
    (_, index) => `Post ${index + 1}`
  );

  return (
    <div className="posts-container">
      <h1 className="posts-title">Post Grid</h1>

      <div className="posts-grid">
        {posts.map((post, index) => (
          <div key={index} className="post-card">
            <h2>{post}</h2>
            <p>This is the content of {post}.</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
