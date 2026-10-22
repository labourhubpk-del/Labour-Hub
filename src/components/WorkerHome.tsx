import React, { useState } from 'react';
import { Task, TradeCategory, PakistanCity, Bid } from '../types';
import { CATEGORIES, CITIES } from '../data/mockData';
import { OrderRemarksSection } from './OrderRemarksSection';
import {
  Gavel,
  ShieldCheck,
  Sparkles,
  MapPin,
  Clock,
  Flame,
  Wallet,
  ArrowUpRight,
  CheckCircle2,
  Phone,
  MessageCircle,
  Tag,
  Award,
  Star,
} from 'lucide-react';

interface WorkerHomeProps {
  tasks: Task[];
  selectedCity: PakistanCity;
  onCityChange: (city: PakistanCity) => void;
  selectedCategory: TradeCategory | 'All';
  onCategorySelect: (cat: TradeCategory | 'All') => void;
  onOpenBidModal: (task: Task) => void;
  onOpenVerification: () => void;
  onOpenProClub: () => void;
  isCNICVerified: boolean;
  isPro: boolean;
  walletBalancePKR: number;
  streakDays: number;
  onContactEmployer?: (employerName: string, phone: string, taskTitle: string) => void;
  onQuickPostDemoTask?: (city: PakistanCity) => void;
}

export const WorkerHome: React.FC<WorkerHomeProps> = ({
  tasks,
  selectedCity,
  onCityChange,
  selectedCategory,
  onCategorySelect,
  onOpenBidModal,
  onOpenVerification,
  onOpenProClub,
  isCNICVerified,
  isPro,
  walletBalancePKR,
  streakDays,
  onContactEmployer,
  onQuickPostDemoTask,
}) => {
  const [workerTab, setWorkerTab] = useState<'feed' | 'my-bids'>('feed');
  const [withdrawalSuccess, setWithdrawalSuccess] = useState(false);

  // Strict City Matching Rule: Whichever city an order comes from, only workers in that city see it
  const workerCity = selectedCity === 'All Pakistan' ? 'Lahore' : selectedCity;

  // Filter tasks strictly by the worker's city
  const openTasks = tasks.filter((t) => {
    const matchesCity = t.city === workerCity;
    const matchesCat = selectedCategory === 'All' || t.category === selectedCategory;
    return matchesCity && matchesCat;
  });

  // Collect worker's own submitted bids
  const mySubmittedBids: { task: Task; bid: Bid }[] = [];
  tasks.forEach((t) => {
    t.bids.forEach((b) => {
      if (b.workerName === 'Tariq Mehmood') {
        mySubmittedBids.push({ task: t, bid: b });
      }
    });
  });

  const handleSimulateWithdrawal = () => {
    setWithdrawalSuccess(true);
    setTimeout(() => setWithdrawalSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Worker Stats & Gamification Ribbon */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          {/* Identity & CNIC Status */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Worker Profile:</span>
              <span className="font-bold text-white text-sm">Tariq Mehmood</span>
            </div>
            <div className="flex items-center gap-2 pt-1">
              {isCNICVerified ? (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-1 rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold">NADRA CNIC Verified</span>
                </div>
              ) : (
                <button
                  onClick={onOpenVerification}
                  className="flex items-center gap-1.5 text-xs text-amber-300 bg-amber-950/60 border border-amber-500/40 px-2.5 py-1 rounded-lg hover:bg-amber-900/60 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span className="font-semibold">Verify CNIC (+4.8x Bids)</span>
                </button>
              )}
            </div>
          </div>

          {/* Membership Tier: Starting Pro Free Quota */}
          <div className="space-y-1">
            <div className="text-xs text-slate-400">Platform Commission:</div>
            <div className="flex items-center gap-2 pt-0.5">
              <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-bold bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-1 rounded-lg">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Starting Pro Free (0% Fee)</span>
              </div>
            </div>
            <p className="text-[10px] text-emerald-300 font-medium pt-0.5">
              Launch Limit: 30 Free Bids Quota for All Karigars
            </p>
          </div>

          {/* Gamification Streak & Performance */}
          <div className="space-y-1">
            <div className="text-xs text-slate-400">Daily Activity Streak:</div>
            <div className="flex items-center gap-2 pt-0.5">
              <div className="flex items-center gap-1 text-sm font-extrabold text-orange-400 bg-orange-950/50 border border-orange-500/30 px-2.5 py-1 rounded-lg">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                <span>{streakDays} Days Streak</span>
              </div>
              <span className="text-xs text-slate-400">★ 4.95 Rating</span>
            </div>
          </div>

          {/* Available Wallet Balance */}
          <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700 space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Wallet className="w-3.5 h-3.5" />
                Available Wallet
              </span>
              <span className="text-[10px] text-emerald-400">Instant</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-lg font-bold text-emerald-400">
                Rs. {walletBalancePKR.toLocaleString()}
              </span>
              <button
                onClick={handleSimulateWithdrawal}
                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[11px] rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>JazzCash Payout</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
            {withdrawalSuccess && (
              <p className="text-[10px] text-emerald-300 animate-fadeIn font-medium">
                Dispatched to JazzCash 0300-8472910 ✓
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Sub-tabs: Live Tasks Feed vs My Placed Bids */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setWorkerTab('feed')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              workerTab === 'feed'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 bg-slate-100'
            }`}
          >
            Live Task Opportunities ({openTasks.length})
          </button>
          <button
            onClick={() => setWorkerTab('my-bids')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              workerTab === 'my-bids'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 bg-slate-100'
            }`}
          >
            My Placed Bids ({mySubmittedBids.length})
          </button>
        </div>

        {/* Quick Category filter chip strip */}
        <div className="hidden md:flex items-center gap-1.5 overflow-x-auto text-xs text-slate-600">
          <span className="text-slate-400 text-[11px]">Skill:</span>
          <button
            onClick={() => onCategorySelect('All')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium cursor-pointer ${
              selectedCategory === 'All' ? 'bg-slate-900 text-white' : 'hover:bg-slate-100'
            }`}
          >
            All
          </button>
          {CATEGORIES.slice(0, 5).map((cat) => (
            <button
              key={cat.name}
              onClick={() => onCategorySelect(selectedCategory === cat.name ? 'All' : cat.name)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.name ? 'bg-slate-900 text-white' : 'hover:bg-slate-100'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* View 1: Live Task Feed */}
      {workerTab === 'feed' && (
        <div className="space-y-4">
          {/* Strict City Dispatch Notice (Requested: jis city sy order ay usi city ma labour ko dikhaya jay) */}
          <div className="bg-emerald-950 text-white rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-emerald-800 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-800 flex items-center justify-center text-emerald-300 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white">
                    Showing Tasks In: <span className="text-emerald-300 font-extrabold">{workerCity}</span>
                  </span>
                  <span className="bg-emerald-800 text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded">
                    Strict City Match ✓
                  </span>
                </div>
                <p className="text-[11px] text-emerald-200 mt-0.5">
                  Order jis city sy aya hai sirf usi city k workers ko dikhaya ja raha hai (Tasks outside {workerCity} are hidden).
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-xs text-emerald-300 whitespace-nowrap">Your Working City:</span>
              <select
                value={workerCity}
                onChange={(e) => onCityChange(e.target.value as PakistanCity)}
                className="bg-emerald-900 border border-emerald-700 text-white font-semibold py-1.5 px-3 rounded-lg text-xs focus:ring-2 focus:ring-emerald-400 focus:outline-none cursor-pointer"
              >
                {CITIES.filter((c) => c !== 'All Pakistan').map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              Active open jobs in <strong className="text-slate-800">{workerCity}</strong>: <strong className="text-emerald-800 font-bold">{openTasks.length}</strong>
            </span>
            <span>
              Commission on winning: <strong className="text-emerald-800 font-semibold">0% (Starting Pro Free Active)</strong>
            </span>
          </div>

          {openTasks.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 space-y-3 p-6">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                <MapPin className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900">
                Abhi {workerCity} me koi naya task post nahi hua.
              </h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                <strong>Strict Rule:</strong> Jis city sy order ata hai sirf usi city k labour ko dikhaya jata hai. Agar aap doosray shehar k tasks dekhna chahte hain to shehar tabdeel karein ya foran demo task post kar k check karein.
              </p>
              {onQuickPostDemoTask && (
                <div className="pt-2">
                  <button
                    onClick={() => onQuickPostDemoTask(workerCity)}
                    className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>+ Quick Test: Post a Demo Order in {workerCity}</span>
                  </button>
                </div>
              )}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <span className="text-[11px] text-slate-400 w-full">Or switch to another city:</span>
                {['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta', 'Gujranwala'].map((c) => (
                  <button
                    key={c}
                    onClick={() => onCityChange(c as PakistanCity)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                      workerCity === c
                        ? 'bg-emerald-800 text-white border-emerald-800'
                        : 'bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border-slate-200'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {openTasks.map((task) => {
                const hasBid = task.bids.some((b) => b.workerName === 'Tariq Mehmood');
                const isAssigned = !!task.acceptedBidId;

                return (
                  <div
                    key={task.id}
                    className={`bg-white rounded-2xl border p-5 flex flex-col justify-between transition-all hover:shadow-md ${
                      task.isFeatured
                        ? 'border-amber-400 ring-1 ring-amber-200'
                        : 'border-slate-200'
                    }`}
                  >
                    <div className="space-y-3">
                      {/* Top Row: Category, Urgency, Budget, Order ID & Skill Stars */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2">
                            {/* Visible Order ID Tag */}
                            <span className="font-mono font-black text-xs bg-slate-900 text-amber-300 px-3 py-1 rounded-lg shadow-xs tracking-wider border border-slate-700 inline-flex items-center gap-1.5">
                              <Tag className="w-3.5 h-3.5 text-amber-400" />
                              <span>Order ID: #{task.orderNumber || 'LH-101'}</span>
                            </span>

                            {/* Skill Stars Display for Worker Ratings */}
                            <span className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-300 text-amber-950 font-bold px-2.5 py-1 rounded-lg text-xs shadow-2xs">
                              <Award className="w-3.5 h-3.5 text-amber-600" />
                              <span className="text-slate-700">Skill Stars:</span>
                              <span className="text-amber-500 font-black tracking-wider">
                                {'★'.repeat(task.bids[0]?.skillStars || 5)}
                              </span>
                              <span className="font-extrabold text-amber-950 text-[11px]">
                                ({task.bids[0]?.skillStars || 5}/5 Stars Target)
                              </span>
                            </span>

                            {task.isFeatured && (
                              <span className="bg-amber-100 text-amber-950 font-bold text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
                                <Sparkles className="w-3 h-3 text-amber-600" />
                                URGENT PIN
                              </span>
                            )}
                            <span className="text-xs font-semibold text-emerald-800">
                              {task.category}
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-slate-900 leading-snug">
                            {task.title}
                          </h3>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="font-mono text-lg font-extrabold text-slate-900">
                            Rs. {task.budgetPKR.toLocaleString()}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {task.isFixedBudget ? 'Fixed Budget' : 'Open to Bids'}
                          </div>
                        </div>
                      </div>

                      {/* Urdu Prompt */}
                      {task.urduTitle && (
                        <p className="text-xs text-emerald-900 font-medium">
                          {task.urduTitle}
                        </p>
                      )}

                      {/* Description */}
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {task.description}
                      </p>

                      {/* Section for User Remarks & Feedback if available */}
                      {(task.employerRemarks || task.workerRemarks || task.status === 'completed') && (
                        <OrderRemarksSection
                          orderNumber={task.orderNumber || 'LH-101'}
                          employerName={task.postedBy}
                          workerName="Tariq Mehmood"
                          employerRemarks={task.employerRemarks}
                          employerRating={task.employerRating || 5}
                          workerRemarks={task.workerRemarks}
                          workerRating={task.workerRating || 5}
                          workerSkillStars={task.bids[0]?.skillStars || 5}
                          status={task.status}
                          compact
                        />
                      )}

                      {/* Meta info */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                        <span className="flex items-center gap-1 font-semibold text-emerald-900">
                          <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                          {task.city} ({task.area})
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {task.postedAt}
                        </span>
                        <span>·</span>
                        <span className="font-medium text-amber-700">{task.urgency}</span>
                      </div>
                    </div>

                    {/* Actions Row */}
                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        <strong className="text-slate-800 font-bold">{task.bids.length}</strong> bids received
                      </span>

                      {isAssigned ? (
                        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
                          Job Assigned
                        </span>
                      ) : hasBid ? (
                        <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Bid Submitted
                        </span>
                      ) : (
                        <button
                          onClick={() => onOpenBidModal(task)}
                          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                        >
                          <Gavel className="w-3.5 h-3.5" />
                          <span>Place Bid (بولی لگائیں)</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* View 2: My Placed Bids */}
      {workerTab === 'my-bids' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900">
            My Submitted Proposals &amp; Bids
          </h3>

          {mySubmittedBids.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 space-y-2">
              <Gavel className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-700">You haven't placed any bids yet.</p>
              <p className="text-xs text-slate-500">
                Browse open tasks above and submit competitive quotes to start earning!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {mySubmittedBids.map(({ task, bid }) => {
                const isAccepted = task.acceptedBidId === bid.id;
                return (
                  <div
                    key={bid.id}
                    className={`bg-white rounded-2xl border p-5 transition-all ${
                      isAccepted
                        ? 'border-emerald-500 ring-2 ring-emerald-200 shadow-md'
                        : 'border-slate-200 shadow-sm'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          {/* Visible Order ID Tag */}
                          <span className="font-mono font-black text-xs bg-slate-900 text-amber-300 px-3 py-1 rounded-lg shadow-xs tracking-wider border border-slate-700 inline-flex items-center gap-1.5">
                            <Tag className="w-3.5 h-3.5 text-amber-400" />
                            <span>Order ID: #{task.orderNumber || 'LH-101'}</span>
                          </span>
                          <span className="text-xs font-semibold text-emerald-800">
                            {task.category}
                          </span>
                          <span className="text-slate-300">·</span>
                          <span className="text-xs text-slate-500">
                            {task.city} ({task.area})
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-base mt-1">{task.title}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Employer: <strong className="text-slate-700">{task.postedBy}</strong>
                        </p>
                      </div>

                      <div className="text-right">
                        <div className="font-mono text-lg font-extrabold text-emerald-800">
                          Rs. {bid.amountPKR.toLocaleString()}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Your Quote (Est: {bid.estimatedHours})
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 p-3 bg-slate-50 rounded-xl text-xs text-slate-700 border border-slate-100 space-y-2">
                      <div>
                        <strong>Your Proposal:</strong> "{bid.proposal}"
                      </div>

                      {/* Prominent Worker 'Skill Stars' Display */}
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs bg-gradient-to-r from-amber-50 to-amber-100/60 border border-amber-300 px-3.5 py-2 rounded-lg shadow-2xs">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-amber-600 shrink-0" />
                          <span className="font-bold text-slate-800">
                            Skill Stars (Worker Skill Rating):
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-amber-500 font-black tracking-widest text-sm">
                            {'★'.repeat(bid.skillStars || 5)}{'☆'.repeat(5 - (bid.skillStars || 5))}
                          </span>
                          <span className="font-black text-amber-950 text-xs font-mono">
                            ({bid.skillStars || 5}/5 Stars)
                          </span>
                          <span className="text-[10px] font-extrabold text-emerald-900 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded">
                            {bid.skillStars === 5 ? 'Master Ustad' : bid.skillStars === 4 ? 'Senior Karigar' : 'Skilled Helper'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* User Remarks & Feedback Section (Shows both review and associated star rating clearly) */}
                    {(task.employerRemarks || task.workerRemarks || task.status === 'completed' || isAccepted) && (
                      <div className="mt-3">
                        <OrderRemarksSection
                          orderNumber={task.orderNumber || 'LH-101'}
                          employerName={task.postedBy}
                          workerName={bid.workerName}
                          employerRemarks={task.employerRemarks}
                          employerRating={task.employerRating || 5}
                          workerRemarks={task.workerRemarks}
                          workerRating={task.workerRating || 5}
                          workerSkillStars={bid.skillStars || 5}
                          status={task.status}
                        />
                      </div>
                    )}

                    <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        {isAccepted ? (
                          <span className="flex items-center gap-1.5 font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-lg">
                            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                            CONGRATULATIONS: Bid Accepted by Employer!
                          </span>
                        ) : (
                          <span className="text-slate-500">Status: Under Review by Employer</span>
                        )}
                      </div>

                      {isAccepted && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              onContactEmployer &&
                              onContactEmployer(task.postedBy, task.postedByPhone || '0301-8472910', task.title)
                            }
                            className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg font-semibold flex items-center gap-1.5 cursor-pointer"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>Contact Employer</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
