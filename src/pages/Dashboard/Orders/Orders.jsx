import { useState } from 'react'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { deleteOrderByID } from '../../../app/features/orderSlice'
import { displayDeliveries } from '../../../app/features/userSlice'
// hook
import { useRealTimeOrders } from '../../../hooks'
// constants
import { icons, displayStatusIconOrder } from '../../../constants'
// page & component
import AddOrder from './AddOrder'
import EditeOrder from './EditeOrder'
import SearchBarOrders from './SearchBarOrders'

const Orders = () => {
  // all deliveries [store]
  const { deliveries } = useSelector((state) => state.user)
  // Real time orders [store]
  const { data, loading } = useRealTimeOrders()
  // Filter orders
  const [dataFilter, setDataFilter] = useState([])
  // display popup add new orders
  const [displayCreateOrder, setDisplayCreateOrder] = useState(false)
  // display popup edit order
  const [displayEditeOrder, setDisplayEditeOrder] = useState(false)
  // old order data before display popup edit order
  const [preEditData, setPreEditData] = useState({})
  const dispatch = useDispatch()
  // handle: add new order & get all deliveries
  const handelDisplayCreateOrder = () => {
    if (displayCreateOrder) {
      setDisplayCreateOrder(false)
      return
    }
    dispatch(displayDeliveries())
    setDisplayCreateOrder(true)
  }
  // handle: edit order & get all deliveries & add old data order in inputs
  const handelDisplayEditeOrder = (e) => {
    if (displayEditeOrder) {
      setDisplayEditeOrder(false)
      return
    }
    dispatch(displayDeliveries())
    setDisplayEditeOrder(true)
    const id = e.currentTarget.parentElement.parentElement.parentElement.id
    const oldData = data.filter((ele) => ele.id == id)
    setPreEditData(oldData[0])
  }
  // handel: delete order by id
  const handelDeleteOrder = (e) => {
    const id = e.currentTarget.parentElement.parentElement.parentElement.id
    dispatch(deleteOrderByID(id))
  }
  let totalOrderPrice = 0
  let totalDaPrice = 0
  let totalPriceOrder = 0

  return (
    <>
      <div>
        <h3 className="gradient-text text-2xl md:text-3xl font-bold w-fit mb-5">All orders</h3>
        <div className="flex justify-start md:justify-end mb-5">
          <button
            className="btn flex items-center gap-1 w-fit"
            onClick={handelDisplayCreateOrder}
          >
            <span className="text-2xl text-mainColor">{icons.addOrder}</span>
            <span className="text-base">Add order</span>
          </button>
        </div>
        <SearchBarOrders orders={data} dataFilter={dataFilter} setDataFilter={setDataFilter} />
      </div>
      {/* table */}
      <div className="relative overflow-x-scroll shadow-xl max-h-[80vh]">
        <table className="w-full text-base text-left ">
          {/* table head */}
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
                seller Name
              </th>
              <th scope="col" className="px-6 py-3">
                seller Phone
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
                DA
              </th>
              <th scope="col" className="px-6 py-3">
                report
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          {/* table body */}
          <tbody>
            {dataFilter.map((order) => (
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
                <td className="px-5 py-3 whitespace-nowrap">{order.sellerName}</td>
                <td className="px-5 py-3">{order.sellerPhone}</td>
                <td className="px-5 py-3">{order.orderPrice}</td>
                <td className="px-5 py-3">{order.daPrice}</td>
                <td className="px-5 py-3">{order.totalPrice}</td>
                <td className="px-5 py-3">{order.daEmail}</td>
                <td className="px-5 py-3 block w-60 h-20 overflow-auto">{order.report}</td>
                <td className="px-5 py-3">
                  {/* buttons */}
                  <div className="flex gap-2 ">
                    <button
                      className="btn flex items-center gap-1 w-fit text-white  bg-blue-700 hover:bg-blue-900"
                      onClick={handelDisplayEditeOrder}
                    >
                      <span className="text-lg text-white">{icons.edit}</span>
                      <span className="text-sm">Edite</span>
                    </button>
                    <button
                      className="btn flex items-center gap-1 w-fit text-white  bg-red-700 hover:bg-red-900"
                      onClick={handelDeleteOrder}
                    >
                      <span className="text-lg text-white">{icons.delete}</span>
                      <span className="text-sm">Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Auto calc order price & da price & total order price */}
      <div className="flex items-center justify-end gap-4 my-4">
        <div className="gradient-text text-xl md:text-2xl font-bold uppercase">total :</div>
        <div className="text-center">
          {dataFilter?.map((ele) => {
            totalOrderPrice += ele.orderPrice
          })}
          <h3 className="gradient-text text-xl md:text-2xl font-bold">Order Price</h3>
          <span className="font-bold text-xl">{totalOrderPrice}</span>
        </div>
        <div className="text-center">
          {dataFilter?.map((ele) => {
            totalDaPrice += ele.daPrice
          })}
          <h3 className="gradient-text text-xl md:text-2xl font-bold">DA Price</h3>
          <span className="font-bold text-xl">{totalDaPrice}</span>
        </div>
        <div className="text-center">
          {dataFilter?.map((ele) => {
            totalPriceOrder += ele.totalPrice
          })}
          <h3 className="gradient-text text-xl md:text-2xl font-bold">Total Price</h3>
          <span className="font-bold text-xl">{totalPriceOrder}</span>
        </div>
      </div>
      {/* Display page create & delete */}
      {displayCreateOrder && (
        <AddOrder
          handelDisplay={handelDisplayCreateOrder}
          loading={loading}
          allDA={deliveries}
        />
      )}
      {displayEditeOrder && (
        <EditeOrder
          preEditData={preEditData}
          handelDisplay={handelDisplayEditeOrder}
          loading={loading}
          allDA={deliveries}
        />
      )}
    </>
  )
}

export default Orders
