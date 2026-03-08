import { useDeleteProductMutation } from "../app/service/dummyData";

const DeleteProduct = ({ productId }) => {
  const [deleteProduct, { data, isError, isLoading }] = useDeleteProductMutation();
  console.log(data);

  if (isError) {
    return <h1>OOOh No! Something went wrong</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const handleDeleteProduct = async () => {
    try {
      await deleteProduct({ id: productId });
    } catch (err) {
      console.log("Error deleting product:", err);
    }
  };

  return (
    <div>
      <h1>Delete Product</h1>
      <h2>
        {data?.title ? `Product "${data.title}" deleted successfully` : ""}
      </h2>
      <button onClick={() => handleDeleteProduct()} disabled={isLoading}>
        Delete Product
      </button>
    </div>
  );
};

export default DeleteProduct;
