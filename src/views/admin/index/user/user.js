import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";

function User() {
  const [listUser, setListUser] = useState([]);
  const [listUserSearch, setListUserSearch] = useState([]);
  const [user, setUser] = useState();
  const [cookies, setCookie] = useCookies();
  const [limit, setLimit] = useState(20);
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
        Authorization: "Bearer " + cookies.user_token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setListUser(res.data);
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
            Authorization: "Bearer " + cookies.user_token,
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
        Authorization: "Bearer " + cookies.user_token,
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
          <Button
            className="btn btn-danger"
            onClick={() => deleteUser(item._id)}
          >
            Xóa
          </Button>
        </td>
        <td>
          <NavLink to={`/users/update/${item._id}`}>
            <Button className="btn btn-success">Cập nhật</Button>
          </NavLink>
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
                <div className="userInfo">
                  <label htmlFor="nameUser">Tên:</label>
                  <br />
                  <input
                    id="nameUser"
                    name="nameUser"
                    placeholder="Nhập tên ..."
                    {...register("name")}
                  />
                  {/* {errors.name && (
                    <p
                      style={{ marginLeft: "3.1rem" }}
                      className={"text-danger fw-bold"}
                    >
                      {errors.name.message}
                    </p>
                  )} */}
                </div>
                <div className="userInfo">
                  <label htmlFor="nameUser">Số điện thoại:</label>
                  <br />
                  <input
                    id="phoneUser"
                    name="phoneUser"
                    placeholder="Nhập số điện thoại ..."
                    {...register("phone")}
                  />
                  {/* {errors.phone && (
                    <p
                      style={{ marginLeft: "3.1rem" }}
                      className={"text-danger fw-bold"}
                    >
                      {errors.phone.message}
                    </p>
                  )} */}
                </div>
                <div className="userInfo">
                  <label htmlFor="nameUser">Giới tính</label>
                  <br />
                  <input
                    id="genderUser"
                    name="genderUser"
                    placeholder="Nhập giới tính ..."
                    {...register("gender")}
                  />
                  {/* {errors.gender && (
                    <p
                      style={{ marginLeft: "3.5rem" }}
                      className={"text-danger fw-bold"}
                    >
                      {errors.gender.message}
                    </p>
                  )} */}
                </div>
                <button id="idSearchUser">Tìm Kiếm</button>
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
                    <th>Xóa</th>
                    <th>Cập nhật</th>
                  </tr>
                </thead>
                <tbody>{users}</tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default User;
