import { useDispatch } from "react-redux";
import { editOrderStatus } from "../../app/features/orderSlice";
import { icons } from "../../constants";
import { orderStatus } from "../../constants";

/* eslint-disable react/prop-types */
const EditeStatus = ({ targetId, handelDisplay, loading }) => {
  const dispatch = useDispatch();

  // handel Edite order
  const handelEditeStatusOrder = (e) => {
    console.log("edit order");
    e.preventDefault();
    const id = targetId;

    const form = new FormData(e.currentTarget);
    const formData = Object.fromEntries(form);
    formData.id = id;

    console.log(formData);

    dispatch(editOrderStatus(formData));

    handelDisplay();
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
          <h3 className="gradient-text w-fit text-xl font-bold">Edite Order</h3>
          <span className="text-2xl cursor-pointer menu-icon-hover" onClick={handelDisplay}>
            {icons.menuClose}
          </span>
        </div>
        <form className="pt-5" onSubmit={handelEditeStatusOrder}>
          {/* row 1 */}
          <div className="flex flex-col gap-2 mb-0">
            <label htmlFor="status" className="label-input text-base">
              Status
            </label>
            <select
              name="status"
              id="status"
              className="input-faild py-1 rounded-md border text-base"
            >
              {orderStatus.map((status) => (
                <option key={status.key} value={status.value} className="bg-mainBgColor">
                  {status.value}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2 mb-0 mt-3">
            <label htmlFor="report" className="label-input text-base">
              Report
            </label>
            <textarea
              name="report"
              id="report"
              cols="35"
              rows="5"
              className="input-faild block p-3 overflow-x-hidden resize-none"
              placeholder="Write your report here..."
            ></textarea>
            {/* <input
              type="text"
              name="report"
              id="report"
              className="input-faild py-1 rounded-md border text-base"
              required
            /> */}
          </div>

          <button type="submit" className="btn mx-auto block mt-8" disabled={loading}>
            {loading ? (
              <span className="flex gap-1 items-center">
                <span className="animate-spin text-mainColor text-2xl">{icons.spin}</span>
                loading...
              </span>
            ) : (
              "Save"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditeStatus;
