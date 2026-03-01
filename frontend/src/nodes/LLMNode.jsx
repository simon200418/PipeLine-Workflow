import { useState } from "react";
import BaseNode from "../components/BaseNode";

export default function LLMNode(props) {
  const { id, data } = props;
  const [output, setOutput] = useState("");

  const processInput = () => {
    const inputValue = data?.value || "";
    const result = inputValue.toUpperCase(); // Mock LLM
    setOutput(result);
    data?.onChange?.(id, result);
  };

  return (
    <BaseNode
      {...props}
      title="LLM Node"
      inputs={["input"]}
      outputs={["output"]}
    >
      <div className="space-y-2">
        <button
          onClick={processInput}
          className="bg-purple-500 text-white px-2 py-1 rounded text-xs"
        >
          Run LLM
        </button>

        <div className="text-xs bg-gray-100 p-2 rounded">
          {output}
        </div>
      </div>
    </BaseNode>
  );
}