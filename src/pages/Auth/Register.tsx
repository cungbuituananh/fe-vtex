import InputCommon from "@/components/FormElement/InputCommon";
import { Button, Form, message } from "antd";
import Title from "antd/es/typography/Title";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "@/routes/routes";
import PasswordInput from "@/components/FormElement/PasswordInput";
import { registerAPI } from "@/services/apis/auth";
import { useState } from "react";

function RegisterComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    setIsLoading(true);
    try {
      const data = await registerAPI(values);
      if (data) {
        message.success("Đăng ký thành công!");
        navigate(ROUTE_PATH.LOGIN)
      }

    } catch (error) {
      console.error("Error during registration:", error);
      // Handle error appropriately, e.g., show a notification or message to the user
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Title level={2} className="login-title text-center mb-6">
        Đăng ký
      </Title>
      <div className="px-[10px] mb-5">
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
            fullWidth
          />

          <InputCommon
            label="Email"
            name="email"
            type="email"
            placeholder="Nhập email của bạn"
            rules={[{ required: true, message: "Bạn phải nhập email" }]}
            fullWidth
          />

          <PasswordInput
            label="Mật khẩu"
            name="password"
            placeholder="Nhập mật khẩu"
            rules={[
              { required: true, message: "Bạn phải nhập mật khẩu" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
            ]}
          />

          <PasswordInput
            label="Xác nhận mật khẩu mới"
            name="confirmPassword"
            placeholder="Nhập lại mật khẩu mới"
            rules={[
              { required: true, message: "Bạn phải xác nhận mật khẩu" },
              ({
                getFieldValue,
              }: {
                getFieldValue: (field: string) => any;
              }) => ({
                validator(_: any, value: any) {
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
                height: "35px",
                width: "180px",
              }}
              loading={isLoading}
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
