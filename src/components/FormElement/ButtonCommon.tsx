import { Button } from "antd";

interface ButtonCommonProps {
  children: React.ReactNode | string;
  textAlign?: "start" | "end" | "center"; // Optional prop for text alignment
  type?: "primary" | "default" | "dashed" | "text" | "link"; // Optional prop for button type
  isSubmitting?: boolean;
}

const STYLE_BUTTON_COMMON: any = {
  borderRadius: "9999px",
  height: "35px",
  width: "180px",
};

function ButtonCommon({ children, textAlign = "center" }: ButtonCommonProps) {
  return (
    <Button style={{ ...STYLE_BUTTON_COMMON, textAlign }}>{children}</Button>
  );
}

export default ButtonCommon;
