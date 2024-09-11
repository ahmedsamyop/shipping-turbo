import { onSnapshot } from "firebase/firestore";
import { colRefDelivery } from "../firebase/users";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRealTimeData } from "../app/features/userSlice";

const useRealTimeDA = () => {
  const data = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    onSnapshot(colRefDelivery, (snapShot) => {
      let deliveries = [];
      snapShot.forEach((doc) => {
        deliveries.push({ ...doc.data(), id: doc.id });
      });
      dispatch(addRealTimeData(deliveries));
    });
  }, [dispatch]);
  return data;
};

export default useRealTimeDA;
