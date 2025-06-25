import { Form, Input } from "antd";

interface InputCommonProps {
  label: string;
  name: string;
  rules?: any[];
  disabled?: boolean;
  type?: string;
  placeholder?: string;
  className?: string;
}

function InputCommon(props: InputCommonProps) {
  const {
    label,
    name,
    rules,
    disabled = false,
    type = "text",
    placeholder,
  } = props;
  return (
    <Form.Item label={label} name={name} rules={rules}>
      {type === "password" ? (
        <Input.Password
          style={{
            height: "50px",
          }}
        />
      ) : (
        <Input
          {...props}
          type={type}
          placeholder={placeholder || `Nhập ${label.toLowerCase()}`}
          disabled={disabled}
          style={{
            height: "50px",
          }}
        />
      )}
    </Form.Item>
  );
}

export default InputCommon;
