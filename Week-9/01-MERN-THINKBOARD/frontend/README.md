# ThinkBoard
1. Setup Pages:
   - We have three different pages, so we have to create three router:
     > Home Page
     > Note Detail Page
     > Create Page
   - Command: 
     > Router: npm i react-router-dom
     > Notification: npm i react-hot-toast

   - Wrap our app under browser router:
    ```jsx
    import { BrowserRouter } from "react-router"

    createRoot(document.getElementById('root')).render(
        <BrowserRouter>
        <App />
        </BrowserRouter>
    )
    ```

    - Create Pages:
      > HomePage.jsx
      > CreatePage.jsx
      > NoteDetail.jsx

    - Add Page Routes in App.jsx:
    ```jsx
    const App = () => {
        return (
            <div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/create" element={<CreatePage />} />
                <Route path="/note/:id" element={<NoteDetailPage />} />
            </Routes>
            </div>
        );
    };
    ```

    - Add Toaster to our App: (Just to check toast, remove later)
    ```jsx
    import { BrowserRouter } from "react-router-dom"
    import { Toaster } from "react-hot-toast"

    createRoot(document.getElementById('root')).render(
        <BrowserRouter>
            <App />
            <Toaster />
        </BrowserRouter>
    )
    ```

2. Tailwind & DaisyUI
   - Tailwind Command:
   - DaisyUI Command:

3. React Icon:
   - Command: npm i lucide-react

4. API:
   - Command: npm i axios

5. HomePage.jsx
   a. Navbar Component