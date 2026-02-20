import { useState } from "react";

import Navigation from "./Navigation/Nav";
import Products from "./Products/Products"; 
import products from "./db/data";
import Recommended from "./Recommended/Recommended";
import Sidebar from "./Sidebar/Sidebar";
import Card from "./components/Card";
import "./index.css";


function App() {
  /**
   * State:
   * a. selectedCategory: Tracks which filter is currently selected (Nike, Adidas etc)
   * b. query            : Stores the search text entered by user
  */
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState("");


  /**
   * Search Functionality:
   * a. handleInputChange: Updates query state when user types in search box
   * b. filteredItems    : Filters products based on search query
  */
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems = products.filter(
    (product) => product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );


  /**
   * Filter Functionality:
   * a. handleChange: Updates selectedCategory when sidebar filter is clicked
   * b. handleClick : Updates selectedCategory when recommended filter is clicked
   */
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };


  /**
   * Main Filtering Logic (filteredData function):
   * a. Takes products, selected filter and search query as input
   * b. First applies search filter if query exists
   * c. Then applies category/color/company filter if selected
   * d. Maps filtered products to Card components
   * e. Return the filtered Card components to UI
   */
  function filteredData(products, selected, query) {
    let filteredProducts = products;

    if (query) {
      filteredProducts = filteredItems;
    }

    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ category, color, company, newPrice, title }) =>
          category === selected ||
          color === selected ||
          company === selected || 
          newPrice === selected ||
          title === selected
      );
    }

    return filteredProducts.map(
      ({ img, title, star, reviews, prevPrice, newPrice }) => (
        <Card
          key={Math.random()}
          img={img}
          title={title}
          star={star}
          reviews={reviews}
          prevPrice={prevPrice}
          newPrice={newPrice}
        />
      )
    );
  }
  const result = filteredData(products, selectedCategory, query);

  /**
   * Return the App component, which contains:
   * a. Sidebar    : It is used to display the sidebar.
   * b. Navigation : It is used to display the navigation.
   * c. Recommended: It is used to display the recommended products.
   * d. Products   : It is used to display the products.
   */
  return (
    <>
      <Sidebar handleChange={handleChange} />
      <Navigation query={query} handleInputChange={handleInputChange} />
      <Recommended handleClick={handleClick} />
      <Products result={result} />
    </>
  );
}

export default App;