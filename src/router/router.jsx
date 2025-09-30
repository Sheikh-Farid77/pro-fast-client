import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/HomePage";
import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import CoveragePage from "../pages/CoveragePage";

import PrivateRoute from "../route/PrivateRoute";
import SendParcelPage from "../pages/SendParcelPage";

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
        loader: () => fetch('../../public/data/warehouses.json')
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
]);
