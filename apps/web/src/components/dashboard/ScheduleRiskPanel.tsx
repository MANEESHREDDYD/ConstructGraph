import React from 'react';
import { Clock } from 'lucide-react';
import { EvidenceBadge } from './EvidenceBadge';

interface ScheduleActivity {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  status: string;
  source_evidence: string[];
}

interface ScheduleRiskPanelProps {
  activities: ScheduleActivity[];
}

export function ScheduleRiskPanel({ activities }: ScheduleRiskPanelProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-orange-400" />
          Schedule Blockers
        </h2>
      </div>
      
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {activities.length === 0 ? (
          <p className="text-slate-500 text-sm text-center py-4">No blocked activities.</p>
        ) : (
          activities.map(act => (
            <div key={act.id} className="bg-slate-950 rounded-lg p-3 border border-slate-800">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-xs font-mono text-slate-500 block">{act.id}</span>
                  <h3 className="font-medium text-slate-200">{act.name}</h3>
                </div>
                <span className={`text-xs px-2 py-1 rounded font-bold uppercase tracking-wider ${act.status === 'Blocked' ? 'bg-red-950/50 text-red-400' : 'bg-amber-950/50 text-amber-400'}`}>
                  {act.status}
                </span>
              </div>
              <div className="text-xs text-slate-400 mb-3">
                {act.start_date} to {act.end_date}
              </div>
              <div className="flex flex-wrap gap-2">
                {act.source_evidence?.map((ev, i) => (
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
