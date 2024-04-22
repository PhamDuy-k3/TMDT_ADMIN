import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Outlet } from "react-router-dom";

import SideBar from "../../../components/sideBar";
import Footer from "../../../components/footer";
import Navigation from "../../../components/navigation";
import logo from "../../../assets/images/AdminLTELogo.webp";
import "../sassAdmin/styleIndex.scss";

function IndexAdmin() {
  const navigate = useNavigate();
  const [cookies] = useCookies();

  useEffect(() => {
    if (!cookies.user_token) {
      navigate("/auth/login");
    }
  }, []);

  return (
    <>
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
