"use client";

import React, { useEffect, useState } from 'react';
import { DollarSign, Clock, AlertTriangle, FileText } from 'lucide-react';
import { ProjectHero } from '@/components/dashboard/ProjectHero';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { RiskRadarPanel } from '@/components/dashboard/RiskRadarPanel';
import { ObligationDeadlinePanel } from '@/components/dashboard/ObligationDeadlinePanel';
import { ClaimsPreview } from '@/components/dashboard/ClaimsPreview';
import { ScheduleRiskPanel } from '@/components/dashboard/ScheduleRiskPanel';
import { ProcurementRiskPanel } from '@/components/dashboard/ProcurementRiskPanel';
import { RecommendedActionsPanel } from '@/components/dashboard/RecommendedActionsPanel';
import { EvidenceCompletenessPanel } from '@/components/dashboard/EvidenceCompletenessPanel';
import { TruthGraphPreview } from '@/components/dashboard/TruthGraphPreview';

export default function CommandCenter() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/demo/command-center')
      .then(res => res.json())
      .then(json => {
        if (json.error) throw new Error(json.message);
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch from API, falling back to local adapter if possible", err);
        setError("Failed to connect to ConstructGraph API. Ensure backend is running.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="animate-pulse text-blue-400 font-medium">Initializing Command Center...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6">
        <div className="bg-red-950/30 border border-red-900/50 p-6 rounded-xl max-w-md text-center">
          <AlertTriangle className="w-10 h-10 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Connection Error</h2>
          <p className="text-slate-400 text-sm mb-4">{error}</p>
          <p className="text-xs text-slate-500">Run `uvicorn app.main:app --reload` in `apps/api`.</p>
        </div>
      </div>
    );
  }

  const { project, metrics, risks, obligations, claims, schedule_blockers, procurement_blockers, recommended_actions, graph } = data;

  return (
    <main className="min-h-screen bg-slate-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <ProjectHero 
          name={project.name} 
          phase={project.phase} 
          healthScore={project.health_score} 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard 
            title="Total Cost Exposure" 
            value={`$${project.cost_exposure.toLocaleString()}`} 
            icon={<DollarSign />} 
            alert={project.cost_exposure > 100000}
          />
          <MetricCard 
            title="Schedule Exposure" 
            value={`${project.schedule_exposure_days} Days`} 
            icon={<Clock />} 
            alert={project.schedule_exposure_days > 7}
          />
          <MetricCard 
            title="Open RFIs" 
            value={metrics.open_rfis} 
            subtitle="2 blocking critical path"
            icon={<FileText />} 
          />
          <MetricCard 
            title="Overdue Submittals" 
            value={metrics.overdue_submittals} 
            icon={<AlertTriangle />} 
            alert={metrics.overdue_submittals > 0}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-1 lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[400px]">
              <RiskRadarPanel risks={risks} />
              <RecommendedActionsPanel actions={recommended_actions} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[350px]">
              <ScheduleRiskPanel activities={schedule_blockers} />
              <ProcurementRiskPanel items={procurement_blockers} />
            </div>

            <TruthGraphPreview graph={graph} />
          </div>
          
          <div className="col-span-1 space-y-6">
            <div className="h-[250px]">
              <EvidenceCompletenessPanel score={project.evidence_completeness_score} />
            </div>
            <div className="h-[350px]">
              <ObligationDeadlinePanel obligations={obligations} />
            </div>
            <div className="h-[400px]">
              <ClaimsPreview claims={claims} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
