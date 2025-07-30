// EditorCommon.tsx
import { Form } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface EditorCommonProps {
  name: string;
}

const EditorCommon = ({ name }: EditorCommonProps) => {
  const form = Form.useFormInstance();
  const value = Form.useWatch(name, form);

  const handleChange = (content: string) => {
    form.setFieldValue(name, content);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

  return (
    <div className="rounded-editor">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleChange}
        modules={modules}
        style={{
          height: "200px",
          marginBottom: "42px",
        }}
      />
    </div>
  );
};

export default EditorCommon;
