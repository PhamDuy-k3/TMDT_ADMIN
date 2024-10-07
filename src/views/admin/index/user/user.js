import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Table from "react-bootstrap/Table";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import ExportExcel from "../../../../components/xlsx/xlsx.js";
import "../..//sassAdmin/_user.scss";

function User() {
  const [listUser, setListUser] = useState([]);
  const [listUserSearch, setListUserSearch] = useState([]);
  const [user, setUser] = useState();
  const [cookies, setCookie] = useCookies();

  const [limit, setLimit] = useState(20);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm({
    // giá trị mặc định cho data
    defaultValues: {
      name: "",
      phone: "",
      gender: "",
    },
  });

  ///DANH SÁCH USER
  useEffect(() => {
    fetch(`http://localhost:5050/users?limit=${limit}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.admin_token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setListUser(res.data || []);
        console.log(res);
      });
  }, [user]);

  ///TÌM KIẾM USER
  const searchUser = (data) => {
    if (data.gender !== "" || data.name !== "" || data.phone !== "") {
      const genderLowercase = data.gender.toLowerCase();
      const genderValue =
        genderLowercase === "nam" ? 1 : genderLowercase !== "" ? 2 : "";

      fetch(
        `http://localhost:5050/users?gender=${genderValue}&name=${data.name}&phone=${data.phone}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.admin_token,
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          setListUserSearch(res.data);
        });
    } else {
      alert("Nhập tìm kiếm!");
    }
  };

  /// XÓA USER
  const deleteUser = (userId) => {
    fetch(`http://localhost:5050/users/${userId}`, {
      method: "DELETE",
      headers: {
        // Accept: "application/json",
        // "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.admin_token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status_code == 200) {
          setUser(res.data);
          toast.success(() => (
            <p style={{ paddingTop: "1rem" }}>Xóa thành công!</p>
          ));
        } else {
          toast.error(() => (
            <p style={{ paddingTop: "1rem" }}>Xóa thất bại!</p>
          ));
        }
      });
  };

  // RESET
  const handleChangeName = (event) => {
    const newName = event.target.value;
    console.log(newName);
    if (newName.length === 0) {
      setListUserSearch([]);
    }
  };
  const users = (listUserSearch.length > 0 ? listUserSearch : listUser).map(
    (item, index) => (
      <tr key={item.id}>
        <td>{(index = index + 1)}</td>
        <td>{item.phone}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.gender === 1 ? "Nam" : "Nữ"}</td>
        <td>{item.level === 1 ? "Admin" : "User"}</td>
        <td>
          <NavLink to={`/users/update/${item._id}`}>
            <i style={{ color: "green" }} class="far fa-edit"></i>
          </NavLink>
          <i
            style={{ color: "red", marginLeft: "1rem" }}
            onClick={() => deleteUser(item._id)}
            class="fas fa-trash-alt "
          ></i>
        </td>
      </tr>
    )
  );

  return (
    <>
      <div className="content-wraper content-wraper3 ">
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
        <hr style={{ width: "90%", margin: "auto", marginBottom: "1rem" }}></hr>
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
        <div className="content">
          <div className="container-fluid">
            <form
              onChange={handleChangeName}
              onSubmit={handleSubmit(searchUser)}
            >
              <div className="d-lg-flex flex-lg-wrap">
                <div class="input-container">
                  <input
                    placeholder="Tên người dùng"
                    class="input-field"
                    type="text"
                    {...register("name")}
                  />
                  <label for="input-field" class="input-label">
                    Tên người dùng
                  </label>
                  <span class="input-highlight"></span>
                </div>
                <div class="input-container">
                  <input
                    placeholder="Số điện thoại"
                    class="input-field"
                    type="text"
                    {...register("phone")}
                  />
                  <label for="input-field" class="input-label">
                    Số điện thoại
                  </label>
                  <span class="input-highlight"></span>
                </div>
                <div class="input-container">
                  <input
                    placeholder="Giới tính"
                    class="input-field"
                    type="text"
                    {...register("gender")}
                  />
                  <label for="input-field" class="input-label">
                    Giới tính
                  </label>
                  <span class="input-highlight"></span>
                </div>
                <button id="idSearchProducts">
                  {" "}
                  <i style={{ marginRight: "1rem" }} class="fas fa-search"></i>
                  Tìm Kiếm
                </button>
              </div>
            </form>
            <div style={{ overflow: "scroll", height: "95rem" }}>
              <Table
                className="mt-4"
                style={{ textAlign: "center" }}
                striped
                bordered
                hover
                variant="white"
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Số điện thoại</th>
                    <th>Tên người dùng</th>
                    <th>Email</th>
                    <th>Giới tính</th>
                    <th>Quyền</th>
                    <th>#</th>
                  </tr>
                </thead>
                <tbody>{users}</tbody>
              </Table>
              <ExportExcel nameFile="users" data={listUser} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default User;
