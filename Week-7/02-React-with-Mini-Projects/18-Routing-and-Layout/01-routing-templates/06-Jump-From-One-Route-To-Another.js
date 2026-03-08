import { BrowserRouter } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/" element={<Landing />} />
            </Routes>
        </BrowserRouter>
    )
}

/**
 * This much code is enough for us to do Client Side Rendering, which
 * means this much is enough for us to create dynamic application
 * which only gets the bundle once, and based on the current route
 * renders the right page i.e. either landing page or dashboard.
*/