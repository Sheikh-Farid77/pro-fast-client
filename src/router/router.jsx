import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/HomePage";
import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import CoveragePage from "../pages/CoveragePage";

import PrivateRoute from "../route/PrivateRoute";
import SendParcelPage from "../pages/SendParcelPage";
import DashboardLayout from "../layouts/DashboardLayout";
import Parcels from "../components/dashboard/Parcels";
import Payment from "../components/payment/Payment";

export let router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "coverage",
        Component: CoveragePage,
      },
      {
        path: "send_parcel",
        element: (
          <PrivateRoute>
            <SendParcelPage />
          </PrivateRoute>
        ),
        loader: () => fetch("../../public/data/warehouses.json"),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: LoginPage,
      }, 
      {
        path: "register",
        Component: RegisterPage,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: Parcels,
      },
      {
        path: "payment/:id",
        Component: Payment
      }
    ],
  },
]);
