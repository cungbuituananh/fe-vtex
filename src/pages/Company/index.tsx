import InputCommon from "@/components/FormElement/InputCommon";
import { HEIGHT_ACTION_BUTTON, PRIMARY_COLOR } from "@/constants/color";
import { Button, Col, Form, message, Rate, Row, Table } from "antd";
import Title from "antd/es/typography/Title";
import {
  GoEye,
  GoSearch,
  GoPencil,
  GoSync,
  GoTrash,
  GoCheck,
  GoX,
} from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo_company from "@/assets/imgs/company/logo_company.png";
import "./styles.css";
import {
  approveCompanyAPI,
  deleteCompanyAPI,
  getListCompanyAPI,
  rejectCompanyAPI,
} from "@/services/apis/company";
import useFetchData from "@/hooks/useFetchData";
import { getListProvinceAPI } from "@/services/apis/common";
import {
  DEFAULT_PAGINATION,
  WORKING_STATUS_OPTIONS,
  WORKING_STATUS_TEXT,
} from "@/constants/variables";
import { PlusOutlined } from "@ant-design/icons";
import { useAuth } from "@/contexts/AuthContext";
import type { TableRowSelection } from "antd/es/table/interface";
import SelectCommon from "@/components/FormElement/SelectCommon";

function CompanyPage() {
  const navigate = useNavigate();

  const { user } = useAuth();
  const [dataCompany, setDataCompany] = useState<any[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  console.log("pagination: ", pagination);
  const [form] = Form.useForm();

  const fetchData = async (params = {}) => {
    const {
      data: { content },
    } = await getListCompanyAPI(params);

    if (content.length > 0) {
      // Add unique key to each row - use taxCode as the key
      const dataWithKeys = content.map((item: any) => ({
        ...item,
        key: item.companyDraftId, // or item.id if you have an id field
      }));
      setDataCompany(dataWithKeys);
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

  const handleDeleteCompany = async (taxCode: string) => {
    try {
      await deleteCompanyAPI(taxCode);
      fetchData();
      // setDataCompany((prevData) =>
      //   prevData.filter((company) => company.taxCode !== taxCode)
      // );
    } catch (error) {
      console.error("Error deleting company:", error);
    }
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
      render(_: any, record: any) {
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
      render: (_: any, record: any) => {
        const { companyDraftId } = record;
        return (
          <div className="flex gap-2 justify-center align-center">
            <Button
              type="link"
              // onClick={() => navigate(`/company/${companyDraftId}`)}
              style={{ color: "grey", padding: 0 }} // Primary color
            >
              <div className="flex flex-col items-center">
                <GoEye className="text-lg font-bold" />
                <span className="font-medium">Xem</span>
              </div>
            </Button>
            <Button
              type="link"
              onClick={() => {
                const url =
                  record.status === WORKING_STATUS_TEXT.PENDING_APPROVAL
                    ? `/company/${companyDraftId}/approve`
                    : `/company/${companyDraftId}/update`;

                navigate(url);
              }}
              style={{ color: "grey", padding: 0 }} // Warning color
            >
              <div className="flex flex-col items-center">
                <GoPencil className="text-lg font-bold" />
                <span className="font-medium">Sửa</span>
              </div>
            </Button>
            {user?.roles?.includes("ADMIN") && (
              <Button
                type="link"
                onClick={() => handleDeleteCompany(record.companyDraftId)}
                style={{ color: "grey", padding: 0 }} // Danger color
              >
                <div className="flex flex-col items-center">
                  <GoTrash className="text-lg font-bold" />
                  <span className="font-medium">Xóa</span>
                </div>
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleApprove = async () => {
    if (selectedRowKeys.length === 0) {
      return;
    }
    try {
      // Call your API to approve the selected companies
      // await approveCompaniesAPI(selectedRowKeys);
      await approveCompanyAPI(selectedRowKeys as string[]);

      message.success("Phê duyệt thành công");
      fetchData();
      setSelectedRowKeys([]); // Clear selection after approval
    } catch (error) {
      console.error("Error approving companies:", error);
    }
  };

  const handleReject = async () => {
    if (selectedRowKeys.length === 0) {
      return;
    }
    try {
      // Call your API to reject the selected companies
      // await rejectCompaniesAPI(selectedRowKeys);
      await rejectCompanyAPI(selectedRowKeys as string[]);
      message.success("Từ chối thành công");
      setSelectedRowKeys([]); // Clear selection after approval
      fetchData();
    } catch (error) {
      console.error("Error rejecting companies:", error);
    }
  };

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
              style={{ height: HEIGHT_ACTION_BUTTON, marginRight: "8px" }}
              type="primary"
              icon={<GoCheck />}
              onClick={handleApprove}
              disabled={selectedRowKeys.length === 0}
            >
              Phê duyệt
            </Button>
            <Button
              style={{ height: HEIGHT_ACTION_BUTTON, marginRight: "8px" }}
              type="primary"
              danger
              onClick={handleReject}
              icon={<GoX />}
              disabled={selectedRowKeys.length === 0}
            >
              Từ chối
            </Button>
            <Button
              style={{ height: HEIGHT_ACTION_BUTTON, marginRight: "8px" }}
              type="primary"
              icon={<GoSearch />}
              htmlType="submit"
            >
              Tìm kiếm
            </Button>
            <Button
              type="dashed"
              style={{ height: HEIGHT_ACTION_BUTTON }}
              onClick={() => navigate("/register-company")}
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
            <SelectCommon
              label="Tỉnh/Thành phố"
              name="province"
              options={provinceOptions}
              fullWidth
            />
          </Col>

          <Col span={5}>
            <SelectCommon
              label="Trạng thái"
              name="status"
              options={WORKING_STATUS_OPTIONS}
              fullWidth
            />
          </Col>

          <Col span={9}>
            <Form.Item label="" name="" style={{ textAlign: "right" }}>
              <Button className="ml-2" icon={<GoSync />}>
                Đặt lại
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table
        rowSelection={user?.roles?.includes("ADMIN") ? rowSelection : undefined}
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
