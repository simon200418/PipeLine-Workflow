import BaseNode from "../components/BaseNode";

export default function InputNode(props) {

   const { id, data } = props;
  return (
    <BaseNode
    {...props}
      title="Input Node"
      outputs={["output"]}
    >
      <input
  type="text"
  placeholder="Enter input..."
  value={data?.value || ""}
  onChange={(e) =>
    data?.onChange?.(id, e.target.value)
  }
  onClick={(e) => e.stopPropagation()}   // 🔥 VERY IMPORTANT
  onMouseDown={(e) => e.stopPropagation()} // 🔥 ALSO IMPORTANT
  draggable={false}
  className="nodrag w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm 
             focus:outline-none focus:ring-2 focus:ring-blue-400 
             focus:border-transparent transition-all"
/>
    </BaseNode>
  );
}