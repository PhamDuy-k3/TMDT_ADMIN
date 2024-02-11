import { useState } from "react";
import Form from "./element/Form";

function UpdateUser() {
  const [title] = useState("Chỉnh sửa user");

  return (
    <div style={{ height: "auto" }} className="content-wraper ">
      <div className="content-wraper-header d-lg-flex">
        <h2>Quản lý users</h2>
        <div className="d-flex content-wraper-header-cl2">
          <a href="">
            <p style={{ color: "#0A58CA" }}>Home</p>
          </a>
          <p>/</p>
          <p className="gray">Quản lý users</p>
        </div>
      </div>
      <div className="content">
        <div className="container-fluid">
          <Form isUpdate={true} title={title} />
        </div>
      </div>
    </div>
  );
}
export default UpdateUser;
