import Title from "antd/es/typography/Title";
import working from "../../assets/imgs/working.png";
import office_1 from "../../assets/imgs/office_1.png";
import office_2 from "../../assets/imgs/office_2.png";

import { Carousel } from "antd";
import { useRef, useState } from "react";

function WorkingModel() {
  const ref = useRef<any>({});
  const [currentSlide, setCurrentSlide] = useState(0);

  const goTo = (slide: number) => {
    ref.current.goTo(slide, false);
    setCurrentSlide(slide);
  };
  return (
    <>
      <Title level={2} className="text-center ">
        MÔ HÌNH HOẠT ĐỘNG
      </Title>
      <img
        src={working}
        alt="Mô hình hoạt động"
        className="w-[70%] h-auto mx-auto my-5"
      />

      <div className="bg-[#f0f2f5] py-10">
        {" "}
        <Title level={2} className="text-center ">
          HÌNH ẢNH VĂN PHÒNG
        </Title>
        <Carousel ref={ref} arrows infinite={false} dots={false}>
          <div>
            <div className="flex justify-around items-center gap-1">
              <img src={office_1} alt="" className="w-[31%]" />
              <img src={office_2} alt="" className="w-[31%]" />
              <img src={office_2} alt="" className="w-[31%]" />
            </div>
          </div>
          <div>
            <div className="flex justify-around items-center gap-2">
              <img src={office_1} alt="" className="w-[31%]" />
              <img src={office_2} alt="" className="w-[31%]" />
              <img src={office_2} alt="" className="w-[31%]" />
            </div>
          </div>
          <div>
            <div className="flex justify-around items-center gap-2">
              <img src={office_1} alt="" className="w-[31%]" />
              <img src={office_2} alt="" className="w-[31%]" />
              <img src={office_2} alt="" className="w-[31%]" />
            </div>
          </div>
        </Carousel>
        <div className="flex justify-center mt-6 gap-2">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`w-[50px] h-1 rounded-full transition-all ${
                currentSlide === index ? "bg-[#2F5597]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default WorkingModel;
