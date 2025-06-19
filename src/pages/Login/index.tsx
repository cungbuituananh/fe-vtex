import { useLocation } from "react-router-dom";
import "./index.css";
import LoginComponent from "./Login";
import { ROUTE_PATH } from "@/routes/routes";
import RegisterComponent from "./Register";

function LoginPage() {
  const path = useLocation().pathname;
  console.log("path: ", path);
  return (
    <div className="login-bg ">
      <div className="h-[82vh]">
        <div className="login-container bg-white shadow pt-10  shadow-[inset_0_5px_5px_-5px_rgba(0,0,0,0.8),inset_0_-5px_5px_-5px_rgba(0,0,0,0.8)]">
          {path === ROUTE_PATH.LOGIN && <LoginComponent />}
          {path === ROUTE_PATH.REGISTER && <RegisterComponent />}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
