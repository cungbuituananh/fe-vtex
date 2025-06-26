import { STYLE_CONTAINER_BORDER, STYLE_TITLE_COMMON } from "@/constants/color";
import { Col, Row } from "antd";
import { useParams } from "react-router-dom";

function CompanyDetailPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <div className={`${STYLE_CONTAINER_BORDER} my-5`}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <div className="p-3">
            <Row gutter={[16, 16]}>
              <Col xs={24} md={4}>
                123321
              </Col>
              <Col xs={24} md={18}>
                <p className={STYLE_TITLE_COMMON}>
                  May Mặc Dony - Công Ty TNHH May Mặc Dony
                </p>
              </Col>
            </Row>
            <h3>Company Details</h3>
            <p>ID: {id}</p>
            {/* Left column content */}
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div className="p-3">
            <h3>Additional Information</h3>
            {/* Right column content */}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default CompanyDetailPage;
