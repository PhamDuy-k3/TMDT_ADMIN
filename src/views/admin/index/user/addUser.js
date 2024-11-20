import { useState, createContext } from "react";
import Form from "./element/Form";
import { Link } from "react-router-dom";

function AddUser() {
  const [title] = useState("Thêm mới người dùng");

  return (
    <div style={{ height: "auto" }} className="content-wraper ">
      <div className="content-wraper-header d-lg-flex">
        <h4>Người dùng</h4>
        <div className="d-flex content-wraper-header-cl2">
          <Link href="">
            <p style={{ color: "#0A58CA" }}>Home</p>
          </Link>
          <p>/</p>
          <p className="gray">Quản lý người dùng</p>
        </div>
      </div>
      <div className="content">
        <div className="container-fluid">
          <Form title={title} />
        </div>
      </div>
    </div>
  );
}

export default AddUser;
