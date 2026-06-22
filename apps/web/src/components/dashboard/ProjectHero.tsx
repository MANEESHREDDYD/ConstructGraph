import React from 'react';
import { Activity, ShieldAlert, BadgeCheck } from 'lucide-react';

interface ProjectHeroProps {
  name: string;
  phase: string;
  healthScore: number;
}

export function ProjectHero({ name, phase, healthScore }: ProjectHeroProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-slate-900 border border-slate-800 rounded-xl mb-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <BadgeCheck className="text-blue-400 w-5 h-5" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{phase}</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-1">{name}</h1>
        <p className="text-slate-400">ConstructGraph OS Command Center</p>
      </div>
      
      <div className="mt-4 md:mt-0 flex items-center gap-6">
        <div className="text-right">
          <p className="text-sm font-medium text-slate-400 mb-1">Project Health</p>
          <div className="flex items-center gap-2">
            <span className={`text-4xl font-bold ${healthScore >= 80 ? 'text-emerald-400' : healthScore >= 60 ? 'text-amber-400' : 'text-red-400'}`}>
              {healthScore}
            </span>
            <span className="text-slate-500">/ 100</span>
          </div>
        </div>
        
        <div className={`p-4 rounded-full ${healthScore >= 80 ? 'bg-emerald-900/30 text-emerald-400' : healthScore >= 60 ? 'bg-amber-900/30 text-amber-400' : 'bg-red-900/30 text-red-400'}`}>
          {healthScore >= 80 ? <Activity className="w-8 h-8" /> : <ShieldAlert className="w-8 h-8" />}
        </div>
      </div>
    </div>
  );
}
