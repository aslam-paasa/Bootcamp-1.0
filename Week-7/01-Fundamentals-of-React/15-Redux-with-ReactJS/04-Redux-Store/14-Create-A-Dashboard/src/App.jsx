/**
 * Challenge-6: Create a Dashboard
 * Create a financial reports dashboard page where users can generate
 * and view financial reports based on their income and expenses.
 * Implement the following features:
 * 1. Create a functional component Dashboard in the Dashboard.jsx file.
 * 2. Inside the Dashboard component:
 *    a. Setup state variables using the useState hook to manage the
 *       following:
 *       > reportType: A string to store the selected report type,
 *         initially set to an empty string.
 *       > report: An object with the following properties, initially
 *         set to default values:
 *         - totalIncome: 0
 *         - totalExpenses: 0
 *         - savings: 0
 *         - expenseBreakdown: An empty object
 *    b. Use the useSelector hook to get the income and expenses data
 *       from the Redux store.
 *    c. Implement a function generateReport:
 *       > If the reportType is "incomeVsExpenses":
 *         - Calculate the totalIncome by reducing the income data.
 *         - Calculate the totalExpenses by reducing the expenses data.
 *         - Calculate savings as the diff b/w totalIncome & totalExpenses.
 *         - Update the report state with these values.
 *       > If the reportType is "expenseBreakdown":
 *         - Initialize an empty object expenseBreakdown.
 *         - Iterate through the expenses data and group expenses by
 *           their categories, summing up the amounts.
 *         - Update the report state and the expenseBreakdown object. 
 *    d. Create a dropdown menu (<select>) to allow the user to select
 *       the report type ("Income vs Expenses" or "Expense Breakdown").
 *    e. Create a button that, when clicked, calls the generateReport
 *       function to generate the selected report.
 *    f. Display the generated report based on the reportType:
 *       > If the reportType is "incomeVsExpenses", display the total
 *         income, total expenses, and savings.
 *       > If the reportType is "expenseBreakdown", display an itemized
 *         list of expenses grouped by category.
*/


import IncomeExpenseForm from "./pages/IncomeExpenseForm";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import Savings from "./pages/Savings";

export default function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/income">Income</Link>
              </li>
              <li>
                <Link to="/expenses">Expense</Link>
              </li>
              <li>
                <Link to="/savings">Savings</Link>
              </li>
              <li>
                <Link to="/">New Entries</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/income" element={<Income />} />
            <Route path="/expenses" element={<Expense />} />
            <Route path="/savings" element={<Savings />} />
            <Route path="/" element={<IncomeExpenseForm />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
