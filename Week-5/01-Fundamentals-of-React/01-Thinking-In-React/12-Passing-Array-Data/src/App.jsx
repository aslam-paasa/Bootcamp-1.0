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

function ProductCard({name, price}) {
  return (
    <li key={id} style={{ listStyle: "none" , border: "solid 1px black", margin: "4px", padding: "4px" }}>
      <p>{name} : INR {price}</p>
    </li>
  )
}

function ProductList() {
  return (
    <div>
      <ul>

        {fruits.map(({ id, name, price }) => (
          <ProductCard name={name} price={price} />
        ))}

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
