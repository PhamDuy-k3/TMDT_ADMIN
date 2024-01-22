import Accordion from "react-bootstrap/Accordion";
import { BrowserRouter as Router, Link } from "react-router-dom";

function SideBar() {
  return (
    <div className="side-bar">
      <div className="side-bar-header">
        <div className="side-bar-header-title d-flex">
          <img src="img/AdminLTELogo.webp" alt="" />
          <p className="hidenText">AdminLTE 3</p>
        </div>
        <div className="side-bar-header-infor d-flex">
          <img src="img/AdminLTELogo.webp" alt="" />
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
              <Accordion.Header>Dashboard</Accordion.Header>
              <Accordion.Body>
                <ul className="menu-sub" id="sub0">
                  <li>
                    <Link to="/">
                      <p className="optionClick bgOpClick">
                        <i className="far fa-circle"></i>
                        <span className="hidenText"> Dashboard v1</span>
                      </p>
                    </Link>
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
              <Accordion.Header>Forms</Accordion.Header>
              <Accordion.Body>
                <ul className="menu-sub" id="sub1">
                  <li>
                    <Link to="/form">
                      <p className="optionClick">
                        <i className="far fa-circle"></i>
                        <span className="hidenText"> General Form</span>
                      </p>
                    </Link>
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
              <Accordion.Header>Table</Accordion.Header>
              <Accordion.Body>
                <ul className="menu-sub" id="sub2">
                  <li>
                    <Link to="/table">
                      <p className="optionClick">
                        <i className="far fa-circle"></i>
                        <span className="hidenText"> Simple Tables</span>
                      </p>
                    </Link>
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
              <Accordion.Header>User</Accordion.Header>
              <Accordion.Body>
                <ul className="menu-sub" id="sub3">
                  <li>
                    <Link to="/users">
                      <p>
                        <i className="far fa-circle"></i>
                        <span className="hidenText"> User v1</span>
                      </p>
                    </Link>
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
              <Accordion.Header>Products</Accordion.Header>
              <Accordion.Body>
                <ul className="menu-sub" id="sub4">
                  <li>
                    <Link to="/products">
                      <p>
                        <i className="far fa-circle"></i>
                        <span className="hidenText"> Products v1</span>
                      </p>
                    </Link>
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
