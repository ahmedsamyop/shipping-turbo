import { useState } from "react";
import { icons, displayStatusIconOrder } from "../../constants";
import { useRealTimeDaOrders } from "../../hooks";
import { EditeStatus } from "./index";
import { useSelector } from "react-redux";

const Delivery = () => {
  useRealTimeDaOrders();
  const { daData, loading } = useSelector((state) => state.order);
  //
  const [targetId, setTargetId] = useState();

  // display popup edit order
  const [displayEditeStatusOrder, setDisplayEditeOrder] = useState(false);

  // handle: edit order & get all deliveries & add old data order in inputs
  const handelDisplayEditeStatusOrder = (e) => {
    if (displayEditeStatusOrder) {
      setDisplayEditeOrder(false);
      return;
    }
    setDisplayEditeOrder(true);
    const id = e.currentTarget.parentElement.parentElement.parentElement.id;
    const oldData = daData.filter((ele) => ele.id == id);
    setTargetId(oldData[0].id);
  };

  return (
    <>
      <div>
        <h3 className="gradient-text text-2xl md:text-3xl font-bold w-fit mb-5">
          Available Orders
        </h3>
      </div>
      <div className="relative overflow-x-auto shadow-xl">
        <table className="w-full text-base text-left ">
          <thead className="text-base text-mainColor uppercase bg-mainBgColor">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                status
              </th>
              <th scope="col" className="px-6 py-3">
                order Name
              </th>
              <th scope="col" className="px-6 py-3">
                c Name
              </th>
              <th scope="col" className="px-6 py-3">
                c Phone
              </th>
              <th scope="col" className="px-6 py-3">
                c Address
              </th>
              <th scope="col" className="px-6 py-3">
                order Price
              </th>
              <th scope="col" className="px-6 py-3">
                da Price
              </th>
              <th scope="col" className="px-6 py-3">
                total Price
              </th>
              <th scope="col" className="px-6 py-3">
                report
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {daData.map((order) => (
              <tr
                key={order.id}
                id={order.id}
                className="bg-slate-800 border-b border-mainColor hover:bg-hoverColor text-lg"
              >
                <td className="px-5 py-3 font-medium">{order.orderId}</td>
                <td className="px-5 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    {displayStatusIconOrder(order.daEmail, order.status)}
                    <span>{order.status}</span>
                  </div>
                </td>
                <td className="px-5 py-3 whitespace-nowrap">{order.orderName}</td>
                <td className="px-5 py-3 whitespace-nowrap">{order.cName}</td>
                <td className="px-5 py-3">{order.cPhone}</td>
                <td className="px-5 py-3 block w-60 h-20 overflow-auto">{order.cAddress}</td>
                <td className="px-5 py-3">{order.orderPrice}</td>
                <td className="px-5 py-3">{order.daPrice}</td>
                <td className="px-5 py-3">{order.totalPrice}</td>
                <td className="px-5 py-3 block w-80 h-20 overflow-auto">{order.report}</td>
                {/* tr button */}
                <td className="px-5 py-3">
                  {/* buttons */}
                  <div className="flex gap-2 ">
                    <button
                      className="btn flex items-center gap-1 w-fit text-white  bg-blue-700 hover:bg-blue-900"
                      onClick={handelDisplayEditeStatusOrder}
                    >
                      <span className="text-lg text-white">{icons.daStatus}</span>
                      <span className="text-sm">Status</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {displayEditeStatusOrder && (
        <EditeStatus
          handelDisplay={handelDisplayEditeStatusOrder}
          targetId={targetId}
          loading={loading}
        />
      )}
    </>
  );
};

export default Delivery;
