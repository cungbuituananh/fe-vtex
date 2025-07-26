import { STYLE_CONTAINER_BORDER, STYLE_TITLE_COMMON } from "@/constants/color";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import prod1 from "@/assets/imgs/products/prod_1.png"; // Example image import, adjust as needed
import prod2 from "@/assets/imgs/products/prod_2.png"; // Example image import, adjust as needed
import prod3 from "@/assets/imgs/products/prod_3.png"; // Example image import, adjust as needed
import { getViewDetailApi } from "@/services/apis/company";

const LIST_TYPE = [
  {
    name: "Đồng phục công nhân",
    image: prod1,
  },
  {
    name: "Đồng phục học sinh",
    image: prod2,
  },
  {
    name: "Đồng phục nhà hàng",
    image: prod3,
  },
  {
    name: "Đồng phục khách sạn",
    image: prod2,
  },
  {
    name: "Đồng phục bảo hộ lao động",
    image: prod3,
  },
  {
    name: "Đồng phục văn phòng",
    image: prod1,
  },
];

function CompanyDetailPage() {
  const [dataDetail, setDataDetail] = useState<any>(null);
  const { id } = useParams<{ id: string }>();

  const fetchData = async (id: string) => {
    const { data } = await getViewDetailApi(id);
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
                  {dataDetail.hasLogo ? (
                    <img
                      src={dataDetail.logoUrl}
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
              <p>
                Dony là công ty sản xuất may mặc theo đơn đặt hàng. Sản xuất
                trọn gói từ nguyên liệu đến may in thêu hoàn thiện sản phẩm may
                mặc.
              </p>
              <p className="mt-3">Dony hiện có 3 mảng kinh doanh chính:</p>
              <ul className="list-disc pl-5">
                <li>Sản xuất đồng phục cho các công ty, xí nghiệp, đội nhóm</li>
                <li>
                  Sản xuất thời trang cho các thương hiệu thời trang và các Shop
                </li>
                <li>Sản xuất hàng xuất khẩu EWX, FOB, CIF, DAT, DAP,..</li>
              </ul>
              <p className="mt-3">Với cả sản phẩm:</p>
              <ul className="list-disc pl-5">
                <li>
                  Áo thun: Cổ tròn, cổ trụ, cổ điển, thời trang vải cá sấu, cá
                  mập, cotton, polyester, lụa mè, cá sấu mè,..
                </li>
                <li>
                  Áo sơ mi: Cổ điển, sơ mi kiểu vải Silk, Kate Việt Thắng, Kate
                  Mỹ, ý, Kate thun,..
                </li>
                <li>
                  Quần tây, Quần kaki, Quần short: Cashmere, kaki, Len ngựa,
                  Terin,..
                </li>
                <li>
                  Đầm váy: Chân váy, Đầm tuyết mưa, cotton lạnh, kaki thun, cát
                  nhật, cát hàn, cát giấy, vải thun,..
                </li>
                <li>
                  Nón mũ: Nón lưỡi trai (nón kết), nón tai bèo, nón nửa đầu,
                  Kaki cotton, Samsung, Kaki 65/35, Dù, Thun,..
                </li>
                <li>
                  Bảo hộ lao động: Quần túi hộp, quần bảo hộ, áo bảo hộ, bộ áo
                  liền quần với các chất liệu: Kaki thường, vải chống cháy, vải
                  Denim,..
                </li>
              </ul>

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
                      <p className="col-span-2">
                        May Mặc Dony - Công Ty TNHH May Mặc Dony
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid grid-cols-3 gap-4 ">
                      <p className="col-span-1">Địa chỉ: </p>
                      <p className="col-span-2">
                        123 Đường ABC, Phường 1, Quận 1, TP. HCM
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid grid-cols-3 gap-4 ">
                      <p className="col-span-1">Điện thoại: </p>
                      <p className="col-span-2">(028) 1234 5678</p>
                    </div>
                  </li>
                  <li>
                    <div className="grid grid-cols-3 gap-4 ">
                      <p className="col-span-1">Email: </p>
                      <p className="col-span-2">info@maymacdony.com</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
          <Col xs={24} md={14}>
            <div className="p-3 grid grid-cols-3 gap-4">
              {LIST_TYPE.map((type, index) => {
                return (
                  <div key={index} className="flex flex-col items-center ">
                    <img
                      src={type.image}
                      alt={type.name}
                      // className="w-[200px] h-[30px] mr-2"
                    />
                    <p className="text-center">{type.name}</p>
                  </div>
                );
              })}
              {/* Right column content */}
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default CompanyDetailPage;
