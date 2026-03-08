import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEntry } from "../actions";

function IncomeExpenseForm() {
    const dispatch = useDispatch();

    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [entryType, setEntryType] = useState("income");

    const handleAddEntry = (e) => {
        e.preventDefault();

        dispatch(addEntry({ description, amount: parseFloat(amount), entryType }));
        setDescription("");
        setAmount("");
        setEntryType("income");
    };

    return (
        <div>
            <h1>New Entry Page</h1>
            <form>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label>Amount:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <div>
                    <label>Entry Type:</label>
                    <select
                        value={entryType}
                        onChange={(e) => setEntryType(e.target.value)}
                    >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
                <button onClick={handleAddEntry}>Add Entry</button>
            </form>
        </div>
    );
}

export default IncomeExpenseForm;
