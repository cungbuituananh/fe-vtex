import InputCommon from "@/components/FormElement/InputCommon";
import SelectCommon from "@/components/FormElement/SelectCommon";
import { STYLE_CONTAINER_BORDER } from "@/constants/color";
import { ROLE_USER } from "@/constants/variables";
import { useAuth } from "@/contexts/AuthContext";
import useGetOptions from "@/hooks/useGetOptions";
import MapClickable from "@/pages/Map/MapClickable";
import { getListGroupAPI, getListUserAPI } from "@/services/apis/common";
import {
  approveCompanyAPI,
  createCompanyAPI,
  getCompanyDetailAPI,
  rejectCompanyAPI,
  updateCompanyAPI,
} from "@/services/apis/company";
import { getBase64 } from "@/utils/utilsCommon";
import {
  AimOutlined,
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Col, Form, Input, message, Modal, Row, Upload } from "antd";
import Title from "antd/es/typography/Title";
import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./register.css";
import { ROUTE_PATH } from "@/routes/routes";
import StatusBadge from "./StatusBadge";

interface RegisterCompanyProps {
  isUpdate?: boolean;
  isApprove?: boolean;
}

function RegisterCompany({
  isUpdate = false,
  isApprove = false,
}: RegisterCompanyProps) {
  const [isOpenMap, setIsOpenMap] = useState(false);
  const navigate = useNavigate();
  const [nameLocation, setNameLocation] = useState("");
  const selectedBranchIndex = useRef(0);
  const [form] = Form.useForm();
  const { id: companyId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [resultData, setResultData] = useState<any>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const fetchDetailData = async (id: string) => {
    setIsLoading(true);
    const { data } = await getCompanyDetailAPI(id);
    if (data) {
      const headOffie = data.companyBranchList.find(
        (item: any) => item.headOffice === true)

      form.setFieldsValue({
        ...data,
        manufacturingMarket: data.manufacturingMarket?.map((item: any) => item.code),
        productionModels: data.productionModels?.map((item: any) => item.code),
        manufacturingSector: data.manufacturingSector?.map((item: any) => item.code),
        keyProducts: data.keyProducts?.map((item: any) => item.code),
        location: [Number(headOffie.latitude), Number(headOffie.longitude)],
      });
      setResultData(data);
      setIsLoading(false);
      // Set the location field to the first branch's location if available
      return data;
    }
    return null;
  };

  // const { options: certificateOptions } = useGetOptions({
  //   api: () => getListGroupAPI("CERT"), // Fetch major categories
  //   queryKey: "getCertificateOptions",
  //   labelValueType: ["name", "code"],
  // });

  const { options: userOptions } = useGetOptions({
    api: () => getListUserAPI(), // Fetch major categories
    queryKey: "users",
    labelValueType: ["email", "email"],
  });

  const { options: modelOptions } = useGetOptions({
    api: () => getListGroupAPI("MODEL"), // Fetch major categories
    queryKey: "getModalOptions",
    labelValueType: ["name", "code"],
  });

  const { options: majorOptions } = useGetOptions({
    api: () => getListGroupAPI("MAJOR"), // Fetch major categories
    queryKey: "getMajorOptions",
    labelValueType: ["name", "code"],
  });

  const { options: marketOptions } = useGetOptions({
    api: () => getListGroupAPI("MARKET"), // Fetch major categories
    queryKey: "getMarketOptions",
    labelValueType: ["name", "code"],
  });

  const { options: productKeyOptions } = useGetOptions({
    api: () => getListGroupAPI("P_KEY"), // Fetch major categories
    queryKey: "getProductKeyOptions",
    labelValueType: ["name", "code"],
  });

  const { user } = useAuth();

  const handleSubmit = async () => {
    setIsLoading(true);
    const values = form.getFieldsValue();

    const headOffice = {
      branchName: values.name,
      adress: values.address,
      longitude: values.location[1],
      latitude: values.location[0],
      headOffice: true,
    };

    const fileDtoList = [];

    const params = {
      ...values,
      companyBranchDtoList: [headOffice],
    };

    if (values.companyBranchDtoList?.length > 0) {
      const listBranch = _.cloneDeep(values.companyBranchDtoList).map(
        (item: any) => {
          const { branchName, location, address } = item;
          const [latitude, longitude] = location || [];
          return {
            branchName,
            address,
            longitude,
            latitude,
            headOffice: false,
          };
        }
      );
      params.companyBranchDtoList.push(...listBranch);
    }

    if (values.logo) {
      const temp = values.logo.fileList.map((file: any) => {
        return {
          fileName: file.name,
          fileType: file.type,
          base64: file.thumbUrl,
          mediaTypeEnum: "LOGO",
        };
      });

      fileDtoList.push(...temp);
    }

    if (values.productImage) {
      const temp = values.productImage.fileList.map((file: any) => {
        return {
          fileName: file.name,
          fileType: file.type,
          base64: file.thumbUrl,
          mediaTypeEnum: "IMAGE",
        };
      });
      fileDtoList.push(...temp);
    }

    const requestParams = _.omit(params, ["location", "logo"]);

    const convertedRequestParams = {
      ...requestParams,
      manufacturingMarket: requestParams.manufacturingMarket?.join(","),
      productionModels: _.isArray(requestParams.productionModels)
        ? requestParams.productionModels?.join(",")
        : requestParams.productionModels,
      manufacturingSector: requestParams.manufacturingSector?.join(","),
      keyProducts: requestParams.keyProducts?.join(","),
      fileDtoList,
    };

    try {
      const { data } = isUpdate
        ? await updateCompanyAPI({ companyDraftId: companyId, ...convertedRequestParams })
        : await createCompanyAPI(convertedRequestParams);

      if (data) {
        message.success(
          isUpdate ? "Cập nhật doanh nghiệp thành công" : "Tạo mới doanh nghiệp thành công"
        );
      }
      navigate(ROUTE_PATH.COMPANY_LIST);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get the current location from the form
  const currentLocation = Form.useWatch("location", form);

  const handleApprove = async () => {
    try {
      if (companyId) {
        await approveCompanyAPI([companyId]);
      }

      message.success("Phê duyệt thành công");
      navigate(ROUTE_PATH.COMPANY_LIST);
    } catch (error) {
      console.error("Error approving companies:", error);
    }
  };

  const handleReject = async () => {
    try {
      if (companyId) {
        await rejectCompanyAPI([companyId]);
      }

      message.success("Từ chối thành công");
      navigate(ROUTE_PATH.COMPANY_LIST);
    } catch (error) {
      console.error("Error rejecting companies:", error);
    }
  };

  useEffect(() => {
    if ((isUpdate || isApprove) && companyId) {
      fetchDetailData(companyId);
    }
  }, [companyId]);

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
          <Title level={3}>
            <span>
              {isApprove ? "Chi tiết" : "Tạo mới"} thông tin doanh nghiệp
            </span>
          </Title>
          <div>
            {isApprove && (
              <>
                <Button
                  type="primary"
                  icon={<CheckOutlined />}
                  onClick={handleApprove}
                  disabled={isLoading}
                >
                  Phê duyệt
                </Button>
                <Button className="ml-2" danger icon={<CloseOutlined />}>
                  Từ chối
                </Button>
              </>
            )}

            {!isApprove && (
              <>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  htmlType="submit"
                  disabled={isLoading}
                >
                  Lưu
                </Button>
                <Button className="ml-2" danger icon={<DeleteOutlined />} onClick={() => navigate(ROUTE_PATH.COMPANY_LIST)}>
                  Hủy bỏ
                </Button>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2  my-4">
          <p className="text-gray-700 text-[18px] font-bold ">
            Thông tin doanh nghiệp{" "}
          </p>
          {resultData?.status && <StatusBadge status={resultData.status} />}
        </div>
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
              required
            />
          </Col>

          <Col span={12}>
            <InputCommon label="Địa chỉ trụ sở chính" name="address" required />
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
                  setNameLocation("location");
                  selectedBranchIndex.current = -1;
                }}
                icon={<AimOutlined />}
              >
                {currentLocation ? "Thay đổi tọa độ" : "Chọn tọa độ"}
              </Button>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.List name="companyBranchDtoList">
              {(fields, { add, remove }) => {
                return (
                  <>
                    {fields.map(({ key, name, ...restField }) => {
                      const branchLocation =
                        form.getFieldValue("companyBranchDtoList")?.[name]
                          ?.location || [];

                      return (
                        <Row gutter={[26, 0]} key={key}>
                          <Col span={12}>
                            <InputCommon
                              label="Tên chi nhánh"
                              name={[name, "branchName"]}
                              required
                              disabled={isApprove}
                            />
                          </Col>
                          <Col span={12}>
                            <InputCommon
                              label="Địa chỉ"
                              name={[name, "address"]}
                              required
                              {...restField}
                              disabled={isApprove}
                            >
                              <div className="flex items-center gap-2">
                                {branchLocation.length > 0 && (
                                  <span className="ml-2">
                                    {branchLocation[0]?.toFixed(6)},{" "}
                                    {branchLocation[1]?.toFixed(6)}
                                  </span>
                                )}
                                <Button
                                  className=""
                                  type="primary"
                                  onClick={() => {
                                    setIsOpenMap(true);
                                    setNameLocation(
                                      `companyBranchDtoList[${name}]`
                                    );
                                    selectedBranchIndex.current = name; // Store the index for later use
                                  }}
                                  icon={<AimOutlined />}
                                >
                                  {branchLocation.length > 0
                                    ? "Thay đổi tọa độ"
                                    : "Chọn tọa độ"}
                                </Button>
                              </div>

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
                      );
                    })}
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
              required
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
                maxCount={1}
                beforeUpload={async (file) => {
                  await getBase64(file);
                  // Return false to prevent automatic upload
                  return false;
                }}
                accept="image/*"
              >
                {(form.getFieldValue("logo")?.fileList?.length || 0) === 0 && (
                  <div className="flex flex-col items-center justify-center">
                    <PlusOutlined />
                    <div className="mt-2">Tải ảnh lên</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Ảnh" name="productImage" labelCol={{ span: 6 }}>
              <Upload
                listType="picture-card"
                showUploadList={true}
                beforeUpload={async (file) => {
                  await getBase64(file);

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
          {isOpenMap && (
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
                name={nameLocation}
                index={selectedBranchIndex.current}
              />
            </Modal>
          )}

          {/* ============================== */}
          <Col span={24}>
            <p className="text-gray-700 text-[18px] font-bold my-5">
              Năng lực sản xuất
            </p>
          </Col>
          <Col span={12}>
            <SelectCommon
              label="Lĩnh vực sản xuất"
              options={majorOptions}
              name="manufacturingSector"
              required
              isMultiple
            />
          </Col>
          <Col span={12}>
            <SelectCommon
              label="Mô hình sản xuất"
              options={modelOptions}
              name="productionModels"
              required
              isMultiple
            />
          </Col>
          <Col span={12}>
            <SelectCommon
              label="Sản phẩm chủ lực"
              options={productKeyOptions}
              name="keyProducts"
              required
              isMultiple
            />
          </Col>
          <Col span={12}>
            <SelectCommon
              label="Thị trường sản xuất"
              options={marketOptions}
              name="manufacturingMarket"
              required
              isMultiple
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
              <Upload disabled>
                <Button type="primary" icon={<UploadOutlined />} disabled>
                  Tải lên hồ sơ
                </Button>
              </Upload>
            </Form.Item>
          </Col>

          {user?.roles?.includes(ROLE_USER.ADMIN) && (
            <Col span={12}>
              <SelectCommon options={userOptions} label="Email đăng kí" name="emailOwner" />
            </Col>
          )}
        </Row>
        {/* This is modal when click reject button */}
        {isOpenModal && (
          <Modal
            title="Xác nhận từ chối"
            open={isOpenModal}
            onOk={handleReject}
            onCancel={() => setIsOpenModal(false)}
          >
            {/* textarea for rejection reason */}
            <Form.Item label="Lý do từ chối" name="reason">
              <Input.TextArea rows={4} placeholder="Nhập lý do từ chối" />
            </Form.Item>
          </Modal>
        )}
      </Form>
    </div>
  );
}

export default RegisterCompany;
