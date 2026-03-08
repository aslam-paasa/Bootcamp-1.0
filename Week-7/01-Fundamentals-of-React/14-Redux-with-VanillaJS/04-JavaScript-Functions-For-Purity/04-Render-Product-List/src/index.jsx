/**
 * Challenge: Render Product List
 * Implement the renderProducts function to display the list of products.
 *    const products = [
 *       { id : 1, name : 'Product A', price : 10 },
 *       { id : 2, name : 'Product B', price : 20 },
 *       { id : 3, name : 'Product C', price : 15 },
 *    ]
 * 1. Inside the renderProducts fn, select the productList element using
 *    document.getElementById
 * 2. For each product, creates a list item (<li>) containing the product
 *    name and price.
 * 3. Call the renderProducts fn in index.jsx 
*/


import { createStore } from 'redux';
import cartReducer from './cartReducer';

const store = createStore(cartReducer);

store.subscribe(() => {
  console.log(store.getState());
});

/**
 * Render the products:
*/
const renderProducts = () => {
  const products = [
    { id: 1, name: "Product A", price: 10 },
    { id: 2, name: "Product B", price: 20 },
    { id: 3, name: "Product C", price: 15 },
  ];

  const productList = document.getElementById("product-list");
  productList.innerHTML = products.map(product => {
    return `
      <li>
        ${product.name} - $${product.price}
        <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
      </li>`;
  }).join("");
};

/**
 * Initial Render:
*/
renderProducts();