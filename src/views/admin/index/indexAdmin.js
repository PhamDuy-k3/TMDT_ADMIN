import "../sassAdmin/styleIndex.scss";
import Accordion from "react-bootstrap/Accordion";
import { Outlet } from "react-router-dom";
import { BrowserRouter as Router, Link } from "react-router-dom";
function IndexAdmin() {
  return (
    <div id="admin">
      {/* <div className="open-start">
        <img src="img/AdminLTELogo.webp" alt="" />
      </div> */}
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
      <div className="box__admin">
        <nav className="d-flex">
          <ul className="navbar-one d-flex">
            <li>
              <i className="fas fa-bars" onClick="hiddenSidebar()"></i>
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
                    <input
                      type="text"
                      id="search_nav"
                      placeholder="Search"
                      oninput="keyBroad()"
                    />
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
              <div className="tb">
                <p>15</p>
              </div>
            </li>
            <li>
              <i className="fas fa-expand-arrows-alt"></i>
            </li>
            <li>
              <i className="fas fa-th-list"></i>
            </li>
          </ul>
        </nav>
        <Outlet />
      </div>
      

      <div className="fly-box"></div>
      <section className="d-flex footer">
        <p>
          Copyright © 2014-2021
          <span>
            <a href="https://adminlte.io/">AdminLTE.io</a>
          </span>{" "}
          . All rights reserved.
        </p>
        <p>Version 3.2.0</p>
      </section>
    </div>
  );
}
export default IndexAdmin;
