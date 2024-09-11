/* eslint-disable no-constant-condition */
/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { icons } from "../../../constants";
// { orders, setDataFilter }
const SearchBarOrders = ({ orders, setDataFilter }) => {
  const filterRef = useRef();
  const statusRef = useRef();
  const searchRef = useRef();
  useEffect(() => {
    setDataFilter(orders);
    // filter Data by select value & search value
    const filterBy = filterRef.current.value;
    const searchValue = searchRef.current.value;
    let statusValue = statusRef.current.value;

    if (!filterBy) {
      searchRef.current.disabled = true;
      statusValue = "";
      return;
    }
    const filterData = orders.filter((order) => {
      if (typeof order[filterBy] === "string") {
        return order[filterBy].toLowerCase().includes(searchValue.toLowerCase());
      } else {
        return order[filterBy].toString().includes(searchValue);
      }
    });

    // setDataFilter(filterData);

    if (!statusValue) {
      setDataFilter(filterData);
      return;
    }
    const filterStatus = filterData.filter((order) => order.status == statusValue);
    setDataFilter(filterStatus);
  }, [orders, setDataFilter]);

  const handelSearchFilter = (e) => {
    const searchValue = e.target.value;
    const filterBy = filterRef.current.value;
    const statusValue = statusRef.current.value;

    if (!filterBy) {
      return;
    }

    const filterData = orders.filter((order) => {
      if (typeof order[filterBy] === "string") {
        return order[filterBy].toLowerCase().includes(searchValue.toLowerCase());
      } else {
        return order[filterBy].toString().includes(searchValue);
      }
    });

    // setDataFilter(filterData);

    if (!statusValue) {
      setDataFilter(filterData);
      return;
    }
    const filterStatus = filterData.filter((order) => order.status == statusValue);
    setDataFilter(filterStatus);
  };

  const handelChangeSelectAll = () => {
    const filterBy = filterRef.current.value;
    searchRef.current.value = "";
    setDataFilter(orders);

    if (!filterBy) {
      searchRef.current.disabled = true;
      return;
    }

    searchRef.current.disabled = false;
  };
  const handelChangeStatusOrder = () => {
    const statusValue = statusRef.current.value;
    const filterBy = filterRef.current.value;
    searchRef.current.value = "";

    if (!statusValue) {
      setDataFilter(orders);
      return;
    }

    if (!filterBy) {
      const filterStatus = orders.filter((order) => order.status == statusValue);
      setDataFilter(filterStatus);
      return;
    }
  };
  return (
    <>
      <div className="flex items-center gap-2 flex-wrap mb-5">
        {/* Status Order */}
        <div className="md:pr-2 md:border-r-2 md:border-r-mainColor">
          <select
            ref={statusRef}
            id="filter-status"
            className="input-faild focus:bg-mainBgColor cursor-pointer"
            onChange={handelChangeStatusOrder}
          >
            <option value="" hidden>
              Status
            </option>
            <option value="">All Status</option>
            <option value="assigned">assigned</option>
            <option value="not-assigned">not-assigned</option>
            <option value="received">received</option>
            <option value="not-received">not-received</option>
            <option value="cancelled">cancelled</option>
          </select>
        </div>
        {/* Filter */}
        <div className="md:pr-2 md:border-r-2 md:border-r-mainColor">
          <select
            ref={filterRef}
            id="filter-orders"
            className="input-faild focus:bg-mainBgColor cursor-pointer"
            onChange={handelChangeSelectAll}
          >
            <option value="" hidden>
              Filter By
            </option>
            <option value="">All</option>
            <option value="orderId">Order ID</option>
            <option value="orderName">Order Name</option>
            <option value="cName">C NAME</option>
            <option value="cPhone">C PHONE</option>
            <option value="sellerName">Seller Name</option>
            <option value="sellerPhone">Seller Phone</option>
          </select>
        </div>
        {/* SearchBar */}
        <div className="relative">
          <label
            htmlFor="search-orders"
            className="text-mainColor text-2xl cursor-text absolute left-2 top-1/2 translate-y-[-50%]"
          >
            {icons.search}
          </label>
          <input
            type="text"
            id="search-orders"
            placeholder="Search Orders..."
            className="input-faild pl-9 disabled:border-hoverColor disabled:cursor-not-allowed"
            onChange={handelSearchFilter}
            ref={searchRef}
          />
        </div>
      </div>
    </>
  );
};

export default SearchBarOrders;
