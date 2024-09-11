import { useSelector } from "react-redux";
import useCheckAuth from "../../hooks/useCheckAuth";

const RequireAuth = ({ children }) => {
  useCheckAuth();
  const { userData } = useSelector((state) => state.user);
  let render;
  if (userData?.id) {
    render = children;
  } else {
    // Add loadiing page
    render = "login";
  }
  return render;
};

export default RequireAuth;
