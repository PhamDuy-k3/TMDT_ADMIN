import { useCookies } from "react-cookie";
function Navigation() {
  const [cookies, setCookie, removeCookies] = useCookies();

  const logout = (e) => {
    e.preventDefault();
    removeCookies("user_token");
    window.location.href = "http://localhost:3000/auth/login";
  };
  return (
    <nav className="d-flex">
      <ul className="navbar-one d-flex">
        <li>
          <i className="fas fa-bars" ></i>
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
