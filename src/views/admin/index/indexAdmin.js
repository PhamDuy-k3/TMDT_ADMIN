import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SideBar from "../../../components/sideBar";
import Footer from "../../../components/footer";
import Navigation from "../../../components/navigation";
import logo from "../../../assets/images/AdminLTELogo.webp";
import "../sassAdmin/styleIndex.scss";

function IndexAdmin() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookies] = useCookies(["user_token"]);

  const checkToken = async () => {
    try {
      const response = await fetch(`http://localhost:5050/auth/checkToken`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.user_token,
        },
      });

      const data = await response.json();

      if (response.status === 500) {
        removeCookies("user_token", { path: "/" });

        navigate("/auth/login");
      } else {
        console.log("Token hợp lệ", data);
      }
    } catch (error) {
      console.error("Lỗi kiểm tra token:", error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ width: "300px" }}
      />
      <div className="open-start">
        <img src={logo} alt="" />
      </div>
      <SideBar />
      <div className="box__admin">
        <Navigation />
        <Outlet />
      </div>
      <div className="fly-box"></div>
      <Footer />
    </>
  );
}
export default IndexAdmin;
