import { icons } from "../../../constants";

const SearchBarDAs = () => {
  return (
    <>
      <div className="relative">
        <label
          htmlFor="search-da"
          className="text-mainColor text-2xl cursor-text absolute left-2 top-1/2 translate-y-[-50%]"
        >
          {icons.search}
        </label>
        <input
          type="text"
          id="search-da"
          placeholder="Search Deliveries..."
          className="input-faild pl-9 "
        />
      </div>
    </>
  );
};

export default SearchBarDAs;
