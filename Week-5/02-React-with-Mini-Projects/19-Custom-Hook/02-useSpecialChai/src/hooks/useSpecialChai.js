/**
 * Hook files use .js extension because:
 * - Hooks only process data/logic
 * - No JSX/HTML needed
 * - Plain JavaScript is sufficient
*/

import { useState, useEffect } from 'react'

export const useSpecialChai = () => {
    const [coffee, setCoffee] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        fetch('/coffee/hot')
            .then(res => {
                if(!res.ok) {
                    throw new Error('Failed to fetch coffee');
                }
                console.log(res.data);
                return res.json();
            })
            .then(data => {
                console.log(data);
                setCoffee(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message || 'Something went wrong');
                setLoading(false);
            })
    }, []);


    /**
     * Return the data from the hook:
    */ 
    return { coffee, loading, error }
}