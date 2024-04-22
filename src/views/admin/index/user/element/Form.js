import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Form({ title, isUpdate = false }) {
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();
  const [statusCode, setsStatusCode] = useState();
  const urlUpdate = useParams();
  const [userUpdate, setUserUpdate] = useState();
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
      email: "",
      level: "2",
      gender: "",
      avatar: "",
    },
  });

  useEffect(() => {
    fetch(`http://localhost:5050/users/${urlUpdate.userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.user_token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setUserUpdate(res.data);
        if (isUpdate) {
           document.getElementById("Email").value = res.data.email;
        }
      });
  }, []);
  const urlApiCreatUser = "http://localhost:5050/users/";
  const urlApiUpdateUser = `http://localhost:5050/users/${urlUpdate.userId}`;
  const CreatUpdateuser = (data, method, urlApi, success, error) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("level", data.level);
    formData.append("gender", data.gender);
    formData.append("avatar", data.avatar[0]); // Chú ý: data.avatar là một mảng, chúng ta cần lấy phần tử đầu tiên

    fetch(urlApi, {
      method: method,
      body: formData,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + cookies.user_token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status_code === 200) {
          setsStatusCode(res.status_code);
          toast.success(() => <p style={{ paddingTop: "1rem" }}>{success}</p>);
        } else {
          // Xử lý các lỗi nếu có
          toast.error(() => <p style={{ paddingTop: "1rem" }}>{error}</p>);
        }
      });
  };
  //Thêm user
  const createUser = (data) => {
    console.log(data)
    CreatUpdateuser(
      data,
      "POST",
      urlApiCreatUser,
      "Thêm mới thành công",
      "Thêm mới thất bại"
    );
  };
  //Cập nhật user

  const updateUser = async (data) => {
    CreatUpdateuser(
      data,
      "PUT",
      urlApiUpdateUser,
      "Cập nhật thành công",
      "Cập nhật thất bại"
    );
  };

  useEffect(() => {
    if (statusCode === 200) {
      const timeout = setTimeout(() => {
        navigate("/users");
        console.log("1");
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [statusCode]);

  return (
    <form onSubmit={handleSubmit(isUpdate ? updateUser : createUser)}>
      <div className="element__form">
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
        <div className="element__form-header">
          <p>{title}</p>
        </div>
        <div className="element__form-body">
          <div className="nameUser mt-2">
            <label htmlFor="Name">
              {" "}
              Họ Tên <i className="fas fa-star-of-life"></i>
            </label>{" "}
            <br />
            <input
              type="text"
              name="name"
              id="Name"
              {...register("name", {
                required: "Họ tên không được để trống",
                maxLength: {
                  value: 50,
                  message: "Họ tên không được lớn hơn 50 ký tự",
                },
              })}
            />
            {errors.name && (
              <p className={"text-danger fw-bold"}>{errors.name.message}</p>
            )}
          </div>
          <div className="emailUser mt-2">
            <label htmlFor="Email">
              Email <i className="fas fa-star-of-life"></i>
            </label>
            <br />
            <input
              disabled={isUpdate}
              type="text"
              name="email"
              id="Email"
              {...register("email", {
                required: "Email không được để trống",
                maxLength: {
                  value: 50,
                  message: "Email không được lớn hơn 50 ký tự",
                },
              })}
            />
            {errors.email && (
              <p className={"text-danger fw-bold"}>{errors.email.message}</p>
            )}
          </div>
          <div className="phoneUser mt-2">
            <label htmlFor="Phone">
              Số điện thoại <i className="fas fa-star-of-life"></i>
            </label>
            <br />
            <input
              type="text"
              name="phone"
              id="Phone"
              {...register("phone", {
                required: "Số điện thoại không được để trống",
                maxLength: {
                  value: 11,
                  message: "Số điện thoại không được lớn hơn 11 ký tự",
                },
                minLength: {
                  value: 10,
                  message: "Số điện thoại không được ít hơn 10 ký tự",
                },
              })}
            />
            {errors.phone && (
              <p className={"text-danger fw-bold"}>{errors.phone.message}</p>
            )}
          </div>
          <div className="gender mt-2">
            <label htmlFor="Gender">Giới tính</label> <br></br>
            <select
              {...register("gender", {
                required: "Vui lòng chọn giới tính",
              })}
              id="Gender"
            >
              <option value="">Chọn giới tính</option>
              <option value="1">Nam</option>
              <option value="2">Nữ</option>
            </select>
          </div>
          {errors.gender && (
            <p className={"text-danger fw-bold"}>{errors.gender.message}</p>
          )}
          <div className="avatar mt-2">
            <label htmlFor="Avatar">Ảnh đại diện</label>
            <br></br>
            <input
              type="file"
              id="Avatar"
              {...register("avatar", {
                required: "Vui lòng chọn ảnh đại diện",
              })}
            />
            {errors.avatar && (
              <p className={"text-danger fw-bold"}>{errors.avatar.message}</p>
            )}
          </div>
          <div className="Dec mt-3">
            <div>
              <label className="form-label">
                Phân quyền <span className={"text-danger fw-bold"}>*</span>
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="inputLevelAdmin"
                value="1"
                {...register("level")}
              />
              <label className="form-check-label" htmlFor="inputLevelAdmin">
                admin
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="inputLevelUser"
                value="2"
                {...register("level")}
              />
              <label className="form-check-label" htmlFor="inputLevelUser">
                user
              </label>
            </div>
          </div>
        </div>
        <div className="element__form-footer">
          {(() => {
            if (isUpdate) {
              return <button className={"btn btn-success"}>Cập nhật</button>;
            }
            return <button className={"btn btn-primary"}>Thêm mới</button>;
          })()}
        </div>
      </div>
    </form>
  );
}

export default Form;
