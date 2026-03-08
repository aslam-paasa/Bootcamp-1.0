/**
 * Dynamic Routes:
 * > This `page.tsx` file is used to handle dynamic routes for 
 *   individual blog pages.
 * > For example, if you access a URL like `/blog/1`, `/blog/2`, etc., 
 *   each of these URLs corresponds to a specific blog post.
 *
 * > The dynamic nature of the URL means that we don’t need to create a
 *   separate page for each individual blog post.
 * > Instead, by using square brackets (`[]`) around the route parameter
 *   (e.g., `blogId`), we can make the route dynamic. This allows us to
 *   fetch the blog content for any given `blogId` dynamically without 
 *   having to create separate pages for each blog post.
 * 
 * Example:
 * > URL   : localhost:3000/blog/1
 * > File  : app/blog/[blogId]/page.tsx
 * > Params: { blogId: '1' }
 * > Data  : 
 *   {
 *     id: 1,
 *     title: 'Blog Post 1',
 *     body: 'This is the content of blog post 1.'
 *   }
 */

import axios from "axios";

export default async function BlogPage({ params }: any) {
  const postId = (await params).blogId;

  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  const data = response.data;

  return (
    <div>
      <h1>Blog Page</h1>
      <br />
      <h1>ID: {data.id}</h1>
      <br />
      <h1>Title: {data.title}</h1>
      <br />
      <h1>Body: {data.body}</h1>
    </div>
  );
}
