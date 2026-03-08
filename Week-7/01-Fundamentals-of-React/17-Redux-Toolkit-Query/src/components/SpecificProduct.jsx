import { useGetProductByIdQuery } from "../app/service/dummyData.js";

const SpecificProduct = () => {
  const { data, isError, isLoading } = useGetProductByIdQuery(10);
  console.log(data);

  if (isError) {
    return <h1>OOOh No! Something went wrong</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Specific Product {data?.id}</h1>
      <h2>{data?.title}</h2>
      <img src={data?.thumbnail} alt={data?.title} />
      <p>{data?.price}</p>
      <p>{data?.rating}</p>
      <p>{data?.stock}</p>
    </div>
  );
};

export default SpecificProduct;
