import { useState } from "react";
import Form from "./element/Form";
import { Link } from "react-router-dom";

function UpdateUser() {
  const [title] = useState("Chỉnh sửa user");

  return (
    <div style={{ height: "auto" }} className="content-wraper ">
      <div className="content-wraper-header d-lg-flex">
        <h4>Quản lý users</h4>
        <div className="d-flex content-wraper-header-cl2">
          <Link href="">
            <p style={{ color: "#0A58CA" }}>Home</p>
          </Link>
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
