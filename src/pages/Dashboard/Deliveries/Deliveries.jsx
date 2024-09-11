// import SearchBarDAs from "./SearchBarDAs";
import AddDA from "./AddDA";
import EditeDA from "./EditeDA";
import { icons } from "../../../constants";
import { useRealTimeDA } from "../../../hooks";
import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { deleteDelivery } from "../../../app/features/userSlice";

const Deliveries = () => {
  const { deliveries, loading } = useRealTimeDA();
  const [displayCreateOrder, setDisplayCreateOrder] = useState(false);
  const [displayEditeOrder, setDisplayEditeOrder] = useState(false);
  const [preEditData, setPreEditData] = useState({});
  // const dispatch = useDispatch();

  const handelDisplayCreateDelivery = () => {
    if (displayCreateOrder) {
      setDisplayCreateOrder(false);
      return;
    }
    setDisplayCreateOrder(true);
  };
  const handelDisplayEditeDelivery = (e) => {
    if (displayEditeOrder) {
      setDisplayEditeOrder(false);
      return;
    }
    setDisplayEditeOrder(true);
    const id = e.currentTarget.parentElement.parentElement.id;
    const oldData = deliveries.filter((ele) => ele.id == id);
    setPreEditData(oldData[0]);
  };

  // const handelDeleteOrder = (e) => {
  //   const id = e.currentTarget.parentElement.parentElement.id;
  //   dispatch(deleteDelivery(id));
  // };
  return (
    <>
      <div>
        <h3 className="gradient-text text-2xl md:text-3xl font-bold w-fit mb-5">
          All Deliveries
        </h3>
        <div className="flex  justify-between gap-4 flex-col md:flex-row mb-5">
          {/* <SearchBarDAs type="Deliveries" /> */}
          <button
            className="btn flex items-center gap-1 w-fit"
            onClick={handelDisplayCreateDelivery}
          >
            <span className="text-2xl text-mainColor">{icons.addOrder}</span>
            <span className="text-base">Add DA</span>
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-xl">
        <table className="w-full text-base text-left ">
          <thead className="text-base text-mainColor uppercase bg-mainBgColor">
            <tr>
              <th scope="col" className="px-6 py-3">
                Frist Name
              </th>
              <th scope="col" className="px-6 py-3">
                Last Name
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Password
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((da) => (
              <tr
                key={da.id}
                id={da.id}
                className="bg-slate-800 border-b border-mainColor hover:bg-hoverColor text-lg"
              >
                <td className="px-5 py-3 ">{da.fname}</td>
                <td className="px-5 py-3">{da.lname}</td>
                <td className="px-5 py-3 font-medium">{da.phone}</td>
                <td className="px-5 py-3 font-medium">{da.email}</td>
                <td className="px-5 py-3">{da.password}</td>
                <td className="px-5 py-3 flex gap-2">
                  <button
                    className="btn flex items-center gap-1 w-fit text-white  bg-blue-700 hover:bg-blue-900"
                    onClick={handelDisplayEditeDelivery}
                  >
                    <span className="text-lg text-white">{icons.edit}</span>
                    <span className="text-sm">Edite</span>
                  </button>
                  {/* <button
                    className="btn flex items-center gap-1 w-fit text-white  bg-red-700 hover:bg-red-900"
                    onClick={handelDeleteOrder}
                  >
                    <span className="text-lg text-white">{icons.delete}</span>
                    <span className="text-sm">Delete</span>
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {displayCreateOrder && (
        <AddDA handelDisplay={handelDisplayCreateDelivery} loading={loading} />
      )}
      {displayEditeOrder && (
        <EditeDA
          preEditData={preEditData}
          handelDisplay={handelDisplayEditeDelivery}
          loading={loading}
        />
      )}
    </>
  );
};

export default Deliveries;
