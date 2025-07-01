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
    className,
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

  return (
    <Form.Item label={label} name={name} rules={buildRules()} colon={false}>
      {type === "password" && <Input.Password {...inputProps} />}
      {type === "text" && <Input {...inputProps} />}
      {type === "email" && <Input {...inputProps} />}
    </Form.Item>
  );
}
export default InputCommon;
