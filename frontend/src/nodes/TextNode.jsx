import { useState, useEffect } from "react";
import BaseNode from "../components/BaseNode";

export default function TextNode(props) {
    const { id, data } = props;
  const [text, setText] = useState(data?.value || "");
  const [variables, setVariables] = useState([]);

  useEffect(() => {
    const matches =
      text.match(/{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g) || [];

    const extracted = matches.map((match) =>
      match.replace(/{{\s*|\s*}}/g, "")
    );

    const uniqueVariables = [...new Set(extracted)];

    setVariables(uniqueVariables);
  }, [text]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setText(newValue);

    // 🔥 Sync immediately to ReactFlow state
    data?.onChange?.(id, newValue);

    // Auto resize
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  return (
    <BaseNode
        {...props}
        title="Text Node"
        inputs={["input", ...variables]}
        outputs={["output"]}
    >
      <textarea
        value={text}
        onChange={handleChange}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        draggable={false}

        placeholder="Type: Hello {{name}}"
        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        style={{ minHeight: "60px" }}
      />
    </BaseNode>
  );
}