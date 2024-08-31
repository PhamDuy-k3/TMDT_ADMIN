import "./scssCart/styleCart.scss";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import imgNoOder from "..//..//..//../assets/images/no-order.jpg";

function CartOder() {
  const [sumSp, setSumSp] = useState(0);
  const [total, setTotal] = useState(0);
  const [carts, setCarts] = useState([]);
  const [res, setRes] = useState([]);
  const [status, setStatus] = useState("unconfirmed");
  const [statusCf, setStatusCf] = useState("confirmed");
  const [cookies, setCookie] = useCookies();

  const fetchCartsOder = async () => {
    try {
      const response = await fetch(
        `http://localhost:5050/cartsOder/?id_user_oder=${cookies.id_user}&status=${status}`
      );
      const data = await response.json();
      setRes(data.data);
      setCarts(data.data[0]?.carts || []);
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };

  useEffect(() => {
    fetchCartsOder();
  }, []);

  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  useEffect(() => {
    setSumSp(carts.length);
    setCookie("length_cart", carts.length);
    const totalSum = carts.reduce((accumulator, product) => {
      return accumulator + parseFloat(product.sum);
    }, 0);
    setTotal(VND.format(totalSum * 1000));
  }, [carts]);

  const UpdateStatusCartOrder = async (cartOrderId, dataUpdateStatus) => {
    try {
      const response = await fetch(
        `http://localhost:5050/cartsOder/${cartOrderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataUpdateStatus),
        }
      );
      const data = await response.json();
      console.log("Update successful:", data);
      fetchCartsOder();
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };

  const handelOderCf = (cartOderId) => {
    console.log(cartOderId);
    const dataUpdateStatus = {
      status: "confirmed",
    };
    UpdateStatusCartOrder(cartOderId, dataUpdateStatus);
  };

  return (
    <div
      style={{
        minHeight: "28rem",
      }}
      className="box_cart"
    >
      <div className="body">
        <div className="container-fluid">
          {res.length > 0 ? (
            res.map((item, index) => (
              <div key={index} className="body-product bg-white mt-3">
                <div className="list-products">
                  <table className="table table-bordered table-striped table-order">
                    <thead>
                      <tr>
                        <th>Ảnh</th>
                        <th>Sản phẩm</th>
                        <th>Màu</th>
                        <th>Size</th>
                        <th>Số Lượng</th>
                        <th>Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.carts.length > 0 ? (
                        item.carts.map((product, index) => (
                          <tr key={index}>
                            <td>
                              <img
                                src={product.image}
                                alt={product.name}
                                style={{ height: "50px", width: "50px" }}
                              />
                            </td>
                            <td>
                              <div className="d-flex">
                                <div className="product-info">
                                  <p className="product-name">{product.name}</p>
                                </div>
                              </div>
                            </td>
                            <td>
                              {" "}
                              <p> {product.color}</p>
                            </td>
                            <td>
                              <p>{product.size}</p>
                            </td>

                            <td className="text-center">{product.quantity}</td>

                            <td className="text-center">
                              {item.status === "confirmed" ? (
                                <button style={{ backgroundColor: "gray" }}>
                                  Đã xác nhận
                                </button>
                              ) : (
                                <button
                                  onClick={() => handelOderCf(item._id)}
                                  class="btn btn-primary"
                                >
                                  Xác nhận
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <p>No items in cart</p>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          ) : (
            <div className="img-no-order">
              <img src={imgNoOder} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartOder;
