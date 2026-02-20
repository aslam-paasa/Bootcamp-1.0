import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import { Outlet } from "react-router-dom";

/**
 * Outlet se ye hoga ki header & footer same rahega, lekin Outlet k andr
 * ki chije change hote rhegi.
*/
function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout
