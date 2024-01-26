import "../sassAdmin/styleIndex.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Outlet } from "react-router-dom";
import SideBar from "../../../components/sideBar";
import Footer from "../../../components/footer";
import Dashboard from "./Dashborad/dashbroad";
import Navigation from "../../../components/navigation";
import logo from "../../../assets/images/AdminLTELogo.webp";
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
