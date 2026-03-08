function Income() {
    const dispatch = useDispatch()
    const income = useSelector((state) => state.income)
    const totalIncome = income.reduce((acc, value) => value.amount + acc, 0)
    useEffect(() => {
        dispatch(fetchIncome())
    }, [dispatch])
    return (
        <div>
            <h1>Income Page</h1>
            <ul>
                {income.map((transaction, index) => (
                    <li key={index}>
                        {transaction.description}: ${transaction.amount}
                    </li>
                ))}
            </ul>
            <h2>Summary</h2>
            <div>Total Income: ${totalIncome}</div>
        </div>
    )
}
