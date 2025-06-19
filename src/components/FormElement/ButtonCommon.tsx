import { Button } from "antd";

interface ButtonCommonProps {
  children: React.ReactNode | string;
}

function ButtonCommon({ children }: ButtonCommonProps) {
  return <Button>{children}</Button>;
}

export default ButtonCommon;
