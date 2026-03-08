/**
 * Challenge-5: Create a FinanceSummary Component
 * You can create a FinanceSummary.js component to display the current
 * financial status.
 * 
 * Challenge-7: Display Finance Summary
 * In your FinanceSummary.js component, use the useSelector hook to display
 * the income and expenses.
*/

import { useSelector } from 'react-redux';

function FinanceSummary() {
    const income = useSelector((state) => state.income);
    const expenses = useSelector((state) => state.expenses);

    return (
        <div>
            <h1>Finance Summary</h1>
            <p>Income: ${income}</p>
            <p>Expenses: ${expenses}</p>
            <p>Balance: ${income - expenses}</p>
        </div>
    )
}

export default FinanceSummary;