import { useParams } from "react-router-dom";

function ProductDetail() {
  const { productId } = useParams();

  return (
    <>
      <h1>This page should show detail of the exact item ie {productId}</h1>
    </>
  );
}

export default ProductDetail;