import {
  BrowserRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
} from "react-router-dom";
import Dashboard from "../views/admin/index/Dashborad/dashbroad";
import User from "../views/admin/index/user/user";
import Products from "../views/admin/index/products/products";
import IndexAdmin from "../views/admin/index/indexAdmin";
import { Index as AuthLayout } from "../views/auth";
import { Index as LoginPage } from "../views/auth/login/page";
import AddUser from "../views/admin/index/user/addUser";
import UpdateUser from "../views/admin/index/user/updateUser";
import AddProduct from "../views/admin/index/products/addProduct";
import UpdateProduct from "../views/admin/index/products/updateProduct";
import ChatRealTime from "../views/admin/index/chat/chat";
import Revenue from "../views/admin/index/revenue/revenue";
import CartOder from "../views/admin/index/order/order";
import File from "../views/admin/index/file/file";
import Voucher from "../views/admin/index/voucher/voucher";
import ShippingFee from "../views/admin/index/shippingfee/shippingfee";
import ProductDetail from "../views/admin/index/products/productDetail";
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
          {
            path: "/products/detail/:productId",
            element: <ProductDetail />,
          },
          {
            path: "/products/create",
            element: <AddProduct />,
          },
          {
            path: "/products/update/:productId",
            element: <UpdateProduct />,
          },
        ],
      },
      {
        path: "/chat",
        children: [
          {
            index: true,
            element: <ChatRealTime />,
          },
        ],
      },
      {
        path: "/vouchers",
        children: [
          {
            index: true,
            element: <Voucher />,
          },
        ],
      },
      {
        path: "/shippingfee",
        children: [
          {
            index: true,
            element: <ShippingFee />,
          },
        ],
      },
      {
        path: "/order",
        children: [
          {
            index: true,
            element: <CartOder />,
          },
        ],
      },

      {
        path: "/Revenue",
        children: [
          {
            index: true,
            element: <Revenue />,
          },
        ],
      },
      {
        path: "/file",
        children: [
          {
            index: true,
            element: <File />,
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
