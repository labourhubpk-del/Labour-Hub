import React, { useState } from 'react';
import { Task, Bid } from '../types';
import { Gavel, ShieldCheck, Sparkles, X, Check, Clock } from 'lucide-react';

interface PlaceBidModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onBidSubmitted: (bid: Bid) => void;
  isCNICVerified: boolean;
  isPro: boolean;
  onOpenVerification: () => void;
  onOpenProClub: () => void;
}

export const PlaceBidModal: React.FC<PlaceBidModalProps> = ({
  isOpen,
  onClose,
  task,
  onBidSubmitted,
  isCNICVerified,
  isPro,
  onOpenVerification,
  onOpenProClub,
}) => {
  const [bidAmountPKR, setBidAmountPKR] = useState(task ? task.budgetPKR : 2500);
  const [estimatedHours, setEstimatedHours] = useState('1.5 Hours');
  const [workerPhone, setWorkerPhone] = useState('0300-8472910');
  const [skillStars, setSkillStars] = useState(5);
  const [proposal, setProposal] = useState('Salam bhai, main available hoon aur mukammal tools sath le kar 30 minute me pohnch jaon ga. Tasalli bakhsh kaam ki guarantee.');
  const [hasTools, setHasTools] = useState(true);

  if (!isOpen || !task) return null;

  // Starting Pro Free perk: 0% platform fee for launch
  const isFreeProActive = isPro || true;
  const commissionRate = isFreeProActive ? 0 : 0.10;
  const commissionFee = Math.round(bidAmountPKR * commissionRate);
  const takeHomePay = bidAmountPKR - commissionFee;

  const quickProposalTemplates = [
    'Salam! Main isi area k pas hoon. Complete modern tools sath hain, 30 mins me pohnch sakta hoon.',
    '12 saal ka tajurba hai, pehle kaam check karain phr payment karain. Guarantee work.',
    'Assalam o Alaikum, Schneider/PPRC genuine fittings mere pas bike me mojood hain.',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newBid: Bid = {
      id: `bid-${Date.now()}`,
      taskId: task.id,
      orderNumber: task.orderNumber || 'LH-101',
      workerName: 'Tariq Mehmood',
      workerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      workerTrade: task.category,
      isCNICVerified,
      isPro: true,
      rating: 4.9,
      completedJobs: 84,
      amountPKR: Number(bidAmountPKR),
      estimatedHours,
      proposal,
      hasOwnTools: hasTools,
      workerPhone,
      skillStars,
      createdAt: 'Just now',
      status: 'pending',
    };

    onBidSubmitted(newBid);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Gavel className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold tracking-tight">Place Live Bid on Task</h2>
                <span className="font-mono text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded">
                  Order #{task.orderNumber || 'LH-101'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Direct quote to employer with verified credentials
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Task Summary Banner */}
        <div className="bg-slate-50 border-b border-slate-200 p-4 text-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-slate-900 bg-slate-200 px-2 py-0.5 rounded text-[11px]">
                Order #{task.orderNumber || 'LH-101'}
              </span>
              <span>
                {task.city} · {task.area}
              </span>
            </div>
            <span className="font-semibold text-slate-700">Urgency: {task.urgency}</span>
          </div>
          <h3 className="font-bold text-slate-900 text-sm">{task.title}</h3>
          <div className="flex items-center justify-between text-slate-600 pt-1">
            <span>Posted by {task.postedBy}</span>
            <span>
              Employer Budget:{' '}
              <strong className="text-emerald-800 font-mono text-sm">
                Rs. {task.budgetPKR.toLocaleString()}
              </strong>
            </span>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          {/* CNIC Verification Warning if not verified */}
          {!isCNICVerified && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  Employers prefer verified CNICs. Get your green shield now!
                </span>
              </div>
              <button
                type="button"
                onClick={onOpenVerification}
                className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded text-[11px] cursor-pointer whitespace-nowrap"
              >
                Verify CNIC
              </button>
            </div>
          )}

          {/* Worker Direct Mobile Number (Mandatory) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
              <span>Aapka Mobile Number (Employer direct call karega) *</span>
              <span className="text-[10px] text-emerald-800 bg-emerald-100 font-semibold px-2 py-0.5 rounded">
                Direct Contact
              </span>
            </label>
            <input
              type="tel"
              required
              value={workerPhone}
              onChange={(e) => setWorkerPhone(e.target.value)}
              placeholder="0300-1234567"
              className="w-full font-mono px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-600 focus:outline-none"
            />
          </div>

          {/* Labour Self-Declared Professional Skill Rating (Requested: Labour apni skill ko star k sath btany k vo ktna profeshinal ha is kaam ma) */}
          <div className="bg-amber-50/70 border border-amber-300 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-amber-950">
                Aap is kaam me kitne professional hain? (Labour Skill Rating) *
              </label>
              <span className="text-xs font-extrabold text-amber-950 bg-amber-200/90 px-2.5 py-0.5 rounded border border-amber-300">
                {skillStars}/5 Stars
              </span>
            </div>
            <p className="text-[11px] text-amber-900 leading-relaxed">
              Customer ko order card pr aapki yeh star rating dikhayi jaey gi taakay vo aapka tajurba jaan sakay:
            </p>

            {/* Clickable 5-Star Row */}
            <div className="flex items-center gap-2 pt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setSkillStars(star)}
                  className="text-2xl transition-transform hover:scale-125 focus:outline-none cursor-pointer p-0.5"
                  title={`${star} Star`}
                >
                  <span className={star <= skillStars ? 'text-amber-500 font-bold' : 'text-slate-300'}>
                    ★
                  </span>
                </button>
              ))}
              <span className="text-xs font-extrabold text-amber-950 ml-2">
                {skillStars === 5 && '★★★★★ Master Ustad (100% Expert)'}
                {skillStars === 4 && '★★★★☆ Senior Karigar (Highly Experienced)'}
                {skillStars === 3 && '★★★☆☆ Skilled Helper (Proper Knowledge)'}
                {skillStars === 2 && '★★☆☆☆ Semi-Skilled'}
                {skillStars === 1 && '★☆☆☆☆ Basic Learner'}
              </span>
            </div>
          </div>

          {/* Bid Amount Field & Commission Breakdown */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Your Proposed Bid (PKR) — آپکی پیشکش
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-500">Rs.</span>
              <input
                type="number"
                min={500}
                step={50}
                required
                value={bidAmountPKR}
                onChange={(e) => setBidAmountPKR(Number(e.target.value))}
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-base font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-600 focus:outline-none"
              />
            </div>

            {/* Starting Pro Free Payout Breakdown */}
            <div className="mt-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-600">
                <span>Proposed Bid Amount:</span>
                <span className="font-mono font-semibold">Rs. {bidAmountPKR.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span className="flex items-center gap-1.5">
                  Platform Commission:
                  <span className="text-[10px] bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded border border-emerald-300">
                    Starting Pro Free (0% Fee)
                  </span>
                </span>
                <span className="font-mono font-bold text-emerald-800">
                  Rs. 0 (Free Launch Benefit)
                </span>
              </div>
              <div className="border-t border-slate-200 pt-1.5 flex justify-between font-bold text-slate-900">
                <span>Aapko Milega (Take Home Payout):</span>
                <span className="font-mono text-emerald-800 text-base">
                  Rs. {bidAmountPKR.toLocaleString()}
                </span>
              </div>
              <p className="text-[11px] text-emerald-800 pt-1 font-semibold">
                ✓ Starting Pro Free active for all Karigars (0% fee on your first 30 bids).
              </p>
            </div>
          </div>

          {/* Estimated Completion Time */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>Kitni Dair Me Kaam Mukammal Ho Ga? (Estimated Time)</span>
            </label>
            <select
              value={estimatedHours}
              onChange={(e) => setEstimatedHours(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-600 focus:outline-none cursor-pointer"
            >
              <option value="30 Minutes (Immediate Arrival)">30 Minutes (Immediate Arrival)</option>
              <option value="1 Hour">1 Hour</option>
              <option value="1.5 to 2 Hours">1.5 to 2 Hours</option>
              <option value="Half Day (3-4 Hours)">Half Day (3-4 Hours)</option>
              <option value="Full Day Job">Full Day Job</option>
            </select>
          </div>

          {/* Quick Proposal Templates */}
          <div>
            <div className="text-xs font-semibold text-slate-700 mb-1.5">
              Proposal Message (پیغام):
            </div>
            <div className="flex flex-col gap-1.5 mb-2">
              {quickProposalTemplates.map((text, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setProposal(text)}
                  className="text-left text-[11px] text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 p-2 rounded border border-slate-200 transition-colors cursor-pointer"
                >
                  "{text}"
                </button>
              ))}
            </div>
            <textarea
              rows={2}
              required
              value={proposal}
              onChange={(e) => setProposal(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-600 focus:outline-none"
            />
          </div>

          {/* Tools Checkbox */}
          <div
            onClick={() => setHasTools(!hasTools)}
            className="flex items-center gap-2.5 p-3 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer"
          >
            <div
              className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${
                hasTools ? 'bg-emerald-800 text-white' : 'border border-slate-300 bg-white'
              }`}
            >
              {hasTools && <Check className="w-3 h-3" />}
            </div>
            <span className="text-xs text-slate-800 font-medium">
              Mere paas kaam k tamam zaroori auzaar (tools) aur safety kit mojood hai.
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Gavel className="w-4 h-4" />
            <span>Submit Live Bid (Rs. {bidAmountPKR.toLocaleString()})</span>
          </button>
        </form>
      </div>
    </div>
  );
};
