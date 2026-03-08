/**
 * Array Data:
 * Q. Write a React component to list out all fruits name and their
 *    price from the fruits array in the format - {name} : INR {price}.
 * => We will use map() fn to list out all fruits name & their price.
. * */ 

const fruits = [
  { id: 1, name: "Apple", price: 20 },
  { id: 2, name: "Orange", price: 54 },
  { id: 3, name: "Grapes", price: 30 },
  { id: 4, name: "Pineapple", price: 70 }
];

function ProductList() {
  return (
    <div>
      <ul>

        {
          fruits.map(({ name, price }) => (
            <li> 
              <p> Name: { name }</p>
              <p> Price: { price }</p>
            </li>
          ))
        }

      </ul>
    </div>
  )
}

function App() {

  return (
    <div>
      <ProductList />
    </div>
  )
}

export default App
