import React from 'react';
import { CalendarClock } from 'lucide-react';
import { EvidenceBadge } from './EvidenceBadge';

interface Obligation {
  id: string;
  obligation: string;
  due_date: string;
  risk_level: string;
  evidence: string[];
}

interface ObligationDeadlinePanelProps {
  obligations: Obligation[];
}

export function ObligationDeadlinePanel({ obligations }: ObligationDeadlinePanelProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <CalendarClock className="w-5 h-5 text-amber-500" />
          Notice Deadlines
        </h2>
        <span className="bg-slate-800 text-slate-300 text-xs px-2 py-1 rounded-full font-medium">
          {obligations.length} Pending
        </span>
      </div>
      
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {obligations.length === 0 ? (
          <p className="text-slate-500 text-sm text-center py-4">No upcoming deadlines.</p>
        ) : (
          obligations.map(obl => (
            <div key={obl.id} className="bg-slate-950 rounded-lg p-3 border border-slate-800 flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <p className="text-sm text-slate-200 font-medium leading-snug pr-4">{obl.obligation}</p>
                <span className={`shrink-0 text-xs px-2 py-1 rounded font-semibold ${obl.risk_level === 'High' ? 'text-rose-400 bg-rose-950/30' : 'text-amber-400 bg-amber-950/30'}`}>
                  {obl.due_date}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-1">
                {obl.evidence.map((ev, i) => (
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
