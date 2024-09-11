import { icons } from "../../constants";

const NavDashSearchBar = () => {
  return (
    <div className="relative hidden md:block">
      <label
        htmlFor="search-nav-dash"
        className="text-mainColor text-2xl cursor-text absolute left-2 top-1/2 translate-y-[-50%]"
      >
        {icons.search}
      </label>
      <input
        type="text"
        id="search-nav-dash"
        placeholder="Search..."
        className="input-faild pl-9 w-40 md:focus:w-96"
      />
    </div>
  );
};

export default NavDashSearchBar;
