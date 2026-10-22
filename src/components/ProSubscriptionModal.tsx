import React from 'react';
import { Sparkles, Check, Zap, Award, X, ShieldCheck } from 'lucide-react';

interface ProSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgradeSuccess: () => void;
  isPro: boolean;
}

export const ProSubscriptionModal: React.FC<ProSubscriptionModalProps> = ({
  isOpen,
  onClose,
  onUpgradeSuccess,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header with Emerald/Gold Theme */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-950 text-white p-6 relative overflow-hidden">
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-extrabold tracking-tight">Starting Pro Free</h2>
                  <span className="bg-amber-400 text-amber-950 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    سب کے لیے مفت
                  </span>
                </div>
                <p className="text-xs text-emerald-200 mt-0.5">
                  Launch Privilege · 0% Platform Commission · 30 Free Bids Limit
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-emerald-200 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-emerald-950">
                Mubarak Ho! Starting Pro Free Is Active for All Karigars
              </h3>
              <p className="text-xs text-emerald-900 mt-0.5 leading-relaxed">
                LabourHub.pk par kisi bhi karigar se shuru me koi fees ya subscription charge nahi ki ja rahi. Tamam verified workers ko <strong>Starting Pro Free Limit (30 Free Bids)</strong> ba-aikhtiar di ja rahi hai.
              </p>
            </div>
          </div>

          {/* Current Pro Status Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 font-bold">
                  <Zap className="w-4 h-4 text-amber-600" />
                </div>
                <span className="font-extrabold text-sm text-slate-900">
                  Starting Pro Free Tier
                </span>
              </div>
              <span className="bg-emerald-100 text-emerald-900 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-300">
                ACTIVE &amp; FREE
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 block text-[11px]">Free Bids Limit:</span>
                <span className="font-mono text-base font-extrabold text-slate-900">30 Free Bids</span>
                <span className="text-[10px] text-emerald-700 block mt-0.5 font-semibold">28 Remaining in Quota</span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 block text-[11px]">Platform Commission:</span>
                <span className="font-mono text-base font-extrabold text-emerald-700">0% (Zero Fee)</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Keep 100% of your earnings</span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 block text-[11px]">Feed Visibility:</span>
                <span className="font-extrabold text-amber-800">Priority Placement</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Top of employer bidding ticker</span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 block text-[11px]">Identity Badge:</span>
                <span className="font-extrabold text-emerald-800">Verified Pro Karigar</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Gold badge on all bids</span>
              </div>
            </div>
          </div>

          {/* Key Advantages Checklist */}
          <div className="space-y-2 text-xs">
            <div className="font-bold text-slate-800">Starting Pro Free Includes:</div>
            <ul className="space-y-1.5 text-slate-600">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero advance fees or deposit required to bid on local jobs.</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Direct customer phone connection with zero middleman commission.</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Strict city routing: Homeowners in your city see your bids immediately.</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => {
              onUpgradeSuccess();
              onClose();
            }}
            className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4 text-emerald-300" />
            <span>Continue with Starting Pro Free</span>
          </button>
        </div>
      </div>
    </div>
  );
};
