import InputCommon from "@/components/FormElement/InputCommon";
import { HEIGHT_INPUT, PRIMARY_COLOR } from "@/constants/color";
import { Button, Col, Form, Rate, Row, Select, Table } from "antd";
import Title from "antd/es/typography/Title";
import { MOCKDATA_COMPANY } from "./mockdata";
import { GoEye, GoSearch, GoPencil, GoSync, GoTrash } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo_company from "@/assets/imgs/company/logo_company.png";
import "./styles.css";

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
      render(specificData: any, record: any) {
        console.log('record: ', record);
        return (
          <Row>
            <Col span={2}>
              <img
                src={logo_company}
                alt="logo"
                className="w-[80px] h-[80px] rounded-full"
              />
            </Col>
            <Col span={22}>
              <div className="flex flex-col">
                <span className={`font-bold text-[${PRIMARY_COLOR}]`}>{record.shortName}</span>
                <span className="text-gray-500">{record.name}</span>
                <span className="text-gray-400">{record.taxCode}</span>
                <span className="text-gray-400">{record.emailOwner}</span>
              </div>
            </Col>
          </Row>

        );
      }
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
      render: (_: any, record: any) => <Rate disabled defaultValue={record.rate || 4} />,
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      width: 160,
      render: (_: any, record: any) => (
        <div className="flex gap-2 justify-center align-center">
          <Button
            type="link"
            onClick={() => navigate(`/company/${record.id}`)}
            style={{ color: "grey", padding: 0 }} // Primary color
          >
            <div className="flex flex-col items-center">
              <GoEye className="text-lg font-bold" />
              <span className="font-medium">Xem</span>
            </div>
          </Button>
          <Button
            type="link"
            onClick={() => console.log("View details", record)}
            style={{ color: "grey", padding: 0 }} // Warning color
          >
            <div className="flex flex-col items-center">
              <GoPencil className="text-lg font-bold" />
              <span className="font-medium">Sửa</span>
            </div>
          </Button>
          <Button
            type="link"
            onClick={() => handleDeleteCompany(record.id)}
            style={{ color: "grey", padding: 0 }} // Danger color
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
    <div className="p-6 overflow-y-auto">
      <div className="flex items-center justify-between">
        <Title level={3}>Danh sách doanh nghiệp</Title>
      </div>
      <Form layout="vertical" labelAlign="left" wrapperCol={{ flex: 1 }}>
        <Row gutter={[12, 0]} align="bottom">
          <Col span={5}>
            <InputCommon name="companyName" label="Tên viết tắt" layout="vertical" />
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
      <Table
        className="my-custom-table"
        dataSource={dataCompany}
        columns={columns}
      />

    </div>
  );
}

export default CompanyPage;
