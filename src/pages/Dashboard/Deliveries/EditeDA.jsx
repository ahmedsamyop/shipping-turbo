/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { icons } from "../../../constants";
import { editDelivery } from "../../../app/features/userSlice";

const EditeDA = ({ preEditData, handelDisplay, loading }) => {
  const dispatch = useDispatch();

  const handelEditDelivery = (e) => {
    e.preventDefault();
    const { id } = preEditData;

    const form = new FormData(e.currentTarget);
    const formData = Object.fromEntries(form);
    formData.id = id;
    // console.log(formData);

    dispatch(editDelivery(formData));

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
          <h3 className="gradient-text w-fit text-xl font-bold">Edite Delivery</h3>
          <span className="text-2xl cursor-pointer menu-icon-hover" onClick={handelDisplay}>
            {icons.menuClose}
          </span>
        </div>
        <form className="pt-5" onSubmit={handelEditDelivery}>
          {/* row 1 */}
          <div className="grid gap-4 mb-1 md:grid-cols-2">
            <div className="flex flex-col gap-2 mb-0">
              <label htmlFor="fname" className="label-input text-base">
                Frist Name
              </label>
              <input
                type="text"
                id="fname"
                name="fname"
                className="input-faild py-1 rounded-md border text-base"
                required
                defaultValue={preEditData.fname}
              />
            </div>
            <div className="flex flex-col gap-2 mb-0">
              <label htmlFor="lname" className="label-input text-base">
                Last Name
              </label>
              <input
                type="text"
                name="lname"
                id="lname"
                className="input-faild py-1 rounded-md border text-base"
                required
                defaultValue={preEditData.lname}
              />
            </div>
          </div>
          {/* row 2 */}
          <div className="grid gap-4 mb-1 md:grid-cols-2">
            <div className="flex flex-col gap-2 mb-0">
              <label htmlFor="phone" className="label-input text-base">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                className="input-faild py-1 rounded-md border text-base"
                required
                defaultValue={preEditData.phone}
              />
            </div>
            {/* <div className="flex flex-col gap-2 mb-0">
              <label htmlFor="email" className="label-input text-base">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className="input-faild py-1 rounded-md border text-base"
                required
                defaultValue={preEditData.email}
              />
            </div> */}
          </div>
          {/* row 3 */}
          {/* <div className="grid gap-4 mb-1 md:grid-cols-2">
            <div className="flex flex-col gap-2 mb-0">
              <label htmlFor="password" className="label-input text-base">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="input-faild py-1 rounded-md border text-base"
                required
              />
            </div>
            <div className="flex flex-col gap-2 mb-0">
              <label htmlFor="cPassword" className="label-input text-base">
                Confirm Password
              </label>
              <input
                type="password"
                id="cPassword"
                name="cPassword"
                className="input-faild py-1 rounded-md border text-base"
                required
              />
            </div>
          </div> */}

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

export default EditeDA;
