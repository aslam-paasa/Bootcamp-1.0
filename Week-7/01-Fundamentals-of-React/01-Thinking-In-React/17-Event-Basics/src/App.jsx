/**
 * React Event Handling Simplified:
 * 1. You can define a function (like clickHandler) and use it as a 
 *    reference in the event, like onClick={clickHandler}.
 * 2. Alternatively, you can directly write the logic inside the event 
 *    using a callback function.
 *    (e.g., onClick={() => alert('Clicked!')}).
 * 3. Both approaches (1 & 2) work the same way.
 * 
 * 4. If your function needs parameters (like author in the complexExample
 *    function), you need to wrap the function in another function inside
 *    the event to pass the parameters 
 *   (e.g., onClick={() => complexExample(author)}).
 */


function App() {
  // Sample data
  const img = 'https://via.placeholder.com/150';
  const title = 'Our Class is a Family';
  const author = 'Shannon Olsen';

  // Click event handler
  const clickHandler = () => {
    alert('Hello world');
  };

  // Function to log the author's name
  const showAuthor = (author) => {
    console.log(author);
  };

  return (
    <div>
      <article className="book">
        {/* Image of the book */}
        <img src={img} alt="Book Cover" />
        
        {/* Title click logs the title */}
        <h1 onClick={() => console.log(title)}>{title}</h1>

        {/* Author name */}
        <h4>{author}</h4>

        {/* Button with a simple click handler */}
        <button type="button" onClick={clickHandler}>
          Click Me (Simple Alert)
        </button>

        {/* Button to show the author's name */}
        <button type="button" onClick={() => showAuthor(author)}>
          Show Author
        </button>
      </article>
    </div>
  );
}

export default App;
