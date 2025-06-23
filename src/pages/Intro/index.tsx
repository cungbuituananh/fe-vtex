import { Typography } from "antd";
import "./intro.css";
import IntroComp from "./Intro";

const { Title } = Typography;
function IntroPage() {
  return (
    <div className="">
      <div className="text-center">
        <Title level={2} className="underline my-5">
          Thông tin dự án
        </Title>
        <p>Bản đồ số các Doanh nghiệp Dệt May Việt Nam</p>
      </div>
      <IntroComp />
    </div>
  );
}

export default IntroPage;
