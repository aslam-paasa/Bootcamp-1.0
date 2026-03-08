import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function Dashboard() {
    const [reportType, setReportType] = useState('')
    const [report, setReport] = useState({
        totalIncome: 0,
        totalExpenses: 0,
        savings: 0,
        expenseBreakdown: {},
    })

    const income = useSelector((state) => state.income)
    const expenses = useSelector((state) => state.expenses)

    const generateReport = () => {
        if (reportType === 'incomeVsExpenses') {
            const totalIncome = income.reduce(
                (acc, transaction) => acc + transaction.amount,
                0,
            )

            const totalExpenses = expenses.reduce(
                (acc, transaction) => acc + transaction.amount,
                0,
            )
            const savings = totalIncome - totalExpenses
            setReport((oldReport) => ({
                ...oldReport,
                totalIncome,
                totalExpenses,
                savings,
            }))
        } else {
            const expenseBreakdown = {}
            expenses.forEach((transaction) => {
                const { category, amount } = transaction
                if (expenseBreakdown[category]) {
                    expenseBreakdown[category] += amount
                } else {
                    expenseBreakdown[category] = amount
                }
            })
            setReport((oldReport) => ({
                ...oldReport,
                expenseBreakdown,
            }))
        }
    }
    return (
        <div className='report'>
            <h2>Financial Reports</h2>

            <div>
                <label>Select Report Type:</label>
                <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                >
                    <option value=''>Select a report type</option>
                    <option value='incomeVsExpenses'>Income vs. Expenses</option>
                    <option value='expenseBreakdown'>Expense Breakdown</option>
                </select>
            </div>

            <button onClick={generateReport}>Generate Report</button>
            {report.totalIncome > 0 && reportType === 'incomeVsExpenses' && (
                <div>
                    <h3> Report</h3>
                    <div>
                        <p>Total Income: ${report.totalIncome}</p>
                        <p>Total Expenses: ${report.totalExpenses}</p>
                        <p>Savings: ${report.savings}</p>
                    </div>
                </div>
            )}

            {Object.keys(report.expenseBreakdown).length > 0 &&
                reportType === 'expenseBreakdown' && (
                    <div>
                        <h4>Expense Breakdown:</h4>
                        <ul>
                            {Object.keys(report.expenseBreakdown).map((category, index) => (
                                <li key={index}>
                                    {category}: ${report.expenseBreakdown[category]}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
        </div>
    )
}

export default Dashboard          