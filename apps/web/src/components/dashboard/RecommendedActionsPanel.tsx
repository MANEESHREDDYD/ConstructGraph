import React from 'react';
import { Target } from 'lucide-react';
import { EvidenceBadge } from './EvidenceBadge';

interface RecommendedAction {
  id: string;
  title: string;
  priority: string;
  type: string;
  source_evidence: string[];
}

interface RecommendedActionsPanelProps {
  actions: RecommendedAction[];
}

export function RecommendedActionsPanel({ actions }: RecommendedActionsPanelProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-emerald-400" />
          Top Recommended Actions
        </h2>
      </div>
      
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {actions.length === 0 ? (
          <p className="text-slate-500 text-sm text-center py-4">No actions currently recommended.</p>
        ) : (
          actions.map(action => (
            <div key={action.id} className="bg-slate-950 rounded-lg p-3 border border-slate-800">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-slate-200">{action.title}</h3>
                <span className={`text-xs px-2 py-1 rounded font-bold uppercase tracking-wider shrink-0 ml-2 ${action.priority === 'High' ? 'bg-rose-950/50 text-rose-400' : 'bg-amber-950/50 text-amber-400'}`}>
                  {action.priority}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-xs text-slate-500 bg-slate-900 px-2 py-1 rounded">Type: {action.type}</span>
                {action.source_evidence?.map((ev, i) => (
                  <EvidenceBadge key={i} label={ev} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
