import {useEffect, useState} from "react"

/**
 * useCurrencyInfo - A custom hook to fetch and manage currency data.
 * 
 * @param {string} currency - The currency code (e.g., "usd", "eur").
 * @returns {object} - The currency data fetched from the API.
 */
function useCurrencyInfo(currency){
    const [data, setData] = useState({})
    
    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
        .then((res) => res.json())
        .then((res) => setData(res[currency])); // extract currency from response obj
        console.log(data);
    }, [currency]);

    console.log(data);
    return data; // return currency data
}

export default useCurrencyInfo;