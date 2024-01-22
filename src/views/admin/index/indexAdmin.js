import "../sassAdmin/styleIndex.scss";
import { Outlet } from "react-router-dom";
import SideBar from "../../../components/sideBar";
import Footer from "../../../components/footer";
import Dashboard from "./Dashborad/dashbroad";
import Navigation from "../../../components/navigation";
function IndexAdmin() {
  return (
      <>
      {/* <div className="open-start">
        <img src="img/AdminLTELogo.webp" alt="" />
      </div> */}
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
