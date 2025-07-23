import InputCommon from "@/components/FormElement/InputCommon";
import { ROUTE_PATH } from "@/routes/routes";
import { Button, Checkbox, Form, message, Typography } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import logo from "../../assets/imgs/logo.png";

const { Title } = Typography;

function LoginComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (values: any) => {
    const { username, password } = values;
    setIsLoading(true);

    try {
      const success = await login(username, password);
      console.log("success: ", success);

      if (success) {
        messageApi.open({
          type: "success",
          content: "Đăng nhập thành công!",
        });

        // Redirect to the page they were trying to access or home
        const from = location.state?.from?.pathname || ROUTE_PATH.HOME;
        navigate(from, { replace: true });
      } else {
        messageApi.open({
          type: "error",
          content: "Tên tài khoản hoặc mật khẩu không chính xác!",
        });
      }
    } catch (error) {
      console.log("error: ", error);
      messageApi.open({
        type: "error",
        content: "Đã xảy ra lỗi trong quá trình đăng nhập!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="flex flex-col items-center justify-center py-10">
        <img src={logo} alt="Logo" className="w-45" />
      </div>
      <div className="px-[10px] mb-5">
        <Form
          name="login"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={handleLogin}
        >
          <InputCommon
            label="Tên tài khoản"
            name="username"
            required
            fullWidth
          />
          <InputCommon
            label="Mật khẩu"
            name="password"
            type="password"
            required
            fullWidth
          />
          <Form.Item>
            <div className="login-options">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Nhớ tài khoản</Checkbox>
              </Form.Item>{" "}
              <a className="login-forgot" href="#forgot-password">
                Bạn quên mật khẩu?
              </a>
            </div>
          </Form.Item>{" "}
          <Form.Item className="text-center">
            <div className="flex justify-center mb-4 gap-4">
              <Button
                style={{
                  borderRadius: "9999px",
                  height: "35px",
                  width: "180px",
                }}
                onClick={() => navigate(ROUTE_PATH.REGISTER)}
              >
                Đăng ký
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                style={{
                  borderRadius: "9999px",
                  height: "35px",
                  width: "180px",
                }}
              >
                <FaSignInAlt className="inline" /> Đăng nhập
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
      {/* <hr className="text-[#BDBDBD]" />
      <div className="mt-4 text-[#444] text-[14px]">
        <Title level={4} className="login-title ">
          Bạn có thể đăng nhập với
        </Title>
        <ul style={{ listStyleType: "disc", paddingLeft: 20 }}>
          <li>Quản trị viên (tài khoản="admin" và mật khẩu="admin")</li>
          <li>Người dùng (tài khoản="user" và mật khẩu="user")</li>
        </ul>
      </div> */}
    </>
  );
}

export default LoginComponent;
