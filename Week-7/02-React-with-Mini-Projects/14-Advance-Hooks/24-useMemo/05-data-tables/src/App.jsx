/**
 * Challenge: Data Table
 * Given an application that already has the completed JSX and event
 * handlers for deciding how you should filter and sort the data
 * (searchTerm, sortColumn, and sortOrder), your job is to fetch the
 * data(using the fetchData fn), and then, in the most performant way
 * possible, using searchItem, sortColumn, and sortOrder, update the
 * filteredData and sortedVariables.
 * 
 * filteredData should be a memoized array of data that has been filtered
 * based on the searchTerm.
 * 
 * sortedData should be a memoized array of filteredData that has been
 * sorted based on the sortColumn and sortOrder.
 * 
 * Tasks:
 * 1. The user can search Pokemon
 * 2. The user can sort Pokemon
 * 3. The Pokemon data is correctly memoized
 * 
 * Hint:
 * 1. Before you can worry about sorting or filtering the data, you first
 *    need to get it into your component. To do that, invoke the provided
 *    fetchData fn inside of useEffect with an empty dependency array.
 * 
 *    useEffect(() => {
 *       const handleFetchData = async () => {
 *           const data = await fetchData();
 *           setData(data);
 *       };
 *
 *       handleFetchData();
 *    }, []);
 * 
 * 2. Before you can show the data in the table, you'll first want to
 *    filter it based on the search term and then sort it based in the
 *    sortColumn and sortOrder. To do that, you'll memoize two 
 *    calculations - one for the filtered data and one for the sorted data.
 * 
 *    First, try filtering the data.
 * 
 *    What you really want to do is create a new array that only contains
 *    the row that "match" the search term (which you can do by checking
 *    if the row's name, id, or weight includes the searchTerm).
 * 
 *    const filteredData = data
 *      .map((row) => {
 *        if (
 *          row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
 *          String(row.id).includes(searchTerm) ||
 *          String(row.weight).includes(searchTerm)
 *        ) {
 *          return row;
 *        }
 *
 *        return null;
 *      })
 *      .filter(Boolean);
 *
 *    If you're not familiar with .filter(Boolean), it's a simple way to
 *    remove any falsy values from an array. So in this case, if a row
 *    doesn't match the search term, we return null and then filter
 *    all of those out of the array so we're only left with truthy values
 *    (values that matched the search term).
 * 
 *    Now, instead of recalculating filteredData on every render, make
 *    sure to memoize it and only re-calculate it when necessary. To do
 *    that, you can use useMemo.
 * 
 *    const filteredData = useMemo(() => {
 *       return data
 *          .map((row) => {
 *            if (
 *              row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
 *              String(row.id).includes(searchTerm) ||
 *              String(row.weight).includes(searchTerm)
 *            ) {
 *              return row;
 *            }
 *
 *            return null;
 *          })
 *          .filter(Boolean);
 *    }, [data, searchTerm]);
 * 
 * 
 * 3. Once you've filtered the data based on the search term, the next
 *    thing you'll do is sort it based on the sortColumn and sortOrder.
 *    To do this, you'll have a fn that calculates a new array, after
 *    sorting the filtered data based on the sortColumn and sortOrder.
 *    You'll then memoize that calculation using useMemo so it only gets
 *    re-calculated whenever filteredData, sortColumn, or sortOrder
 *    changes.
 * 
 *    const sortedData = useMemo(() => {
 *       const sorted = [...filteredData];
 *      
 *       return sorted.sort((a, b) => {
 *         let aValue = a[sortColumn];
 *         let bValue = b[sortColumn];
 *      
 *         if (sortOrder === "asc") {
 *           return aValue > bValue ? 1 : -1;
 *         } else {
 *           return aValue < bValue ? 1 : -1;
 *         }
 *       });
 *      }, [filteredData, sortColumn, sortOrder]);
 */



import './App.css'
import React, { useState, useEffect, useMemo } from 'react'


const fetchData = async () => {
   const pokemon = [
    { id: 1, name: "bulbasaur", weight: 69 },
    { id: 2, name: "ivysaur", weight: 130 },
    { id: 3, name: "venusaur", weight: 1000 },
    { id: 4, name: "charmander", weight: 85 },
    { id: 5, name: "charmeleon", weight: 190 },
    { id: 6, name: "charizard", weight: 905 },
    { id: 7, name: "squirtle", weight: 90 },
    { id: 8, name: "wartortle", weight: 225 },
    { id: 9, name: "blastoise", weight: 855 },
    { id: 10, name: "caterpie", weight: 29 },
    { id: 11, name: "metapod", weight: 99 },
    { id: 12, name: "butterfree", weight: 320 },
    { id: 13, name: "weedle", weight: 32 },
    { id: 14, name: "kakuna", weight: 100 },
    { id: 15, name: "beedrill", weight: 295 },
    { id: 16, name: "pidgey", weight: 18 },
    { id: 17, name: "pidgeotto", weight: 300 },
    { id: 18, name: "pidgeot", weight: 395 },
    { id: 19, name: "rattata", weight: 35 },
    { id: 20, name: "raticate", weight: 185 },
    { id: 21, name: "spearow", weight: 20 },
    { id: 22, name: "fearow", weight: 380 },
    { id: 23, name: "ekans", weight: 69 },
    { id: 24, name: "arbok", weight: 650 },
    { id: 25, name: "pikachu", weight: 60 },
    { id: 26, name: "raichu", weight: 300 },
    { id: 27, name: "sandshrew", weight: 120 },
    { id: 28, name: "sandslash", weight: 295 },
    { id: 29, name: "nidoran-f", weight: 70 },
    { id: 30, name: "nidorina", weight: 200 },
    { id: 31, name: "nidoqueen", weight: 600 },
    { id: 32, name: "nidoran-m", weight: 90 },
    { id: 33, name: "nidorino", weight: 195 },
    { id: 34, name: "nidoking", weight: 620 },
    { id: 35, name: "clefairy", weight: 75 },
    { id: 36, name: "clefable", weight: 400 },
    { id: 37, name: "vulpix", weight: 99 },
    { id: 38, name: "ninetales", weight: 199 },
    { id: 39, name: "jigglypuff", weight: 55 },
    { id: 40, name: "wigglytuff", weight: 120 },
    { id: 41, name: "zubat", weight: 75 },
    { id: 42, name: "golbat", weight: 550 },
    { id: 43, name: "oddish", weight: 54 },
    { id: 44, name: "gloom", weight: 86 },
    { id: 45, name: "vileplume", weight: 186 },
    { id: 46, name: "paras", weight: 54 },
    { id: 47, name: "parasect", weight: 295 },
    { id: 48, name: "venonat", weight: 300 },
    { id: 49, name: "venomoth", weight: 125 }
  ];

  return pokemon;
};

function DataTable() {
  const [data, setData] = useState([]);
  const [isRTL, setIsRTL] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const handleFetchData = async () => {
      const data = await fetchData();
      setData(data);
    };

    handleFetchData();
  }, []);

  const handleHeaderClick = (column) => {
    if (column === sortColumn) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const handleToggleClick = () => {
    setIsRTL((prev) => !prev);
  };

  const filteredData = useMemo(() => {
    return data
      .map((row) => {
        if (
          row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          String(row.id).includes(searchTerm) ||
          String(row.weight).includes(searchTerm)
        ) {
          return row;
        }

        return null;
      })
      .filter(Boolean);
  }, [data, searchTerm]);

  const sortedData = useMemo(() => {
    const sorted = [...filteredData];

    return sorted.sort((a, b) => {
      let aValue = a[sortColumn];
      let bValue = b[sortColumn];

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [filteredData, sortColumn, sortOrder]);

  return (
    <div>
      <header>
        <button className="secondary" onClick={handleToggleClick}>
          Toggle Columns
        </button>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search items"
        />
      </header>

      <table className={isRTL ? "rtl" : ""}>
        <thead>
          <tr>
            <th>
              <button
                className="link"
                onClick={() => handleHeaderClick("id")}
                aria-label="ID"
              >
                ID {sortColumn === "id" && (sortOrder === "asc" ? "↑" : "↓")}
              </button>
            </th>
            <th>
              <button
                className="link"
                onClick={() => handleHeaderClick("name")}
                aria-label="Name"
              >
                Name{" "}
                {sortColumn === "name" && (sortOrder === "asc" ? "↑" : "↓")}
              </button>
            </th>
            <th>
              <button
                className="link"
                onClick={() => handleHeaderClick("weight")}
                aria-label="Weight"
              >
                Weight{" "}
                {sortColumn === "weight" && (sortOrder === "asc" ? "↑" : "↓")}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.weight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


function App() {

  return (
    <div>
      <DataTable />
    </div>
  )
}

export default App
