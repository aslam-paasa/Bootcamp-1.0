/**
 * Implement a useDebounce hook that delays state updates until a specified
 * delay has passed without any further changes to the provided value.
*/

import { useState } from 'react';
import useDebounce from '../hook/useDebounce.jsx';

function App() {
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 1000);

  return (
    <div>
      <input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      <p>Debounced keyword: {debouncedKeyword}</p>
    </div>
  );
}

export default App;
