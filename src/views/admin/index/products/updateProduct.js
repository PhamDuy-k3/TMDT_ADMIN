import { useState, createContext } from "react";
import FormProduct from "./form";

function UpdateProduct() {
  const [title] = useState("Cập nhật sản phẩm");

  return (
    <div style={{ height: "auto" }} className="content-wraper ">
      <div className="content-wraper-header d-lg-flex">
        <h4>Quản lý sản phẩm</h4>
        <div className="d-flex content-wraper-header-cl2">
          <a href="">
            <p style={{ color: "#0A58CA" }}>Home</p>
          </a>
          <p>/</p>
          <p className="gray">Quản lý sản phẩm</p>
        </div>
      </div>
      <div className="content">
        <div className="container-fluid">
          <FormProduct isUpdate={true} title={title} />
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
