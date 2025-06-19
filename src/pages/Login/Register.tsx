import InputCommon from "@/components/FormElement/InputCommon";
import { Button, Form } from "antd";
import Title from "antd/es/typography/Title";
import { Link } from "react-router-dom";
import { ROUTE_PATH } from "@/routes/routes";
import PasswordInput from "@/components/FormElement/PasswordInput";

function RegisterComponent() {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  return (
    <>
      <Title level={2} className="login-title text-center mb-6">
        Đăng ký
      </Title>
      <div className="px-[40px] mb-5">
        <Form
          name="register"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <InputCommon
            label="Tên tài khoản"
            name="username"
            placeholder="Nhập tên tài khoản của bạn"
            rules={[{ required: true, message: "Bạn phải nhập tên tài khoản" }]}
          />

          <InputCommon
            label="Email"
            name="email"
            type="email"
            placeholder="Nhập email của bạn"
            rules={[
              { required: true, message: "Bạn phải nhập email" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          />

          <PasswordInput
            label="Mật khẩu mới"
            name="password"
            placeholder="Nhập mật khẩu mới"
            rules={[
              { required: true, message: "Bạn phải nhập mật khẩu" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
            ]}
          />

          <InputCommon
            label="Xác nhận mật khẩu mới"
            name="confirmPassword"
            type="password"
            placeholder="Nhập lại mật khẩu mới"
            rules={[
              { required: true, message: "Bạn phải xác nhận mật khẩu" },
              ({
                getFieldValue,
              }: {
                getFieldValue: (field: string) => any;
              }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu xác nhận không khớp!")
                  );
                },
              }),
            ]}
          />

          <Form.Item className="text-center mt-6">
            <Button
              htmlType="submit"
              style={{
                borderRadius: "9999px",
                height: "51px",
                width: "220px",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              Đăng ký
            </Button>
          </Form.Item>

          <div className="text-center mt-4">
            <span className="text-gray-600">
              <Link
                to={ROUTE_PATH.LOGIN}
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                Đăng nhập
              </Link>{" "}
              nếu bạn đã có tài khoản?
            </span>
          </div>
        </Form>
      </div>
    </>
  );
}

export default RegisterComponent;
