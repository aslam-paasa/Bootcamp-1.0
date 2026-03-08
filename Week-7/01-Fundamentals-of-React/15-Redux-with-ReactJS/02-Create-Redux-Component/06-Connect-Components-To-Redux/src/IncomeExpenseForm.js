/**
 * Challenge-4: Create a IncomeExpenseForm Component
 * Create a React component for your app. You can create an IncomeExpenseForm.js
 * component to input income and expenses.
 * 
 * Challenge-6: Connect Components to Redux
 * In your component that need access to the Redux store, use the useDispatch
 * hooks to connect them. 
 * 
 * For example, in IncomeExpenseForm.js, you can use the useDispatch hook to
 * dispatch the addIncome and addExpense actions.
*/

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addIncome, addExpense } from './actions.js';

function IncomeExpenseForm() {
    const [amount, setAmount] = useState(0);

    const dispatch = useDispatch();
    const handleAddIncome = () => {
        dispatch(addIncome(parseInt(amount)));
        setAmount(0);
    }

    const handleAddExpense = () => {
        dispatch(addExpense(parseInt(amount)));
        setAmount(0);
    }

    return (
        <div>
            <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
            />

            <button onClick={handleAddIncome}>Add Income</button>
            <button onClick={handleAddExpense}>Add Expense</button>
        </div>
    )
}

export default IncomeExpenseForm;