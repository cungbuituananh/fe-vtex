import { HEIGHT_INPUT } from "@/constants/color";
import { Form, Input, Progress } from "antd";
import { useState } from "react";

interface PasswordInputProps {
  label: string;
  name: string;
  placeholder?: string;
  rules?: any[];
}

const PasswordInput = ({
  label,
  name,
  placeholder,
  rules,
}: PasswordInputProps) => {
  const [password, setPassword] = useState("");

  const getPasswordStrength = (pwd: string) => {
    let score = 0;
    let feedback = "";

    if (pwd.length >= 8) score += 25;
    if (/[a-z]/.test(pwd)) score += 25;
    if (/[A-Z]/.test(pwd)) score += 25;
    if (/[0-9]/.test(pwd)) score += 25;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 25;

    if (score <= 25) {
      feedback = "Rất yếu";
    } else if (score <= 50) {
      feedback = "Yếu";
    } else if (score <= 75) {
      feedback = "Trung bình";
    } else if (score <= 100) {
      feedback = "Mạnh";
    }

    return { score: Math.min(score, 100), feedback };
  };

  const getProgressColor = (score: number) => {
    if (score <= 25) return "#ff4d4f";
    if (score <= 50) return "#faad14";
    if (score <= 75) return "#1890ff";
    return "#52c41a";
  };

  const strength = getPasswordStrength(password);

  return (
    <Form.Item label={label} name={name} rules={rules}>
      <div>
        <Input.Password
          placeholder={placeholder}
          style={{
            height: `${HEIGHT_INPUT}`,
            borderRadius: "8px",
          }}
          onChange={(e) => setPassword(e.target.value)}
        />
        {password && (
          <div className="mt-2">
            <div className="flex justify-between items-center mt-1">
              <span
                className="text-sm font-medium"
                style={{ color: getProgressColor(strength.score) }}
              >
                Độ mạnh của mật khẩu
              </span>
              <span
                className="text-sm font-medium"
                style={{ color: getProgressColor(strength.score) }}
              >
                {strength.feedback}
              </span>
            </div>
            <Progress
              percent={strength.score}
              strokeColor={getProgressColor(strength.score)}
              showInfo={false}
              steps={5}
              size={[40, 4]}
            />
          </div>
        )}
      </div>
    </Form.Item>
  );
};

export default PasswordInput;
