import { STYLE_CONTAINER_BORDER, STYLE_TITLE_COMMON } from "@/constants/color";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailCompanyPublicAPI } from "@/services/apis/public";

function CompanyDetailPage() {
  const [dataDetail, setDataDetail] = useState<any>(null);

  const { id } = useParams<{ id: string }>();

  const fetchData = async (id: string) => {
    const { data } = await getDetailCompanyPublicAPI(id);
    setDataDetail(data);
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  return (
    <div className={`${STYLE_CONTAINER_BORDER} my-5 `}>
      {dataDetail && (
        <Row gutter={[16, 16]}>
          <Col xs={24} md={10}>
            <div className="p-3">
              <Row gutter={[16, 16]}>
                <Col xs={24} md={4}>
                  {dataDetail.images?.logo?.length > 0 ? (
                    <img
                      src={`data:image/jpeg;base64,${dataDetail.images.logo[0]}`}
                      alt={dataDetail.name}
                      className="w-[100px] h-auto rounded-lg shadow-sm object-cover"
                    />
                  ) : (
                    <div className="w-full h-auto bg-gray-200 flex items-center justify-center">
                      <span>No Logo</span>
                    </div>
                  )}
                </Col>
                <Col xs={24} md={18}>
                  <p className={STYLE_TITLE_COMMON}>{dataDetail.name}</p>

                  <div className="">
                    <p>
                      <strong>Nhóm ngành:</strong>{" "}
                      <span>{dataDetail.industry}</span>
                    </p>
                    <div className="pb-2">
                      <p>
                        <strong>Hotline:</strong>{" "}
                        <span className="text-blue-500">
                          {dataDetail.phoneNumber}
                        </span>
                      </p>
                      <p>
                        <strong>Email:</strong>{" "}
                        <span className="text-blue-500">
                          {dataDetail.email}
                        </span>
                      </p>
                      <p>
                        <strong>Website:</strong>{" "}
                        <span className="text-blue-500">
                          {dataDetail.website}
                        </span>
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
              {/* <div className="py-1 flex justify-between items-center">
                <p>
                  <strong>Mở cửa:</strong>{" "}
                  {dataDetail.workingHours?.opening || 8} -{" "}
                  <strong>Đóng cửa:</strong>{" "}
                  {dataDetail.workingHours?.closing || 17}
                </p>
                <p>({dataDetail.workingHours?.workingDays || 8})</p>
              </div> */}
              {/* <p>
                <strong>Văn phòng: </strong>
                {dataDetail.office}
              </p>
              <p>
                <strong>Nhà máy: </strong>
                {dataDetail.factory}
              </p> */}
              {/* Left column content TEMP */}
              <p className={`${STYLE_TITLE_COMMON} my-2`}>Giới thiệu</p>
              {dataDetail.introduction}

              <p className={`${STYLE_TITLE_COMMON} my-2`}>Sản phẩm dịch vụ</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <ul className="list-disc pl-5">
                    <li>Áo gió</li>
                    <li>Áo khoác</li>
                    <li>Áo sơ mi đồng phục</li>
                    <li>Áo thun</li>
                    <li>Đầm váy thời trang</li>
                    <li>Áo gió</li>
                    <li>Áo khoác</li>
                    <li>Áo sơ mi đồng phục</li>
                    <li>Áo thun</li>
                    <li>Đầm váy thời trang</li>
                  </ul>
                </div>
                <div>
                  <ul className="list-disc pl-5">
                    <li>Đồng phục nhà hàng</li>
                    <li>Đồng phục học sinh</li>
                    <li>Đồng phục cá nhân</li>
                    <li>Túi xách</li>
                    <li>Khăn quàng thời trang</li>
                    <li>Đồng phục nhà hàng</li>
                    <li>Đồng phục học sinh</li>
                    <li>Đồng phục cá nhân</li>
                    <li>Túi xách</li>
                    <li>Khăn quàng thời trang</li>
                  </ul>
                </div>
              </div>
              <p className={`${STYLE_TITLE_COMMON} my-2`}>Hồ sơ công ty</p>

              <div>
                <ul className="list-disc pl-5">
                  <li>
                    <div className="grid grid-cols-3 gap-4">
                      <p className="col-span-1">Tên công ty: </p>
                      <p className="col-span-2">{dataDetail.name}</p>
                    </div>
                  </li>
                  <li>
                    <div className="grid grid-cols-3 gap-4 ">
                      <p className="col-span-1">Địa chỉ: </p>
                      <p className="col-span-2">
                        {dataDetail.address || "Chưa cập nhật"}
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid grid-cols-3 gap-4 ">
                      <p className="col-span-1">Điện thoại: </p>
                      <p className="col-span-2">
                        {dataDetail.phone || "Chưa cập nhật"}
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid grid-cols-3 gap-4 ">
                      <p className="col-span-1">Email: </p>
                      <p className="col-span-2">
                        {dataDetail.email || "Chưa cập nhật"}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
          <Col xs={24} md={14}>
            <div className="p-3 grid grid-cols-3 gap-4">
              {dataDetail.images?.image?.length > 0 &&
                dataDetail.images.image.map((image: string, index: number) => {
                  return (
                    <img
                      key={index}
                      src={`data:image/jpeg;base64,${image}`}
                      alt={`Product ${index + 1}`}
                      className="w-full h-auto  shadow-sm object-cover"
                    />
                  );
                })}
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default CompanyDetailPage;
