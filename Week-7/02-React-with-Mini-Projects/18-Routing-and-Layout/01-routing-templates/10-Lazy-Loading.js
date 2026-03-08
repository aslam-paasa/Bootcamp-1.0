/**
 * Lazy Loading:
 * => The way we have written the code, complete bundle comes back
 *    index.html, index.js, all at one, then we do whatever the client
 *    side routing we want.
 * 
 * Q. What is the problem in this approach?
 * => The problem is a person will just come to the landing page, they
 *    will not go to dashboard page or some other page, then why are
 *    we getting full index.js file which contains the code of the
 *    landing page as well if we the page is only in dashboard.
 * => The website could have 20 different pages. If we person goes to
 *    page-1, should they not only receive the code for page-1, and
 *    if they route to page-2, shouldn't then they receive the code
 *    for page-2. Would it be more optimal, not giving them complete
 *    big bundle at once, but giving them a smaller bundle once, and
 *    if they switch to other page, then give another bundle.
 * => Basically incrementally give them the website rather than giving
 *    them the whole thing together.
 * => To tackle this issue, react-router-dom introduced something
 *    called lazy loading. They will lazily load the code of the component
 *    in which the person is not on.
*/

/**
 * Lazy Loading in React is a technique used to optimize the performance
 * of a web application by deferring the loading of certain components
 * until they are actually needed. This can significantly reduce the
 * initial bundle size and improve the overall loading time of the
 * application.
 * 
 * In React, lazy loading is typically achieved using the React.lazy
 * function along with the 'Suspense' component. The React.lazy function
 * allows you to load a component lazily, meaning it is only fetched
 * when the component is actually rendered. Here's a simple example:
*/

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Landing } from './components/Landing'
// const Dashboard = React.lazy(() => import('./components/Dashboard'));

function App() {

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/" element={<Landing />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

/**
 * const Dashboard = React.lazy(() => import('./components/Dashboard'));
 * => It says whatever the component you have, wrap it inside 
 *    React.lazy(() => import('./components/Dashboard'))
 *    which takes a function as an input which will lazily import your
 *    component when it means it. Once we have it, put this in our
 *    element:
 * 
 *    <Route path="/dashboard" element={<Dashboard />} />
 * 
 * => This will make our website more optimized.
 * 
 * Note: add "default" while exporting your component
*/

// export default function Dashboard() {
//     return (
//         <div>Dashboard Page</div>
//     )
// }

// export default function Landing() {
//     return (
//         <div>Landing Page</div>
//     )
// }

const Dashboard = React.lazy(() => import('./components/Dashboard'))
const Landing = React.lazy(() => import('./components/Landing'))

/**
 * Our routes will now lazily load, rather than all at once.
*/

return (
    <div>
        <BrowserRouter>
            <Appbar />
            <Routes>
                <Route path="/dashboard" element={<Suspense fallback={"loading..."}><Dashboard /></Suspense>} />
                <Route path="/" element={<Suspense fallback={"loading..."}><Landing /></Suspense>} />
            </Routes>
        </BrowserRouter>
    </div>
)

/**
 * Q. What is Suspense API?
 * => During <Landing /> page fetching, if there are any network issue
 *    page loading might take some time. I have to render a dashboard
 *    but I don't have a dashboard. It's coming from the backend.
 * => For cases like these, react provide us the Suspense API which
 *    basically says if <landing /> component is suspended or data is
 *    not yet there until then render the "fallback={loading...}".
 *    Now, until the data is fetched to render, loading... will be
 *    displayed on the screen.
*/