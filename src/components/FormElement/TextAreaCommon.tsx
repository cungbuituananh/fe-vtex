import { Form } from "antd";
import { Input } from "antd";
const { TextArea } = Input;

interface TextAreaCommonProps {
  label: string;
  name: string;
  rules?: any[];
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  autoSize?: boolean | { minRows?: number; maxRows?: number };
}
function TextAreaCommon(props: TextAreaCommonProps) {
  const { label, name, rules, disabled = false, placeholder } = props;
  return (
    <Form.Item label={label} name={name} rules={rules}>
      <TextArea
        {...props}
        placeholder={placeholder || `Nhập ${label.toLowerCase()}`}
        disabled={disabled}
      />
    </Form.Item>
  );
}

export default TextAreaCommon;
