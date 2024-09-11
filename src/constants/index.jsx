import {
  RiMenu3Line,
  RiCloseLine,
  RiDashboardFill,
  RiBox1Fill,
  RiAddBoxLine,
  RiUserLine,
  RiUserAddLine,
  RiSearchLine,
  RiFileEditFill,
  RiDeleteBin2Fill,
  RiLoader4Line,
  RiTruckLine,
  RiMapPinUserLine,
  RiCheckboxCircleFill,
  RiIndeterminateCircleFill,
  RiCloseCircleFill,
  RiUserFollowLine,
  RiUserUnfollowLine,
  RiAndroidFill,
  RiAppleFill,
} from "react-icons/ri";
const icons = {
  menu3Line: <RiMenu3Line />,
  menuClose: <RiCloseLine />,
  dashboard: <RiDashboardFill />,
  orders: <RiBox1Fill />,
  addOrder: <RiAddBoxLine />,
  user: <RiUserLine />,
  addUser: <RiUserAddLine />,
  search: <RiSearchLine />,
  edit: <RiFileEditFill />,
  delete: <RiDeleteBin2Fill />,
  spin: <RiLoader4Line />,
  Delivery: <RiTruckLine />,
  daStatus: <RiMapPinUserLine />,
  statusReceived: <RiCheckboxCircleFill />,
  statusNotReceived: <RiIndeterminateCircleFill />,
  statusCancelled: <RiCloseCircleFill />,
  assignDa: <RiUserFollowLine />,
  notAssignDa: <RiUserUnfollowLine />,
  androidIcon: <RiAndroidFill />,
  iosIcon: <RiAppleFill />,
};

const navLinks = [
  { key: 1, href: "/", text: "Home" },
  { key: 2, href: "/", text: "About US" },
  { key: 3, href: "/", text: "Service" },
  { key: 4, href: "/", text: "Contact Us" },
  { key: 5, href: "/", text: "Price Offers" },
];

const sidebarLinks = [
  { key: 1, href: "/dashboard", text: "Dashboard", icon: icons.dashboard },
  { key: 2, href: "/dashboard/orders", text: "Orders", icon: icons.orders },
  { key: 4, href: "/dashboard/deliveries", text: "Deliveries", icon: icons.user },
  { key: 5, href: "/dashboard/da", text: "Delivery", icon: icons.Delivery },
];

const canAccessRole = {
  admin: "admin",
  da: "da",
};

const orderStatus = [
  {
    key: "status1",
    value: "received",
    icon: <span className="text-receivColor text-xl">{icons.statusReceived}</span>,
  },
  {
    key: "status2",
    value: "not-received",
    icon: <span className="text-notReceivColor text-xl">{icons.statusNotReceived}</span>,
  },
  {
    key: "status3",
    value: "cancelled",
    icon: <span className="text-cancelColor text-xl">{icons.statusCancelled}</span>,
  },
];

const displayStatusIconOrder = (daEmailValue, statusValue) => {
  let icon = "";
  orderStatus.forEach((status) => {
    if (statusValue == status.value) {
      icon = status.icon;
    }
  });
  if (!icon) {
    icon = daEmailValue ? (
      <span className="text-mainColor text-xl">{icons.assignDa}</span>
    ) : (
      <span className="text-notReceivColor text-xl">{icons.notAssignDa}</span>
    );
  }
  return icon;
};

export { icons, navLinks, sidebarLinks, canAccessRole, orderStatus, displayStatusIconOrder };
