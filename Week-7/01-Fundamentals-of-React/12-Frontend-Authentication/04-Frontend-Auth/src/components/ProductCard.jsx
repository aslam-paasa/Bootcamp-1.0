import { Link } from "react-router-dom";

export function ProductCard({
    id,
    name,
    price,
    memory,
    currency,
    details,
    noDetail
}) {
    return (
        <li
            style={{
                padding: "1rem",
                listStyle: "none",
                margin: "1rem",
                border: "1px solid #efefef"
            }}
        >
            <div style={{ fontSize: "large" }}>
                {name} {memory} GB
            </div>
            <div>
                Price: {price} {currency}
            </div>
            {noDetail && <Link to={`/product/${id}`}> View Details </Link>}
            {!noDetail && <p> {details} </p>}
        </li>
    );
}
