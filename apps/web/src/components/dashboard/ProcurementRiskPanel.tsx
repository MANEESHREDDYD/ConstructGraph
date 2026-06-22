import React from 'react';
import { PackageSearch } from 'lucide-react';
import { EvidenceBadge } from './EvidenceBadge';

interface ProcurementItem {
  id: string;
  name: string;
  supplier: string;
  lead_time_weeks: number;
  required_on_site_date: string;
  forecast_delivery_date: string;
  risk_level: string;
  source_evidence: string[];
}

interface ProcurementRiskPanelProps {
  items: ProcurementItem[];
}

export function ProcurementRiskPanel({ items }: ProcurementRiskPanelProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <PackageSearch className="w-5 h-5 text-purple-400" />
          Procurement Blockers
        </h2>
      </div>
      
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {items.length === 0 ? (
          <p className="text-slate-500 text-sm text-center py-4">No procurement blockers.</p>
        ) : (
          items.map(item => (
            <div key={item.id} className="bg-slate-950 rounded-lg p-3 border border-slate-800">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-slate-200">{item.name}</h3>
                  <span className="text-xs text-slate-500">{item.supplier}</span>
                </div>
                <span className="text-xs px-2 py-1 rounded font-bold uppercase tracking-wider bg-rose-950/50 text-rose-400">
                  {item.lead_time_weeks}w Lead
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-900 p-2 rounded mb-3">
                <div>
                  <span className="text-slate-500 block mb-0.5">Required</span>
                  <span className="text-slate-300 font-medium">{item.required_on_site_date}</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">Forecast</span>
                  <span className="text-rose-400 font-medium">{item.forecast_delivery_date}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {item.source_evidence?.map((ev, i) => (
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
