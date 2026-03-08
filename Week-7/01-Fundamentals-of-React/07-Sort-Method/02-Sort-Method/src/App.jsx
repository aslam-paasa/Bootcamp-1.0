import './App.css'

/**
 * Q. List down the products with their details on the DOM. Then sort
 *    the products from price low to high on click of a button.
 */

function App() {
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 10.99
    },
    {
      id: 2,
      name: "Product 2",
      price: 5.99
    },
    {
      id: 3,
      name: "Product 3",
      price: 15.99
    },
    {
      id: 4,
      name: "Product 4",
      price: 7.99
    },
    {
      id: 5,
      name: "Product 5",
      price: 12.99
    }
  ];

  return (
    <div className="App">
      <h1>Product List</h1>
      Price: <button>Low To High</button>
    </div>
  );
}


export default App
