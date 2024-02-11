import { useForm } from "react-hook-form";
import { USER } from "../../../../../constants/app";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Form({ title, isUpdate = false }) {
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();
  const [statusCode, setsStatusCode] = useState();

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
    },
  });
  const createUser = (data) => {
    // call api
    fetch("http://localhost:5050/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.user_token, // sau Bearer có dấu cách
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status_code === 200) {
          setsStatusCode(res.status_code);
          toast.success(() => (
            <p style={{ paddingTop: "1rem" }}>Thêm mới user thành công!</p>
          ));
        } else {
          res.errors.forEach((error) => {
            const [key, value] = Object.entries(error)[0];
            // console.log(Object.entries(error));
            // console.log(value);
            //[[propertyName , propertyValue] , []]
            setError(key, {
              type: "server",
              message: value.message,
            });
          });
        }
      });
  };
  useEffect(() => {
    if (statusCode === 200) {
      const timeout = setTimeout(() => {
        navigate("/users");
        console.log("1");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [statusCode]);

  const updateUser = async (data) => {
    toast.success(() => (
      <p style={{ paddingTop: "1rem" }}>Chỉnh sửa user thành công!</p>
    ));
  };

  return (
    <form onSubmit={handleSubmit(isUpdate ? updateUser : createUser)}>
      <div className="element__form">
        <ToastContainer
          position="top-right"
          autoClose={3000}
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
              //button mặc định type là submit
            }
            return <button className={"btn btn-primary"}>Thêm mới</button>;
          })()}
        </div>
      </div>
    </form>
  );
}

export default Form;
