import InputCommon from "@/components/FormElement/InputCommon";
import { HEIGHT_INPUT, PRIMARY_COLOR } from "@/constants/color";
import { Button, Col, Form, Rate, Row, Select, Table } from "antd";
import Title from "antd/es/typography/Title";
import { GoEye, GoSearch, GoPencil, GoSync, GoTrash } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo_company from "@/assets/imgs/company/logo_company.png";
import "./styles.css";
import { getListCompanyAPI } from "@/services/apis/company";
import useFetchData from "@/hooks/useFetchData";
import { getListProvinceAPI } from "@/services/apis/common";
import {
  DEFAULT_PAGINATION,
  WORKING_STATUS_OPTIONS,
} from "@/constants/variables";
import { PlusOutlined } from "@ant-design/icons";

function CompanyPage() {
  const navigate = useNavigate();

  const [dataCompany, setDataCompany] = useState<any[]>([]);
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  console.log("pagination: ", pagination);
  const [form] = Form.useForm();

  const fetchData = async (params = {}) => {
    const {
      data: { content },
    } = await getListCompanyAPI(params);

    if (content.length > 0) {
      setDataCompany(content);
    }
  };

  const { data } = useFetchData({
    queryKey: ["provinceList"],
    queryFn: getListProvinceAPI,
  });

  const dataProvince = Array.isArray(data) ? data : data?.data || [];

  const provinceOptions = dataProvince?.map((province: any) => ({
    value: province.provinceCode,
    label: province.provinceName,
  }));

  const handleDeleteCompany = (taxCode: string) => {
    setDataCompany((prevData) =>
      prevData.filter((company) => company.taxCode !== taxCode)
    );
  };

  const handleSearch = () => {
    const values = form.getFieldsValue();
    fetchData(values);
  };

  const columns = [
    {
      title: "Tên doanh nghiệp",
      dataIndex: "name",
      key: "name",
      width: 800,
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
      render(specificData: any, record: any) {
        console.log("specificData: ", specificData);

        return (
          <Row>
            <Col span={3} style={{ display: "flex", alignItems: "center" }}>
              <img
                src={logo_company}
                alt="logo"
                className="w-[80px] h-[80px] rounded-full"
              />
            </Col>
            <Col span={19}>
              <div className="flex flex-col">
                <span className={`font-bold text-[${PRIMARY_COLOR}]`}>
                  {record.shortName}
                </span>
                <span className="text-gray-500">{record.name}</span>
                <span className="text-gray-400">{record.address}</span>
              </div>
            </Col>
          </Row>
        );
      },
    },
    {
      title: "Tỉnh/Thành phố",
      dataIndex: "provinceName",
      key: "provinceName",
      sorter: (a: any, b: any) => a.provinceName.localeCompare(b.provinceName),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      sorter: (a: any, b: any) => a.status - b.status,
      render: (status: number) => {
        const statusText = WORKING_STATUS_OPTIONS.find(
          (option) => option.value === status
        )?.label;
        return <span>{statusText}</span>;
      },
    },
    {
      title: "Đánh giá",
      dataIndex: "rate",
      key: "rate",
      sorter: (a: any, b: any) => a.rate - b.rate,
      render: (_: any, record: any) => (
        <Rate disabled defaultValue={record.rate || 4} />
      ),
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
            onClick={() => navigate(`/company/${record.taxCode}`)}
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
            onClick={() => handleDeleteCompany(record.taxCode)}
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 overflow-y-auto">
      <Form
        layout="vertical"
        labelAlign="left"
        wrapperCol={{ flex: 1 }}
        form={form}
        onFinish={handleSearch}
      >
        <div className="flex items-center justify-between">
          <Title level={3}>Danh sách doanh nghiệp</Title>
          <div>
            <Button
              style={{ height: HEIGHT_INPUT, marginRight: "8px" }}
              type="primary"
              icon={<GoSearch />}
              htmlType="submit"
            >
              Tìm kiếm
            </Button>
            <Button
              type="dashed"
              style={{ height: HEIGHT_INPUT }}
              onClick={() => navigate("/company/register")}
              icon={<PlusOutlined />}
            >
              Thêm mới doanh nghiệp
            </Button>
          </div>
        </div>
        <Row gutter={[12, 0]} align="bottom">
          <Col span={5}>
            <InputCommon name="companyName" label="Tên viết tắt" fullWidth />
          </Col>
          <Col span={5}>
            <Form.Item label="Tỉnh/Thành phố" name="province">
              <Select
                style={{ height: HEIGHT_INPUT, width: "100%" }}
                // onChange={handleChange}
                options={provinceOptions}
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item label="Trạng thái" name="status">
              <Select
                style={{ height: HEIGHT_INPUT, width: "100%" }}
                options={WORKING_STATUS_OPTIONS}
              />
            </Form.Item>
          </Col>
          {/* <Col span={5}>
            <Form.Item label="Đánh giá" name="averageRating">
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
          </Col> */}
          <Col span={9}>
            <Form.Item label="" name="" style={{ textAlign: "right" }}>
              {/* <Button
                style={{ height: HEIGHT_INPUT }}
                type="primary"
                icon={<GoSearch />}
                htmlType="submit"
              >
                Tìm kiếm
              </Button> */}
              <Button
                style={{ height: HEIGHT_INPUT }}
                className="ml-2"
                icon={<GoSync />}
              >
                Đặt lại
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table
        className="my-custom-table"
        dataSource={dataCompany}
        columns={columns}
        onChange={(tablePagination) => {
          setPagination({
            page: tablePagination.current ? tablePagination.current - 1 : 0,
            pageSize: tablePagination.pageSize || DEFAULT_PAGINATION.pageSize,
          });
        }}
      />
    </div>
  );
}

export default CompanyPage;
