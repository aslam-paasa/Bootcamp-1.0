/**
 * Q. Display the fruits in red color, for which the price is less than
 *    INR 50.
*/

const fruits = [
  { id: 1, name: "Apple", price: 20 },
  { id: 2, name: "Orange", price: 54 },
  { id: 3, name: "Grapes", price: 30 },
  { id: 4, name: "Pineapple", price: 70 }
];


function isRed(price) {
  if(price > 50) {
    return "red";
  } else {
    return "black";
  }
}

function App() {

  return (
    <div>
      {
        fruits.map(({ name, price }) => (
          <div style={{ color: isRed(price) }}>
            { name }: INR { price }
          </div>
        ))
      }
    </div>
  )
}

export default App
