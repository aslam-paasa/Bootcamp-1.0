import React from "react";
import { useAddProductMutation } from "../app/service/dummyData.js";

const AddNewProduct = () => {
  const [addProduct, { data, isError, isLoading }] = useAddProductMutation();
  console.log(data);

  if (isError) {
    return <h1>OOOh No! Something went wrong</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const handleAddProduct = async () => {
    try {
        const newProductData = {
            id: 1,
            title: "Amazing T-shirt",
            description: "A t-shirt with a funny design",
            price: 100,
            stock: 10,
            category: "Clothing",
            thumbnail: "https://via.placeholder.com/150",
            rating: 4.5,
            brand: "Awesome Brand",
            images: ["https://via.placeholder.com/150", "https://via.placeholder.com/150"],
        }

        await addProduct(newProductData);
    } catch (err) {
        console.log("Error adding new product:", err);
    }
  };

  return (
    <div>
      <h1>Add New Product</h1>
      <h2>Title: {data?.title}</h2>
      <h2>Description: {data?.description}</h2>
      <h2>Price: {data?.price}</h2>
      <h2>Stock: {data?.stock}</h2>
      <h2>Category: {data?.category}</h2>
      <h2>Thumbnail: {data?.thumbnail}</h2>
      <h2>Rating: {data?.rating}</h2>
      <h2>Brand: {data?.brand}</h2>
      <h2>Images: {data?.images}</h2>
      <button
        onClick={() => handleAddProduct()}
        disabled={isLoading}
      >
        Add New Product
      </button>
    </div>
  );
};

export default AddNewProduct;
