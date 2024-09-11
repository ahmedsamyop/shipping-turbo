import { useSelector } from "react-redux";

// import { useCanAccess } from "../../hooks";

const CanAccess = ({ accessRole, children }) => {
  const user = useSelector((state) => state.user);
  const userRole = user.userData.role;
  let access;

  for (let i = 0; i < accessRole.length; i++) {
    if (userRole == accessRole[i]) {
      return (access = children);
    }
    access = <span>not allowed to access</span>;
  }

  return access;
};

export default CanAccess;
