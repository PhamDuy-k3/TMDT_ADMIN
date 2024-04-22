import {
  BrowserRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
} from "react-router-dom";
import Dashboard from "../views/admin/index/Dashborad/dashbroad";
import Form from "../views/admin/index/form/form";
import Table from "../views/admin/index/table/table";
import User from "../views/admin/index/user/user";
import Products from "../views/admin/index/products/products";
import IndexAdmin from "../views/admin/index/indexAdmin";
import { Index as AuthLayout } from "../views/auth";
import { Index as LoginPage } from "../views/auth/login/page";
import AddUser from "../views/admin/index/user/addUser";
import UpdateUser from "../views/admin/index/user/updateUser";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexAdmin />,

    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/form",
        children: [
          {
            index: true,
            element: <Form />,
          },
        ],
      },
      {
        path: "/table",
        children: [
          {
            index: true,
            element: <Table />,
          },
        ],
      },
      {
        path: "/users",
        children: [
          {
            index: true,
            element: <User />,
          },
          {
            path: "/users/create",
            element: <AddUser />,
          },
          {
            path: "/users/update/:userId",
            element: <UpdateUser />,
          },
        ],
      },
      {
        path: "/products",
        children: [
          {
            index: true,
            element: <Products />,
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);
