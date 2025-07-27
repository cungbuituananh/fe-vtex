import useGetOptions from "@/hooks/useGetOptions";
import { getListGroupPublicAPI } from "@/services/apis/public";
import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Form, Select } from "antd";
import { useState } from "react";
import {
  MdOutlineFormatIndentDecrease,
  MdOutlineFormatIndentIncrease,
} from "react-icons/md";


const MapFilterSidebar = () => {
  // const [form] = Form.useForm();
  const [show, setShow] = useState(true);

  const form = Form.useFormInstance();

  const handleReset = () => {
    form.resetFields();
  };

  const { options: certificateOptions } = useGetOptions({
    api: () => getListGroupPublicAPI("CERT"), // Fetch major categories
    queryKey: "getCertificateOptions",
    labelValueType: ["name", "code"],
  });

  const { options: modelOptions } = useGetOptions({
    api: () => getListGroupPublicAPI("MODEL"), // Fetch major categories
    queryKey: "getModalOptions",
    labelValueType: ["name", "code"],
  });

  const { options: majorOptions } = useGetOptions({
    api: () => getListGroupPublicAPI("MAJOR"), // Fetch major categories
    queryKey: "getMajorOptions",
    labelValueType: ["name", "code"],
  });

  const { options: marketOptions } = useGetOptions({
    api: () => getListGroupPublicAPI("MARKET"), // Fetch major categories
    queryKey: "getMarketOptions",
    labelValueType: ["name", "code"],
  });
  const { options: productKeyOptions } = useGetOptions({
    api: () => getListGroupPublicAPI("P_KEY"), // Fetch major categories
    queryKey: "getProductKeyOptions",
    labelValueType: ["name", "code"],
  });

  // Handle form submission

  // // Call debouncedSearch on form submit
  // const handleSearch = (values: any) => {
  //   debouncedSearch(values);
  // };

  return (
    <div className="relative h-[90vh] ">
      {/* Sidebar */}
      <div
        className={`bg-[#F6F8FB] rounded-xl shadow w-80 max-w-[90vw] m-3 z-10`}
        style={{ position: "relative" }}
      >
        <div className="flex gap-3 items-center py-2 px-3 ">
          <Button
            type="text"
            className="cursor-pointer"
            onClick={() => setShow(!show)}
            style={{ padding: 0 }}
          >
            {show ? (
              <MdOutlineFormatIndentIncrease style={{ fontSize: "20px" }} />
            ) : (
              <MdOutlineFormatIndentDecrease style={{ fontSize: "20px" }} />
            )}
          </Button>
          <span> | </span>
          <span className="font-semibold text-base">Bộ lọc tìm kiếm</span>
        </div>
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${show ? " max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <hr />
          <div className=" p-5 ">
            {/* <Form
              form={form}
              layout="vertical"
              onFinish={onSearch}
              className="space-y-3"
            > */}
            <Form.Item
              key="productionScale"
              name="productionScale"
              label={
                <span className="font-medium text-sm">Quy mô doanh nghiệp</span>
              }
            >
              <Select
                placeholder={`Chọn quy mô doanh nghiệp`}
                className="w-full"
                options={modelOptions}
              />
            </Form.Item>
            <Form.Item
              key="manufacturingSector"
              name="manufacturingSector"
              label={
                <span className="font-medium text-sm">Lĩnh vực hoạt động</span>
              }
            >
              <Select
                placeholder={`Chọn Lĩnh vực hoạt động`}
                className="w-full"
                options={majorOptions}
              />
            </Form.Item>

            <Form.Item
              key="keyProducts"
              name="keyProducts"
              label={
                <span className="font-medium text-sm">Sản phẩm chủ lực</span>
              }
            >
              <Select
                placeholder={`Chọn Sản phẩm chủ lực`}
                className="w-full"
                options={productKeyOptions}
              />
            </Form.Item>

            <Form.Item
              key="certificate"
              name="certificate"
              label={<span className="font-medium text-sm">Chứng chỉ</span>}
            >
              <Select
                placeholder={`Chọn Chứng chỉ`}
                className="w-full"
                options={certificateOptions}
              />
            </Form.Item>

            <Form.Item
              key="manufacturingMarket"
              name="manufacturingMarket"
              label={
                <span className="font-medium text-sm">Thị trường chính</span>
              }
            >
              <Select
                placeholder={`Chọn Thị trường chính`}
                className="w-full"
                options={marketOptions}
              />
            </Form.Item>

            <div className="flex gap-3 mt-2">
              <Button
                onClick={handleReset}
                icon={<ReloadOutlined />}
                className="flex-1 rounded-full border border-[#E0E3EB] bg-white text-[#222] font-medium flex items-center justify-center"
              >
                Đặt lại
              </Button>
              <Button
                htmlType="submit"
                type="primary"
                icon={<SearchOutlined />}
                className="flex-1 rounded-full bg-[#23407C] text-white font-semibold flex items-center justify-center border-none"
                style={{ background: "#23407C" }}
              >
                Tìm kiếm
              </Button>
            </div>
            {/* </Form> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapFilterSidebar;
