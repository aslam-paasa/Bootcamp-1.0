/**
 * Challenge: Render Cart
 * 1. Create a fn named updateCart that will be responsible for rendering
 *    the cart items and updating the total cart price. Inside the updateCart
 *    fn, get the current state from the Redux store using store.getState().
 *    a. Select the cartList & cartTotal elements using: 
 *       document.getElementById("cart-total")
 *    b. For each cart item, create a list item(<li>) containing the item's
 *       name, price and quantity. 
 *       - Join the array of HTML strings using .join("") and set it as the
 *         innerHTML of the cartList element.
 *    c. Update the cartTotal element's content with the total price from
 *       the state.
 * 2. Call the updateCart() in the index.js & in the store.subscribe. 
*/

import { createStore } from 'redux';
import cartReducer from './cartReducer';
import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY, CALCULATE_TOTAL } from './cartAction';

/**
 * Create the store:
*/
const store = createStore(cartReducer);

/**
 * Render the cart:
*/
const updateCart = () => {
  const state = store.getState();
  const cartList = document.getElementById('cart-list');
  const cartTotal = document.getElementById('cart-total');

  cartList.innerHTML = state.cartItems.map(item => {
    return `
      <li>
        ${item.name} - $${item.price} x ${item.quantity}
        <button onclick="removeFromCart(${item.id})">Remove</button>
        <input type="number" min="1" value="${item.quantity}" onchange="updateQty(${item.id}, this.value)">
      </li>`;
  }).join("");

  cartTotal.innerText = `Total: $${state.total}`;
};

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
 * Dispatch Actions:
*/
window.addToCart = (id, name, price) => {
  store.dispatch({ type: ADD_TO_CART, payload: { id, name, price } });
  store.dispatch({ type: CALCULATE_TOTAL });
};

window.removeFromCart = (id) => {
  store.dispatch({ type: REMOVE_FROM_CART, payload: id });
  store.dispatch({ type: CALCULATE_TOTAL });
};

window.updateQty = (id, quantity) => {
  store.dispatch({ type: UPDATE_QUANTITY, payload: { id, quantity: +quantity } });
  store.dispatch({ type: CALCULATE_TOTAL });
};

/**
 * Initial Render:
*/
store.subscribe(updateCart);
renderProducts();
updateCart();