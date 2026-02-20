import { useContext } from "react";
import { CartContext } from "../main";

function ProductList({ products }) {

  const { cartLogger } = useContext(CartContext);

  return (
    <div>
      {products.map(({ id, name, price }) => (
        <div
          key={id}
          style={{
            border: "1px solid gray",
            margin: "0.5rem",
            padding: "0.5rem"
          }}
        >
          <h2>
            {name} <small> INR {price} </small>
          </h2>
          <button onClick={cartLogger}> Add to Cart </button>
        </div>
      ))}
    </div>
  );
}


export default ProductList
