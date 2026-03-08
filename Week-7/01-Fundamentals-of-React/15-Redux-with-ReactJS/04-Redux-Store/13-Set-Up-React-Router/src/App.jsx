/**
 * Challenge-5: Set up React Router
 * 1. Install react-router-dom if you haven't already.
 * 2. Configure routes for Income, Expense, Savings, and New Entry
 *    pages.
 * 3. Use the components you created earlier as page components for
 *    each route.
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
