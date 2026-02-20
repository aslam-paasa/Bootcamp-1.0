/**
 * Object Data:
 * Q. Write a React component to display all the properties of product
 *    object on the DOM.
*/

const product = {
  id: "AC1023",
  name: "Air Conditioner",
  price: 29600,
  specification: "1 Ton, 4 Star Rating",
  warranty: "5 Years Compressor Warranty"
};

function Product() {
  const { name, price, specification, warranty } = product;
  return (
    <div style={{ textAlign: "center" }}>
      <h1> { name } </h1>
      <p> Price: INR { price } </p>
      <p> Specification: { specification }</p>
      <p> Warranty: { warranty }</p>
    </div>
  );
}

function App() {

  return (
    <div>
      <Product />
    </div>
  )
}

export default App
