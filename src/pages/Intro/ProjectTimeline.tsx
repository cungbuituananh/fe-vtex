import { PRIMARY_COLOR } from "@/constants/color";

function ProjectTimeline() {
  const timelineData = [
    {
      number: "01",
      date: "Tháng 3/2022",
      title: "Demo dự án",
      descriptions: [
        "Trình bày sơ lược về mục tiêu, chức năng và ví dụ sản phẩm.",
      ],
    },
    {
      number: "02",
      date: "Tháng 6/2022",
      title: "Go live dự án",
      descriptions: [
        "Hoàn thành chạy thử, đưa vào sử dụng và quản lý, nâng cấp.",
      ],
    },
    {
      number: "03",
      date: "Tháng 12/2022",
      title: "Phát triển nền tảng",
      descriptions: [
        "Xây dựng và demo các ứng dụng về tình để liên kết và sử dụng dữ liệu từ bản đồ số.",
        "Thư viện năng lực - Chợ thương mại điện tử - Mạng xã hội ngành",
      ],
    },
  ];

  return (
    <div className="p-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Desktop Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Timeline Line */}
            {/* <div className="absolute top-6 left-0 w-full h-0.5 bg-gray-300 z-0"></div> */}

            {/* Timeline Items */}
            <div className="flex gap-10 z-10">
              {timelineData.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-1 flex-col items-start relative"
                >
                  {/* Circle with Number */}
                  {/* {index < timelineData.length - 1 && (
                    <div className="absolute top-6 left-0 w-full h-0.5 bg-gray-300 z-0"></div>
                  )} */}

                  {index < timelineData.length - 1 && (
                    <div
                      className="absolute top-6 z-0"
                      style={{ left: "48px", right: "-48px" }}
                    >
                      {/* Main line */}
                      <div
                        className="h-0.25 bg-[#2F5597] relative left-4"
                        style={{ width: "calc(100% - 40px)" }}
                      >
                        {/* Arrow head */}
                        <div
                          className="absolute right-[-8px] top-1/2 transform -translate-y-1/2 "
                          style={{
                            width: 0,
                            height: 0,
                            borderLeft: "8px solid ##2F5597",
                            borderTop: "4px solid transparent",
                            borderBottom: "4px solid transparent",
                          }}
                        ></div>

                        {/* Lozenge */}
                        <div
                          className="absolute left-[-3px] top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-1 h-1 rotate-45 bg-[#2F5597]"
                          style={{
                            borderLeft: "1px solid rgba(0,0,0,0.1)",
                            borderBottom: "1px solid rgba(0,0,0,0.1)",
                            boxShadow: "inset -1px -1px 2px rgba(0,0,0,0.1)",
                          }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div
                    className="z-1 w-12 h-12 rounded-full flex items-center justify-center mb-4 border-1 border-[#2F5597] shadow-lg"
                    // style={{ backgroundColor: PRIMARY_COLOR }}
                  >
                    <p
                      className="rounded-full w-10 h-10 flex items-center justify-center text-white font-bold text-lg"
                      style={{ backgroundColor: PRIMARY_COLOR }}
                    >
                      {" "}
                      {item.number}
                    </p>
                  </div>

                  <div>
                    <div className="text-gray-600 text-sm mb-2 font-medium">
                      {item.date}
                    </div>
                    <h3
                      className="font-bold text-base mb-3"
                      style={{ color: PRIMARY_COLOR }}
                    >
                      {item.title}
                    </h3>
                    <ul className="space-y-2">
                      {item.descriptions.map((desc, descIndex) => (
                        <li key={descIndex} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          <span className="text-gray-700 text-sm leading-relaxed">
                            {desc}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectTimeline;
