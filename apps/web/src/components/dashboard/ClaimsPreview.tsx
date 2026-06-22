import React from 'react';
import { Scale, CheckCircle2, CircleDashed } from 'lucide-react';
import { EvidenceBadge } from './EvidenceBadge';

interface Claim {
  id: string;
  title: string;
  cost_impact: number;
  schedule_impact_days: number;
  evidence_completeness_score: number;
  missing_evidence_checklist: string[];
  source_evidence: string[];
}

interface ClaimsPreviewProps {
  claims: Claim[];
}

export function ClaimsPreview({ claims }: ClaimsPreviewProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Scale className="w-5 h-5 text-indigo-400" />
          Claims & Variations Lab
        </h2>
      </div>
      
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {claims.length === 0 ? (
          <p className="text-slate-500 text-sm text-center py-4">No active claims.</p>
        ) : (
          claims.map(claim => (
            <div key={claim.id} className="bg-slate-950 rounded-lg p-4 border border-slate-800">
              <h3 className="font-medium text-slate-100 mb-2">{claim.title}</h3>
              
              <div className="flex items-center justify-between mb-3 bg-slate-900 rounded p-2 text-sm">
                <span className="text-slate-400">Impact</span>
                <span className="font-semibold text-slate-200">${claim.cost_impact.toLocaleString()} / {claim.schedule_impact_days}d</span>
              </div>
              
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-400">Evidence Completeness</span>
                  <span className={claim.evidence_completeness_score >= 80 ? 'text-emerald-400' : 'text-amber-400'}>{claim.evidence_completeness_score}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5">
                  <div className={`h-1.5 rounded-full ${claim.evidence_completeness_score >= 80 ? 'bg-emerald-400' : 'bg-amber-400'}`} style={{ width: `${claim.evidence_completeness_score}%` }}></div>
                </div>
              </div>
              
              <div className="space-y-1 mb-3">
                {claim.missing_evidence_checklist.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-amber-400">
                    <CircleDashed className="w-3 h-3 shrink-0" />
                    <span>Missing: {item}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/50">
                {claim.source_evidence?.map((ev, i) => (
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
