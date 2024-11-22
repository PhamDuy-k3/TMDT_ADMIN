import React, { useCallback, useEffect, useState } from "react";
import ModelAddVoucher from "./modelAddVoucher";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { VND_currency } from "../../../../components/vnd";
import { Link } from "react-router-dom";
const Voucher = () => {
  const [discountcodes, setDiscountcodes] = useState([]);
  const [cookies] = useCookies();

  const currentTime = new Date();

  const checkStatus = async () => {
    const currentTime = new Date();

    const discountcodesExpired = [];
    const discountcodes_new = discountcodes.map((discountcode) => {
      if (new Date(discountcode.expirationDate) < currentTime) {
        discountcodesExpired.push(discountcode._id);
        return { ...discountcode, status: "expired" };
      }
      return discountcode;
    });

    if (discountcodesExpired.length === 0) return;

    setDiscountcodes(discountcodes_new);

    try {
      const response = await axios.put(
        "http://localhost:5050/discountcode",
        discountcodesExpired,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.user_token}`,
          },
        }
      );
      console.log("Cập nhật mã giảm giá hết hạn thành công:", response);
    } catch (error) {
      console.error("Lỗi khi cập nhật mã giảm giá:", error);
    }
  };

  useEffect(() => {
    checkStatus();
  }, [discountcodes]);

  const fetchUserVoucher = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5050/discountcode", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.user_token}`,
        },
      });
      if (response.status === 200) {
        setDiscountcodes(response.data.data);
      } else {
        setDiscountcodes([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Không thể tải dữ liệu voucher.");
    }
  }, [cookies.user_token]);

  useEffect(() => {
    fetchUserVoucher();
  }, [fetchUserVoucher]);

  return (
    <div
      style={{ minHeight: "0", height: "auto" }}
      className="content-wraper content-wraper3 "
    >
      <div className="content-wraper-header d-lg-flex">
        <h4>Mã giảm giá</h4>
        <div className="d-flex content-wraper-header-cl2">
          <Link to="">
            <p style={{ color: "#0A58CA" }}>Home</p>
          </Link>
          <p>/</p>
          <p className="gray">Quản lý voucher</p>
        </div>
      </div>
      <hr style={{ width: "90%", margin: "auto", marginBottom: "1rem" }}></hr>
      <div id="vouchers">
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ width: "300px" }}
        />
        <div className="vouchers__header">
          <ModelAddVoucher fetchUserVoucher={fetchUserVoucher} />
        </div>

        <div className="vouchers__list">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Mã giảm giá</th>
                <th>Số lượng</th>
                <th>Giới hạn sử dụng</th>
                <th>Giá trị giảm</th>
                <th>Giá trị tối thiểu đơn hàng</th>
                <th>Ngày hết hạn</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {discountcodes.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    Không có voucher nào
                  </td>
                </tr>
              ) : (
                discountcodes.map((voucher) => (
                  <tr key={voucher._id}>
                    <td>{voucher.code}</td>
                    <td>{voucher.stock}</td>
                    <td>{voucher.usageLimit}</td>
                    <td>
                      {voucher.maxShippingFreeDiscount
                        ? VND_currency.format(voucher.maxShippingFreeDiscount)
                        : voucher.discountType === "percentage"
                        ? `${voucher.discountValue}%`
                        : VND_currency.format(voucher.discountValue * 1000)}
                    </td>
                    <td>{VND_currency.format(voucher.minOrderValue)}</td>
                    <td>
                      {new Date(voucher.expirationDate).toLocaleDateString()}
                    </td>
                    <td
                      style={
                        voucher.status === "active"
                          ? { color: "green" }
                          : { color: "red" }
                      }
                    >
                      {voucher.status === "active"
                        ? "Đang hoạt động"
                        : "Hết hạn"}
                    </td>
                    <td>
                      <FaEdit
                        className="icon_action"
                        style={{ color: "green" }}
                      />
                      <FaTrashAlt
                        className="icon_action"
                        style={{ color: "red", marginLeft: "1rem" }}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Voucher;
