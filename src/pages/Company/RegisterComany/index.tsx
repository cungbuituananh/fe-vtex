import { Row, Col, Input, Button, Form, Upload, Modal } from "antd";
import Title from "antd/es/typography/Title";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import MapClickable from "@/pages/Map/MapClickable";
import "./register.css";
import { STYLE_CONTAINER_BORDER } from "@/constants/color";
import InputCommon from "@/components/FormElement/InputCommon";

function RegisterCompany() {
  const [isOpenMap, setIsOpenMap] = useState(false);

  const handleSubmit = async (values: any) => {
    console.log("values: ", values);
  };

  return (
    <div className={`${STYLE_CONTAINER_BORDER} my-5`}>
      <Form
        layout="horizontal"
        labelCol={{ flex: "150px" }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        onFinish={handleSubmit}
      >
        <div className="flex items-center justify-between  ">
          <Title level={3}>Tạo mới thông tin doanh nghiệp</Title>
          <div>
            <Button type="primary" icon={<PlusOutlined />} htmlType="submit">
              Lưu
            </Button>
            <Button className="ml-2" danger icon={<DeleteOutlined />}>
              Hủy bỏ
            </Button>
          </div>
        </div>
        <p className="text-gray-700 text-[18px] font-bold my-5">
          Thông tin doanh nghiệp
        </p>
        <Row gutter={[26, 0]}>
          {/* Left Column */}

          <Col span={12}>
            <InputCommon label="Tên doanh nghiệp" name="companyName" required />
          </Col>
          <Col span={12}>
            <InputCommon label="Tên viết tắt" name="shortName" required />
          </Col>
          <Col span={12}>
            <InputCommon label="Mã số thuế" name="taxCode" required />
          </Col>

          <Col span={12}>
            <InputCommon label="Website" name="website" required />
          </Col>

          <Col span={12}>
            <InputCommon label="Email liên hệ" name="email" required />
          </Col>
          <Col span={12}>
            <InputCommon
              label="Điện thoại liên hệ"
              name="mainAddress"
              required
            />
          </Col>

          <Col span={12}>
            <InputCommon
              label="Điện thoại liên hệ"
              name="mainAddress"
              required
            />
          </Col>
          <Col span={12}>
            <Form.Item label=" " colon={false}>
              <Button type="primary" onClick={() => setIsOpenMap(true)}>
                Chọn vị trí trên bản đồ
              </Button>
            </Form.Item>
          </Col>
          <Col span={24}>
            {" "}
            <Form.List name="branches">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Row gutter={[26, 0]} key={key}>
                      <Col span={12}>
                        <Form.Item
                          {...restField}
                          label="Tên chi nhánh"
                          name={[name, "branchName"]}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập tên chi nhánh",
                            },
                          ]}
                        >
                          <Input placeholder="Nhập tên chi nhánh" />
                        </Form.Item>
                      </Col>
                      <Col span={11}>
                        <Form.Item
                          {...restField}
                          label="Địa chỉ"
                          name={[name, "branchAddress"]}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập địa chỉ",
                            },
                          ]}
                        >
                          <Input placeholder="Nhập địa chỉ" />
                        </Form.Item>
                      </Col>
                      <Col span={1} className="flex items-center">
                        <Button
                          danger
                          onClick={() => remove(name)}
                          icon={<PlusOutlined rotate={45} />}
                          type="text"
                        />
                      </Col>
                    </Row>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    >
                      Thêm chi nhánh
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Col>

          <Col span={12}>
            <Form.Item label="Giới thiệu" name="description" required>
              <Input.TextArea
                rows={4}
                placeholder="Giới thiệu/mô tả về doanh nghiệp"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Video đính kèm" name="videos" required>
              <Input placeholder="Nhập địa chỉ" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Ảnh logo" name="logo" required>
              <Upload
                listType="picture-card"
                showUploadList={true}
                beforeUpload={(file) => {
                  console.log("file: ", file);
                  // Return false to prevent automatic upload
                  return false;
                }}
                accept="image/*"
              >
                <div className="flex flex-col items-center justify-center">
                  <PlusOutlined />
                  <div className="mt-2">Tải ảnh lên</div>
                </div>
              </Upload>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Ảnh" name="logo" required>
              <Upload
                listType="picture-card"
                showUploadList={true}
                beforeUpload={(file) => {
                  console.log("file: ", file);
                  // Return false to prevent automatic upload
                  return false;
                }}
                accept="image/*"
              >
                <div className="flex flex-col items-center justify-center">
                  <PlusOutlined />
                  <div className="mt-2">Tải ảnh lên</div>
                </div>
              </Upload>
            </Form.Item>
          </Col>

          {/* Modal for map */}
          <Modal
            open={isOpenMap}
            onCancel={() => setIsOpenMap(false)}
            closeIcon={false}
            footer={null}
            width={1000}
            centered={true}
            style={{ zIndex: 1000 }}
            wrapClassName="map-modal"
          >
            <MapClickable visible={isOpenMap} />
          </Modal>

          {/* ============================== */}
          <Col span={24}>
            <p className="text-gray-700 text-[18px] font-bold my-5">
              Năng lực sản xuất
            </p>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Lĩnh vực sản xuất"
              name="productionField"
              required
            >
              <Input placeholder="Nhập lĩnh vực sản xuất" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Mô hình sản xuất" name="productionModel" required>
              <Input placeholder="Nhập mô hình sản xuất" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Sản phẩm chủ lực" name="mainProduct" required>
              <Input placeholder="Nhập sản phẩm chủ lực" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Thị trường sản xuất"
              name="productionMarket"
              required
            >
              <Input placeholder="Nhập thị trường sản xuất" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Công suất sản xuất/năm" name="productionCapacity">
              <Input placeholder="Nhập công suất sản xuất/năm" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Số lượng nhân công" name="workerCount">
              <Input placeholder="Nhập số lượng nhân công" />
            </Form.Item>
          </Col>

          {/* ============================== */}
          <Col span={24}>
            <p className="text-gray-700 text-[18px] font-bold my-5">
              Chứng chỉ và tiêu chuẩn
            </p>
          </Col>
          <Col span={12}>
            <Form.Item label="Loại chứng chỉ/tiêu chuẩn" name="certificateType">
              <Input placeholder="Nhập loại chứng chỉ/tiêu chuẩn" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default RegisterCompany;
