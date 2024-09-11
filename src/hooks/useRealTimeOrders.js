import { onSnapshot } from "firebase/firestore";
import { colRefOrders } from "../firebase/orders";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRealTimeData } from "../app/features/orderSlice";

const useRealTimeOrders = () => {
  const data = useSelector((state) => state.order);
  const dispatch = useDispatch();
  useEffect(() => {
    onSnapshot(colRefOrders, (snapShot) => {
      let orders = [];
      snapShot.forEach((doc) => {
        orders.push({ ...doc.data(), id: doc.id });
      });
      dispatch(addRealTimeData(orders));
    });
  }, [dispatch]);
  return data;
};

export default useRealTimeOrders;
