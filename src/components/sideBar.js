import Accordion from "react-bootstrap/Accordion";
import { BrowserRouter as Router, Link, NavLink } from "react-router-dom";
import logo from "../assets/images/AdminLTELogo.webp";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
function SideBar() {
  const [cookies] = useCookies();
  const [userlogin, setUserLogin] = useState();

  useEffect(() => {
    fetch(`http://localhost:5050/users/profile/user`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.admin_token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res && res.data) {
          const firstObject = res.data;
          setUserLogin(firstObject);
        }
      });
  }, [cookies.admin_token]);

  //console.log(userlogin);
  return (
    <div className="side-bar">
      <div className="side-bar-header">
        <div className="side-bar-header-title d-flex">
          <img src={logo} alt="" />
          <p className="hidenText">AdminLTE 3</p>
        </div>
        <div className="side-bar-header-infor d-flex">
          <img
            src={
              userlogin ? (userlogin.avatar ? userlogin.avatar : logo) : logo
            }
            alt=""
          />
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
              <NavLink to="/">
                <Accordion.Header>
                  <i class="fas fa-paste"></i>&nbsp;
                  <p style={{ height: "0rem" }} className="hidenText">
                    Thống kê
                  </p>
                </Accordion.Header>
              </NavLink>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <i className="fas fa-user-friends"></i>&nbsp;
                <p style={{ height: "0rem" }} className="hidenText">
                  Người dùng
                </p>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="menu-sub" id="sub3">
                  <li>
                    <NavLink to="/users" end>
                      <p>
                        <i className="far fa-circle"></i>
                        <span className="hidenText">Danh sách người dùng </span>
                      </p>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/users/create">
                      <p>
                        <i className="far fa-circle"></i>
                        <span className="hidenText"> Thêm mới</span>
                      </p>
                    </NavLink>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <i className="fab fa-product-hunt"></i>&nbsp;
                <p style={{ height: "0rem" }} className="hidenText">
                  Sản phẩm
                </p>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="menu-sub" id="sub4">
                  <li>
                    <NavLink to="/products" end>
                      <p>
                        <i className="far fa-circle"></i>
                        <span className="hidenText"> Danh sách sản phẩm </span>
                      </p>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/products/create">
                      <p>
                        <i className="far fa-circle"></i>
                        <span className="hidenText"> Thêm mới</span>
                      </p>
                    </NavLink>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <NavLink to="/chat" end>
                <Accordion.Header>
                  <i class="fas fa-comments"></i>&nbsp;
                  <p style={{ height: "0rem" }} className="hidenText">
                    Chat
                  </p>
                </Accordion.Header>
              </NavLink>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <NavLink to="/order" end>
                <Accordion.Header>
                  <i class="fas fa-shopping-cart"></i>&nbsp;
                  <p style={{ height: "0rem" }} className="hidenText">
                    Quản lý đơn hàng
                  </p>
                </Accordion.Header>
              </NavLink>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
              <NavLink to="/vouchers" end>
                <Accordion.Header>
                  <i class="fas fa-wallet"></i>&nbsp;
                  <p style={{ height: "0rem" }} className="hidenText">
                    Quản lý voucher
                  </p>
                </Accordion.Header>
              </NavLink>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
              <NavLink to="/shippingfee" end>
                <Accordion.Header>
                  <i class="fas fa-shipping-fast"></i>&nbsp;
                  <p style={{ height: "0rem" }} className="hidenText">
                    Quản lý Phí vận chuyển
                  </p>
                </Accordion.Header>
              </NavLink>
            </Accordion.Item>

            <Accordion.Item eventKey="6">
              <NavLink to="/Revenue" end>
                <Accordion.Header>
                  <i class="fas fa-money-check-alt"></i>&nbsp;
                  <p style={{ height: "0rem" }} className="hidenText">
                    Doanh Thu
                  </p>
                </Accordion.Header>
              </NavLink>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
export default SideBar;
