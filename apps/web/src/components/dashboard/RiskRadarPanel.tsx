import React from 'react';
import { ShieldAlert, AlertTriangle } from 'lucide-react';
import { EvidenceBadge } from './EvidenceBadge';

interface Risk {
  id: string;
  title: string;
  severity: string;
  probability: string;
  financial_exposure: number;
  schedule_exposure_days: number;
  affected_party: string;
  source_evidence: string[];
  recommended_action: string;
  status: string;
}

interface RiskRadarPanelProps {
  risks: Risk[];
}

export function RiskRadarPanel({ risks }: RiskRadarPanelProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-rose-500" />
          Risk Radar
        </h2>
        <span className="bg-slate-800 text-slate-300 text-xs px-2 py-1 rounded-full font-medium">
          {risks.length} Active
        </span>
      </div>
      
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {risks.length === 0 ? (
          <p className="text-slate-500 text-sm text-center py-4">No active risks detected.</p>
        ) : (
          risks.map(risk => (
            <div key={risk.id} className="bg-slate-950 rounded-lg p-4 border border-slate-800">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-slate-100">{risk.title}</h3>
                <span className={`text-xs px-2 py-1 rounded font-bold uppercase tracking-wider ${risk.severity === 'High' ? 'bg-rose-950/50 text-rose-400 border border-rose-900/50' : 'bg-amber-950/50 text-amber-400 border border-amber-900/50'}`}>
                  {risk.severity} Risk
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                <div>
                  <span className="text-slate-500 block text-xs">Exposure</span>
                  <span className="text-slate-300">${risk.financial_exposure.toLocaleString()} / {risk.schedule_exposure_days}d</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Affected</span>
                  <span className="text-slate-300">{risk.affected_party}</span>
                </div>
              </div>
              
              <div className="mb-3">
                <span className="text-slate-500 block text-xs mb-1">Source Evidence</span>
                <div className="flex flex-wrap gap-2">
                  {risk.source_evidence.map((ev, i) => (
                    <EvidenceBadge key={i} label={ev} />
                  ))}
                </div>
              </div>
              
              <div className="bg-slate-900/50 p-3 rounded border border-slate-800/50 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block mb-0.5">Recommended Action</span>
                  <p className="text-sm text-slate-300">{risk.recommended_action}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
