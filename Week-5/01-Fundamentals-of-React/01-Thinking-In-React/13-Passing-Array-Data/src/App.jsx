const mobile = [
  { id: 1, name: "Apple", price: 150000 },
  { id: 2, name: "RedMi", price: 30000 },
  { id: 3, name: "RealMe", price: 70000 },
  { id: 4, name: "Samsung", price: 70000 }
];

function ProductCard({ id, name, price }) {
  return (
    <li key={id} style={{ listStyle: "none", border: "solid 1px black", margin: "4px", padding: "4px" }}>
      <p>{name} : INR {price}</p>
    </li>
  );
}

function ProductList({ productList, productHeader }) {
  return (
    <div>
      <h1>{productHeader}</h1>
      <ul>
        {productList.map(({ id, name, price }) => (
          <ProductCard key={id} name={name} price={price} />
        ))}
      </ul>
    </div>
  );
}

/**
 * Passing Array Data as props:
 * (a) productList={mobile}
 * (b) productHeader={"phones"}
 * => These props make it more readable (DRY). So, if we want to change
 *    data, we simply have to change here.
 */
function App() {
  return (
    <div>
      <ProductList productList={mobile} productHeader={"phones"} />
    </div>
  );
}

export default App;
