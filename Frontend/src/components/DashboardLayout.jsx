import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
const DashboardLayout = () => {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!token && localStorage.pathname !== "/login") {
      navigate("/login");
    } else if (token && localStorage.pathname !== "/login") {
      navigate("/dashboard");
    }
  }, [token, location.pathname, navigate]);
  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
};
export default DashboardLayout;
