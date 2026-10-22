import React from 'react';
import { Star, MessageSquare, ShieldCheck, CheckCircle2, User, Award, Tag } from 'lucide-react';

interface OrderRemarksSectionProps {
  orderNumber: string;
  employerName: string;
  workerName?: string;
  employerRemarks?: string;
  employerRating?: number;
  workerRemarks?: string;
  workerRating?: number;
  workerSkillStars?: number;
  status?: 'open' | 'assigned' | 'completed';
  compact?: boolean;
}

export const OrderRemarksSection: React.FC<OrderRemarksSectionProps> = ({
  orderNumber,
  employerName,
  workerName = 'Tariq Mehmood',
  employerRemarks,
  employerRating = 5,
  workerRemarks,
  workerRating = 5,
  workerSkillStars = 5,
  status = 'completed',
  compact = false,
}) => {
  const defaultEmployerReview =
    employerRemarks ||
    'Bohot acha aur tasalli bakhsh kaam kiya. Multimeter aur proper tools k sath time par aye aur tasalli se mukammal kiya.';
  const defaultWorkerReview =
    workerRemarks ||
    'Mohtaram homeowner hain, kaam tasalli se check kiya aur JazzCash se payment foran baghair kisi takheer release ki.';

  const renderStars = (rating: number, max = 5) => {
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }).map((_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i < rating
                ? 'text-amber-400 fill-amber-400'
                : 'text-slate-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const getSkillLabel = (stars: number) => {
    if (stars >= 5) return 'Master Ustad (100% Expert)';
    if (stars === 4) return 'Senior Karigar (Highly Skilled)';
    if (stars === 3) return 'Skilled Helper (Knowledgeable)';
    if (stars === 2) return 'Semi-Skilled Helper';
    return 'Junior Apprentice';
  };

  return (
    <div className="bg-gradient-to-br from-amber-50/80 via-white to-amber-50/50 border border-amber-200/90 rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-2xs">
      {/* Top Header: Order ID tag & Section Title */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-amber-200/70">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-800 flex items-center justify-center font-bold">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm tracking-tight flex items-center gap-2">
              <span>User Remarks &amp; Mutual Feedback</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                Verified
              </span>
            </h4>
            <p className="text-[11px] text-slate-500">
              Clear reviews and associated star ratings recorded for this order
            </p>
          </div>
        </div>

        {/* Visible Order ID Tag */}
        <div className="inline-flex items-center gap-1.5 font-mono text-xs font-black bg-slate-900 text-amber-300 px-3 py-1 rounded-lg shadow-xs border border-slate-700">
          <Tag className="w-3.5 h-3.5 text-amber-400" />
          <span>Order ID: #{orderNumber}</span>
        </div>
      </div>

      {/* Prominent Worker 'Skill Stars' Display */}
      <div className="bg-white/90 border border-amber-200 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2 shadow-2xs">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-600 shrink-0" />
          <span className="font-bold text-slate-800 text-xs">
            Worker Skill Stars (مہارت ریٹنگ):
          </span>
        </div>

        <div className="flex items-center gap-2">
          {renderStars(workerSkillStars)}
          <span className="font-black text-amber-950 text-xs font-mono">
            {workerSkillStars}/5 Stars
          </span>
          <span className="text-[11px] font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
            {getSkillLabel(workerSkillStars)}
          </span>
        </div>
      </div>

      {/* Split Dual Remarks Grid: Employer Review and Worker Remarks */}
      <div className={`grid grid-cols-1 ${compact ? 'gap-2.5' : 'sm:grid-cols-2 gap-3'}`}>
        {/* Card 1: Employer's Review for Worker */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-600 text-xs font-bold">
                <User className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-xs block leading-tight">
                  {employerName}
                </span>
                <span className="text-[10px] text-slate-500">Employer / Homeowner</span>
              </div>
            </div>

            {/* Employer's Star Rating for Worker */}
            <div className="text-right">
              <div className="flex items-center justify-end gap-1">
                {renderStars(employerRating)}
                <span className="font-bold text-slate-800 text-xs font-mono ml-0.5">
                  {employerRating}.0
                </span>
              </div>
              <span className="text-[9px] font-semibold text-amber-700 uppercase">
                Worker Review
              </span>
            </div>
          </div>

          <div className="bg-amber-50/50 p-2.5 rounded-lg border border-amber-100/80 text-xs text-slate-700 italic leading-relaxed">
            "{defaultEmployerReview}"
          </div>
        </div>

        {/* Card 2: Worker's Review for Employer */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-xs block leading-tight">
                  {workerName}
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                  <span>NADRA Verified Karigar</span>
                </span>
              </div>
            </div>

            {/* Worker's Star Rating for Employer */}
            <div className="text-right">
              <div className="flex items-center justify-end gap-1">
                {renderStars(workerRating)}
                <span className="font-bold text-slate-800 text-xs font-mono ml-0.5">
                  {workerRating}.0
                </span>
              </div>
              <span className="text-[9px] font-semibold text-emerald-800 uppercase">
                Employer Rating
              </span>
            </div>
          </div>

          <div className="bg-emerald-50/40 p-2.5 rounded-lg border border-emerald-100/80 text-xs text-slate-700 italic leading-relaxed">
            "{defaultWorkerReview}"
          </div>
        </div>
      </div>
    </div>
  );
};
