/**
 * Challenge: Hacker News
 * In this challenge, we'll be fetching data from the Hacker News API.
 * However, unlike the other effects challenges, the state and event
 * handlers for the one don't need updating. Instead, given the 'fetchData'
 * function, you'll need to synchronize you component with the Hacker News
 * API and then update the JSX appropriately.
 * 
 * This one is tricky so take your time and think it through. Anywhere in
 * the JSX you see 'null' or 'TODO' you'll need to update it.
 * 
 * Tasks:
 * 1. Fetch data based on the search query
 * 2. Display the loading state while fetching
 * 3. Fetch new results when the tag filter changes
 * 4. Allow the user to navigate to the next and previous pages
 * 5. Disable the Next and Previous buttons based on the number of pages
 * 6. Display the results in a numbered list, with each page showing the
 *    correct position of each post
 * 
 * Hint:
 * 1. Before we can worry about the JSX, we need to synchronize our component
 *    with the Hacker News API. To do that, we'll use useEffect to abstract
 *    our async bits out of React's rendering flow. Inside of our effect, 
 *    we'll invoke 'fetchData' and update 'results' and 'pages' with the
 *    response.
 * 
 *    useEffect(() => {
 *      const handleFetchData = async () => {
 *        setLoading(true);
 *        setResults([]);
 *
 *      const { results, pages, resultsPerPage } = await fetchData({
 *        query,
 *        page,
 *        tag
 *      });
 *
 *      setTotalPages(pages);
 *      setResults(results);
 *      setLoading(false);
 *      setResultsPerPage(resultsPerPage);
 *    };
 *
 *    handleFetchData();
 *  }, [query, tag, page]);
 *
 * Because 'fetchData' needs query, tag and page - we'll pass those as
 * dependencies to our effect. 
 *
 * 2. Did you catch the subtle bug inside of the useEffect from the previous
 *    hint? The bug is we aren't ignoring requests from previous renders.
 *    If you change the page before the previous response comes back, the app
 *    will big out if the new request beat the old request.
 * 
 *    To fix this, we want to add an 'ignore' flag to our effect and only
 *    update our state if the results are for the current render.
 * 
 *    useEffect(() => {
 *      let ignore = false;
 *
 *      const handleFetchData = async () => {
 *        setLoading(true);
 *        setResults([]);
 *
 *        const { results, pages, resultsPerPage } = await fetchData({
 *          query,
 *          page,
 *          tag
 *        });
 *
 *        if (ignore === true) return;
 *
 *        setTotalPages(pages);
 *        setResults(results);
 *        setLoading(false);
 *        setResultsPerPage(resultsPerPage);
 *      };
 *
 *      handleFetchData();
 *
 *      return () => {
 *        ignore = true;
 *      };
 *    }, [query, tag, page]);
 *
 * 3. One of the trickier parts is getting the correct position/number of
 *    each post.
 * 
 *    There are three values we need to derive the 'position: resultsPerPage',
 *    'page' and 'index'.
 * 
 *    The 'position' is going to be how many results there are per page
 *    (resultsPerPage) times the page the user is currently on (page) plus
 *    the 'index' of our 'map', plus '1'. 
 * 
 *    const position = resultsPerPage * page + index + 1;
 * 
 *    So, if we're on the third page, assuming the 'resultsPerPage' is 20,
 *    the 'position' will start at 20*2+0+1, or 41, and go until 20*2+19+1,
 *    or 60.
 * 
 *    Finally, we'll add it to our UI:
 *    <span>{position}.</span>
*/


import './App.css'
import { useState, useEffect } from 'react'


const fetchData = async ({ query = "", page = 0, tag = "" }) => {
  return fetch(
    `https://hn.algolia.com/api/v1/search?query=${query}&tags=${encodeURIComponent(tag)}&page=${page}`)
      .then((response) => response.json())
      .then((json) => ({
        results: json.hits || [],
        pages: json.nbPages || 0,
        resultsPerPage: json.hitsPerPage || 20
      })
    );
};

function HackerNewsSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [tag, setTag] = useState("story");
  const [page, setPage] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(0);
  const [totalPages, setTotalPages] = useState(50);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;

    const handleFetchData = async () => {
      setLoading(true);
      setResults([]);

      const { results, pages, resultsPerPage } = await fetchData({
        query,
        page,
        tag
      });

      if (ignore === true) return;

      setTotalPages(pages);
      setResults(results);
      setLoading(false);
      setResultsPerPage(resultsPerPage);
    };

    handleFetchData();

    return () => {
      ignore = true;
    };
  }, [query, tag, page]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setPage(0);
  };

  const handleTag = (e) => {
    setTag(e.target.value);
    setPage(0);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  return (
    <main>
      <h1>Hacker News Search</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="query">Search</label>
          <input
            type="text"
            id="query"
            name="query"
            value={query}
            onChange={handleSearch}
            placeholder="Search Hacker News..."
          />
        </div>
        <div>
          <label htmlFor="tag">Tag</label>
          <select id="tag" name="tag" onChange={handleTag} value={tag}>
            <option value="story">Story</option>
            <option value="ask_hn">Ask HN</option>
            <option value="show_hn">Show HN</option>
            <option value="poll">Poll</option>
          </select>
        </div>
      </form>
      <section>
        <header>
          <h2>
            <span>
              {totalPages === 0
                ? "No Results"
                : `Page ${page + 1} of ${totalPages}`}
            </span>
            {loading && <div className="loader"></div>}
          </h2>
          <div>
            <button
              className="link"
              onClick={handlePrevPage}
              disabled={page <= 0}
            >
              Previous
            </button>
            <button
              className="link"
              onClick={handleNextPage}
              disabled={page + 1 >= totalPages}
            >
              Next
            </button>
          </div>
        </header>
        <ul>
          {results.map(({ url, objectID, title }, index) => {
            const href =
              url || `https://news.ycombinator.com/item?id=${objectID}`;

            const position = resultsPerPage * page + index + 1;

            return (
              <li key={objectID}>
                <span>{position}.</span>
                <a href={href} target="_blank" rel="noreferrer">
                  {title}
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}


function App() {

  return (
    <div>
      <HackerNewsSearch />
    </div>
  )
}

export default App
