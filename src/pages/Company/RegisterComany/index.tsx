import { Row, Col, Input, Button, Form, Upload, Modal } from "antd";
import Title from "antd/es/typography/Title";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import MapClickable from "@/pages/Map/MapClickable";
import "./register.css";
import { STYLE_CONTAINER_BORDER } from "@/constants/color";
import InputCommon from "@/components/FormElement/InputCommon";
import { useAuth } from "@/contexts/AuthContext";
import { ROLE_USER } from "@/constants/variables";
import SelectCommon from "@/components/FormElement/SelectCommon";

function RegisterCompany() {
  const [isOpenMap, setIsOpenMap] = useState(false);
  const [form] = Form.useForm();

  const { user } = useAuth();
  console.log('user: ', user);

  const handleSubmit = async () => {
    const values = form.getFieldsValue();
    console.log("form values: ", values);
  };

  // Get the current location from the form
  const currentLocation = Form.useWatch("location", form);

  return (
    <div className={`${STYLE_CONTAINER_BORDER} w-[80vw] mx-auto my-5 p-6`}>
      <Form
        layout="horizontal"
        labelCol={{ flex: "150px" }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        form={form}
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
            <InputCommon label="Tên doanh nghiệp" name="companyName" />
          </Col>
          <Col span={12}>
            <InputCommon label="Tên viết tắt" name="shortName" />
          </Col>
          <Col span={12}>
            <InputCommon label="Mã số thuế" name="taxCode" />
          </Col>

          <Col span={12}>
            <InputCommon label="Website" name="website" />
          </Col>

          <Col span={12}>
            <InputCommon label="Email liên hệ" name="email" />
          </Col>
          <Col span={12}>
            <InputCommon label="Điện thoại liên hệ" name="mainAddress" />
          </Col>

          <Col span={12}>
            <InputCommon label="Địa chỉ" name="address" />
          </Col>
          <Col span={12}>
            <Form.Item
              label="Vị trí bản đồ"
              name="location"
              // help={
              //   currentLocation
              //     ? `Tọa độ: [${currentLocation[0]?.toFixed(
              //       6
              //     )}, ${currentLocation[1]?.toFixed(6)}]`
              //     : "Chưa chọn vị trí"
              // }
              colon={false}
            >
              {currentLocation && <span className="mr-3 ">{currentLocation[0]?.toFixed(
                6
              )}, {currentLocation[1]?.toFixed(6)}</span>}

              <Button className="" type="primary" onClick={() => setIsOpenMap(true)}>
                {currentLocation
                  ? "Thay đổi vị trí trên bản đồ"
                  : "Chọn vị trí trên bản đồ"}
              </Button>
            </Form.Item>
          </Col>
          <Col span={24}>
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
            <Form.Item label="Giới thiệu" name="description">
              <Input.TextArea
                rows={4}
                placeholder="Giới thiệu/mô tả về doanh nghiệp"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <InputCommon label="Video đính kèm" name="videos" />

          </Col>
          <Col span={12}>
            <Form.Item label="Ảnh logo" name="logo">
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
            <Form.Item label="Ảnh" name="logo">
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
            title="Chọn vị trí trên bản đồ"
            open={isOpenMap}
            onCancel={() => setIsOpenMap(false)}
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
            <InputCommon label="Lĩnh vực sản xuất" name="productionField" />

          </Col>
          <Col span={12}>
            <InputCommon label="Mô tả năng lực sản xuất" name="productionDescription" />

          </Col>
          <Col span={12}>
            <InputCommon label="Mô hình sản xuất" name="productionModel" />

          </Col>
          <Col span={12}>
            <InputCommon label="Sản phẩm chủ lực" name="keyProducts" />

          </Col>
          <Col span={12}>
            <InputCommon label="Công suất sản xuất/năm" name="productionCapacity" />
          </Col>

          <Col span={12}>
            <InputCommon label="Số lượng nhân công" name="workerCount" />
          </Col>

          <Col span={6}>
            <InputCommon label="Quy mô sản xuất" name="workScope" />
          </Col>
          <Col span={6}>
            <InputCommon label="Số lượng xưởng" name="numberShop" />
          </Col>


          {/* ============================== */}
          <Col span={24}>
            <p className="text-gray-700 text-[18px] font-bold my-5">
              Chứng chỉ và tiêu chuẩn
            </p>
          </Col>

          <Col span={12}>
            <InputCommon label="Loại chứng chỉ/tiêu chuẩn" name="certificateType" />
          </Col>

          {user?.role === ROLE_USER.ADMIN && <Col span={12}><SelectCommon options={[]} label="User" name="user" /></Col>}

        </Row>
      </Form>
    </div>
  );
}

export default RegisterCompany;
