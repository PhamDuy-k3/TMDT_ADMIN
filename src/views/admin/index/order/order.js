import "./style.scss";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import imgNoOder from "..//..//..//..//assets/images/no-order.jpg";
import Menu from "./menu";
import File from "../file/file";
import Loading from "../../../../components/loading/loading";

function CartOder() {
  const [sumSp, setSumSp] = useState(0);
  const [total, setTotal] = useState(0);
  const [carts, setCarts] = useState([]);
  const [res, setRes] = useState([]);
  const [status, setStatus] = useState("unconfirmed");
  const [cookies, setCookie] = useCookies();

  const fetchCartsOder = async () => {
    try {
      const response = await fetch(
        `http://localhost:5050/cartsOder/?status=${status}`,
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
      setRes(data.data);
      setCarts(data.data[0]?.carts || []);
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };

  useEffect(() => {
    fetchCartsOder();
  }, [status]);

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
    setTotal(totalSum);
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

  const handelOderCf = (cartOderId, newStatus) => {
    const dataUpdateStatus = {
      status: newStatus,
    };
    if (newStatus === "delivered") {
      dataUpdateStatus.confirmedAt = new Date().toISOString(); // Lưu theo định dạng ISO
    }
    UpdateStatusCartOrder(cartOderId, dataUpdateStatus);
  };

  return (
    <div
      style={{
        minHeight: "28rem",
      }}
      className="box_cart"
    >
      <Menu status={status} setStatus={setStatus} />

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
                              <p> {product.color}</p>
                            </td>
                            <td>
                              <p>{product.size}</p>
                            </td>
                            <td className="text-center">{product.quantity}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">
                            Không có sản phẩm trong giỏ hàng
                          </td>
                        </tr>
                      )}
                    </tbody>
                    <div className="text-center order_action">
                      {item.status === "confirmed" ? (
                        <>
                          <button className="disabled">Đã xác nhận</button>
                          <button
                            onClick={() => handelOderCf(item._id, "processing")}
                            style={{
                              marginLeft: "8px",
                              backgroundColor: "#FFA500", // Màu cam cho nút xử lý
                              color: "white",
                            }}
                          >
                            Xử lý
                          </button>
                        </>
                      ) : item.status === "processing" ? (
                        <>
                          <button
                            onClick={() => handelOderCf(item._id, "canceled")}
                            style={{
                              backgroundColor: "#FF4C4C", // Màu đỏ sáng cho nút hủy
                              color: "white",
                            }}
                          >
                            Hủy
                          </button>
                          <button
                            onClick={() => handelOderCf(item._id, "shipped")}
                            style={{
                              backgroundColor: "#4CAF50", // Màu xanh lá cho nút giao hàng
                              color: "white",
                              marginLeft: "8px",
                            }}
                          >
                            Giao hàng
                          </button>
                        </>
                      ) : item.status === "shipped" ? (
                        <>
                          <button
                            onClick={() => handelOderCf(item._id, "delivered")}
                            style={{
                              backgroundColor: "#4CAF50", // Màu xanh lá cho nút đã giao
                              color: "white",
                            }}
                          >
                            Đã giao thành công
                          </button>
                          <button
                            onClick={() => handelOderCf(item._id, "returned")}
                            style={{
                              backgroundColor: "#FFA500", // Màu cam cho nút trả hàng
                              color: "white",
                              marginLeft: "8px",
                            }}
                          >
                            Trả hàng
                          </button>
                        </>
                      ) : item.status === "delivered" ? (
                        <>
                          <div
                            style={{ marginLeft: "3rem" }}
                            className="d-flex"
                          >
                            <button
                              style={{
                                backgroundColor: "#4CAF50", // Màu xanh lá cho nút hoàn thành
                                color: "white",
                              }}
                            >
                              Hoàn thành
                            </button>
                            <File idOder={item._id} />
                          </div>
                        </>
                      ) : item.status === "canceled" ? (
                        <button
                          style={{
                            backgroundColor: "#FF4C4C", // Màu đỏ sáng cho trạng thái đã hủy
                            color: "white",
                          }}
                        >
                          Đã hủy
                        </button>
                      ) : item.status === "returned" ? (
                        <button
                          style={{
                            backgroundColor: "#FFA500", // Màu cam cho trạng thái đã trả hàng
                            color: "white",
                          }}
                        >
                          Đã trả hàng
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => handelOderCf(item._id, "confirmed")}
                            style={{
                              backgroundColor: "#4CAF50", // Màu xanh lá cho nút xác nhận
                              color: "white",
                            }}
                          >
                            Xác nhận
                          </button>
                          <button
                            onClick={() => handelOderCf(item._id, "canceled")}
                            style={{
                              backgroundColor: "#FF4C4C", // Màu đỏ sáng cho nút hủy
                              color: "white",
                              marginLeft: "8px",
                            }}
                          >
                            Hủy
                          </button>
                        </>
                      )}
                    </div>
                  </table>
                </div>
              </div>
            ))
          ) : (
            <div className="img-no-order">
              <img src={imgNoOder} alt="No Order" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartOder;
