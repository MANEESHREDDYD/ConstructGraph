import React from 'react';
import { Database } from 'lucide-react';

interface EvidenceCompletenessPanelProps {
  score: number;
}

export function EvidenceCompletenessPanel({ score }: EvidenceCompletenessPanelProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Database className="w-5 h-5 text-indigo-400" />
          Evidence Locker Status
        </h2>
      </div>
      
      <div className="flex-1 flex flex-col justify-center items-center p-6">
        <div className="relative w-32 h-32 flex items-center justify-center mb-4">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="58"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              className="text-slate-800"
            />
            <circle
              cx="64"
              cy="64"
              r="58"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={58 * 2 * Math.PI}
              strokeDashoffset={58 * 2 * Math.PI * (1 - score / 100)}
              className={score >= 80 ? 'text-emerald-400' : 'text-amber-400'}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-3xl font-bold text-white">{score}%</span>
          </div>
        </div>
        <p className="text-slate-400 text-sm text-center">
          of identified risks and claims are fully supported by source evidence.
        </p>
      </div>
    </div>
  );
}
