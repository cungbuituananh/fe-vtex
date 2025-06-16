import { Form, Input, Button, Checkbox, Typography } from "antd";
import "./index.css";
const { Title } = Typography;

function LoginPage() {
  return (
    <div className="login-bg ">
      <div className="login-container  bg-white shadow">
        <Title level={2} className="login-title ">
          Đăng nhập
        </Title>
        <Form name="login" layout="vertical" initialValues={{ remember: true }}>
          <Form.Item
            label="Tên tài khoản"
            name="username"
            rules={[
              { required: true, message: "Vui lòng nhập tên tài khoản!" },
            ]}
          >
            <Input placeholder="Nhập tên tài khoản của bạn" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password placeholder="Nhập mật khẩu của bạn" />
          </Form.Item>
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
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đăng nhập
            </Button>
          </Form.Item>
          <Form.Item>
            <Button block>Đăng ký</Button>
          </Form.Item>
        </Form>
        <div className="login-info">
          <p>Bạn có thể đăng nhập với</p>
          <ul>
            <li>Quản trị viên (tài khoản="admin" và mật khẩu="admin")</li>
            <li>Người dùng (tài khoản="user" và mật khẩu="user")</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
