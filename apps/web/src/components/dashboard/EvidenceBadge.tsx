import React from 'react';
import { FileText, Link2 } from 'lucide-react';

interface EvidenceBadgeProps {
  label: string;
}

export function EvidenceBadge({ label }: EvidenceBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 transition-colors cursor-pointer">
      <FileText className="w-3 h-3 text-blue-400" />
      {label}
      <Link2 className="w-3 h-3 opacity-50 ml-0.5" />
    </span>
  );
}
