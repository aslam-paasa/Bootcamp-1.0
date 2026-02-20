import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSavings } from "../actions";

function Savings() {
    const dispatch = useDispatch();
    const savings = useSelector((state) => state.savings);

    const totalSavings = savings.reduce((acc, value) => value.amount + acc, 0);

    useEffect(() => {
        dispatch(fetchSavings());
    }, [dispatch]);

    return (
        <div>
            <h1>Savings Page</h1>
            <ul>
                {savings.map((transaction, index) => (
                    <li key={index}>
                        {transaction.description}: ${transaction.amount}
                    </li>
                ))}
            </ul>
            <h2>Summary</h2>
            <div>Total Savings: ${totalSavings}</div>
        </div>
    );
}

export default Savings;
