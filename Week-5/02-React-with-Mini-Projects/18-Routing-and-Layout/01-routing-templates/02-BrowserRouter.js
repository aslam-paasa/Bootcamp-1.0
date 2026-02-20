/**
 * 1. BrowserRouter:
 * => The BrowserRouter component is a top-level component that should
 *    be used to wrap your entire application. It enables the use of
 *    routing features throughout yout React Application.
 * => It utilizes the HTML5 History API to manipulate the URL without
 *    triggering full page reloads.
*/

import { BrowserRouter } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            {/* Other components and routing components go here */}
        </BrowserRouter>
    );
}

