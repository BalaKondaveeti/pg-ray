// src/App.jsx
import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  applyEdgeChanges,
  applyNodeChanges
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Github, DatabaseZap } from 'lucide-react';

import { parsePlanToGraph } from './utils/parser';
import { parseTextPlan } from './utils/textParser';
import PlanNode from './components/PlanNode';

const nodeTypes = { customPlanNode: PlanNode };

function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState(null);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const handleVisualize = () => {
    setError(null);
    if (!jsonInput.trim()) {
      setError("Please paste your explain output first.");
      return;
    }

    try {
      let rootPlan;
      const trimmedInput = jsonInput.trim();
      const firstChar = trimmedInput[0];

      // STRATEGY 1: JSON Input
      if (firstChar === '{' || firstChar === '[') {
        const raw = JSON.parse(trimmedInput);
        const rootNode = Array.isArray(raw) ? raw[0] : raw;
        if (!rootNode || !rootNode.Plan) {
          throw new Error("JSON valid, but 'Plan' field missing.");
        }
        rootPlan = rootNode.Plan;
      }
      // STRATEGY 2: Text Input
      else {
        // Assume it's text and try to parse it
        rootPlan = parseTextPlan(trimmedInput);
        if (!rootPlan) {
          throw new Error("Could not parse text plan. Ensure it matches standard Postgres format.");
        }
      }

      // Generate Graph
      const { nodes: newNodes, edges: newEdges } = parsePlanToGraph(rootPlan);
      setNodes(newNodes);
      setEdges(newEdges);

    } catch (e) {
      console.error(e);
      setError("Failed to generate graph. " + e.message);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col md:flex-row bg-gray-50">

      {/* Sidebar: Input */}
      <div className="w-full md:w-1/3 p-4 flex flex-col border-r bg-white shadow-sm z-10 h-full">

        {/* Top Section */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Sidebar Title Section */}
          <h1 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
            <div className="p-2 bg-indigo-600 rounded-lg shadow-md">
              {/* The Logo Icon */}
              <DatabaseZap className="text-white w-6 h-6" />
            </div>
            <span>PG-Ray</span>
            <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded ml-auto border border-indigo-200">
              Explain Visualizer
            </span>
          </h1>

          {/* Subtitle / Compatibility Note */}
          <div className="mt-2 mb-4 p-2 bg-gray-50 rounded border border-gray-100">
            <p className="text-xs text-gray-500 leading-relaxed">
              Compatible with <span className="font-semibold text-gray-700">PostgreSQL</span>, <span className="font-semibold text-gray-700">Amazon Redshift</span>, and <span className="font-semibold text-gray-700">CockroachDB</span>.
              <br></br>
              Uses React flow to show beautiful visualizations. Results are not stored (This is a safe webapp 🤝)!
            </p>
          </div>

          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Paste the explain output:
          </label>

          <textarea
            className="flex-1 p-3 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-indigo-500 outline-none resize-none bg-gray-50 mb-2 text-gray-800"
            placeholder='Example: 
Seq Scan on users (cost=0.00..12.00)
  -> Filter: (age > 21)'
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
          />

          {error && (
            <div className="mb-2 p-2 bg-red-50 text-red-600 text-xs rounded border border-red-200">
              {error}
            </div>
          )}

          <button
            onClick={handleVisualize}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-indigo-200"
          >
            Visualize Plan
          </button>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-100 text-center">
          <a
            href="https://github.com/BalaKondaveeti"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors text-sm font-medium"
          >
            <Github size={18} />
            <span>Built by Bala Kondaveeti</span>
          </a>
        </div>

      </div>

      {/* Main: Graph Area */}
      <div className="flex-1 h-full relative">
        {nodes.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <p className="text-lg">No plan loaded</p>
              <p className="text-sm">Paste JSON on the left to get started</p>
            </div>
          </div>
        ) : (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            fitView
            minZoom={0.1}
          >
            <Background gap={12} size={1} />
            <Controls />
          </ReactFlow>
        )}
      </div>
    </div>
  );
}

export default App;