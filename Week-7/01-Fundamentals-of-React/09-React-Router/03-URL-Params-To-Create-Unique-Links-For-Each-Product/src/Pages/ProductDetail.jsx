import { useParams } from "react-router-dom";

/**
 * Step-4: Reading productId from URL
 * - Once we created the ProductDetail Component, we are passing the 
 *   unique ID that we have created in Category though Routes to 
 *   ProductDetail.
 * - useParams is used to read the unique IDs coming from the Routes.
*/
function ProductDetail() {
  const { productId } = useParams();

  return (
    <>
      <h1>This page should show detail of the exact item ie {productId}</h1>
    </>
  );
}

export default ProductDetail;