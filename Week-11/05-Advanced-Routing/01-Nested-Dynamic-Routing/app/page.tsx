/**
 * Dynamic Routes:
 * > We have learned dynamic route, where if we want to render dynamic
 *   details data, we can simply use dynamic route.
 * > For example, inside a /products page we are rendering different
 *   different products. Everytime we click on some of the product, we
 *   wanted to redirect ourselves towards a detailed page of the product.
 *   So, instead of creating a static nested route, we can use the
 *   power of dynamic route, which will dynamically pass the data into
 *   the id. (product/[id] => product/[2] => title, image, desc)
*/

/**
 * Advanced Routing: 
 * 2. Nested Dynamic Routes
 *    > Everytime I visit towards a product detail (product/[2]), we
 *      want to show one more thing whose name is nested. For example,
 *      we want to show review for each product. 
 *      - product/[id]/review
 *      - product/[2]/review
 * 
 *    > /products/101 ------> productsPage (params = { id: 101 })
 *    > /products/101/reviews/5 ------> reviewPage (params = { id: 101, reviewId: 5})
 * 
 * Note: Inputs are by default strings, we have to parse them if needed.
*/

import Link from "next/link";

export default function Home() {
  return (
    <div>Nested Dynamic Routing</div>
  );
}
