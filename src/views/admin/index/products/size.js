import React, { useEffect, useState } from "react";
import { Select } from "antd";
import "./styleSize.scss";
import axios from "axios";
import { useCookies } from "react-cookie";

const SizeComponent = ({ register, errors, setValue, isUpdate }) => {
  const [cookies] = useCookies();
  const [sizes, setSizes] = useState([]);

  // Hàm lấy dữ liệu size từ API
  const getSize = async () => {
    try {
      const response = await axios.get("http://localhost:5050/sizes", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.admin_token,
        },
      });
      setSizes(response.data.data || []);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách size:", error);
      setSizes([]); // Đặt mảng trống nếu có lỗi
    }
  };
  useEffect(() => {
    getSize();
    register("sizes");
  }, [register, isUpdate]);

  const options =
    sizes.length > 0
      ? sizes.map((size) => ({
          label: `${size.name} (sl: ${size.stock})`,
          value: size._id,
        }))
      : [];

  const handleChange = (value) => {
    setValue("sizes", value);
  };

  return (
    <>
      <Select
        mode="multiple"
        style={{ width: "100%", height: "2.5rem", marginTop: "0.5rem" }}
        placeholder="Please select"
        onChange={handleChange}
        options={options}
        defaultValue={isUpdate ? options.map((option) => option.value) : []}
      />
      {errors.sizes && (
        <p className="text-danger fw-bold">{errors.sizes.message}</p>
      )}
    </>
  );
};

export default SizeComponent;
