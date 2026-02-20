import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";

function MealAPI() {
    /**
     * 1. State:
     *    - items: array of objects
    */ 
    const [items, setitems] = useState([]);

    /**
     * 2. useEffect: 
     *    - fetch data from the API
     *    - store the data in the items state
    */  
    useEffect(() => {
        axios
            .get("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood")
            .then((res) => {
                console.log(res.data);
                setitems(res.data.meals);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    /**
     * 3. Function:
     *    - itemslist: function to display the items
     *      - pass the items to the itemslist function
     *      - display the items in the itemslist function
    */
    const itemslist = items.map(({ strMeal, strMealThumb, idMeal }) => {
        return (
            <section className="card">
                <img src={strMealThumb} />
                <section className="content">
                    <p>{strMeal}</p>
                    <p>#{idMeal}</p>
                </section>
            </section>
        );
    });

    /**
     * 4. Return:
     *    - return the itemslist function
    */
    return <div className="items-container">{itemslist}</div>;
}

export default MealAPI;
