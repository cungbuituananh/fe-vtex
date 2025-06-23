import { Typography, Row, Col, Button } from "antd";
import "./intro.css";
import minimap from "../../assets/imgs/mini-map.png";
import { PRIMARY_COLOR } from "@/constants/color";
import { IoExpand } from "react-icons/io5";
import ProjectTimeline from "./ProjectTimeline";

const { Title, Paragraph } = Typography;

function IntroComp() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto border border-gray-200 rounded-lg shadow-lg bg-white p-6">
        <Row gutter={[24, 24]} className="h-full">
          {/* Left Content Column */}
          <Col xs={24} lg={12} xl={12}>
            <div className="">
              {/* Header Section */}
              <div className="mb-4">
                <p
                  className="font-medium mb-3 text-[18px] "
                  style={{ color: PRIMARY_COLOR }}
                >
                  Giới thiệu
                </p>

                <p className="text-gray-800  font-bold text-[26px]">
                  Bản đồ số
                </p>
                <p className="text-gray-700 text-[26px] font-medium">
                  các Doanh nghiệp Dệt May Việt Nam
                </p>
                <Paragraph className="text-gray-600 text-base leading-relaxed">
                  Là nền tảng thể hiện thông tin vị trí, quy mô và sự liên kết
                  giữa các doanh nghiệp trong ngành:
                </Paragraph>
              </div>

              {/* Business Categories */}
              <div className="mb-4">
                <ul className="list-disc ml-6 font-[500]">
                  <li>Dệt May, bao gồm cả Sợi-Dệt-Nhuộm-May</li>
                  <li>Các nhóm phụ trợ, thương mại, dịch vụ khác</li>
                </ul>
              </div>

              {/* Purpose Section */}
              <div className="mb-4">
                <Title level={4} className="text-blue-600 mb-4 font-semibold">
                  Mục tiêu
                </Title>
                <ul className="list-disc ml-6 font-[500] space-y-4">
                  <li>
                    {" "}
                    <p>
                      <strong>Thống kê bản đồ:</strong> Cho phép thu thập, lưu
                      trữ, kiểm tra và hiển thị thông tin tổng quan về các doanh
                      nghiệp Dệt May. Dữ liệu có nhiều dạng, nhiều trường.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Ứng dụng:</strong> Giúp nhìn rõ, phân tích và thấu
                      hiểu → khao sát, quản lý các nguồn lực và lập kế hoạch
                      phát triển.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Liên kết:</strong> Là cơ sở để tạo 1 nền tảng sàn
                      chơi số cho các doanh nghiệp: thư viện số chi tiết về năng
                      lực ngành, chợ thương mại điện tử về đơn hàng, các hoạt
                      động giao lưu trên mạng trong phạm vi ngành.
                    </p>
                  </li>
                </ul>
              </div>

              {/* Map Functions Section */}
              <div className="mb-4">
                <Title level={4} className="text-blue-600 mb-4 font-semibold">
                  Chức năng bản đồ số
                </Title>
                <Paragraph className="text-gray-700 leading-relaxed">
                  Cung cấp một bảng trình bày trực quan về dữ liệu gồm các chức
                  năng chính : Nhập liệu - Hiển thị dữ liệu - Quản lý dữ liệu -
                  Truy xuất dữ liệu - Phân tích dữ liệu.
                </Paragraph>
              </div>

              {/* Map Creation Requirements */}
              <div>
                <Title level={4} className="text-blue-600 mb-4 font-semibold">
                  Các yếu tố tạo thành bản đồ
                </Title>
                <Paragraph className="text-gray-700 leading-relaxed">
                  Phần cứng - Phần mềm - Dữ liệu - Nhân lực - Phương pháp
                </Paragraph>
              </div>
            </div>
          </Col>

          {/* Right Map Column */}
          <Col xs={24} lg={12} xl={12}>
            <div className="relative">
              <img
                src={minimap}
                alt="Vietnam Map"
                //   className="w-full h-full object-fit"
              />
              <div className=" absolute right-0 top-0">
                <Button
                  color="default"
                  variant="text"
                  onClick={() =>
                    // i18n.changeLanguage(currentLanguage === "en" ? "vi" : "en")
                    console.log("changeLanguage: ")
                  }
                  style={{ padding: 0 }}
                >
                  <IoExpand style={{ width: "30px", height: "30px" }} />
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* Add Timeline Section */}
      <div className="mt-8">
        <ProjectTimeline />
      </div>
    </div>
  );
}

export default IntroComp;
