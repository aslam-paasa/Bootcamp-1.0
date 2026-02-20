/**
 * Challenge-4: Create a IncomeExpenseForm Component
 * Create a React component for your app. You can create an IncomeExpenseForm.js
 * component to input income and expenses.
*/

import { useState } from 'react';

function IncomeExpenseForm() {
    const [amount, setAmount] = useState(0);

    return (
        <div>
            <input 
                type="text" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
            />

            <button>Add Income</button>
            <button>Add Expense</button>
        </div>
    )
}

export default IncomeExpenseForm;