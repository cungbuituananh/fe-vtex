import { useLocation } from "react-router-dom";
import "./index.css";
import LoginComponent from "./Login";
import { ROUTE_PATH } from "@/routes/routes";
import RegisterComponent from "./Register";

function LoginPage() {
  const path = useLocation().pathname;
  return (
    <div className="login-bg flex-1 flex items-center justify-center overflow-auto">
      <div className="login-container bg-white p-5 rounded border-radius-[24px] shadow-sm shadow-white">
        {path === ROUTE_PATH.LOGIN && <LoginComponent />}
        {path === ROUTE_PATH.REGISTER && <RegisterComponent />}
      </div>
    </div>
  );
}

export default LoginPage;
