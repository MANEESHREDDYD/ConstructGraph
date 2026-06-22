"use client";

import React, { useMemo } from 'react';
import { ReactFlow, MiniMap, Controls, Background, useNodesState, useEdgesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Network } from 'lucide-react';

interface GraphData {
  nodes: { id: string }[];
  edges: { source: string; target: string; relationship: string }[];
}

interface TruthGraphPreviewProps {
  graph: GraphData;
}

export function TruthGraphPreview({ graph }: TruthGraphPreviewProps) {
  // Generate simple layout for nodes
  const initialNodes = useMemo(() => {
    return graph.nodes.map((node, i) => {
      const isEntity = !node.id.includes('Clause') && !node.id.includes('DWG') && !node.id.includes('EV-');
      return {
        id: node.id,
        position: { 
          x: (i % 4) * 150 + Math.random() * 20, 
          y: Math.floor(i / 4) * 100 + Math.random() * 20 
        },
        data: { label: node.id },
        style: {
          background: isEntity ? '#1e293b' : '#0f172a',
          color: '#e2e8f0',
          border: '1px solid #334155',
          borderRadius: '8px',
          fontSize: '12px',
          padding: '10px'
        }
      };
    });
  }, [graph.nodes]);

  const initialEdges = useMemo(() => {
    return graph.edges.map((edge, i) => ({
      id: `e${i}-${edge.source}-${edge.target}`,
      source: edge.source,
      target: edge.target,
      label: edge.relationship,
      animated: true,
      style: { stroke: '#475569' },
      labelStyle: { fill: '#94a3b8', fontSize: 10, fontWeight: 700 }
    }));
  }, [graph.edges]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-full col-span-1 lg:col-span-2">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Network className="w-5 h-5 text-cyan-400" />
          Project Truth Graph Explorer
        </h2>
        <span className="text-xs text-slate-400">Live Relationships</span>
      </div>
      
      <div className="flex-1 w-full h-[400px]">
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          fitView
          proOptions={{ hideAttribution: true }}
          className="bg-slate-950"
        >
          <Background color="#334155" gap={16} />
          <Controls className="bg-slate-800 fill-slate-300 border-slate-700" />
        </ReactFlow>
      </div>
    </div>
  );
}
