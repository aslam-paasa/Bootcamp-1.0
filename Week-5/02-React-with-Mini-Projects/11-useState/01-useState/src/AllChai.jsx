import { useState, useEffect } from 'react'

const AllChai = () => {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setMenu([
                {id: 1, name: 'Green Chai', price: 10},
                {id: 2, name: 'Black Chai', price: 20},
                {id: 3, name: 'Masala Chai', price: 30},
            ]);
        }, 2000);
    }, []);

    /**
     * Keys:
     * - Unique Identifier
     *   a. key is same    = reuse DOM node
     *   b. key is new     = add a new DOM node
     *   c. key is missing = remove the DOM node
     * - Note: Without key, we face issues like re-render, reorder
     * */ 
    return (
        <div>
            <h2>Available Chai</h2>
            <ul>
                {menu.map((chai) => (
                    <li key={chai.id}>{chai.name} - {chai.price}</li>
                ))}
            </ul>
        </div>
    )
}

export default AllChai