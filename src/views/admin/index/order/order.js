import "./style.scss";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import imgNoOder from "..//..//..//..//assets/images/no-order.jpg";
import Menu from "./menu";
import { Button } from "antd";
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
                              <p> {product.color}</p>
                            </td>
                            <td>
                              <p>{product.size}</p>
                            </td>
                            <td className="text-center">{product.quantity}</td>
                            <td className="text-center">
                              {item.status === "confirmed" ? (
                                <>
                                  <Button type="default" disabled>
                                    Đã xác nhận
                                  </Button>
                                  <Button
                                    type="primary"
                                    onClick={() =>
                                      handelOderCf(item._id, "processing")
                                    }
                                    style={{ marginLeft: "8px" }}
                                  >
                                    Xử lý
                                  </Button>
                                </>
                              ) : item.status === "processing" ? (
                                <>
                                  <Button
                                    onClick={() =>
                                      handelOderCf(item._id, "canceled")
                                    }
                                    type="default"
                                    style={{
                                      backgroundColor: "red",
                                      color: "white",
                                    }}
                                  >
                                    Hủy
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      handelOderCf(item._id, "shipped")
                                    }
                                    type="primary"
                                  >
                                    Giao hàng
                                  </Button>
                                </>
                              ) : item.status === "shipped" ? (
                                <>
                                  <Button
                                    onClick={() =>
                                      handelOderCf(item._id, "delivered")
                                    }
                                    type="primary"
                                  >
                                    Đã giao thành công
                                  </Button>
                                  <Button
                                    type="default"
                                    onClick={() =>
                                      handelOderCf(item._id, "returned")
                                    }
                                    style={{
                                      backgroundColor: "orange",
                                      color: "white",
                                    }}
                                  >
                                    Trả hàng
                                  </Button>
                                </>
                              ) : item.status === "delivered" ? (
                                <>
                                  <div
                                    style={{ marginLeft: "3rem" }}
                                    className="d-flex"
                                  >
                                    <Button type="default" disabled>
                                      Hoàn thành
                                    </Button>
                                    <File idOder={item._id} />
                                  </div>
                                </>
                              ) : item.status === "canceled" ? (
                                <Button
                                  type="default"
                                  disabled
                                  style={{
                                    backgroundColor: "red",
                                    color: "white",
                                  }}
                                >
                                  Đã hủy
                                </Button>
                              ) : item.status === "returned" ? (
                                <Button
                                  type="default"
                                  disabled
                                  style={{
                                    backgroundColor: "orange",
                                    color: "white",
                                  }}
                                >
                                  Đã trả hàng
                                </Button>
                              ) : (
                                <>
                                  <Button
                                    type="primary"
                                    onClick={() =>
                                      handelOderCf(item._id, "confirmed")
                                    }
                                  >
                                    Xác nhận
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      handelOderCf(item._id, "canceled")
                                    }
                                    type="default"
                                    style={{
                                      backgroundColor: "red",
                                      color: "white",
                                    }}
                                  >
                                    Hủy
                                  </Button>
                                </>
                              )}
                            </td>
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
