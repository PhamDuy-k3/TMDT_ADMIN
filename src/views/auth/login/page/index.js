import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";

export function Index() {
  const {
    register,
    handleSubmit,
    watch, //watch('phone') lây đc gia trị value phone
    formState: { errors },
  } = useForm();
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();

  const login = (data) => {
    fetch("http://localhost:5050/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.user_token) {
          setCookie("user_token", res.user_token, {
            path: "/",
            // path: "/", Điều này chỉ định rằng cookie có sẵn trên tất cả các đường dẫn trong trang web.
            expires: moment().add(1, "months").toDate(),
          });
          navigate("/");
        }
        //console.log(res);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(login)} className={"pb-3"}>
        <div className="mb-3">
          <label htmlFor="inputPhone" className="form-label">
            Số điện thoại
          </label>
          <input
            type="text"
            className="form-control"
            id="inputPhone"
            {...register("phone", {
              required: "Vui lòng điền giá trị!!!",
              maxLength: {
                value: 11,
                message: "Số điện thoại không được dài hơn 11 kí tự",
              },
              minLength: {
                value: 10,
                message: "Số điện thoại không được nho hơn 10 kí tự",
              },
            })}
          />
          {errors.phone && (
            <span style={{ color: "red", fontWeight: "600" }}>
              {errors.phone.message}
            </span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword" className="form-label">
            Mật khẩu
          </label>
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            {...register("password", { required: true, minLength: 8 })}
          />
          {errors.password && (
            <span style={{ color: "red", fontWeight: "600" }}>
              {errors.password.type === "required"
                ? "Vui lòng điền giá trị !!!"
                : "Mật khẩu ít nhất 10 kí tự"}
            </span>
          )}
        </div>
        <div className={"text-center"}>
          <button type="submit" className="btn btn-primary">
            Đăng nhập
          </button>
        </div>
      </form>
    </>
  );
}
