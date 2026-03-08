/**
 * Challenge: Add to Cart
 * Given the final ShoppingCart component (including all the JSX and event
 * handlers), your job is to finish implementing both the reducer fn as well
 * as the calculateTotal function.
 * 
 * calculateTotal takes in the cart and should return a single numberic value
 * representing the total cost of all the items in the cart.
 * 
 * For the reducer, look at the component to figure out which action types
 * are being dispatched as well as the shape of the action objects.
 * 
 * Tasks:
 * 1. Render the appropriate UI if there are no items in the cart
 * 2. Give the user the ability to add items to the shopping cart
 * 3. Give the user the ability to remove items from the shopping cart
 * 4. Appropriately update the quantity of items in the shopping cart
 * 5. Appropriately calculate the total cost of all items in the shopping cart
 * 
 * Hint:
 * 1. Whenever you're using useReducer, it's a good idea to start with
 *    thinking through all of the different action types that can change
 *    the state of your application. In our case, because handleAddToCart
 *    and handleUpdateQuantity are already built out, we know we'll need
 *    to handle two different action types:
 *    a. add
 *    b. update
 * 
 *    function reducer(cart, action) {
 *       if (action.type === "add") {
 *
 *       } else if (action.type === "update") {
 *
 *       } else {
 *         throw new Error("This action type isn't supported.")
 *       }
 *    }
 * 
 * 2. Finish implementing the add action type for when a user adds a new item
 *    to the shopping cart.
 * 
 *    If you look at the JSX, you'll notice that each item in our cart has
 *    a quantity. What add needs to do is if the item has already been added
 *    to the shopping cart, it should increment the items quantity by 1. If 
 *    the item hasn't been added to the shopping cart, it should add the item
 *    to the shopping cart with a quantity of 1.
 * 
 *    function reducer(cart, action) {
 *       if (action.type === "add") {
 *          const inCart = Boolean(cart.find((item) => item.id === action.id));
 *
 *       if (!inCart) {
 *          const product = products.find((p) => p.id === action.id);
 *          return [...cart, { ...product, quantity: 1 }];
 *       }
 *
 *          return cart.map((item) =>
 *             item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item
 *          );
 *       } else if (action.type === "update") {
 *   
 *       } else {
 *          throw new Error("This action type isn't supported.")
 *       }
 *    }
 * 
 * 3. Now you need to implement the update action type for when a user
 *    updates the quantity of an item in the shopping cart. Notice that
 *    this action types takes in two properties, id, and adjustment.
 *    adjustment can be either increment or decrement which determines if,
 *    naturally, we should increment or decrement the quantity of the item
 *    in the shopping cart.
 * 
 *    First increment. In this scenario, we want to map over cart, and 
 *    increment quantity where item.id === action.id. 
 * 
 *    else if (action.type === "update") {
 *       if (action.adjustment === "increment") {
 *          return cart.map((item) =>
 *             item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item
 *          );
 *       }
 *    }
 * 
 *    Next is if adjustment is decrement. This scenario is a little trickier.
 *    In this scenario, if the current quantity is 1, instead of decrementing
 *    the quantity to 0, we want to remove the item from the shopping cart.
 *    If it's not 1, that's when we want to decrement.
 * 
 *    else if (action.type === "update") {
 *       if (action.adjustment === "increment") {
 *         return cart.map((item) =>
 *           item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item
 *         );
 *       }
 *      
 *       const item = cart.find(({ id }) => action.id === id);
 *      
 *       if (item.quantity === 1) {
 *         return cart.filter((item) => item.id !== action.id);
 *       } else {
 *         return cart.map((item) =>
 *           item.id === action.id ? { ...item, quantity: item.quantity - 1 } : item
 *         );
 *       }
 *    }
 * 
 * 4. The last thing we need to do is implement calculateTotal. For this,
 *    we'll use reduce to transform our cart into a single value which
 *    represents the total cost of all the items in the cart.
 * 
 *    function calculateTotal(cart) {
 *       return cart.reduce((total, product) => {
 *          return total + product.quantity * product.price;
 *       }, 0);
 *    }
*/

import './App.css'

const products = [
  { id: 1, name: "Poké Ball", price: 10 },
  { id: 2, name: "Great Ball", price: 20 },
  { id: 3, name: "Ultra Ball", price: 30 }
];

function calculateTotal(cart) {
  return cart.reduce((total, product) => {
    return total + product.quantity * product.price;
  }, 0);
}

const initialState = [];

function reducer(cart, action) {
  if (action.type === "add") {
    const inCart = Boolean(cart.find((item) => item.id === action.id));

    if (!inCart) {
      const product = products.find((p) => p.id === action.id);
      return [...cart, { ...product, quantity: 1 }];
    }

    return cart.map((item) =>
      item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  } else if (action.type === "update") {
    if (action.adjustment === "increment") {
      return cart.map((item) =>
        item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    }

    const item = cart.find(({ id }) => action.id === id);

    if (item.quantity === 1) {
      return cart.filter((item) => item.id !== action.id);
    } else {
      return cart.map((item) =>
        item.id === action.id ? { ...item, quantity: item.quantity - 1 } : item
      );
    }
  } else {
    throw new Error("This action type isn't supported.")
  }
}

function ShoppingCart() {
  const [cart, dispatch] = React.useReducer(reducer, initialState);

  const handleAddToCart = (id) => dispatch({ type: "add", id });

  const handleUpdateQuantity = (id, adjustment) => {
    dispatch({
      type: "update",
      id,
      adjustment
    });
  };

  return (
    <main>
      <h1>Poké Mart</h1>
      <section>
        <div>
          <ul className="products">
            {products.map((product) => (
              <li key={product.id}>
                {product.name} - ${product.price}
                <button
                  className="primary"
                  onClick={() => handleAddToCart(product.id)}
                >
                  Add to cart
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <hr />
      <aside>
        <div>
          <h2>Shopping Cart</h2>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name}
                <div>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, "decrement")
                    }
                  >
                    -
                  </button>
                  {item.quantity}
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, "increment")
                    }
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
            {!cart.length && <li>Cart is empty</li>}
          </ul>
        </div>
        <hr />

        <h3>Total: ${calculateTotal(cart)}</h3>
      </aside>
    </main>
  );
}

function App() {

  return (
    <div>
      <ShoppingCart />
    </div>
  )
}

export default App
