import React, { useState } from 'react';
import { Task } from '../types';
import { Star, CheckCircle2, X, MessageSquare, ShieldCheck } from 'lucide-react';

interface OrderReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onSubmitReview: (data: {
    taskId: string;
    employerRemarks: string;
    employerRating: number;
    workerRemarks: string;
    workerRating: number;
  }) => void;
}

export const OrderReviewModal: React.FC<OrderReviewModalProps> = ({
  isOpen,
  onClose,
  task,
  onSubmitReview,
}) => {
  const [employerRating, setEmployerRating] = useState(5);
  const [employerRemarks, setEmployerRemarks] = useState(
    'Bohot acha aur tasalli bakhsh kaam kiya. Multimeter aur proper tools k sath time par aye.'
  );
  const [workerRating, setWorkerRating] = useState(5);
  const [workerRemarks, setWorkerRemarks] = useState(
    'Mohtaram homeowner hain, kaam tasalli se check kiya aur JazzCash se payment foran release ki.'
  );

  if (!isOpen || !task) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitReview({
      taskId: task.id,
      employerRemarks,
      employerRating,
      workerRemarks,
      workerRating,
    });
    onClose();
  };

  const acceptedBid = task.bids.find((b) => b.id === task.acceptedBidId);
  const workerName = acceptedBid?.workerName || 'Tariq Mehmood';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Star className="w-6 h-6 fill-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold tracking-tight">Order Completion &amp; Mutual Remarks</h2>
                <span className="font-mono text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded">
                  Order #{task.orderNumber || 'LH-101'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Release escrow payment and record mutual ratings with stars
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          {/* Order Snapshot */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs space-y-1">
            <div className="flex items-center justify-between font-bold text-slate-900">
              <span>{task.title}</span>
              <span className="font-mono text-emerald-800">Rs. {task.budgetPKR.toLocaleString()}</span>
            </div>
            <div className="text-slate-500 flex items-center justify-between">
              <span>City: {task.city} ({task.area})</span>
              <span>Worker: <strong className="text-slate-800">{workerName}</strong></span>
            </div>
          </div>

          {/* Section 1: Employer Remarks & Stars for Worker */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                <span>1. Employer Remarks for Karigar ({workerName}) *</span>
              </label>
              <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                {employerRating}/5 Stars
              </span>
            </div>

            {/* Clickable Stars */}
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setEmployerRating(star)}
                  className="text-2xl transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                >
                  <span className={star <= employerRating ? 'text-amber-500' : 'text-slate-300'}>★</span>
                </button>
              ))}
              <span className="text-xs font-bold text-slate-700 ml-2">
                {employerRating === 5 && '★★★★★ Excellent (Bohat Umda Kaam)'}
                {employerRating === 4 && '★★★★☆ Good Quality Work'}
                {employerRating === 3 && '★★★☆☆ Satisfactory'}
              </span>
            </div>

            <textarea
              rows={2}
              required
              value={employerRemarks}
              onChange={(e) => setEmployerRemarks(e.target.value)}
              placeholder="Karigar k kaam ki quality, waqt ki pabandi aur aitemaad k baray me remarks likhein..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-none"
            />
          </div>

          {/* Section 2: Worker Remarks & Stars for Employer */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-amber-700" />
                <span>2. Karigar Feedback for Homeowner ({task.postedBy}) *</span>
              </label>
              <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                {workerRating}/5 Stars
              </span>
            </div>

            {/* Clickable Stars */}
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setWorkerRating(star)}
                  className="text-2xl transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                >
                  <span className={star <= workerRating ? 'text-amber-500' : 'text-slate-300'}>★</span>
                </button>
              ))}
              <span className="text-xs font-bold text-slate-700 ml-2">
                {workerRating === 5 && '★★★★★ 5 Star Customer (Prompt Payment)'}
                {workerRating === 4 && '★★★★☆ Polite Homeowner'}
                {workerRating === 3 && '★★★☆☆ Standard Experience'}
              </span>
            </div>

            <textarea
              rows={2}
              required
              value={workerRemarks}
              onChange={(e) => setWorkerRemarks(e.target.value)}
              placeholder="Homeowner k bartao aur payment k baray me feedback likhein..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-600 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            <span>Submit Mutual Remarks &amp; Release Escrow</span>
          </button>
        </form>
      </div>
    </div>
  );
};
