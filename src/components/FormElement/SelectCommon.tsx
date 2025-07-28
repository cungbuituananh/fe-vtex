import { Form, Select } from "antd";

export interface SelectCommonProps {
  name: any;
  label: string;
  required?: boolean;
  onChange?: (value: any) => void;
  options: { value: string | number; label: string }[];
  helpText?: string;
  fullWidth?: boolean; // Add fullWidth prop
  labelAlign?: "left" | "right"; // Add label alignment prop
  labelCol?: any; // Additional props for Form.Item
  isMultiple?: boolean; // Add isMultiple prop if needed
  children?: React.ReactNode; // Allow children to be passed in
  disabled?: boolean; // Add disabled prop for the select
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
  disabled = false, // Default to not disabled
  isMultiple = false, // Add isMultiple prop if needed
  // children, // Allow children to be passed in
  ...rest
}: SelectCommonProps) {
  // Style to make the label display in one line and align properly

  const labelStyle = {
    whiteSpace: "nowrap",
    // overflow: "hidden",
    textOverflow: "ellipsis",
  };
  // Build rules based on type and required
  const buildRules = () => {
    const baseRules = [];

    if (required) {
      baseRules.push({
        required: true,
        message: `Vui lòng nhập ${label.toLowerCase()}`,
      });
    }

    // Merge custom rules with base rules
    return [...baseRules];
  };

  return (
    <Form.Item
      name={name}
      label={label}
      required={required}
      help={helpText}
      colon={false}
      labelAlign={labelAlign}
      rules={buildRules()}
      {...(fullWidth
        ? {}
        : {
            labelCol: { span: labelCol, style: labelStyle },
            wrapperCol: { span: 24 - labelCol },
          })}
    >
      <Select
        options={options}
        onChange={onChange}
        disabled={disabled} // Use the disabled prop
        placeholder={label ? `Chọn ${label.toLowerCase()}` : "Chọn"}
        mode={isMultiple ? "multiple" : undefined} // Use multiple mode if isMultiple is true
        {...rest}
      />
    </Form.Item>
  );
}

export default SelectCommon;
