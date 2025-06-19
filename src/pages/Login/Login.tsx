import InputCommon from "@/components/FormElement/InputCommon";
import { ROUTE_PATH } from "@/routes/routes";
import { Button, Checkbox, Form, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

function LoginComponent() {
  const navigate = useNavigate();
  return (
    <>
      <Title level={2} className="login-title ">
        Đăng nhập
      </Title>
      <div className="px-[40px] mb-5">
        <Form name="login" layout="vertical" initialValues={{ remember: true }}>
          <InputCommon label="Tên tài khoản" name="username" />
          <InputCommon
            label="Mật khẩu"
            name="password"
            type="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          />
          <Form.Item>
            <div className="login-options">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Nhớ tài khoản</Checkbox>
              </Form.Item>
              <a className="login-forgot" href="#">
                Bạn quên mật khẩu?
              </a>
            </div>
          </Form.Item>
          <Form.Item className="text-center">
            <Button
              type="primary"
              htmlType="submit"
              style={{
                borderRadius: "9999px",
                height: "51px",
                width: "220px",
              }}
            >
              Đăng nhập
            </Button>
          </Form.Item>
          <Form.Item className="text-center">
            <Button
              style={{
                borderRadius: "9999px",
                height: "51px",
                width: "220px",
              }}
              onClick={() => navigate(ROUTE_PATH.REGISTER)}
            >
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </div>
      <hr className="text-[#BDBDBD]" />
      <div className="login-info">
        <Title level={4} className="login-title ">
          Bạn có thể đăng nhập với
        </Title>
        <ul style={{ listStyleType: "disc", paddingLeft: 20 }}>
          <li>Quản trị viên (tài khoản="admin" và mật khẩu="admin")</li>
          <li>Người dùng (tài khoản="user" và mật khẩu="user")</li>
        </ul>
      </div>
    </>
  );
}

export default LoginComponent;
