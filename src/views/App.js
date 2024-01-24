import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/_all.scss";
import { router } from "../routers/AppRouter";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { RouterProvider } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
export default function App() {
  return (
    <CookiesProvider>
      <RouterProvider router={router} />;
    </CookiesProvider>
  );
}
