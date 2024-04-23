import Accordion from "react-bootstrap/Accordion";
import { BrowserRouter as Router, Link, NavLink } from "react-router-dom";
import logo from "../assets/images/AdminLTELogo.webp";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
function SideBar() {
  const [cookies] = useCookies();
  const [userlogin, setUserLogin] = useState();

  useEffect(() => {
    fetch(`http://localhost:5050/users?phone=${cookies.phone}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.user_token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res && res.data && res.data.length > 0) {
          const firstObject = res.data[0];
          setUserLogin(firstObject);
        }
      });
  }, [cookies.phone]);

  console.log(userlogin);
  return (
    <div className="side-bar">
      <div className="side-bar-header">
        <div className="side-bar-header-title d-flex">
          <img src={logo} alt="" />
          <p className="hidenText">AdminLTE 3</p>
        </div>
        <div className="side-bar-header-infor d-flex">
          <img src={userlogin != null ? userlogin.avatar : logo} alt="" />
          <p className="hidenText">
            {userlogin != null ? userlogin.name : "name"}
          </p>
        </div>
      </div>
      <div className="container-fluid">
        <div className="search d-flex hidenText">
          <div className="search-input col-9 hidenText">
            <label htmlFor="search">
              <input
                className="col-12"
                type="text"
                id="search"
                placeholder="Search"
              />
            </label>
          </div>
          <div className="search-icon col-3 hidenText">
            <i className="fas fa-search"></i>
          </div>
        </div>
        <div className="Options">
          <Accordion className="mt-3" defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <i className="fas fa-tachometer-alt"></i>&nbsp;
                <p style={{ height: "0rem" }} className="hidenText">
                  Dashboard
                </p>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="menu-sub" id="sub0">
                  <li>
                    <NavLink to="/">
                      <p className="optionClick bgOpClick">
                        <i className="far fa-circle"></i>
                        <span className="hidenText"> Dashboard v1</span>
                      </p>
                    </NavLink>
                  </li>
                  <li>
                    <p>
                      <i className="far fa-circle"></i>
                      <span className="hidenText"> Dashboard v2</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <i className="far fa-circle"></i>
                      <span className="hidenText"> Dashboard v3</span>
                    </p>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <i className="fas fa-user-friends"></i>&nbsp;
                <p style={{ height: "0rem" }} className="hidenText">
                  User
                </p>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="menu-sub" id="sub3">
                  <li>
                    <NavLink to="/users" end>
                      <p>
                        <i className="far fa-circle"></i>
                        <span className="hidenText"> Users </span>
                      </p>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/users/create">
                      <p>
                        <i className="far fa-circle"></i>
                        <span className="hidenText"> Add user</span>
                      </p>
                    </NavLink>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>
                <i className="fab fa-product-hunt"></i>&nbsp;
                <p style={{ height: "0rem" }} className="hidenText">
                  Products
                </p>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="menu-sub" id="sub4">
                  <li>
                    <NavLink to="/products" end>
                      <p>
                        <i className="far fa-circle"></i>
                        <span className="hidenText"> Products </span>
                      </p>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/products/create">
                      <p>
                        <i className="far fa-circle"></i>
                        <span className="hidenText"> Add Products</span>
                      </p>
                    </NavLink>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
export default SideBar;
