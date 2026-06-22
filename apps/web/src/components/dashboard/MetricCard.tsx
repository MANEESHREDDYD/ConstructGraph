import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: React.ReactNode;
  alert?: boolean;
}

export function MetricCard({ title, value, subtitle, trend, trendValue, icon, alert }: MetricCardProps) {
  return (
    <div className={`p-5 rounded-xl border ${alert ? 'bg-red-950/20 border-red-900/50' : 'bg-slate-900 border-slate-800'}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-slate-400">{title}</h3>
        {icon && <div className={`p-2 rounded-lg ${alert ? 'bg-red-900/30 text-red-400' : 'bg-slate-800 text-blue-400'}`}>{icon}</div>}
      </div>
      <div className="flex flex-col gap-1">
        <div className={`text-3xl font-bold tracking-tight ${alert ? 'text-red-400' : 'text-slate-100'}`}>
          {value}
        </div>
        {(subtitle || trendValue) && (
          <div className="flex items-center gap-2 text-sm">
            {trendValue && (
              <span className={trend === 'up' ? 'text-rose-400' : trend === 'down' ? 'text-emerald-400' : 'text-slate-400'}>
                {trend === 'up' ? '↑' : trend === 'down' ? '↓' : ''} {trendValue}
              </span>
            )}
            {subtitle && <span className="text-slate-500">{subtitle}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
