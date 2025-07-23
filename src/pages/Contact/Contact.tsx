import { Form, Input, Button, Row, Col, Typography } from 'antd';
import {
  PhoneOutlined,
  MailOutlined,
} from '@ant-design/icons';

const { Title} = Typography;

const Contact = () => {
  return (
    <div className="max-w-[1000px] mx-auto p-10 bg-blue-50 rounded-lg">
      <Row gutter={[40, 20]}>
        <Col xs={24} md={14}>
          <Title level={3}>Gửi tin nhắn cho chúng tôi</Title>
          <p className="text-gray-600">Chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất!</p>

          <Form layout="vertical" className="mt-6">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="name" rules={[{ required: true }]}>
                  <Input placeholder="Phạm Nhật Vượng" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="company" rules={[{ required: true }]}>
                  <Input placeholder="Vin Group" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="email" rules={[{ required: true, type: 'email' }]}>
              <Input placeholder="vuongnv@vingroup.vn" />
            </Form.Item>

            <Form.Item name="subject" rules={[{ required: true }]}>
              <Input placeholder="Đề xuất hợp tác" />
            </Form.Item>

            <Form.Item name="message" rules={[{ required: true }]}>
              <Input.TextArea placeholder="Xin chào!" rows={4} />
            </Form.Item>

            <Button type="primary" htmlType="submit" block className="bg-blue-700 hover:bg-blue-800">
              Gửi đi
            </Button>
          </Form>
        </Col>

        <Col xs={24} md={10}>
          <div className="md:pl-5 mt-8 md:mt-0">
            <div className="mb-6 flex items-start space-x-4">
              <PhoneOutlined className="text-blue-700 text-2xl mt-1" />
              <div>
                <p className="font-semibold">(+84) 943 - 613862</p>
                <p className="text-gray-500 text-sm">Hotline hỗ trợ 24/7</p>
              </div>
            </div>

            <div className="mb-6 flex items-start space-x-4">
              <MailOutlined className="text-blue-700 text-2xl mt-1" />
              <div>
                <p className="font-semibold">info@foxtech.com.vn</p>
                <p className="text-gray-500 text-sm">Mail công ty</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <MailOutlined className="text-blue-700 text-2xl mt-1" />
              <div>
                <p className="font-semibold">kinhdoanh@foxtech.com.vn</p>
                <p className="text-gray-500 text-sm">Bộ phận kinh doanh</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Contact;
