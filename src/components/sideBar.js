import Accordion from "react-bootstrap/Accordion";
import { BrowserRouter as Router, Link, NavLink } from "react-router-dom";
import logo from "../assets/images/AdminLTELogo.webp";
function SideBar() {
  return (
    <div className="side-bar">
      <div className="side-bar-header">
        <div className="side-bar-header-title d-flex">
          <img src={logo} alt="" />
          <p className="hidenText">AdminLTE 3</p>
        </div>
        <div className="side-bar-header-infor d-flex">
          <img src={logo} alt="" />
          <p className="hidenText">Pham Duy Dev Web</p>
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
                {" "}
                <i class="fas fa-tachometer-alt"></i>&nbsp;Dashboard
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
                {" "}
                <i class="fab fa-wpforms"></i>&nbsp; Forms
              </Accordion.Header>
              <Accordion.Body>
                <ul className="menu-sub" id="sub1">
                  <li>
                    <NavLink to="/form" end>
                      <p className="optionClick">
                        <i className="far fa-circle"></i>
                        <span className="hidenText"> General Form</span>
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
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <i class="fas fa-table"></i>&nbsp;Table
              </Accordion.Header>
              <Accordion.Body>
                <ul className="menu-sub" id="sub2">
                  <li>
                    <NavLink to="/table" end>
                      <p className="optionClick">
                        <i className="far fa-circle"></i>
                        <span className="hidenText"> Simple Tables</span>
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
            <Accordion.Item eventKey="3">
              <Accordion.Header>
                <i class="fas fa-user-friends"></i>&nbsp;User
              </Accordion.Header>
              <Accordion.Body>
                <ul className="menu-sub" id="sub3">
                  <li>
                    <NavLink to="/users" end>
                      <p>
                        <i className="far fa-circle"></i>
                        <span className="hidenText"> User v1</span>
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
            <Accordion.Item eventKey="4">
              <Accordion.Header>
                <i class="fab fa-product-hunt"></i>&nbsp;Products
              </Accordion.Header>
              <Accordion.Body>
                <ul className="menu-sub" id="sub4">
                  <li>
                    <NavLink to="/products" end>
                      <p>
                        <i className="far fa-circle"></i>
                        <span className="hidenText"> Products v1</span>
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
          </Accordion>
        </div>
      </div>
    </div>
  );
}
export default SideBar;
