import phonesDB from "./phonesDB";
import { ProductCard } from "../components/ProductCard";

export default function Category() {
  return (
    <>
      <h1> iPhones </h1>
      <ul>
        {phonesDB.data.map((product) => (
          <ProductCard {...product} noDetail />
        ))}
      </ul>
    </>
  );
}
