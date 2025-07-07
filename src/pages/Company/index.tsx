import InputCommon from "@/components/FormElement/InputCommon";
import { HEIGHT_INPUT, PRIMARY_COLOR } from "@/constants/color";
import { Button, Col, Form, Rate, Row, Select, Table } from "antd";
import Title from "antd/es/typography/Title";
import { MOCKDATA_COMPANY } from "./mockdata";
import { GoEye, GoSearch, GoPencil, GoSync, GoTrash } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function CompanyPage() {
  const navigate = useNavigate();
  const [dataCompany, setDataCompany] = useState(MOCKDATA_COMPANY);

  const handleDeleteCompany = (id: number) => {
    setDataCompany((prevData) =>
      prevData.filter((company) => company.id !== id)
    );
  };

  const columns = [
    {
      title: "Tên doanh nghiệp",
      dataIndex: "name",
      key: "name",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: "Tỉnh/Thành phố",
      dataIndex: "province",
      key: "province",
      sorter: (a: any, b: any) => a.province.localeCompare(b.province),
    },
    {
      title: "Trạng thái",
      dataIndex: "workingStatus",
      key: "workingStatus",
    },
    {
      title: "Đánh giá",
      dataIndex: "rate",
      key: "rate",
      sorter: (a: any, b: any) => a.rate - b.rate,
      render: (_, record: any) => <Rate disabled defaultValue={record.rate} />,
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      width: 160,
      render: (_, record: any) => (
        <div className="flex gap-2 justify-center align-center">
          <Button
            type="link"
            onClick={() => navigate(`/company/${record.id}`)}
            style={{ color: "#12aa51", padding: 0 }} // Primary color
          >
            <div className="flex flex-col items-center">
              <GoEye className="text-lg font-bold" />
              <span className="font-medium">Xem</span>
            </div>
          </Button>
          <Button
            type="link"
            onClick={() => console.log("View details", record)}
            style={{ color: PRIMARY_COLOR, padding: 0 }} // Warning color
          >
            <div className="flex flex-col items-center">
              <GoPencil className="text-lg font-bold" />
              <span className="font-medium">Sửa</span>
            </div>
          </Button>
          <Button
            type="link"
            onClick={() => handleDeleteCompany(record.id)}
            style={{ color: "#ff4d4f", padding: 0 }} // Danger color
          >
            <div className="flex flex-col items-center">
              <GoTrash className="text-lg font-bold" />
              <span className="font-medium">Xóa</span>
            </div>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 min-h-[83vh] overflow-y-auto">
      <div className="flex items-center justify-between  ">
        <Title level={3}>Danh sách doanh nghiệp</Title>
      </div>
      <Form layout="vertical" labelAlign="left" wrapperCol={{ flex: 1 }}>
        <Row gutter={[12, 0]} align="bottom">
          <Col span={5}>
            <InputCommon name="companyName" label="Tên viết tắt" />
          </Col>
          <Col span={5}>
            <Form.Item label="Tỉnh/Thành phố" name="province">
              <Select
                style={{ height: HEIGHT_INPUT, width: "100%" }}
                // onChange={handleChange}
                options={[
                  { value: "jack", label: "Jack" },
                  { value: "lucy", label: "Lucy" },
                  { value: "Yiminghe", label: "yiminghe" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item label="Tỉnh/Thành phố" name="province">
              <Select
                style={{ height: HEIGHT_INPUT, width: "100%" }}
                // onChange={handleChange}
                options={[
                  { value: "jack", label: "Jack" },
                  { value: "lucy", label: "Lucy" },
                  { value: "Yiminghe", label: "yiminghe" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item label="Tỉnh/Thành phố" name="province">
              <Select
                style={{ height: HEIGHT_INPUT, width: "100%" }}
                // onChange={handleChange}
                options={[
                  { value: "jack", label: "Jack" },
                  { value: "lucy", label: "Lucy" },
                  { value: "Yiminghe", label: "yiminghe" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="" name="province" style={{ textAlign: "right" }}>
              <Button
                style={{ height: HEIGHT_INPUT }}
                type="primary"
                icon={<GoSearch />}
                htmlType="submit"
              >
                Tìm kiếm
              </Button>
              <Button
                style={{ height: HEIGHT_INPUT }}
                className="ml-2"
                icon={<GoSync />}
              ></Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table dataSource={dataCompany} columns={columns} bordered />
    </div>
  );
}

export default CompanyPage;
