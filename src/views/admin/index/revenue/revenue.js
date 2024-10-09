import "./style.scss";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function Revenue() {
  const [carts, setCarts] = useState([]);
  const [res, setRes] = useState([]);
  const [status, setStatus] = useState("delivered");
  const [cookies] = useCookies();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchCartsOder = async () => {
    try {
      const response = await fetch(
        `http://localhost:5050/cartsOder/admin?status=${status}&startDate=${startDate}&endDate=${endDate}`,
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
      setRes(data.data || []);
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };

  const VND = new Intl.NumberFormat("vi-VN", {
    currency: "VND",
  });

  useEffect(() => {
    fetchCartsOder();
  }, []);

  useEffect(() => {
    const combinedCarts = res.reduce(
      (acc, element) => acc.concat(element.carts),
      []
    );
    setCarts(combinedCarts);
  }, [res]);

  return (
    <div className="box_cart">
      <p style={{ marginLeft: "3rem", fontSize: "2rem" }}>Doanh Thu</p>
      <hr style={{ width: "90%", margin: "auto", marginBottom: "1rem" }}></hr>

      <div id="revenue-over-time">
        <label htmlFor="first-date">Từ</label>
        <input
          type="date"
          id="first-date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label htmlFor="last-date">Đến</label>
        <input
          type="date"
          id="last-date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <i
          style={{ cursor: "pointer" }}
          onClick={fetchCartsOder}
          class="fas fa-search"
        ></i>
      </div>

      <div className="body">
        <div className="container-fluid">
          {carts.length > 0 ? (
            <table id="revenue" className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th> Ảnh</th>
                  <th>Tên Sản Phẩm</th>
                  <th>Số Lượng</th>
                  <th>Số Tiền</th>
                  <th>Hot</th>
                  <th>New</th>
                  <th>Thanh toán</th>
                </tr>
              </thead>
              <tbody>
                {carts.map((product, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{ height: "50px", width: "50px" }}
                      />
                    </td>
                    <td>
                      {" "}
                      <p>{product.name}</p>
                    </td>
                    <td>{product.quantity}</td>
                    <td>{VND.format(product.sum)}</td>
                    <td>
                      <i
                        class="fas fa-check-circle"
                        style={{ color: "green" }}
                      ></i>{" "}
                    </td>
                    <td>
                      <i
                        class="fas fa-check-circle"
                        style={{ color: "green" }}
                      ></i>{" "}
                    </td>
                    <td>
                      <i
                        class="fas fa-check-circle"
                        style={{ color: "green" }}
                      ></i>{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Chưa có sản phẩm nào</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Revenue;
