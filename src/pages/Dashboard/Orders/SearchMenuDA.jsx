/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { icons } from "../../../constants";

const SearchMenuDA = ({ allDA }) => {
  // input value
  const [searchValue, setSearchValue] = useState("");
  // display all DA to select
  const [displayMenu, setDisplayMenu] = useState(false);
  // all DA data
  const [menuData, setMenuData] = useState([]);

  // Effect to get all DA data
  useEffect(() => {
    setMenuData(allDA);
  }, [allDA]);

  // filter all DA data by search
  const handelSearchChangeValue = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value !== "") {
      const filterByEmail = allDA.filter((ele) => ele.email.includes(value));
      setMenuData(filterByEmail);
    } else {
      setMenuData(allDA);
    }
  };
  // handel select from all delivery
  const handelSelectSearchMenu = (e) => {
    const value = e.currentTarget.lastElementChild.textContent;
    setSearchValue(value);
    setDisplayMenu(false);
  };

  return (
    <>
      <input
        type="text"
        id="daEmail"
        name="daEmail"
        value={searchValue}
        onChange={handelSearchChangeValue}
        onFocus={() => setDisplayMenu(true)}
        className={`input-faild py-1 rounded-md border text-base"`}
      />
      {displayMenu && menuData.length > 0 && (
        <ul className="bg-menuColor px-2 relative w-full max-h-40 overflow-y-scroll rounded-2xl z-50">
          <div
            className="ml-auto w-fit text-2xl cursor-pointer menu-icon-hover"
            onClick={() => setDisplayMenu(false)}
          >
            {icons.menuClose}
          </div>
          <li
            className=" menu-link text-base cursor-pointer py-1 mb-2 bg-slate-800 "
            onClick={handelSelectSearchMenu}
          >
            <div className="gradient-text w-fit text-md first-letter:uppercase font-bold">
              None
            </div>
            <span></span>
          </li>
          {menuData.map((da) => (
            <li
              key={da.email}
              className=" menu-link text-base cursor-pointer py-1 mb-2 bg-slate-800 "
              onClick={handelSelectSearchMenu}
            >
              <div className="gradient-text w-fit text-md first-letter:uppercase font-bold">{`${da.fname} ${da.lname}`}</div>
              <span>{da.email}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SearchMenuDA;
