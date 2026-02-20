import { useState, useEffect } from "react";

const useFetch = (url, options = { method: "GET" }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(url, {...options});
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
            } catch(error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        
        if (url) {
            fetchData();
        }
        
    }, [url, options]);

    return { data, loading, error };
};

export default useFetch;