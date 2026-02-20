import { useContext } from "react";
import { CartContext } from "../main";

function ProductList({ products }) {

  const { handleCartUpdate } = useContext(CartContext);

  return (
    <div>
      {products.map((item) => {
        const { id, name, price } = item;

        return (
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
            <button onClick={() => handleCartUpdate(item)}> Add to Cart </button>
          </div>
        )
      })}
    </div>
  );
}


export default ProductList
