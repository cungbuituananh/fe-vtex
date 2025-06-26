import banner from "../../assets/imgs/banner.png";
import intro_1 from "../../assets/imgs/intro_1.png";
import intro_2 from "../../assets/imgs/intro_2.png";
import intro_3 from "../../assets/imgs/intro_3.png";
import intro_4 from "../../assets/imgs/intro_4.png";
import intro_5 from "../../assets/imgs/intro_5.png";
import intro_map from "../../assets/imgs/intro_map.png";
import demo from "../../assets/imgs/demo.png";
import { Typography } from "antd";
import "./home.css";
import WorkingModel from "../Home/WorkingModel";

const { Title } = Typography;
function HomePage() {
  return (
    <div className="mt-3  mt-10">
      <img src={banner} alt="Intro" className="w-full h-auto" />

      <Title level={2} className="text-center my-5">
        VITEX SDS CO.,LTD
      </Title>
      <div className="flex justify-center flex-wrap gap-8 my-10">
        <div className="intro-item flex flex-col items-center">
          <img src={intro_1} alt="Thành Lập" className="w-[60px] h-auto mb-2" />
          <div className="intro-title">THÀNH LẬP</div>
          <div className="intro-underline" />
          <div className="intro-desc">19/05/2021</div>
        </div>
        <div className="intro-item flex flex-col items-center">
          <img src={intro_2} alt="Chủ Tịch" className="w-[60px] h-auto mb-2" />
          <div className="intro-title">CHỦ TỊCH</div>
          <div className="intro-underline" />
          <div className="intro-desc">Mr Vũ Đức Giang</div>
        </div>
        <div className="intro-item flex flex-col items-center">
          <img src={intro_3} alt="Lĩnh vực" className="w-[60px] h-auto mb-2" />
          <div className="intro-title">LĨNH VỰC</div>
          <div className="intro-underline" />
          <div className="intro-desc text-center">
            Chuỗi cung ứng
            <br />
            Dệt May
          </div>
        </div>
        <div className="intro-item flex flex-col items-center">
          <img src={intro_4} alt="Bền vững" className="w-[60px] h-auto mb-2" />
          <div className="intro-title">BỀN VỮNG</div>
          <div className="intro-underline" />
          <div className="intro-desc text-center">
            Góp phần xây dựng chuỗi
            <br />
            cung ứng Dệt May bền vững
          </div>
        </div>
        <div className="intro-item flex flex-col items-center">
          <img src={intro_5} alt="Mạng lưới" className="w-[60px] h-auto mb-2" />
          <div className="intro-title">MẠNG LƯỚI</div>
          <div className="intro-underline" />
          <div className="intro-desc text-center">
            Liên kết chuỗi cung
            <br />
            ứng toàn cầu
          </div>
        </div>
      </div>

      <img src={intro_map} alt="Intro" className="w-[60%] h-auto mx-auto " />

      {/* VISON & MISSION */}
      <div className="max-w-[1400px] border-solid border mx-auto my-10 border-gray-300 rounded-lg p-[50px]">
        <div className="flex justify-between  gap-10">
          <div>
            <Title level={2} className=" my-5">
              TẦM NHÌN & SỨ MỆNH
            </Title>
            <Title level={4} className=" my-5">
              TẦM NHÌN
            </Title>
            <ul className="list-disc ml-6 font-[500]">
              <li>
                Trở thành công ty cung cấp nền tảng số cho Chuỗi cung ứng Dệt
                May số 1 Việt Nam.
              </li>
            </ul>

            <Title level={4} className=" my-5">
              SỨ MỆNH
            </Title>
            <ul className="list-disc ml-6 font-[500]">
              <li>
                Mang đến cho chuỗi cung ứng bộ bách khoa toàn thư Nganh Dệt May.
              </li>
              <li>Xây dựng chuỗi cung ứng Dệt May bền vững.</li>
            </ul>
          </div>
          <img
            src={demo}
            alt="demo"
            style={{ display: "block" }}
            className="w-[50%]"
          />
        </div>
      </div>

      <WorkingModel />
    </div>
  );

  return <>Intro</>;
}

export default HomePage;
