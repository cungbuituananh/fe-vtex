import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Title from "antd/es/typography/Title";
import SearchComponent from "./SearchComponent";

function CompanyPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between  ">
        <Title level={3}>Danh sách doanh nghiệp</Title>
        <div>
          <Button type="primary" icon={<PlusOutlined />} htmlType="submit">
            Lưu
          </Button>
          <Button className="ml-2" danger icon={<DeleteOutlined />}>
            Hủy bỏ
          </Button>
        </div>
      </div>
      <SearchComponent />
    </div>
  );
}

export default CompanyPage;
