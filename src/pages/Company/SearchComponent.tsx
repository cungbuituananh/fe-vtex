import InputCommon from "@/components/FormElement/InputCommon";
import { HEIGHT_INPUT } from "@/constants/color";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row, Select } from "antd";

function SearchComponent() {
  return (
    <Form layout="vertical" labelAlign="left" wrapperCol={{ flex: 1 }}>
      <Row gutter={[12, 0]} align="middle">
        <Col span={5}>
          <InputCommon name="companyName" label="Tên viết tắt" />
        </Col>
        <Col span={5}>
          <Form.Item label="Tỉnh/Thành phố" name="province">
            <Select
              style={{ height: HEIGHT_INPUT, width: "100%" }}
              // onChange={handleChange}
              options={[
                { value: "jack", label: "Jack" },
                { value: "lucy", label: "Lucy" },
                { value: "Yiminghe", label: "yiminghe" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item label="Tỉnh/Thành phố" name="province">
            <Select
              style={{ height: HEIGHT_INPUT, width: "100%" }}
              // onChange={handleChange}
              options={[
                { value: "jack", label: "Jack" },
                { value: "lucy", label: "Lucy" },
                { value: "Yiminghe", label: "yiminghe" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item label="Tỉnh/Thành phố" name="province">
            <Select
              style={{ height: HEIGHT_INPUT, width: "100%" }}
              // onChange={handleChange}
              options={[
                { value: "jack", label: "Jack" },
                { value: "lucy", label: "Lucy" },
                { value: "Yiminghe", label: "yiminghe" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={4}>
          <div>
            <Button type="primary" icon={<PlusOutlined />} htmlType="submit">
              Tìm kiếm
            </Button>
            <Button className="ml-2" danger icon={<DeleteOutlined />}></Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
}

export default SearchComponent;
