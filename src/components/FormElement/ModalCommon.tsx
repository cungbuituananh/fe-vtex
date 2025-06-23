import { Modal } from "antd";

interface ModalCommonProps {
  isOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  title?: string;
  children?: React.ReactNode;
}
function ModalCommon(props: ModalCommonProps) {
  const {
    isOpen = false,
    handleOk,
    handleCancel,
    title = "",
    children,
  } = props;

  return (
    <Modal
      title={title}
      closable={{ "aria-label": "Custom Close Button" }}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {children}
    </Modal>
  );
}

export default ModalCommon;
