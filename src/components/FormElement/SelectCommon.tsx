import { Form, Select } from "antd";

export interface SelectCommonProps {
  name: string;
  label?: string;
  required?: boolean;
  onChange?: (value: any) => void;
  options: { value: string | number; label: string }[];
  helpText?: string;
  fullWidth?: boolean; // Add fullWidth prop
  labelAlign?: "left" | "right"; // Add label alignment prop
  labelCol?: any; // Additional props for Form.Item
  isMultiple?: boolean; // Add isMultiple prop if needed
}

function SelectCommon({
  name,
  label,
  required = false,
  onChange,
  options,
  helpText,
  fullWidth = false,
  labelAlign = "left", // Default label alignment
  labelCol = 6,
  isMultiple = false, // Add isMultiple prop if needed
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
      label={label}
      required={required}
      help={helpText}
      colon={false}
      labelAlign={labelAlign}
      {...(fullWidth
        ? {}
        : {
            labelCol: { span: labelCol, style: labelStyle },
            wrapperCol: { span: 24 - labelCol },
          })}
    >
      <Select
        // id={name}
        // className={className}
        // style={{ minHeight: HEIGHT_INPUT }}
        options={options}
        onChange={onChange}
        placeholder={label ? `Chọn ${label.toLowerCase()}` : "Chọn"}
        mode={isMultiple ? "multiple" : undefined} // Use multiple mode if isMultiple is true
        {...rest}
      />
    </Form.Item>
  );
}

export default SelectCommon;
