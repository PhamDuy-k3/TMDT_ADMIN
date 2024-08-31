import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import RevenueColumnChart from "./RevenueColumnChart";
import RevenuelLneChart from "./RevenuelLneChart";

function Dashboard() {
  const [listUser, setListUser] = useState([]);
  const [cookies, setCookie] = useCookies();
  const [limit, setLimit] = useState(20);
  const [listProducts, setListProducts] = useState([]);
  const [cartsOder, setCartsOder] = useState([]);
  const [status, setStatus] = useState("unconfirmed");
  const [statusCf, setStatusCf] = useState("confirmed");
  const [revenue, setRevenue] = useState([]);

  const fetchData = async (url, setState) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.user_token,
        },
      });
      const data = await response.json();
      setState(data.data);
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };

  useEffect(() => {
    fetchData(`http://localhost:5050/users?limit=${limit}`, setListUser);
    fetchData(`http://localhost:5050/Products?limit=${limit}`, setListProducts);
    fetchData(
      `http://localhost:5050/cartsOder/?id_user_oder=${cookies.id_user}&status=${status}`,
      setCartsOder
    );
    fetchData(
      `http://localhost:5050/cartsOder/?id_user_oder=${cookies.id_user}&status=delivered`,
      setRevenue
    );
  }, []);

  console.log(revenue);
  let countRevenue = revenue.reduce((acc, e) => {
    return (acc += e.total_prices);
  }, 0);
  const VND = new Intl.NumberFormat("vi-VN", {
    // style: 'currency',
    currency: "VND",
  });
  const countUser = listUser?.length || 0;
  const countProduct = listProducts?.length || 0;
  const countOderCf = cartsOder?.length || 0;

  return (
    <div className="content-wraper content-wraper0">
      <div className="content-wraper-header d-lg-flex">
        <h2>Dashboard</h2>
        <div className="d-flex content-wraper-header-cl2">
          <a href="">
            <p style={{ color: "#0A58CA" }}>Home</p>
          </a>
          <p>/</p>
          <p className="gray">Dashboard v1</p>
        </div>
      </div>
      <div className="content">
        <div className="container-fluid">
          <div className="More-infor d-flex flex-wrap text-align">
            <div className="item-more-infor">
              <div className="item-more-infor-small blue">
                <div className="inner d-flex">
                  <div className="inner-text col-7">
                    <p>{countProduct}</p>
                    <p>Số sản phẩm</p>
                  </div>
                  <div className="inner-icon">
                  <i class="fab fa-product-hunt"></i>
                  </div>
                </div>
                <a href="">
                  <div className="moreInfor d-flex">
                    <p>Xem thêm</p>
                    <p>
                      <i className="fas fa-arrow-circle-right"></i>
                    </p>
                  </div>
                </a>
              </div>
            </div>
            <div className="item-more-infor">
              <div className="item-more-infor-small green">
                <div className="inner d-flex">
                  <div className="inner-text col-7">
                    <p>{countOderCf}</p>
                    <p>Số đơn hàng</p>
                  </div>
                  <div className="inner-icon">
                    <i class="fas fa-shopping-cart"></i>
                  </div>
                </div>
                <div className="moreInfor d-flex">
                  <p>Xem thêm</p>
                  <p>
                    <i className="fas fa-arrow-circle-right"></i>
                  </p>
                </div>
              </div>
            </div>
            <div className="item-more-infor">
              <div className="item-more-infor-small yellow">
                <div className="inner d-flex">
                  <div className="inner-text col-7">
                    <p>{countUser}</p>
                    <p>Số người dùng</p>
                  </div>
                  <div className="inner-icon">
                    <i className="fas fa-user-plus"></i>
                  </div>
                </div>
                <div className="moreInfor d-flex">
                  <p>Xem thêm</p>
                  <p>
                    <i className="fas fa-arrow-circle-right"></i>
                  </p>
                </div>
              </div>
            </div>
            <div className="item-more-infor">
              <div className="item-more-infor-small red">
                <div className="inner d-flex">
                  <div className="inner-text col-7">
                    <p>{VND.format(countRevenue)}</p>
                    <p>Doanh thu</p>
                  </div>
                  <div className="inner-icon">
                    <i class="fas fa-money-check-alt"></i>
                  </div>
                </div>
                <div className="moreInfor d-flex">
                  <p>Xem thêm</p>
                  <p>
                    <i className="fas fa-arrow-circle-right"></i>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <RevenueColumnChart />
          <RevenuelLneChart />
          <div className="Sale">
            <div className="Sale-header d-flex">
              <div className="Sale-header-title col-5 col-lg-7">
                <p>
                  <i className="fas fa-clock"></i> Sales
                </p>
              </div>
              <div className="Sale-header-op d-flex">
                <p className="sale-op sale-op-active">Area</p>
                <p className="gray sale-op">Dount</p>
              </div>
            </div>
            <div className="Sale-infor">
              <img
                src="img/sales.jpg"
                className="sale-img sale-img-active"
                alt=""
              />
              <img src="img/sales-2.jpg" className="sale-img" alt="" />
            </div>
          </div>
          <div className="Dircet-Chat">
            <div className="Dircet-Chat-header d-flex">
              <div className="Dircet-Chat-title col-6 col-lg-8">
                <p>Dircet Chat</p>
              </div>
              <nav>
                <ul className="d-flex">
                  <li>3</li>
                  <li>
                    <i className="fas fa-minus"></i>
                  </li>
                  <li>
                    <i className="fas fa-comments gray"></i>
                  </li>
                  <li>
                    <i className="fas fa-times"></i>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="Dircet-Chat-content">
              <div className="p-2">
                <div className="dircet-chat-msg">
                  <div className="d-flex">
                    <p className="name">Pham Duy Cute</p>
                    <p className="time-chat">
                      <span>23</span>
                      <span> Jan</span>
                      <span> 2:05</span>
                      <span> pm</span>
                    </p>
                  </div>

                  <div className="d-flex user-left">
                    <img src="img/user.jpg" alt="" />
                    <p>Mình quay lại nha em !</p>
                  </div>
                </div>
                <div className="dircet-chat-msg-right">
                  <div className="d-flex">
                    <p className="time-chat">
                      <span>23</span>
                      <span> Jan</span>
                      <span> 2:05</span>
                      <span> pm</span>
                    </p>
                    <p className="name">Người Yêu Cũ</p>
                  </div>
                  <div className="d-flex user-right flex-row-reverse">
                    <img src="img/user-me.jpg" alt="" />
                    <p>Không ! Anh vừa nghèo vừa xấu</p>
                  </div>
                </div>

                <div className="dircet-chat-msg">
                  <div className="d-flex">
                    <p className="name">Pham Duy Cute</p>
                    <p className="time-chat">
                      <span>23</span>
                      <span> Jan</span>
                      <span> 2:05</span>
                      <span> pm</span>
                    </p>
                  </div>

                  <div className="d-flex user-left">
                    <img src="img/user.jpg" alt="" />
                    <p>Mình quay lại nha em ! Đi mà...</p>
                  </div>
                </div>
                <div className="dircet-chat-msg-right">
                  <div className="d-flex">
                    <p className="time-chat">
                      <span>23</span>
                      <span> Jan</span>
                      <span> 2:05</span>
                      <span> pm</span>
                    </p>
                    <p className="name">Người Yêu Cũ</p>
                  </div>
                  <div className="d-flex user-right flex-row-reverse">
                    <img src="img/user-me.jpg" alt="" />
                    <p>Không ! Cút</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="Dircet-Chat-send">
              <form action="">
                <div className="p-4">
                  <input
                    type="text"
                    name="Message"
                    id="Message"
                    placeholder="Type Message ..."
                  />
                  <button className="btn btn-primary">Send</button>
                </div>
              </form>
            </div>
          </div>
          <div className="Todo-list">
            <div className="Todo-list-header d-flex">
              <div className="Todo-list-title col-6 col-lg-8">
                <p>
                  <i className="fas fa-clipboard-list"></i> To Do List
                </p>
              </div>
              <nav>
                <ul className="d-flex">
                  <li>
                    <i className="fas fa-angle-double-left"></i>
                  </li>
                  <li>1</li>
                  <li>2</li>
                  <li>3</li>
                  <li>
                    <i className="fas fa-angle-double-right"></i>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="Todo-list-content">
              <ul className="mt-3">
                <li className="done d-flex">
                  <span className="handel col-1">
                    <i className="fas fa-ellipsis-v"></i>
                    <i className="fas fa-ellipsis-v"></i>
                  </span>
                  <div className="icheck-primary">
                    <label htmlFor="todoCheck1">
                      <input type="checkbox" name="todo1" id="todoCheck1" />
                      <i className="fas fa-check-square"></i>
                    </label>
                  </div>
                  <span className="text">
                    Design a nice theme
                    <span className="del-text">
                      <del>Design a nice theme</del>
                    </span>
                  </span>
                  <div className="time-tool d-lg-flex">
                    <small className="time">
                      <button className="btn btn-danger">
                        <i className="far fa-clock"></i>2 mins
                      </button>
                    </small>
                    <div className="tools">
                      <i className="fas fa-edit fa-edit-none"></i>
                    </div>
                  </div>
                </li>
                <li className="done d-flex mt-1">
                  <span className="handel col-1">
                    <i className="fas fa-ellipsis-v"></i>
                    <i className="fas fa-ellipsis-v"></i>
                  </span>
                  <div className="icheck-primary">
                    <label htmlFor="todoCheck2">
                      <input type="checkbox" name="todo2" id="todoCheck2" />
                      <i className="fas fa-check-square"></i>
                    </label>
                  </div>
                  <span className="text">
                    Make the theme responsive
                    <span className="del-text">
                      <del>Make the theme responsive</del>
                    </span>
                  </span>
                  <div className="time-tool d-lg-flex">
                    <small className="time">
                      <button className="btn btn-info">
                        <i className="far fa-clock"></i>2 mins
                      </button>
                    </small>
                    <div className="tools">
                      <i className="fas fa-edit fa-edit-none"></i>
                    </div>
                  </div>
                </li>
                <li className="done d-flex mt-1">
                  <span className="handel col-1">
                    <i className="fas fa-ellipsis-v"></i>
                    <i className="fas fa-ellipsis-v"></i>
                  </span>
                  <div className="icheck-primary">
                    <label htmlFor="todoCheck3">
                      <input type="checkbox" name="todo3" id="todoCheck3" />
                      <i className="fas fa-check-square"></i>
                    </label>
                  </div>
                  <span className="text">
                    Let theme shine like a star
                    <span className="del-text">
                      <del>Let theme shine like a star</del>
                    </span>
                  </span>
                  <div className="time-tool d-lg-flex">
                    <small className="time">
                      <button className="btn btn-success">
                        <i className="far fa-clock"></i>2 mins
                      </button>
                    </small>
                    <div className="tools">
                      <i className="fas fa-edit fa-edit-none"></i>
                    </div>
                  </div>
                </li>
                <li className="done d-flex mt-1">
                  <span className="handel col-1">
                    <i className="fas fa-ellipsis-v"></i>
                    <i className="fas fa-ellipsis-v"></i>
                  </span>
                  <div className="icheck-primary">
                    <label htmlFor="todoCheck4">
                      <input type="checkbox" name="todo4" id="todoCheck4" />
                      <i className="fas fa-check-square"></i>
                    </label>
                  </div>
                  <span className="text">
                    Let theme shine like a star
                    <span className="del-text">
                      <del>Let theme shine like a star</del>
                    </span>
                  </span>

                  <div className="time-tool d-lg-flex">
                    <small className="time">
                      <button className="btn btn-warning">
                        <i className="far fa-clock"></i>2 mins
                      </button>
                    </small>
                    <div className="tools">
                      <i className="fas fa-edit fa-edit-none"></i>
                    </div>
                  </div>
                </li>
                <li className="done d-flex mt-1">
                  <span className="handel col-1">
                    <i className="fas fa-ellipsis-v"></i>
                    <i className="fas fa-ellipsis-v"></i>
                  </span>
                  <div className="icheck-primary">
                    <label htmlFor="todoCheck5">
                      <input type="checkbox" name="todo5" id="todoCheck5" />
                      <i className="fas fa-check-square"></i>
                    </label>
                  </div>
                  <span className="text">
                    Check your messages and notifications
                    <span className="del-text">
                      <del>Check your messages and notifications</del>
                    </span>
                  </span>
                  <div className="time-tool d-lg-flex">
                    <small className="time">
                      <button className="btn btn-danger">
                        <i className="far fa-clock"></i>2 mins
                      </button>
                    </small>
                    <div className="tools">
                      <i className="fas fa-edit fa-edit-none"></i>
                    </div>
                  </div>
                </li>
                <li className="done d-flex mt-1">
                  <span className="handel col-1">
                    <i className="fas fa-ellipsis-v"></i>
                    <i className="fas fa-ellipsis-v"></i>
                  </span>
                  <div className="icheck-primary">
                    <label htmlFor="todoCheck6">
                      <input type="checkbox" name="todo6" id="todoCheck6" />
                      <i className="fas fa-check-square"></i>
                    </label>
                  </div>
                  <span className="text">
                    Design a nice theme
                    <span className="del-text">
                      <del>Design a nice theme</del>
                    </span>
                  </span>
                  <div className="time-tool d-lg-flex">
                    <small className="time">
                      <button className="btn btn-danger">
                        <i className="far fa-clock"></i>2 mins
                      </button>
                    </small>
                    <div className="tools">
                      <i className="fas fa-edit fa-edit-none"></i>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="Todo-list-add">
              <button>
                <i className="fas fa-plus"></i> Add item
              </button>
            </div>
          </div>
          <div className="all-content-con">
            <div className="Visitor">
              <div className="Visitor-header d-flex">
                <div className="Visitor-title col-6">
                  <p>
                    <i className="fas fa-map-marker-alt"></i> Visitors
                  </p>
                </div>
                <nav>
                  <ul className="d-flex">
                    <li>
                      <i className="fas fa-clipboard-list"></i>
                    </li>
                    <li>
                      <i className="fas fa-minus"></i>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="Visitor-content"></div>
              <div className="d-flex Visitor-footer">
                <img src="img/visitors.jpg" alt="" />
                <img src="img/online.jpg" alt="" />
                <img src="img/vistor-sale.jpg" alt="" />
              </div>
            </div>
            <div className="Sale-Draph">
              <div className="Sale-Draph-header d-flex">
                <div className="Sale-Draph-title col-6">
                  <p>
                    <i className="fas fa-th-list"></i> Sales Graph
                  </p>
                </div>
                <nav>
                  <ul className="d-flex">
                    <li>
                      <i className="fas fa-minus"></i>
                    </li>
                    <li>
                      <i className="fas fa-times"></i>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="Sale-Draph-content">
                <img src="img/sale-draph.jpg" alt="" />
              </div>
              <div className="Sale-Draph-footer">
                <div className="p-3 d-flex">
                  <div className="text-align text-white col-4">
                    <div className="Sale-Draph-footer-input-img">
                      <img src="img/mail-oder.jpg" alt="" />
                      <input type="text" value="20" />
                    </div>
                    <p>Mail-Orders</p>
                  </div>
                  <div className="text-align text-white col-4">
                    <div className="Sale-Draph-footer-input-img">
                      <img src="img/sale-draph-online.jpg" alt="" />
                      <input type="text" value="50" />
                    </div>
                    <p>Mail-Orders</p>
                  </div>
                  <div className="text-align text-white col-4">
                    <div className="Sale-Draph-footer-input-img">
                      <img src="img/in-store.jpg" alt="" />
                      <input type="text" value="30" />
                    </div>
                    <p>Mail-Orders</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="Calendar">
              <div className="calendar-header d-flex">
                <div className="calendar-title col-6">
                  <p>
                    <i className="fas fa-calendar-alt"></i> Calendar
                  </p>
                </div>
                <nav>
                  <ul className="d-flex">
                    <li>
                      <i className="fas fa-bars"></i>
                    </li>
                    <li>
                      <i className="fas fa-minus"></i>
                    </li>
                    <li>
                      <i className="fas fa-times"></i>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="Calendar-content">
                <div className="container-fluid">
                  <div className="calendar-content-month d-flex">
                    <div className="col-3 calendar calendar-prev">
                      <i className="fas fa-chevron-left"></i>
                    </div>
                    <div className="col-6 calendar calendar-month d-flex">
                      <p className="calendar-month-text col-6">January</p>
                      <span className="calendar-year"></span>
                    </div>
                    <div className="col-3 calendar calendar-next">
                      <i className="fas fa-chevron-right"></i>
                    </div>
                  </div>
                  <div className="calendar-content-table">
                    <table className="table calendar-table table-borderless table-active mt-1">
                      <thead>
                        <th>Su</th>
                        <th>Mo</th>
                        <th>Tu</th>
                        <th>We</th>
                        <th>Th</th>
                        <th>Fr</th>
                        <th>Sa</th>
                      </thead>
                      <tbody className="calendar-table-January">
                        <tr>
                          <td className="dayColor">28</td>
                          <td className="dayColor">29</td>
                          <td className="dayColor">30</td>
                          <td className="dayColor">31</td>
                          <td>1</td>
                          <td>2</td>
                          <td>3</td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>5</td>
                          <td>6</td>
                          <td>7</td>
                          <td>8</td>
                          <td>9</td>
                          <td>10</td>
                        </tr>
                        <tr className="day">
                          <td>11</td>
                          <td>12</td>
                          <td>13</td>
                          <td>14</td>
                          <td>15</td>
                          <td>16</td>
                          <td>17</td>
                        </tr>
                        <tr>
                          <td>18</td>
                          <td>19</td>
                          <td>20</td>
                          <td>21</td>
                          <td>22</td>
                          <td>23</td>
                          <td>24</td>
                        </tr>
                        <tr>
                          <td>25</td>
                          <td>26</td>
                          <td>27</td>
                          <td>28</td>
                          <td>29</td>
                          <td>30</td>
                          <td>31</td>
                        </tr>
                        <tr>
                          <td className="dayColor">1</td>
                          <td className="dayColor">2</td>
                          <td className="dayColor">3</td>
                          <td className="dayColor">4</td>
                          <td className="dayColor">5</td>
                          <td className="dayColor">6</td>
                          <td className="dayColor">7</td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="table calendar-table table-borderless mt-1">
                      <thead>
                        <th>Su</th>
                        <th>Mo</th>
                        <th>Tu</th>
                        <th>We</th>
                        <th>Th</th>
                        <th>Fr</th>
                        <th>Sa</th>
                      </thead>
                      <tbody className="calendar-table-February">
                        <tr>
                          <td>1</td>
                          <td>2</td>
                          <td>3</td>
                          <td>4</td>
                          <td>5</td>
                          <td>6</td>
                          <td>7</td>
                        </tr>
                        <tr>
                          <td>8</td>
                          <td>9</td>
                          <td>10</td>
                          <td>11</td>
                          <td>12</td>
                          <td>13</td>
                          <td>14</td>
                        </tr>
                        <tr className="day">
                          <td>15</td>
                          <td>16</td>
                          <td>17</td>
                          <td>18</td>
                          <td>19</td>
                          <td>20</td>
                          <td>21</td>
                        </tr>
                        <tr>
                          <td>22</td>
                          <td>23</td>
                          <td>23</td>
                          <td>25</td>
                          <td>26</td>
                          <td>27</td>
                          <td>28</td>
                        </tr>
                        <tr>
                          <td className="dayColor">1</td>
                          <td className="dayColor">2</td>
                          <td className="dayColor">3</td>
                          <td className="dayColor">4</td>
                          <td className="dayColor">5</td>
                          <td className="dayColor">6</td>
                          <td className="dayColor">7</td>
                        </tr>
                        <tr>
                          <td className="dayColor">8</td>
                          <td className="dayColor">9</td>
                          <td className="dayColor">10</td>
                          <td className="dayColor">11</td>
                          <td className="dayColor">12</td>
                          <td className="dayColor">13</td>
                          <td className="dayColor">14</td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="table calendar-table table-borderless mt-1">
                      <thead>
                        <th>Su</th>
                        <th>Mo</th>
                        <th>Tu</th>
                        <th>We</th>
                        <th>Th</th>
                        <th>Fr</th>
                        <th>Sa</th>
                      </thead>
                      <tbody className="calendar-table-March">
                        <tr>
                          <td>1</td>
                          <td>2</td>
                          <td>3</td>
                          <td>4</td>
                          <td>5</td>
                          <td>6</td>
                          <td>7</td>
                        </tr>
                        <tr>
                          <td>8</td>
                          <td>9</td>
                          <td>10</td>
                          <td>11</td>
                          <td>12</td>
                          <td>13</td>
                          <td>14</td>
                        </tr>
                        <tr className="day">
                          <td>15</td>
                          <td>16</td>
                          <td>17</td>
                          <td>18</td>
                          <td>19</td>
                          <td>20</td>
                          <td>21</td>
                        </tr>
                        <tr>
                          <td>22</td>
                          <td>23</td>
                          <td>23</td>
                          <td>25</td>
                          <td>26</td>
                          <td>27</td>
                          <td>28</td>
                        </tr>
                        <tr>
                          <td>28</td>
                          <td>30</td>
                          <td>31</td>
                          <td className="dayColor">1</td>
                          <td className="dayColor">2</td>
                          <td className="dayColor">3</td>
                          <td className="dayColor">4</td>
                        </tr>
                        <tr>
                          <td className="dayColor">5</td>
                          <td className="dayColor">6</td>
                          <td className="dayColor">7</td>
                          <td className="dayColor">8</td>
                          <td className="dayColor">9</td>
                          <td className="dayColor">10</td>
                          <td className="dayColor">11</td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="table calendar-table table-borderless mt-1">
                      <thead>
                        <th>Su</th>
                        <th>Mo</th>
                        <th>Tu</th>
                        <th>We</th>
                        <th>Th</th>
                        <th>Fr</th>
                        <th>Sa</th>
                      </thead>
                      <tbody className="calendar-table-April">
                        <tr>
                          <td>1</td>
                          <td>2</td>
                          <td>3</td>
                          <td>4</td>
                          <td>5</td>
                          <td>6</td>
                          <td>7</td>
                        </tr>
                        <tr>
                          <td>8</td>
                          <td>9</td>
                          <td>10</td>
                          <td>11</td>
                          <td>12</td>
                          <td>13</td>
                          <td>14</td>
                        </tr>
                        <tr className="day">
                          <td>15</td>
                          <td>16</td>
                          <td>17</td>
                          <td>18</td>
                          <td>19</td>
                          <td>20</td>
                          <td>21</td>
                        </tr>
                        <tr>
                          <td>22</td>
                          <td>23</td>
                          <td>23</td>
                          <td>25</td>
                          <td>26</td>
                          <td>27</td>
                          <td>28</td>
                        </tr>
                        <tr>
                          <td>28</td>
                          <td>30</td>
                          <td>31</td>
                          <td className="dayColor">1</td>
                          <td className="dayColor">2</td>
                          <td className="dayColor">3</td>
                          <td className="dayColor">4</td>
                        </tr>
                        <tr>
                          <td className="dayColor">5</td>
                          <td className="dayColor">6</td>
                          <td className="dayColor">7</td>
                          <td className="dayColor">8</td>
                          <td className="dayColor">9</td>
                          <td className="dayColor">10</td>
                          <td className="dayColor">11</td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="table calendar-table table-borderless mt-1">
                      <thead>
                        <th>Su</th>
                        <th>Mo</th>
                        <th>Tu</th>
                        <th>We</th>
                        <th>Th</th>
                        <th>Fr</th>
                        <th>Sa</th>
                      </thead>
                      <tbody className="calendar-table-May">
                        <tr>
                          <td>1</td>
                          <td>2</td>
                          <td>3</td>
                          <td>4</td>
                          <td>5</td>
                          <td>6</td>
                          <td>7</td>
                        </tr>
                        <tr>
                          <td>8</td>
                          <td>9</td>
                          <td>10</td>
                          <td>11</td>
                          <td>12</td>
                          <td>13</td>
                          <td>14</td>
                        </tr>
                        <tr className="day">
                          <td>15</td>
                          <td>16</td>
                          <td>17</td>
                          <td>18</td>
                          <td>19</td>
                          <td>20</td>
                          <td>21</td>
                        </tr>
                        <tr>
                          <td>22</td>
                          <td>23</td>
                          <td>23</td>
                          <td>25</td>
                          <td>26</td>
                          <td>27</td>
                          <td>28</td>
                        </tr>
                        <tr>
                          <td>28</td>
                          <td>30</td>
                          <td>31</td>
                          <td className="dayColor">1</td>
                          <td className="dayColor">2</td>
                          <td className="dayColor">3</td>
                          <td className="dayColor">4</td>
                        </tr>
                        <tr>
                          <td className="dayColor">5</td>
                          <td className="dayColor">6</td>
                          <td className="dayColor">7</td>
                          <td className="dayColor">8</td>
                          <td className="dayColor">9</td>
                          <td className="dayColor">10</td>
                          <td className="dayColor">11</td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="table calendar-table table-borderless mt-1">
                      <thead>
                        <th>Su</th>
                        <th>Mo</th>
                        <th>Tu</th>
                        <th>We</th>
                        <th>Th</th>
                        <th>Fr</th>
                        <th>Sa</th>
                      </thead>
                      <tbody className="calendar-table-June">
                        <tr>
                          <td>1</td>
                          <td>2</td>
                          <td>3</td>
                          <td>4</td>
                          <td>5</td>
                          <td>6</td>
                          <td>7</td>
                        </tr>
                        <tr>
                          <td>8</td>
                          <td>9</td>
                          <td>10</td>
                          <td>11</td>
                          <td>12</td>
                          <td>13</td>
                          <td>14</td>
                        </tr>
                        <tr className="day">
                          <td>15</td>
                          <td>16</td>
                          <td>17</td>
                          <td>18</td>
                          <td>19</td>
                          <td>20</td>
                          <td>21</td>
                        </tr>
                        <tr>
                          <td>22</td>
                          <td>23</td>
                          <td>23</td>
                          <td>25</td>
                          <td>26</td>
                          <td>27</td>
                          <td>28</td>
                        </tr>
                        <tr>
                          <td>28</td>
                          <td>30</td>
                          <td>31</td>
                          <td className="dayColor">1</td>
                          <td className="dayColor">2</td>
                          <td className="dayColor">3</td>
                          <td className="dayColor">4</td>
                        </tr>
                        <tr>
                          <td className="dayColor">5</td>
                          <td className="dayColor">6</td>
                          <td className="dayColor">7</td>
                          <td className="dayColor">8</td>
                          <td className="dayColor">9</td>
                          <td className="dayColor">10</td>
                          <td className="dayColor">11</td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="table calendar-table table-borderless mt-1">
                      <thead>
                        <th>Su</th>
                        <th>Mo</th>
                        <th>Tu</th>
                        <th>We</th>
                        <th>Th</th>
                        <th>Fr</th>
                        <th>Sa</th>
                      </thead>
                      <tbody className="calendar-table-July">
                        <tr>
                          <td>1</td>
                          <td>2</td>
                          <td>3</td>
                          <td>4</td>
                          <td>5</td>
                          <td>6</td>
                          <td>7</td>
                        </tr>
                        <tr>
                          <td>8</td>
                          <td>9</td>
                          <td>10</td>
                          <td>11</td>
                          <td>12</td>
                          <td>13</td>
                          <td>14</td>
                        </tr>
                        <tr className="day">
                          <td>15</td>
                          <td>16</td>
                          <td>17</td>
                          <td>18</td>
                          <td>19</td>
                          <td>20</td>
                          <td>21</td>
                        </tr>
                        <tr>
                          <td>22</td>
                          <td>23</td>
                          <td>23</td>
                          <td>25</td>
                          <td>26</td>
                          <td>27</td>
                          <td>28</td>
                        </tr>
                        <tr>
                          <td>28</td>
                          <td>30</td>
                          <td>31</td>
                          <td className="dayColor">1</td>
                          <td className="dayColor">2</td>
                          <td className="dayColor">3</td>
                          <td className="dayColor">4</td>
                        </tr>
                        <tr>
                          <td className="dayColor">5</td>
                          <td className="dayColor">6</td>
                          <td className="dayColor">7</td>
                          <td className="dayColor">8</td>
                          <td className="dayColor">9</td>
                          <td className="dayColor">10</td>
                          <td className="dayColor">11</td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="table calendar-table table-borderless mt-1">
                      <thead>
                        <th>Su</th>
                        <th>Mo</th>
                        <th>Tu</th>
                        <th>We</th>
                        <th>Th</th>
                        <th>Fr</th>
                        <th>Sa</th>
                      </thead>
                      <tbody className="calendar-table-August">
                        <tr>
                          <td>1</td>
                          <td>2</td>
                          <td>3</td>
                          <td>4</td>
                          <td>5</td>
                          <td>6</td>
                          <td>7</td>
                        </tr>
                        <tr>
                          <td>8</td>
                          <td>9</td>
                          <td>10</td>
                          <td>11</td>
                          <td>12</td>
                          <td>13</td>
                          <td>14</td>
                        </tr>
                        <tr className="day">
                          <td>15</td>
                          <td>16</td>
                          <td>17</td>
                          <td>18</td>
                          <td>19</td>
                          <td>20</td>
                          <td>21</td>
                        </tr>
                        <tr>
                          <td>22</td>
                          <td>23</td>
                          <td>23</td>
                          <td>25</td>
                          <td>26</td>
                          <td>27</td>
                          <td>28</td>
                        </tr>
                        <tr>
                          <td>28</td>
                          <td>30</td>
                          <td>31</td>
                          <td className="dayColor">1</td>
                          <td className="dayColor">2</td>
                          <td className="dayColor">3</td>
                          <td className="dayColor">4</td>
                        </tr>
                        <tr>
                          <td className="dayColor">5</td>
                          <td className="dayColor">6</td>
                          <td className="dayColor">7</td>
                          <td className="dayColor">8</td>
                          <td className="dayColor">9</td>
                          <td className="dayColor">10</td>
                          <td className="dayColor">11</td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="table calendar-table table-borderless mt-1">
                      <thead>
                        <th>Su</th>
                        <th>Mo</th>
                        <th>Tu</th>
                        <th>We</th>
                        <th>Th</th>
                        <th>Fr</th>
                        <th>Sa</th>
                      </thead>
                      <tbody className="calendar-table-September">
                        <tr>
                          <td>1</td>
                          <td>2</td>
                          <td>3</td>
                          <td>4</td>
                          <td>5</td>
                          <td>6</td>
                          <td>7</td>
                        </tr>
                        <tr>
                          <td>8</td>
                          <td>9</td>
                          <td>10</td>
                          <td>11</td>
                          <td>12</td>
                          <td>13</td>
                          <td>14</td>
                        </tr>
                        <tr className="day">
                          <td>15</td>
                          <td>16</td>
                          <td>17</td>
                          <td>18</td>
                          <td>19</td>
                          <td>20</td>
                          <td>21</td>
                        </tr>
                        <tr>
                          <td>22</td>
                          <td>23</td>
                          <td>23</td>
                          <td>25</td>
                          <td>26</td>
                          <td>27</td>
                          <td>28</td>
                        </tr>
                        <tr>
                          <td>28</td>
                          <td>30</td>
                          <td>31</td>
                          <td className="dayColor">1</td>
                          <td className="dayColor">2</td>
                          <td className="dayColor">3</td>
                          <td className="dayColor">4</td>
                        </tr>
                        <tr>
                          <td className="dayColor">5</td>
                          <td className="dayColor">6</td>
                          <td className="dayColor">7</td>
                          <td className="dayColor">8</td>
                          <td className="dayColor">9</td>
                          <td className="dayColor">10</td>
                          <td className="dayColor">11</td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="table calendar-table table-borderless mt-1">
                      <thead>
                        <th>Su</th>
                        <th>Mo</th>
                        <th>Tu</th>
                        <th>We</th>
                        <th>Th</th>
                        <th>Fr</th>
                        <th>Sa</th>
                      </thead>
                      <tbody className="calendar-table-October">
                        <tr>
                          <td>1</td>
                          <td>2</td>
                          <td>3</td>
                          <td>4</td>
                          <td>5</td>
                          <td>6</td>
                          <td>7</td>
                        </tr>
                        <tr>
                          <td>8</td>
                          <td>9</td>
                          <td>10</td>
                          <td>11</td>
                          <td>12</td>
                          <td>13</td>
                          <td>14</td>
                        </tr>
                        <tr className="day">
                          <td>15</td>
                          <td>16</td>
                          <td>17</td>
                          <td>18</td>
                          <td>19</td>
                          <td>20</td>
                          <td>21</td>
                        </tr>
                        <tr>
                          <td>22</td>
                          <td>23</td>
                          <td>23</td>
                          <td>25</td>
                          <td>26</td>
                          <td>27</td>
                          <td>28</td>
                        </tr>
                        <tr>
                          <td>28</td>
                          <td>30</td>
                          <td>31</td>
                          <td className="dayColor">1</td>
                          <td className="dayColor">2</td>
                          <td className="dayColor">3</td>
                          <td className="dayColor">4</td>
                        </tr>
                        <tr>
                          <td className="dayColor">5</td>
                          <td className="dayColor">6</td>
                          <td className="dayColor">7</td>
                          <td className="dayColor">8</td>
                          <td className="dayColor">9</td>
                          <td className="dayColor">10</td>
                          <td className="dayColor">11</td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="table calendar-table table-borderless mt-1">
                      <thead>
                        <th>Su</th>
                        <th>Mo</th>
                        <th>Tu</th>
                        <th>We</th>
                        <th>Th</th>
                        <th>Fr</th>
                        <th>Sa</th>
                      </thead>
                      <tbody className="calendar-table-November">
                        <tr>
                          <td>1</td>
                          <td>2</td>
                          <td>3</td>
                          <td>4</td>
                          <td>5</td>
                          <td>6</td>
                          <td>7</td>
                        </tr>
                        <tr>
                          <td>8</td>
                          <td>9</td>
                          <td>10</td>
                          <td>11</td>
                          <td>12</td>
                          <td>13</td>
                          <td>14</td>
                        </tr>
                        <tr className="day">
                          <td>15</td>
                          <td>16</td>
                          <td>17</td>
                          <td>18</td>
                          <td>19</td>
                          <td>20</td>
                          <td>21</td>
                        </tr>
                        <tr>
                          <td>22</td>
                          <td>23</td>
                          <td>23</td>
                          <td>25</td>
                          <td>26</td>
                          <td>27</td>
                          <td>28</td>
                        </tr>
                        <tr>
                          <td>28</td>
                          <td>30</td>
                          <td>31</td>
                          <td className="dayColor">1</td>
                          <td className="dayColor">2</td>
                          <td className="dayColor">3</td>
                          <td className="dayColor">4</td>
                        </tr>
                        <tr>
                          <td className="dayColor">5</td>
                          <td className="dayColor">6</td>
                          <td className="dayColor">7</td>
                          <td className="dayColor">8</td>
                          <td className="dayColor">9</td>
                          <td className="dayColor">10</td>
                          <td className="dayColor">11</td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="table calendar-table table-borderless mt-1">
                      <thead>
                        <th>Su</th>
                        <th>Mo</th>
                        <th>Tu</th>
                        <th>We</th>
                        <th>Th</th>
                        <th>Fr</th>
                        <th>Sa</th>
                      </thead>
                      <tbody className="calendar-table-December">
                        <tr>
                          <td>1</td>
                          <td>2</td>
                          <td>3</td>
                          <td>4</td>
                          <td>5</td>
                          <td>6</td>
                          <td>7</td>
                        </tr>
                        <tr>
                          <td>8</td>
                          <td>9</td>
                          <td>10</td>
                          <td>11</td>
                          <td>12</td>
                          <td>13</td>
                          <td>14</td>
                        </tr>
                        <tr className="day">
                          <td>15</td>
                          <td>16</td>
                          <td>17</td>
                          <td>18</td>
                          <td>19</td>
                          <td>20</td>
                          <td>21</td>
                        </tr>
                        <tr>
                          <td>22</td>
                          <td>23</td>
                          <td>23</td>
                          <td>25</td>
                          <td>26</td>
                          <td>27</td>
                          <td>28</td>
                        </tr>
                        <tr>
                          <td>28</td>
                          <td>30</td>
                          <td>31</td>
                          <td className="dayColor">1</td>
                          <td className="dayColor">2</td>
                          <td className="dayColor">3</td>
                          <td className="dayColor">4</td>
                        </tr>
                        <tr>
                          <td className="dayColor">5</td>
                          <td className="dayColor">6</td>
                          <td className="dayColor">7</td>
                          <td className="dayColor">8</td>
                          <td className="dayColor">9</td>
                          <td className="dayColor">10</td>
                          <td className="dayColor">11</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
