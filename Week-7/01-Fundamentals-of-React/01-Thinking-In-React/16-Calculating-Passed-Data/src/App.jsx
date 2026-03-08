/**
 * Q. Given an array of objects representing your cart containing some
 *    food items ordered online. Each object consists of:
 *    (a) id
 *    (b) name
 *    (c) price
 *    Write a React component that shows these items in an ordered list
 *    and in the end calculate and show the "total price" using reduce.
*/

const myCart = [
  { id: 1, name: "Aloo Parantha", price: 80 },
  { id: 2, name: "Onion Capcisum Pizza", price: 180 },
  { id: 3, name: "Pav Bhaji", price: 40 },
  { id: 4, name: "French Toast", price: 100 },
]

function App() {

  return (
    <div>
      <h1>My Cart</h1>
      <ol>
        {myCart.map(({id, name, price}) => (
          <li key={id}>
            {name}: Rs. {price}
          </li>
        ))}
      </ol>

      <p>Total Price: {myCart.reduce((totalPrice, item) => (totalPrice += item.price), 0)}</p>
    </div>
  )
}

export default App
