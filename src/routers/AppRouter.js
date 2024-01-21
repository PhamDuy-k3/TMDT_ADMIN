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
]);
