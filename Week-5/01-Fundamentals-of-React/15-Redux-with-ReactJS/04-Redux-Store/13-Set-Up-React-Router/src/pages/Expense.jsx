import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses } from "../actions";

function Expense() {
    const dispatch = useDispatch();
    const expenses = useSelector((state) => state.expenses);

    const totalExpenses = expenses.reduce((acc, value) => value.amount + acc, 0);

    useEffect(() => {
        dispatch(fetchExpenses());
    }, [dispatch]);

    return (
        <div>
            <h1>Expense Page</h1>
            <ul>
                {expenses.map((transaction, index) => (
                    <li key={index}>
                        {transaction.description}: ${transaction.amount}
                    </li>
                ))}
            </ul>
            <h2>Summary</h2>
            <div>Total Expenses: ${totalExpenses}</div>
        </div>
    );
}

export default Expense;
