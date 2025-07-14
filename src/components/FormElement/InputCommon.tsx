import { HEIGHT_INPUT } from "@/constants/color";
import { Form, Input } from "antd";

interface InputCommonProps {
  label: string;
  name: string;
  rules?: any[];
  disabled?: boolean;
  type?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  layout?: 'horizontal' | 'vertical'; // Add layout prop
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
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  return (
    <Form.Item
      label={label}
      name={name}
      rules={buildRules()}
      colon={false}
      {...(props.layout === 'vertical' ? {} : {
        labelCol: { span: 6, style: labelStyle },
        wrapperCol: { span: 18 }
      })}
    >
      {type === "password" && <Input.Password {...inputProps} />}
      {(type === "text" || type === "email") && <Input {...inputProps} />}
    </Form.Item>
  );
}
export default InputCommon;
