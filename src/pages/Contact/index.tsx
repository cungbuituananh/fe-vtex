import InputCommon from "@/components/FormElement/InputCommon";
import TextAreaCommon from "@/components/FormElement/TextAreaCommon";
import { PRIMARY_COLOR, STYLE_CONTAINER_BORDER } from "@/constants/color";
import { Button, Col, Form, message, Row } from "antd";
import { FiSend } from "react-icons/fi";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

function ContactPage() {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className={`${STYLE_CONTAINER_BORDER} my-6 p-[50px]`}>
        {contextHolder}
        <p className="text-[36px] font-bold">Gửi tin nhắn cho chúng tôi</p>
        <p className="mb-4">
          Chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất!
        </p>
        <Row gutter={[24, 24]} className="h-full">
          <Col xs={24} lg={12} xl={16}>
            <div>
              <Form>
                <Row gutter={[12, 24]}>
                  <Col xs={24} lg={12} xl={12}>
                    <InputCommon className="flex-auto" name="name" label="" />
                  </Col>
                  <Col xs={24} lg={12} xl={12}>
                    <InputCommon
                      className=" flex-auto"
                      name="companyName"
                      label=""
                    />
                  </Col>
                </Row>
                <InputCommon className="flex-auto" name="email" label="" />
                <InputCommon className="flex-auto" name="suggestion" label="" />
                <TextAreaCommon
                  className="flex-auto"
                  name="suggestion"
                  label=""
                  autoSize={{ minRows: 5, maxRows: 10 }}
                />
                <Form.Item className="text-end">
                  <Button
                    type="primary"
                    // htmlType="submit"
                    onClick={() => {
                      messageApi.open({
                        type: "success",
                        content: "Gửi tin nhắn thành công, xin cảm ơn!",
                      });
                    }}
                    style={{
                      borderRadius: "9999px",
                      height: "40px",
                      width: "100px",
                    }}
                  >
                    Gửi <FiSend />
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>{" "}
          <Col xs={24} lg={12} xl={8}>
            <div className="space-y-2">
              {/* Phone Contact */}
              <div className="flex items-start space-x-4 p-4  rounded-lg">
                <div
                  className={`w-10 h-10 bg-[${PRIMARY_COLOR}] rounded-full flex items-center justify-center flex-shrink-0`}
                >
                  <FaPhoneAlt className="text-white text-sm" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-lg">
                    (+84) 943 - 613862
                  </p>
                  <p className="text-gray-600 text-sm">Hotline hỗ trợ 24/7</p>
                </div>
              </div>

              {/* Email Contact 1 */}
              <div className="flex items-start space-x-4 p-4  rounded-lg">
                <div
                  className={`w-10 h-10 bg-[${PRIMARY_COLOR}] rounded-full flex items-center justify-center flex-shrink-0`}
                >
                  <MdOutlineEmail className="text-white text-lg" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-lg">
                    info@foxtech.com.vn
                  </p>
                  <p className="text-gray-600 text-sm">Hỗ trợ công ty</p>
                </div>
              </div>

              {/* Email Contact 2 */}
              <div className="flex items-start space-x-4 p-4 rounded-lg">
                <div
                  className={`w-10 h-10 bg-[${PRIMARY_COLOR}] rounded-full flex items-center justify-center flex-shrink-0`}
                >
                  <MdOutlineEmail className="text-white text-lg" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-lg">
                    kinhdoanh@foxtech.com.vn
                  </p>
                  <p className="text-gray-600 text-sm">Bộ phận kinh doanh</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ContactPage;
