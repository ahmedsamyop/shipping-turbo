import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../app/features/userSlice";
import { Users, auth } from "../firebase/users";
const user = new Users();
const useCheckAuth = () => {
  // const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged(async (currUser) => {
      if (!currUser) {
        navigate("/login");
        return;
      }
      const { uid } = currUser;
      const userDA = await user.getDA(uid);
      if (!userDA) {
        const userAdmin = await user.getAdmin(uid);
        dispatch(setUser(userAdmin));
      } else {
        dispatch(setUser(userDA));
      }
    });
  }, [dispatch, navigate]);
  // return user;
};

export default useCheckAuth;
