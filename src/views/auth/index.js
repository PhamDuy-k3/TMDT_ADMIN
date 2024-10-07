import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export function Index() {
  const navigate = useNavigate();
  const [cookies] = useCookies();

  useEffect(() => {
    if (!cookies.admin_token) {
      toast.error(() => <p style={{ paddingTop: "1rem" }}>Token hết hạn!</p>);
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
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
      <div
        className={
          "container-fluid row login-page justify-content-center align-items-center"
        }
      >
        <div className="card login-content p-0 bg-light">
          <div className="card-body">
            <div className={"text-center"}>
              <img
                src="/images/AdminLTELogo.png"
                alt="AdminLTE Logo"
                className="brand-image image-circle elevation-3"
              />
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
