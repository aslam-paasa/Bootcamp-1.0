import { useGetAllProductsQuery } from "../app/service/dummyData.js";

const AllProducts = () => {
  const { data, isError, isLoading } = useGetAllProductsQuery();
  console.log(data);

  if(isError) {
    return <h1>OOOh No! Something went wrong</h1>
  }

  if(isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <div>
      <h1>All Products</h1>
      {data?.products?.map((product) => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <img src={product.thumbnail} alt={product.title} />
          <p>{product.price}</p>
          <p>{product.rating}</p>
          <p>{product.stock}</p>
          <p>{product.brand}</p>
          <p>{product.category}</p>
          <p>{product.description}</p>
          <p>{product.discountPercentage}</p>
          <p>{product.images[0]}</p>
        </div>
      ))}
    </div>
  );
};

export default AllProducts;
