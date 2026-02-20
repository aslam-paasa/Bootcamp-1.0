import { Link, useParams } from "react-router-dom";
import phonesDB from "./phonesDB";
import { ProductCard } from "../components/ProductCard";

export default function ProductDetail() {
    const { productId } = useParams();

    function getProductDetails(products, productId) {
        return products.find((product) => product.id === productId);
    }

    const product = getProductDetails(phonesDB.data, productId);

    return (
        <>
            <ProductCard {...product} />
            <Link to="/category"> See All </Link>
        </>
    );
}
