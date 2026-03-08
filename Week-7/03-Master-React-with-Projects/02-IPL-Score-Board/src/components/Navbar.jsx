import { Outlet } from "react-router-dom";
import InPageNavigaion from "./InPageNavigaion";

function Navbar() {
  return (
    <div className="w-[100%] lg:w-[50%] min-h-screen mx-auto   bg-gray-900 text-white">
      {/* InPageNavigaion for the navigation bar */}
      <InPageNavigaion
        teams={[
          { title: "MATCHES", path: "/" },
          { title: "NEWS", path: "/news" },
          { title: "TABLE", path: "/pointsTable" },
        ]}
      ></InPageNavigaion>

      {/* Outlet for the child components */}
      <Outlet />
    </div>
  );
}

export default Navbar;
