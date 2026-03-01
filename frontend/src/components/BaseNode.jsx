import { Handle, Position } from "reactflow";

export default function BaseNode({
  id,
  data,
  title,
  children,
  inputs = [],
  outputs = [],
}){

  return (
    <div className="relative bg-white rounded-2xl shadow-lg border border-gray-300 p-4 min-w-50">
      
        <button
          onClick={() => data?.onDelete?.(id)}
          className="absolute top-1 right-2 text-red-500 text-xs"
        >
          ✕
        </button>

      {/* Title */}
      <div className="text-sm font-semibold text-gray-700 mb-2">
        {title}
      </div>

      {/* Input Handles (Left Side) */}
      {inputs.map((input, index) => (
        <Handle
          key={input}
          type="target"
          position={Position.Left}
          id={input}
          className="w-3 h-3 bg-blue-500!"
          style={{ top: 60 + index * 25 }}
        />
      ))}

      {/* Content */}
      <div className="nodrag text-sm text-gray-600">
        {children}
      </div>

      {/* Output Handles (Right Side) */}
      {outputs.map((output, index) => (
        <Handle
          key={output}
          type="source"
          position={Position.Right}
          id={output}
          className="w-3 h-3 bg-green-500!"
          style={{ top: 60 + index * 25 }}
        />
      ))}
    </div>
  );
}