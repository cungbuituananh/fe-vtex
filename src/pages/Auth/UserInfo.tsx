import InputCommon from "@/components/FormElement/InputCommon";
import { STYLE_CONTAINER_BORDER } from "@/constants/color";
import { useAuth } from "@/contexts/AuthContext";
import { updateUserInfoAPI } from "@/services/apis/auth";
import { Button, Col, Form, Radio, Row } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect } from "react";

function UserInfo() {
  const [form] = Form.useForm();
  const { user } = useAuth();

  const handleSubmit = async () => {
    const values = form.getFieldsValue();
    await updateUserInfoAPI(values);
  };

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
      });
    }
  }, [user]);

  return (
    <div className={`${STYLE_CONTAINER_BORDER} w-[50vw] mx-auto my-5 p-6`}>
      <Form
        layout="vertical"
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        form={form}
        onFinish={handleSubmit}
      >
        <Title level={3}>
          Cài đặt người dùng của [{user?.firstName} {user?.lastName}]
        </Title>
        <Row align="middle" gutter={[12, 12]}>
          <Col span={24}>
            <InputCommon label="Tên" name="firstName" fullWidth />
          </Col>
          <Col span={24}>
            <InputCommon label="Họ" name="lastName" fullWidth />
          </Col>
          <Col span={24}>
            <InputCommon
              label="Email"
              name="email"
              type="email"
              fullWidth
              disabled
            />
          </Col>

          <Col span={12}>
            <Form.Item label="Ngôn ngữ" name="language">
              <Radio.Group>
                <div className="flex items-center gap-2 ">
                  <div className="flex items-center gap-1 p-2 rounded border border-gray-300 ">
                    <Radio value="vi">
                      <div className="flex items-center gap-1">
                        <img
                          src="https://flagcdn.com/w20/vn.png"
                          alt="VN"
                          style={{
                            width: 20,
                            height: 15,
                            verticalAlign: "middle",
                          }}
                        />
                        <span style={{ marginRight: 8 }}>Tiếng Việt</span>
                      </div>
                    </Radio>
                  </div>

                  <div className="flex items-center gap-1 p-2 rounded border border-gray-300 ">
                    <Radio value="en">
                      <div className="flex items-center gap-1">
                        <img
                          src="https://flagcdn.com/w20/gb.png"
                          alt="EN"
                          style={{
                            width: 20,
                            height: 15,
                            verticalAlign: "middle",
                          }}
                        />
                        <span style={{ marginRight: 8 }}>English</span>
                      </div>
                    </Radio>
                  </div>
                </div>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12} style={{ textAlign: "end" }}>
            <Button
              type="primary"
              htmlType="submit"
              // loading={isLoading}
              style={{
                borderRadius: "9999px",
                height: "35px",
                width: "180px",
                textAlign: "end",
              }}
            >
              Lưu
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default UserInfo;
