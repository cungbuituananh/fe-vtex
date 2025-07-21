import { HEIGHT_INPUT } from "@/constants/color";
import { Form, Input } from "antd";

interface InputCommonProps {
  label: string;
  name: any;
  rules?: any[];
  disabled?: boolean;
  type?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  layout?: "horizontal" | "vertical"; // Add layout prop
  labelCol?: any; // Additional props for Form.Item
  fullWidth?: boolean; // Add fullWidth prop
  labelAlign?: "left" | "right"; // Add label alignment prop
  children?: React.ReactNode; // Allow children to be passed in
}

function InputCommon(props: InputCommonProps) {
  const {
    label,
    name,
    rules,
    disabled = false,
    type = "text",
    placeholder,
    required,
    className, // Default to horizontal layout
    labelCol = 6,
    fullWidth = false,
    labelAlign = "left", // Default label alignment
    children, // Allow children to be passed in
    ...restProps // Extract other props
  } = props;

  // Build rules based on type and required
  const buildRules = () => {
    const baseRules = [];

    if (required) {
      baseRules.push({
        required: true,
        message: `Vui lòng nhập ${label.toLowerCase()}`,
      });
    }

    if (type === "email") {
      baseRules.push({
        type: "email",
        message: "Email không hợp lệ",
      });
    }

    // Merge custom rules with base rules
    return [...baseRules, ...(rules || [])];
  };

  const inputProps = {
    placeholder: placeholder || `Nhập ${label.toLowerCase()}`,
    disabled,
    style: {
      height: `${HEIGHT_INPUT}`,
    },
    className,
    restProps,
  };

  // Style to make the label display in one line and align properly
  const labelStyle = {
    whiteSpace: "nowrap",
    // overflow: "hidden",
    textOverflow: "ellipsis",
  };

  return (
    <Form.Item
      label={label}
      name={name}
      rules={buildRules()}
      colon={false}
      labelAlign={labelAlign}
      {...(fullWidth
        ? {}
        : {
            labelCol: { span: labelCol, style: labelStyle },
            wrapperCol: { span: 24 - labelCol },
          })}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {type === "password" && (
          <Input.Password
            {...inputProps}
            style={{ ...inputProps.style, flex: 1 }}
          />
        )}
        {(type === "text" || type === "email" || type === "number") && (
          <Input
            type={type}
            {...inputProps}
            style={{ ...inputProps.style, flex: 1 }}
          />
        )}
        {children}
      </div>
    </Form.Item>
  );
}
export default InputCommon;
