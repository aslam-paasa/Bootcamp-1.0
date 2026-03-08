/**
 * Exercise: Dynamic Routes in Next.js
 * > Dynamic Routing is for having a dynamic data.
 * > Using these data, hum ek hi route se multiple pages bana sakte hain. 
*/

/** 
 * Example: E-commerce website mein products ke liye
 * > Suppose we are working with some ecommerce website and if we go to
 *   where we can see a lot of products:
 * > http://localhost:3000/products/
 *                            |
 *                            +------- products
 *                                        |
 *                                        +------- macbooks
 *                                        +------- chairs
 *                                        +------- shoes
 *                                        +------- tv
 * 
 * > So, does they means that we have to create a specific folder for 
 *   each product? 
 *   - products
 *       - macbooks
 *         - page.tsx
 *       - chairs
 *         - page.tsx
 *       - shoes
 *         - page.tsx
 *       - tv
 *         - page.tsx
 * 
 * > No, we don't have to create a route folder for each product.
 *   - http://localhost:3000/products/macbook
 *   - http://localhost:3000/products/iphone
 *   - http://localhost:3000/products/airpods
*/

/** 
 * Solution:
 * > We can use dynamic routes to create a route for each product:
 *   1. products folder mein [productId] naam ka folder banayein
 *   2. [productId] folder mein page.tsx file banayein
 * > Receive the the input using { params } and use that data using
 *   the slug name i.e., <h1>Product: {params.productId}</h1>
 * 
 *    export default function ProductPage({ params }) {
 *      return <h1>Product: {params.productId}</h1>
 *    }
 * 
 * > On the basis of this id, we can simply call the backend and get
 *   the unique data.
*/

const HomePage = () => {
  return (
    <div> 
      <h1>Home Page</h1>
    </div>
  );
};

export default HomePage;
