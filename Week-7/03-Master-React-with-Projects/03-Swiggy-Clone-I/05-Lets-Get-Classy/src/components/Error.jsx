import { useRouteError, Link } from 'react-router-dom';

const Error = () => {
  /**
   * Hook: useRouteError
   * - It is provided by react-router-dom, gives the error object
   * - Using this hook, we can provide better error message
  */
  const err = useRouteError();
  console.log(err);
  
  return (
    <div className="error-page">
      <h1>Oops! Page Not Found 😕</h1>
      <h2>Something went wrong</h2>
      
      {err && (
        <div className="error-details">
          <p>Error {err.status || '404'}</p>
          <p>{err.statusText || err.message || 'Page does not exist'}</p>
        </div>
      )}

      <div className="error-actions">
        <Link to="/" className="home-link">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
