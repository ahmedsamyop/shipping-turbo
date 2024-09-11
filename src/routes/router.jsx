import { createBrowserRouter } from "react-router-dom";
import { Staticayout, DashboardLayout } from "./layout";
import { RequireAuth, CanAccess } from "../components";
// static Pages
import { Home, ErrorPage, Login, LoadingPage } from "../pages/Static";
// Dashboard Pages
import { Profile, Dashboard, Orders, Deliveries } from "../pages/Dashboard";
// delivery [da]
import { Delivery } from "../pages/Delivery";
const router = createBrowserRouter([
  // Static layout
  {
    path: "/",
    element: <Staticayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/log",
        element: <LoadingPage />,
      },
    ],
  },
  // dashboard layout
  {
    path: "/dashboard",
    element: (
      <RequireAuth>
        <DashboardLayout />
      </RequireAuth>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <CanAccess accessRole={["admin"]}>
            <Dashboard />
          </CanAccess>
        ),
      },
      {
        path: "/dashboard/orders",
        element: (
          <CanAccess accessRole={["admin"]}>
            <Orders />
          </CanAccess>
        ),
      },
      {
        path: "/dashboard/deliveries",
        element: (
          <CanAccess accessRole={["admin"]}>
            <Deliveries />
          </CanAccess>
        ),
      },
      {
        path: "/dashboard/profile",
        element: (
          <CanAccess accessRole={["admin", "da"]}>
            <Profile />
          </CanAccess>
        ),
      },
      // DA
      {
        path: "/dashboard/da",
        element: (
          <CanAccess accessRole={["da"]}>
            <Delivery />
          </CanAccess>
        ),
      },
    ],
  },
]);

export default router;
