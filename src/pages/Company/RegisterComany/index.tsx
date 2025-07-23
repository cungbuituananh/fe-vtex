import { Row, Col, Input, Button, Form, Upload, Modal } from "antd";
import Title from "antd/es/typography/Title";
import {
  AimOutlined,
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useRef, useState } from "react";
import MapClickable from "@/pages/Map/MapClickable";
import "./register.css";
import { STYLE_CONTAINER_BORDER } from "@/constants/color";
import InputCommon from "@/components/FormElement/InputCommon";
import { useAuth } from "@/contexts/AuthContext";
import { ROLE_USER } from "@/constants/variables";
import SelectCommon from "@/components/FormElement/SelectCommon";
import { getBase64 } from "@/utils/utilsCommon";

function RegisterCompany() {
  const [isOpenMap, setIsOpenMap] = useState(false);
  const nameLocation = useRef("");
  const selectedBranchIndex = useRef(0);
  const [form] = Form.useForm();

  const { user } = useAuth();

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
        <Row gutter={[26, 2]}>
          {/* Left Column */}

          <Col span={12}>
            <InputCommon label="Tên doanh nghiệp" name="name" required />
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
              name="phoneNumber"
              type="number"
            />
          </Col>

          <Col span={12}>
            <InputCommon label="Địa chỉ trụ sở chính" name="address" />
          </Col>
          <Col span={12}>
            <Form.Item
              label="Vị trí bản đồ"
              // name="location"
              // help={
              //   currentLocation
              //     ? `Tọa độ: [${currentLocation[0]?.toFixed(
              //       6
              //     )}, ${currentLocation[1]?.toFixed(6)}]`
              //     : "Chưa chọn vị trí"
              // }
              labelCol={{ span: 6 }}
              colon={false}
            >
              {currentLocation && (
                <span className="mr-3 ">
                  {currentLocation[0]?.toFixed(6)},{" "}
                  {currentLocation[1]?.toFixed(6)}
                </span>
              )}

              <Button
                className=""
                type="primary"
                onClick={() => {
                  setIsOpenMap(true);
                  nameLocation.current = "location";
                }}
                icon={<AimOutlined />}
              >
                {currentLocation
                  ? "Thay đổi vị trí trên bản đồ"
                  : "Chọn vị trí trên bản đồ"}
              </Button>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.List name="companyBranchDtoList">
              {(fields, { add, remove }) => {
                console.log("fields: ", fields);
                return (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Row gutter={[26, 0]} key={key}>
                        <Col span={12}>
                          <InputCommon
                            label="Tên chi nhánh"
                            name={[name, "branchName"]}
                            required
                          />
                        </Col>
                        <Col span={12}>
                          <InputCommon
                            label="Địa chỉ"
                            name={[name, "address"]}
                            required
                            {...restField}
                          >
                            <Button
                              className=""
                              type="primary"
                              onClick={() => {
                                setIsOpenMap(true);
                                nameLocation.current = `companyBranchDtoList[${name}]`;
                                selectedBranchIndex.current = name; // Store the index for later use
                              }}
                              icon={<AimOutlined />}
                            >
                              {currentLocation
                                ? "Thay đổi vị trí trên bản đồ"
                                : "Chọn vị trí trên bản đồ"}
                            </Button>
                            <Button
                              danger
                              onClick={() => remove(name)}
                              icon={<PlusOutlined rotate={45} />}
                              type="text"
                            />
                          </InputCommon>
                        </Col>
                        <Col span={1} className="flex items-center"></Col>
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
                );
              }}
            </Form.List>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Giới thiệu"
              name="introduction"
              labelCol={{ span: 6 }}
            >
              <Input.TextArea
                rows={4}
                placeholder="Giới thiệu/mô tả về doanh nghiệp"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <InputCommon label="Video đính kèm" name="urlVideo" />
          </Col>
          <Col span={12}>
            <Form.Item label="Ảnh logo" name="logo" labelCol={{ span: 6 }}>
              <Upload
                listType="picture-card"
                showUploadList={true}
                beforeUpload={async (file) => {
                  const base64 = await getBase64(file);
                  console.log("Base64 string:", base64);
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
            <Form.Item label="Ảnh" name="logo" labelCol={{ span: 6 }}>
              <Upload
                listType="picture-card"
                showUploadList={true}
                beforeUpload={async (file) => {
                  const base64 = await getBase64(file);
                  console.log("Base64 string:", base64);
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
            centered={true}
            width={1000}
            style={{ zIndex: 1000 }}
            wrapClassName="map-modal"
          >
            <MapClickable
              visible={isOpenMap}
              name={nameLocation.current}
              index={selectedBranchIndex.current}
            />
          </Modal>

          {/* ============================== */}
          <Col span={24}>
            <p className="text-gray-700 text-[18px] font-bold my-5">
              Năng lực sản xuất
            </p>
          </Col>
          <Col span={12}>
            <InputCommon
              label="Lĩnh vực sản xuất"
              name="manufacturingSector"
              required
            />
          </Col>
          <Col span={12}>
            <InputCommon
              label="Mô hình sản xuất"
              name="productionModels"
              required
            />
          </Col>
          <Col span={12}>
            <InputCommon label="Sản phẩm chủ lực" name="keyProducts" required />
          </Col>
          <Col span={12}>
            <InputCommon
              label="Thị trường sản xuất"
              name="manufacturingMarket"
              required
            />
          </Col>
          <Col span={12}>
            <InputCommon label="Công suất sản xuất/năm" name="annualCapacity" />
          </Col>

          <Col span={12}>
            <InputCommon label="Số lượng nhân công" name="numberOfEmployees" />
          </Col>

          <Col span={12}>
            <Row gutter={[2, 0]}>
              <Col span={12}>
                <InputCommon
                  label="Quy mô sản xuất"
                  name="productionScale"
                  labelCol={12}
                >
                  m<sup>2</sup>
                </InputCommon>
              </Col>
              <Col span={12}>
                <InputCommon
                  label="Số lượng xưởng"
                  name="numberFactories"
                  labelCol={8}
                  labelAlign="right"
                  type="number"
                >
                  Xưởng
                </InputCommon>
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <InputCommon label="Thương hiệu xuất khẩu" name="workerCount" />
          </Col>

          {/* ============================== */}
          <Col span={24}>
            <p className="text-gray-700 text-[18px] font-bold my-5">
              Chứng chỉ và tiêu chuẩn
            </p>
          </Col>

          <Col span={12}>
            <InputCommon
              label="Loại chứng chỉ/tiêu chuẩn"
              name="certificateType"
            />
          </Col>

          <Col span={12}>
            <Form.Item
              label="Hồ sơ năng lực"
              labelCol={{ span: 6 }}
              colon={false}
            >
              {currentLocation && (
                <span className="mr-3 ">
                  {currentLocation[0]?.toFixed(6)},{" "}
                  {currentLocation[1]?.toFixed(6)}
                </span>
              )}
              <Upload>
                <Button type="primary" icon={<UploadOutlined />}>
                  Tải lên hồ sơ
                </Button>
              </Upload>
            </Form.Item>
          </Col>

          {user?.roles?.includes(ROLE_USER.ADMIN) && (
            <Col span={12}>
              <SelectCommon options={[]} label="User" name="user" />
            </Col>
          )}
        </Row>
      </Form>
    </div>
  );
}

export default RegisterCompany;
