
/**
 * 2. Routes:
 * => The Routes component is used to define the routes for your application.
 *    Inside the Routes component, you specify individual Route components
 *    for each route in your application.
 * => The Routes component can contain multiple Route components, each
 *    representing a different view or page.
*/

import { BrowserRouter } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Define Route components here */}
            </Routes>
        </BrowserRouter>
    );
}