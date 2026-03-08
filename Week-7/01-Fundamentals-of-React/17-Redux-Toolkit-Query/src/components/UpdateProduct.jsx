import { useUpdateProductMutation } from "../app/service/dummyData.js";

const UpdateProduct = ({ productId }) => {
  const [updateProduct, { data, isError, isLoading }] = useUpdateProductMutation();
  console.log(data);

  if (isError) {
    return <h1>OOOh No! Something went wrong</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const handleUpdateProduct = async () => {
    try {
      const updatedProductData = {
        id: productId,
        title: "Title Updated",
      };

      await updateProduct({ id: productId, ...updatedProductData });
    } catch (err) {
      console.log("Error updating product:", err);
    }
  };
  return (
    <div>
      <h1>Update Product</h1>
      <h2>Title: {data?.title}</h2>
      <button onClick={() => handleUpdateProduct()} disabled={isLoading}>
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
