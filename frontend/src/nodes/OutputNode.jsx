import BaseNode from "../components/BaseNode";

export default function OutputNode(props) {
  return (
    <BaseNode
      {...props}
      title="Output Node"
      inputs={["input"]}
    >
      <div className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700">
        Result
      </div>
    </BaseNode>
  );
}