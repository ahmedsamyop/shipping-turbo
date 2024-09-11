import { useRef, useState } from "react";
import { icons } from "../../constants";
import { NavDashSearchBar } from "../";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userlogout } from "../../app/features/userSlice";

// eslint-disable-next-line react/prop-types
const NavbarDash = ({ handelMenuSidebar }) => {
  const [menuStatus, setmenuStatus] = useState(false);
  const profileMenu = useRef();
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // Handel Menu Profile
  const handelMenu = () => {
    profileMenu.current.classList.toggle("top-menu");
    if (profileMenu.current.classList.contains("top-menu")) {
      setmenuStatus(true);
    } else {
      setmenuStatus(false);
    }
  };
  const handelLinkDash = () => {
    if (menuStatus) {
      profileMenu.current.classList.remove("top-menu");
      setmenuStatus(false);
    }
  };
  const handelLogout = async (e) => {
    e.preventDefault();
    dispatch(userlogout());
  };
  // const handelSearch = (e) => {
  //   e.preventDefault();
  // };
  return (
    <nav className="">
      <div className="bg-mainBgColor px-4 h-[70px] flex justify-between items-center relative">
        {/* start */}
        <div className="flex gap-2">
          <div className="text-2xl cursor-pointer menu-icon-hover" onClick={handelMenuSidebar}>
            {icons.menu3Line}
          </div>
          <h3 className="gradient-text text-2xl md:text-3xl text-center font-bold">Sys</h3>
        </div>
        {/* center */}
        <NavDashSearchBar />
        {/* end */}
        <div className="text-2xl cursor-pointer menu-icon-hover" onClick={handelMenu}>
          {icons.user}
        </div>
        {/* user Menu */}
        <div className="menu-profile" ref={profileMenu}>
          {/* USER Info */}
          <div className="pb-2 border-b">
            <p className="truncate">{`${userData.fname} ${userData.lname}`}</p>
            <p className="text-sm text-mainColor truncate">{userData.email}</p>
          </div>
          <ul className="">
            <li>
              <Link
                to={"/dashboard/profile"}
                className="menu-link px-0 text-base"
                onClick={handelLinkDash}
              >
                Profile
              </Link>
            </li>
            <li>
              <span className="menu-link px-0 text-base cursor-pointer" onClick={handelLogout}>
                Logout
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarDash;
