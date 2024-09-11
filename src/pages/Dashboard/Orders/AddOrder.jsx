/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { icons } from "../../../constants";
import { createOrder } from "../../../app/features/orderSlice";
import SearchMenuDA from "./SearchMenuDA";
import { useRef, useState } from "react";

const AddOrder = ({ handelDisplay, loading, allDA }) => {
  const dispatch = useDispatch();
  // auto calc total order
  const [total, setTotal] = useState(0);
  const orderPriceRef = useRef();
  const daPriceRef = useRef();
  // handel add new order
  const handelCreateOrder = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const formData = Object.fromEntries(form);
    formData.totalPrice = total;
    dispatch(createOrder(formData));
    setTotal(0);
    e.currentTarget.reset();
  };
  const handelAutoTotalPrice = () => {
    const orderPrice = Number(orderPriceRef.current.value);
    const daPrice = Number(daPriceRef.current.value);
    const totalPrice = orderPrice + daPrice;
    setTotal(totalPrice);
  };
  return (
    <>
      {/* overlay Black */}
      <div
        className="bg-menuColor w-full h-full absolute top-0 left-0 z-[60]"
        onClick={handelDisplay}
      ></div>
      {/* contient */}
      <div className=" bg-mainBgColor p-8 lg:rounded-3xl border-2 shadow-lg shadow-white absolute top-0 left-0 w-full lg:w-auto lg:fixed lg:top-1/2 lg:left-1/2 lg:translate-x-[-50%] lg:translate-y-[-50%] z-[80]">
        <div className="flex items-center justify-between pb-5 border-b border-mainColor">
          <h3 className="gradient-text w-fit text-xl font-bold">Add new order</h3>
          <span className="text-2xl cursor-pointer menu-icon-hover" onClick={handelDisplay}>
            {icons.menuClose}
          </span>
        </div>
        <form className="pt-5" onSubmit={handelCreateOrder}>
          {/* row 1 */}
          <div className="grid gap-4 mb-1 md:grid-cols-2">
            <div className="flex flex-col gap-2 mb-0">
              <label htmlFor="orderId" className="label-input text-base">
                Order Id
              </label>
              <input
                type="text"
                id="orderId"
                name="orderId"
                className="input-faild py-1 rounded-md border text-base"
                required
              />
            </div>
            <div className="flex flex-col gap-2 mb-0">
              <label htmlFor="orderName" className="label-input text-base">
                Order Name
              </label>
              <input
                type="text"
                name="orderName"
                id="orderName"
                className="input-faild py-1 rounded-md border text-base"
                required
              />
            </div>
          </div>
          {/* row 2 */}
          <div className="grid gap-4 mb-1 md:grid-cols-2">
            <div className="flex flex-col gap-2 mb-0">
              <label htmlFor="cName" className="label-input text-base">
                Customer Name
              </label>
              <input
                type="text"
                id="cName"
                name="cName"
                className="input-faild py-1 rounded-md border text-base"
                required
              />
            </div>
            <div className="flex flex-col gap-2 mb-0">
              <label htmlFor="cPhone" className="label-input text-base">
                Customer Phone
              </label>
              <input
                type="number"
                id="cPhone"
                name="cPhone"
                className="input-faild py-1 rounded-md border text-base"
                required
              />
            </div>
          </div>
          {/* row 3 */}
          <div className="grid gap-4 mb-1 md:grid-cols-2">
            <div className="flex flex-col gap-2 mb-0">
              <label htmlFor="cAddress" className="label-input text-base">
                Customer Address
              </label>
              <input
                type="text"
                id="cAddress"
                name="cAddress"
                className="input-faild py-1 rounded-md border text-base"
                required
              />
            </div>
            <div className="flex flex-col gap-2 mb-0">
              <label htmlFor="sellerName" className="label-input text-base">
                Seller Name
              </label>
              <input
                type="text"
                id="sellerName"
                name="sellerName"
                className="input-faild py-1 rounded-md border text-base"
                required
              />
            </div>
          </div>
          {/* row 4 */}
          <div className="grid gap-4 mb-1 md:grid-cols-2">
            <div className="flex flex-col gap-2 mb-0">
              <label htmlFor="sellerPhone" className="label-input text-base">
                Seller Phone
              </label>
              <input
                type="number"
                id="sellerPhone"
                name="sellerPhone"
                className="input-faild py-1 rounded-md border text-base"
                required
              />
            </div>
            <div className="flex flex-col gap-2 mb-0">
              <label htmlFor="orderPrice" className="label-input text-base">
                Order Price
              </label>
              <input
                ref={orderPriceRef}
                onChange={handelAutoTotalPrice}
                type="number"
                id="orderPrice"
                name="orderPrice"
                className="input-faild py-1 rounded-md border text-base"
                required
              />
            </div>
          </div>
          {/* row 5 */}
          <div className="grid gap-4 mb-1 md:grid-cols-2">
            <div className="flex flex-col gap-2 mb-0">
              <label htmlFor="daPrice" className="label-input text-base">
                Delivery Price
              </label>
              <input
                ref={daPriceRef}
                onChange={handelAutoTotalPrice}
                type="number"
                id="daPrice"
                name="daPrice"
                className="input-faild py-1 rounded-md border text-base"
                required
              />
            </div>
            <div className="flex flex-col gap-2 mb-0">
              <label htmlFor="totalPrice" className="label-input text-base">
                Total Price
              </label>
              <input
                disabled
                value={total}
                type="number"
                id="totalPrice"
                className="input-faild py-1 rounded-md border text-base text-green-600 cursor-not-allowed"
              />
            </div>
          </div>
          {/* row 6 DA */}
          <div className="flex flex-col gap-2 mt-2 relative">
            <label htmlFor="daEmail" className="label-input text-base">
              Delivery
            </label>
            <SearchMenuDA allDA={allDA} />
          </div>

          <button type="submit" className="btn mx-auto block mt-8" disabled={loading}>
            {loading ? (
              <span className="flex gap-1 items-center">
                <span className="animate-spin text-mainColor text-2xl">{icons.spin}</span>
                loading...
              </span>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddOrder;
