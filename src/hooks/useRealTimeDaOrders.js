import { onSnapshot } from "firebase/firestore";
import { colRefOrders } from "../firebase/orders";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRealTimeDaData } from "../app/features/orderSlice";

const useRealTimeDaOrders = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    onSnapshot(colRefOrders, (snapShot) => {
      let orders = [];
      snapShot.forEach((doc) => {
        if (doc.data().daEmail == userData.email) {
          orders.push({ ...doc.data(), id: doc.id });
        }
      });
      dispatch(addRealTimeDaData(orders));
    });
  }, [dispatch, userData]);
};

export default useRealTimeDaOrders;
