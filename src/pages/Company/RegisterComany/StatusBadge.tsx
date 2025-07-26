import { WORKING_STATUS_TEXT } from "@/constants/variables";

interface StatusBadgeProps {
  status: number;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusConfig = (status: number) => {
    switch (status) {
      case WORKING_STATUS_TEXT.APPROVED:
        return {
          color: "green",
          text: "Hoạt động",
          dotColor: "#52c41a",
        };
      case WORKING_STATUS_TEXT.REJECTED:
        return {
          color: "red",
          text: "Ngừng hoạt động",
          dotColor: "#ff4d4f",
        };
      case WORKING_STATUS_TEXT.PENDING_APPROVAL:
        return {
          color: "orange",
          text: "Chờ phê duyệt",
          dotColor: "#faad14",
        };
      case WORKING_STATUS_TEXT.PENDING_UPDATE_APPROVAL:
        return {
          color: "blue",
          text: "Chờ phê duyệt cập nhật",
          dotColor: "#1890ff",
        };
      case WORKING_STATUS_TEXT.UPDATED_APPROVED:
        return {
          color: "cyan",
          text: "Đã phê duyệt cập nhật",
          dotColor: "#13c2c2",
        };
      default:
        return {
          color: "default",
          text: "Không xác định",
          dotColor: "#d9d9d9",
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div className="flex items-center gap-1">
      <p
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          backgroundColor: config.dotColor,
          display: "inline-block",
        }}
      />
      <p className="font-bold">{config.text}</p>
    </div>
  );
};

export default StatusBadge;
