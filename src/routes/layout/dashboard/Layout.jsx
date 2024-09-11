import { Outlet } from "react-router-dom";
import { Sidebar, NavbarDash } from "../../../components";
import { useRef } from "react";
function Layout() {
  const sidebarRef = useRef();

  const handelMenuSidebar = () => {
    sidebarRef.current.classList.toggle("absolute");
  };
  return (
    <div className="">
      <NavbarDash handelMenuSidebar={handelMenuSidebar} />
      <div className="dashboardLayout flex min-h-[calc(100vh-70px)] text-white">
        <Sidebar sidebarRef={sidebarRef} />
        <div className="container overflow-hidden py-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
