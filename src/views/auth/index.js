import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export function Index() {
  const navigate = useNavigate();
  const [cookies] = useCookies();

  useEffect(() => {
    if (cookies.user_token) {
      navigate("/");
    }
  }, []);

  return (
    <>
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
