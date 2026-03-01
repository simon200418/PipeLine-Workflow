import ReactFlow, {
  Controls,
  Background,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";

import "reactflow/dist/style.css";
import TextNode from "./nodes/TextNode";
import InputNode from "./nodes/InputNode";
import OutputNode from "./nodes/OutputNode";
import { submitPipeline } from "./submit";
import "./App.css";
import { useEffect } from "react";
import LLMNode from "./nodes/LLMNode";


const nodeTypes = {
  text: TextNode,
  input: InputNode,
  output: OutputNode,
  llm: LLMNode,
};

const initialNodes = [
  {
    id: "1",
    type: "input",
    position: { x: 50, y: 150 },
    data: {},
  },
  {
    id: "2",
    type: "text",
    position: { x: 300, y: 150 },
    data: {},
  },
  {
    id: "3",
    type: "output",
    position: { x: 600, y: 150 },
    data: {},
  },
];

const initialEdges = [];

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));


  //Update node
  const updateNodeValue = (id, value) => {
  setNodes((nds) =>
    nds.map((node) =>
      node.id === id
        ? { ...node, data: { ...node.data, value } }
        : node
      )
    );
  };

  //Handle pipeline LLM submit
  const handleSubmit = async () => {
  try {
    const result = await submitPipeline(nodes, edges);

    alert(`
      Nodes: ${result.num_nodes}
      Edges: ${result.num_edges}
      Is DAG: ${result.is_dag}
    `);
  } catch (error) {
    alert("Error connecting to backend");
     console.error(error);
  }
};

  // Delete Node
  const deleteNode = (id) => {
  setNodes((nds) => nds.filter((node) => node.id !== id));
  setEdges((eds) =>
    eds.filter(
      (edge) => edge.source !== id && edge.target !== id
      )
    );
  };

      useEffect(() => {
      setNodes((nds) =>
        nds.map((node) => ({
          ...node,
          data: { ...node.data, onDelete: deleteNode ,  onChange: updateNodeValue,
        value: node.data?.value || "",},
        }))
      );
    }, []);


    //Add Note

  const addNode = (type) => {
  const newNode = {
    id: `${Date.now()}`, // unique id
    type,
     position: {
      x: nodes.length * 50,
      y: nodes.length * 50,
    },
    data: {onDelete: deleteNode , onChange: updateNodeValue, value: "",},
  };

  setNodes((nds) => [...nds, newNode]);
};

  // const handleSubmit = () => {
  //   const workflow = {
  //   nodes,
  //   edges,
  // };

  //   console.log(workflow);
  //   alert(JSON.stringify(workflow, null, 2));
  // };

  

  return (
    
    <div className="w-screen h-screen relative">
      <h1>PipeLine Work Flow</h1>
      <div className="flex gap-3 mb-4">
          <button
            onClick={() => addNode("input")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            + Input
          </button>

          <button
            onClick={() => addNode("text")}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg"
          >
            + Text
          </button>

          <button
            onClick={() => addNode("llm")}
            className="px-4 py-2 bg-pink-500 text-white rounded-lg"
          >
            + LLM
          </button>

          <button
            onClick={() => addNode("output")}
            className="px-4 py-2 bg-green-500 text-white rounded-lg"
          >
            + Output
          </button>
        </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodesDraggable={true}
        nodesConnectable={true}
        elementsSelectable={true}
        connectionMode="loose"
        className="bg-gray-50"
        deleteKeyCode={["Backspace", "Delete"]}
        
      >
        <Controls />
        <Background />
      </ReactFlow>

      <button
        onClick={handleSubmit}
        className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}