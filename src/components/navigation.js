import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { NavLink, useNavigate } from "react-router-dom";

function Navigation() {
  const [cookies, setCookie, removeCookies] = useCookies();
  const [isAnimation, setIsAnimation] = useState(true);
  const [lengthCartsOder, setLengthCartsOder] = useState([]);
  const [status, setStatus] = useState("unconfirmed");
  const navigate = useNavigate();
  useEffect(() => {
    const boxAdmin = document.querySelector(".box__admin");
    const sideBar = document.querySelector(".side-bar");
    const arrayHiddenText = document.querySelectorAll(".hidenText");

    if (!isAnimation) {
      boxAdmin.style.marginLeft = "-11rem";
      boxAdmin.style.transition = "0.1s";
      sideBar.style.width = "5rem";
      sideBar.style.transition = "0.1s";
      arrayHiddenText.forEach((e) => {
        e.classList.add("hidenTextActive");
      });
    } else {
      boxAdmin.style.marginLeft = "0";
      boxAdmin.style.transition = "0.1s";
      sideBar.style.width = "16rem";
      sideBar.style.transition = "0.1s";
      arrayHiddenText.forEach((e) => {
        e.classList.remove("hidenTextActive");
      });
    }
  }, [isAnimation]);

  const handleAnimation = () => {
    setIsAnimation(!isAnimation);
  };
  const logout = (e) => {
    e.preventDefault();
    removeCookies("admin_token");
    removeCookies("phone");
    navigate("/auth/login");
  };
  const fetchCartsOder = async () => {
    try {
      const response = await fetch(
        `http://localhost:5050/cartsOder/?id_user_oder=${cookies.id_user}&status=${status}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.admin_token,
          },
        }
      );
      const data = await response.json();
      setLengthCartsOder(data.data.length);
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };
  useEffect(() => {
    fetchCartsOder();
  }, []);
  return (
    <nav className="d-flex">
      <ul className="navbar-one d-flex">
        <li>
          <i onClick={handleAnimation} className="fas fa-bars"></i>
        </li>
        <div className="display-hidden d-flex">
          <p>Home</p>
          <p>Contact</p>
        </div>
      </ul>
      <ul className="navbar-two d-flex">
        <li>
          <i className="fas fa-search open-search-nav"></i>
          <div className="searchNav">
            <div className="search-nav d-flex">
              <label htmlFor="search_nav">
                <input type="text" id="search_nav" placeholder="Search" />
                <i className="fas fa-times clear-search"></i>
              </label>
              <div className="search-nav-icon">
                <i className="fas fa-search"></i>
                <i className="fas fa-times close-search-nav"></i>
              </div>
            </div>
          </div>
        </li>
        <li>
          <i className="far fa-comments"></i>
          <div className="chat">
            <p className="sizeChat">3</p>
          </div>
          <div className="infro-chat">
            <a href="">
              <div className="item-chat d-flex">
                <div className="item-chat-img col-4">
                  <img src="img/user.jpg" alt="" />
                </div>
                <div className="item-chat-text">
                  <p>
                    Phạm Duy <i className="fas fa-star"></i>
                  </p>
                  <p>Call me</p>
                  <p>
                    <i className="far fa-clock"></i>
                    <span> 4</span>
                    <span> Hours</span>
                    <span> Ago</span>
                  </p>
                </div>
              </div>
            </a>
            <div className="item-chat d-flex">
              <div className="item-chat-img col-4">
                <img src="img/user.jpg" alt="" />
              </div>
              <div className="item-chat-text">
                <p>
                  Phạm Duy <i className="fas fa-star"></i>
                </p>
                <p>Call me</p>
                <p>
                  <i className="far fa-clock"></i>
                  <span> 4</span>
                  <span> Hours</span>
                  <span> Ago</span>
                </p>
              </div>
            </div>
            <div className="item-chat d-flex">
              <div className="item-chat-img col-4">
                <img src="img/user.jpg" alt="" />
              </div>
              <div className="item-chat-text">
                <p>
                  Phạm Duy <i className="fas fa-star"></i>
                </p>
                <p>Call me</p>
                <p>
                  <i className="far fa-clock"></i>
                  <span> 4</span>
                  <span> Hours</span>
                  <span> Ago</span>
                </p>
              </div>
            </div>
            <div className="see-all-message">
              <p>See All Messagse</p>
            </div>
          </div>
        </li>
        <li>
          <i className="far fa-bell"></i>
          <NavLink to="/order">
            <div className="tb">
              <p>{lengthCartsOder}</p>
            </div>
          </NavLink>
        </li>
        <li>
          <i className="fas fa-expand-arrows-alt"></i>
        </li>
        <li>
          <i className="fas fa-th-list"></i>
        </li>
        <li>
          <a className="" href="/" onClick={(e) => logout(e)}>
            Đăng xuất
          </a>
        </li>
      </ul>
    </nav>
  );
}
export default Navigation;
