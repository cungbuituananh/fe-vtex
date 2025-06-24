import { PRIMARY_COLOR } from "@/constants/color";
import { Col, Row } from "antd";
import logoCompany from "@/assets/imgs/logo-company.png";

function SearchItem() {
  return (
    <>
      <Row gutter={[12, 12]} className="h-full">
        {/* INFOR */}
        <Col xs={24} lg={12} xl={12}>
          <p className={`text-[${PRIMARY_COLOR}] font-bold text-[18px]`}>
            Tên doanh nghiệp
          </p>
          <p className={`text-[${PRIMARY_COLOR}]`}>
            Địa chỉ: Số 123, Đường ABC, Quận XYZ
          </p>
          <p className={`text-[${PRIMARY_COLOR}]`}>Số điện thoại: 0123456789</p>
          <p className={`text-[${PRIMARY_COLOR}]`}>Email:</p>
        </Col>
        {/* IMAGE */}
        <Col xs={24} lg={12} xl={12}>
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={logoCompany}
              alt="Company Logo"
              className="w-32 h-32 object-cover rounded-lg shadow-md"
            />
          </div>
        </Col>
      </Row>
      <p>Mở cửa: 8:30 - Đóng cửa: 17:30 (Thứ 2 - Thứ 7)</p>
    </>
  );
}

export default SearchItem;
