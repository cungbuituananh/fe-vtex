import { Form, Select, } from 'antd';
import { HEIGHT_INPUT } from "@/constants/color";

export interface SelectCommonProps {
  name: string;
  label?: string;
  required?: boolean;
  onChange?: (value: any) => void;
  className?: string;
  options: { value: string | number; label: string }[];
  helpText?: string;
}

function SelectCommon({
  name,
  label,
  required = false,
  onChange,
  className,
  options,
  helpText,
  ...rest
}: SelectCommonProps) {
  // Style to make the label display in one line and align properly
  const labelStyle = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  return (
    <Form.Item
      name={name}
      label={label && (
        <span>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </span>
      )}
      required={required}
      help={helpText}
      colon={false}
      labelCol={{ span: 6, style: labelStyle }}
      wrapperCol={{ span: 18 }}
    >
      <Select
        id={name}
        className={className}
        style={{ height: HEIGHT_INPUT }}
        options={options}
        onChange={onChange}
        {...rest}
      />
    </Form.Item>
  );
}

export default SelectCommon;
