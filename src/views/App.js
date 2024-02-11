import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { RouterProvider } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import { router } from "../routers/AppRouter";
import "../styles/_all.scss";
import "./App.scss";
export default function App() {
  return (
    <CookiesProvider>
      <RouterProvider router={router} />;
    </CookiesProvider>
  );
}
