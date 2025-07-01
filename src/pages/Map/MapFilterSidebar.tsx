import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Form, Select } from "antd";
import { useState } from "react";
import {
  MdOutlineFormatIndentDecrease,
  MdOutlineFormatIndentIncrease,
} from "react-icons/md";

const filterOptions = [
  // {
  //   label: "Tên công ty/MST",
  //   name: "name",
  //   type: "text",
  // },
  {
    label: "Quy mô doanh nghiệp",
    name: "size",
    options: [
      { label: "Siêu nhỏ", value: "micro" },
      { label: "Nhỏ", value: "small" },
      { label: "Vừa", value: "medium" },
      { label: "Lớn", value: "large" },
    ],
  },
  {
    label: "Lĩnh vực hoạt động",
    name: "field",
    options: [
      { label: "May mặc", value: "garment" },
      { label: "Dệt", value: "textile" },
      { label: "Phụ trợ", value: "supporting" },
    ],
  },
  {
    label: "Sản phẩm chủ lực",
    name: "product",
    options: [
      { label: "Áo sơ mi", value: "shirt" },
      { label: "Quần jeans", value: "jeans" },
      { label: "Vải cotton", value: "cotton" },
    ],
  },
  {
    label: "Chứng chỉ",
    name: "certificate",
    options: [
      { label: "ISO 9001", value: "iso9001" },
      { label: "WRAP", value: "wrap" },
      { label: "BSCI", value: "bsci" },
    ],
  },
  {
    label: "Thị trường chính",
    name: "market",
    options: [
      { label: "Việt Nam", value: "vietnam" },
      { label: "Mỹ", value: "usa" },
      { label: "Châu Âu", value: "europe" },
      { label: "Nhật Bản", value: "japan" },
    ],
  },
];

// Add prop type for onSearch
interface MapFilterSidebarProps {
  onSearch?: (values: any) => void;
}

const MapFilterSidebar = ({ onSearch }: MapFilterSidebarProps) => {
  const [form] = Form.useForm();
  const [show, setShow] = useState(true);

  const handleReset = () => {
    form.resetFields();
  };

  // Debounced search handler, memoized to avoid recreation on every render
  // const debouncedSearch = useMemo(
  //   () =>
  //     debounce((values: any) => {
  //       if (onSearch) {
  //         onSearch(values); // Call the Mapbox search event here
  //       }
  //       // Optionally: console.log(values);
  //     }, 500),
  //   [onSearch]
  // );

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
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            show ? " max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <hr />
          <div className=" p-5 ">
            <Form
              form={form}
              layout="vertical"
              onFinish={onSearch}
              className="space-y-3"
            >
              {filterOptions.map((opt) => {
                return (
                  <Form.Item
                    key={opt.name}
                    name={opt.name}
                    label={
                      <span className="font-medium text-sm">{opt.label}</span>
                    }
                  >
                    <Select
                      placeholder={`Chọn ${opt.label.toLowerCase()}`}
                      className="w-full"
                      options={opt.options}
                    />
                  </Form.Item>
                );
              })}
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
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapFilterSidebar;
