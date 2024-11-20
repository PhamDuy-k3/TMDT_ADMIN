import React, { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import ShippingFeeModal from "./modelShippingfee";

const ShippingFee = () => {
  const [shippingFees, setShippingFees] = useState([]);
  const [cookies] = useCookies();

  // Fetch shipping fees from the backend
  const fetchShippingFees = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5050/shippingfees", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.user_token}`,
        },
      });
      if (response.status === 200) {
        setShippingFees(response.data.data);
      } else {
        setShippingFees([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Không thể tải dữ liệu phí vận chuyển.");
    }
  }, [cookies.user_token]);

  useEffect(() => {
    fetchShippingFees();
  }, [fetchShippingFees]);

  return (
    <div className="content-wraper content-wraper3">
      <div className="content-wraper-header d-lg-flex">
        <h4>Phí Vận Chuyển</h4>
        <div className="d-flex content-wraper-header-cl2">
          <Link to="">
            <p style={{ color: "#0A58CA" }}>Home</p>
          </Link>
          <p>/</p>
          <p className="gray">Quản lý phí vận chuyển</p>
        </div>
      </div>
      <hr style={{ width: "90%", margin: "auto", marginBottom: "1rem" }} />
      <div id="shippingFees">
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
        <div className="shippingFees__header">
          <ShippingFeeModal fetchShippingFees={fetchShippingFees} />
        </div>

        <div className="shippingFees__list">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Loại Vận Chuyển</th>
                <th>Phí Vận Chuyển</th>
                <th>Thời Gian Giao Hàng</th>
                <th>Mô Tả</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {shippingFees.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    Không có phí vận chuyển nào
                  </td>
                </tr>
              ) : (
                shippingFees.map((fee) => (
                  <tr key={fee._id}>
                    <td>{fee.type}</td>
                    <td>{fee.fee} VND</td>
                    <td>{fee.deliveryTime}</td>
                    <td>{fee.description}</td>
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

export default ShippingFee;
