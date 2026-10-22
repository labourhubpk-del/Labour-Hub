import React, { useState } from 'react';
import { Task, TradeCategory, PakistanCity, Bid } from '../types';
import { LocalPartnersMarquee } from './LocalPartnersMarquee';
import { OrderRemarksSection } from './OrderRemarksSection';
import {
  ShieldCheck,
  PlusCircle,
  Clock,
  MapPin,
  Sparkles,
  CheckCircle2,
  PhoneCall,
  Gavel,
  Zap,
  Wrench,
  Hammer,
  Paintbrush,
  Wind,
  Cpu,
  Laptop,
  Search,
  Phone,
  Tag,
  Award,
  Star,
} from 'lucide-react';

interface EmployerHomeProps {
  tasks: Task[];
  selectedCity: PakistanCity;
  selectedCategory: TradeCategory | 'All';
  onCategorySelect: (cat: TradeCategory | 'All') => void;
  onOpenPostTask: () => void;
  onAcceptBid: (taskId: string, bidId: string) => void;
  onCompleteTask: (taskId: string) => void;
  onContactWorker: (workerName: string, trade: string, taskTitle: string, phone?: string) => void;
}

export const EmployerHome: React.FC<EmployerHomeProps> = ({
  tasks,
  selectedCity,
  selectedCategory,
  onCategorySelect,
  onOpenPostTask,
  onAcceptBid,
  onCompleteTask,
  onContactWorker,
}) => {
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter tasks by city, category, and search query
  const filteredTasks = tasks.filter((t) => {
    const matchesCity = selectedCity === 'All Pakistan' || t.city === selectedCity;
    const matchesCat = selectedCategory === 'All' || t.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.urduTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.area.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesCat && matchesSearch;
  });

  const getCategoryIcon = (name: TradeCategory) => {
    switch (name) {
      case 'Electrician':
        return <Zap className="w-5 h-5 text-amber-600" />;
      case 'Plumber':
        return <Wrench className="w-5 h-5 text-blue-600" />;
      case 'Mechanic':
        return <Cpu className="w-5 h-5 text-red-600" />;
      case 'Construction':
        return <Hammer className="w-5 h-5 text-orange-600" />;
      case 'Woodwork':
        return <Hammer className="w-5 h-5 text-amber-700" />;
      case 'Painter':
        return <Paintbrush className="w-5 h-5 text-teal-600" />;
      case 'AC & Appliances':
        return <Wind className="w-5 h-5 text-cyan-600" />;
      case 'Deep Cleaning':
        return <Sparkles className="w-5 h-5 text-emerald-600" />;
      case 'Digital & Other':
        return <Laptop className="w-5 h-5 text-purple-600" />;
      default:
        return <Zap className="w-5 h-5 text-emerald-700" />;
    }
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 text-white rounded-3xl overflow-hidden shadow-xl border border-emerald-800/40">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[440px]">
          {/* Left Text Zone */}
          <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-between z-10">
            <div className="space-y-4">
              {/* Trust Subtitle */}
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% CNIC Verified Tradespeople · Zero Advance Risk</span>
              </div>

              {/* High-Converting Localized Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-white">
                Ghar Ka Kaam Ho Ya Dukan Ka —{' '}
                <span className="text-emerald-300">30 Minute Me Ba-Aitemaad Karigar</span> Payen.
              </h1>

              {/* Sub-copy */}
              <p className="text-sm sm:text-base text-emerald-100/90 max-w-xl leading-relaxed">
                Post your task in 60 seconds. Receive live competitive bids in PKR from certified electricians, plumbers, carpenters, and technicians in{' '}
                <strong className="text-white">
                  {selectedCity === 'All Pakistan' ? 'Lahore, Karachi, Islamabad & across Pakistan' : selectedCity}
                </strong>
                .
              </p>

              {/* Instant Search Bar */}
              <div className="relative max-w-xl">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Kaam search karein (e.g. Bijli, Water leak, AC service, Carpenter)..."
                  className="w-full pl-10 pr-4 py-3 bg-white/95 text-slate-900 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-md placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600 font-bold"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Quick Search Tag Suggestions */}
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-emerald-200">
                <span className="text-emerald-300 font-semibold">Popular:</span>
                {['Bijli Mistri', 'Plumber Water Leak', 'AC Chemical Wash', 'Door Lock Jam', 'Room Paint'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag.split(' ')[0])}
                    className="px-2 py-0.5 rounded bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/60 transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* CTAs and Trust Markers */}
            <div className="pt-4 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenPostTask}
                  className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-extrabold text-sm rounded-xl transition-all shadow-lg shadow-emerald-500/25 flex items-center gap-2 cursor-pointer"
                >
                  <PlusCircle className="w-5 h-5 text-emerald-950" />
                  <span>Post a Task Now (Worker Chahiye)</span>
                </button>
                <div className="text-xs text-emerald-200 flex items-center gap-2 px-3 py-2 bg-emerald-900/60 rounded-lg border border-emerald-700/50">
                  <Clock className="w-4 h-4 text-emerald-300" />
                  <span>Avg. First Bid: 4 Minutes</span>
                </div>
              </div>

              {/* Trust Pillars */}
              <div className="pt-2 border-t border-emerald-800/60 flex flex-wrap items-center gap-4 text-xs text-emerald-200">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>NADRA Card Biometric Check</span>
                </span>
                <span className="text-emerald-600">·</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>JazzCash / EasyPaisa Escrow</span>
                </span>
                <span className="text-emerald-600">·</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Pay Only After Work is Done</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Image Showcase */}
          <div className="lg:col-span-5 relative overflow-hidden min-h-[260px] lg:min-h-full">
            <img
              src="/src/assets/images/hero_pakistan_craftsmen_1792560433544.jpg"
              alt="Pakistani skilled tradespeople and technicians"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/20 to-transparent lg:bg-gradient-to-r lg:from-emerald-950 lg:via-transparent lg:to-transparent" />
            <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md border border-white/10 px-3.5 py-2 rounded-xl text-xs text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Certified Skilled Network</span>
            </div>
          </div>
        </div>
      </section>

      {/* Top Pakistani Local Partners & Explore Specialized Trades (Picture Cards from reference) */}
      <LocalPartnersMarquee
        onSelectCategory={onCategorySelect}
        selectedCity={selectedCity}
      />

      {/* Live Active Tasks & Bids Management Feed */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Active Job Posts in {selectedCity}
            </h2>
            <p className="text-xs text-slate-500">
              Real-time competitive bidding by verified Pakistani helpers
            </p>
          </div>
          <button
            onClick={onOpenPostTask}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer self-start sm:self-auto"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Post a Task</span>
          </button>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Gavel className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">
              No tasks found in {selectedCity} for {selectedCategory}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Be the first to post a task in this area! Verified helpers are online and ready to bid.
            </p>
            <button
              onClick={onOpenPostTask}
              className="px-4 py-2 bg-emerald-800 text-white rounded-lg text-xs font-semibold hover:bg-emerald-900 cursor-pointer"
            >
              Post First Task
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map((task) => {
              const isExpanded = expandedTaskId === task.id;
              const hasAcceptedBid = !!task.acceptedBidId;
              const acceptedBid = task.bids.find((b) => b.id === task.acceptedBidId);

              return (
                <div
                  key={task.id}
                  className={`bg-white rounded-2xl border transition-all ${
                    task.isFeatured
                      ? 'border-amber-300 ring-1 ring-amber-200 shadow-sm'
                      : 'border-slate-200 shadow-sm'
                  }`}
                >
                  {/* Card Header & Content */}
                  <div className="p-5 sm:p-6 space-y-3">
                    {/* Card Header with Visible Order ID tag & Skill Stars display */}
                    <div className="flex flex-wrap items-center justify-between gap-2.5 text-xs pb-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Visible Order ID Tag */}
                        <span className="font-mono font-black text-xs bg-slate-900 text-amber-300 px-3 py-1 rounded-lg shadow-xs tracking-wider border border-slate-700 inline-flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5 text-amber-400" />
                          <span>Order ID: #{task.orderNumber || 'LH-101'}</span>
                        </span>

                        {/* Skill Stars Display for Worker */}
                        <span className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-300 text-amber-950 font-bold px-2.5 py-1 rounded-lg text-xs shadow-2xs">
                          <Award className="w-3.5 h-3.5 text-amber-600" />
                          <span className="text-slate-700">Skill Stars:</span>
                          <span className="text-amber-500 font-black tracking-wider">
                            {'★'.repeat(acceptedBid?.skillStars || task.bids[0]?.skillStars || 5)}
                          </span>
                          <span className="font-extrabold text-amber-950 text-[11px]">
                            ({acceptedBid?.skillStars || task.bids[0]?.skillStars || 5}/5 Stars)
                          </span>
                        </span>

                        {task.isFeatured && (
                          <span className="flex items-center gap-1 font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded text-[11px]">
                            <Sparkles className="w-3 h-3 text-amber-700" />
                            FEATURED URGENT
                          </span>
                        )}
                        <span className="font-semibold text-emerald-800">
                          {task.category}
                        </span>
                        <span className="text-slate-300">·</span>
                        <span className="text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {task.city} ({task.area})
                        </span>
                        <span className="text-slate-300">·</span>
                        <span className="text-slate-500">{task.postedAt}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-mono text-base font-extrabold text-slate-900">
                          Rs. {task.budgetPKR.toLocaleString()}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {task.isFixedBudget ? 'Fixed Budget' : 'Open to Bids'}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        {task.title}
                      </h3>
                      {task.urduTitle && (
                        <p className="text-xs font-medium text-emerald-900/80 mt-0.5">
                          {task.urduTitle}
                        </p>
                      )}
                      <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                        {task.description}
                      </p>
                    </div>

                    {/* Section for User Remarks & Feedback (Shows both the review and associated star rating clearly) */}
                    {(task.employerRemarks || task.workerRemarks || task.status === 'completed' || hasAcceptedBid) && (
                      <OrderRemarksSection
                        orderNumber={task.orderNumber || 'LH-101'}
                        employerName={task.postedBy}
                        workerName={acceptedBid?.workerName || task.bids[0]?.workerName || 'Tariq Mehmood'}
                        employerRemarks={task.employerRemarks}
                        employerRating={task.employerRating || 5}
                        workerRemarks={task.workerRemarks}
                        workerRating={task.workerRating || 5}
                        workerSkillStars={acceptedBid?.skillStars || task.bids[0]?.skillStars || 5}
                        status={task.status}
                      />
                    )}

                    {/* Footer Row */}
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-4 text-slate-500">
                        <span>Posted by: <strong className="text-slate-800">{task.postedBy}</strong></span>
                        <span>·</span>
                        <span>
                          Current Bids:{' '}
                          <strong className="text-emerald-800 font-bold">{task.bids.length}</strong>
                        </span>
                        <span>·</span>
                        <span className="font-medium text-amber-700">{task.urgency}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {hasAcceptedBid ? (
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="bg-emerald-100 text-emerald-900 font-semibold px-2.5 py-1 rounded text-xs flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                              Assigned to {acceptedBid?.workerName}
                            </span>
                            <button
                              onClick={() => onContactWorker(acceptedBid?.workerName || 'Karigar', task.category, task.title, acceptedBid?.workerPhone || '0300-8472910')}
                              className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
                            >
                              <Phone className="w-3.5 h-3.5" />
                              <span>Call / WhatsApp</span>
                            </button>
                            {task.status !== 'completed' && (
                              <button
                                onClick={() => onCompleteTask(task.id)}
                                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold cursor-pointer"
                              >
                                Release Escrow (Done)
                              </button>
                            )}
                          </div>
                        ) : (
                          <button
                            onClick={() => setExpandedTaskId(isExpanded ? null : task.id)}
                            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                          >
                            <Gavel className="w-3.5 h-3.5 text-amber-400" />
                            <span>
                              {isExpanded ? 'Hide Bids' : `Review Bids (${task.bids.length})`}
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Incoming Bids Accordion */}
                  {isExpanded && (
                    <div className="bg-slate-50/80 border-t border-slate-200 p-5 space-y-3 rounded-b-2xl">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          Incoming Bids from Local Tradespeople
                        </h4>
                        <span className="text-[11px] text-slate-500">
                          All helpers carry CNIC verification credentials
                        </span>
                      </div>

                      {task.bids.length === 0 ? (
                        <p className="text-xs text-slate-500 py-3">
                          No bids submitted yet. Helpers in {task.city} are reviewing the request.
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {task.bids.map((bid) => (
                            <div
                              key={bid.id}
                              className={`p-4 rounded-xl border bg-white transition-all ${
                                bid.isPro
                                  ? 'border-amber-300 ring-1 ring-amber-100'
                                  : 'border-slate-200'
                              }`}
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={bid.workerAvatar}
                                    alt={bid.workerName}
                                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                                    referrerPolicy="no-referrer"
                                  />
                                  <div>
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span className="font-bold text-slate-900 text-sm">
                                        {bid.workerName}
                                      </span>
                                      <span className="font-mono font-bold text-[10px] bg-slate-900 text-amber-300 px-2 py-0.5 rounded border border-slate-700 flex items-center gap-1">
                                        <Tag className="w-3 h-3 text-amber-400" />
                                        <span>Order ID: #{task.orderNumber || 'LH-101'}</span>
                                      </span>
                                      {bid.isPro && (
                                        <span className="bg-amber-100 text-amber-950 font-bold text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1">
                                          <Sparkles className="w-3 h-3 text-amber-600" />
                                          Gold Pro
                                        </span>
                                      )}
                                      {bid.isCNICVerified && (
                                        <span className="bg-emerald-100 text-emerald-900 font-semibold text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1">
                                          <ShieldCheck className="w-3 h-3 text-emerald-700" />
                                          CNIC Verified
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                                      <span>★ {bid.rating} Rating</span>
                                      <span>·</span>
                                      <span>{bid.completedJobs} Jobs Completed</span>
                                      <span>·</span>
                                      <span>Est: {bid.estimatedHours}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3 self-end sm:self-auto">
                                  <div className="text-right">
                                    <div className="font-mono text-base font-extrabold text-emerald-800">
                                      Rs. {bid.amountPKR.toLocaleString()}
                                    </div>
                                    <div className="text-[10px] text-slate-400">Fixed quote</div>
                                  </div>
                                  <button
                                    onClick={() => onAcceptBid(task.id, bid.id)}
                                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                                  >
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    <span>Accept &amp; Escrow</span>
                                  </button>
                                </div>
                              </div>

                              <p className="text-xs text-slate-700 mt-2.5 bg-slate-50 p-2.5 rounded-lg border border-slate-100 leading-relaxed">
                                "{bid.proposal}"
                              </p>

                              {/* Prominent Worker 'Skill Stars' Display */}
                              <div className="flex flex-wrap items-center justify-between gap-2 text-xs bg-gradient-to-r from-amber-50 to-amber-100/60 border border-amber-300 px-3.5 py-2.5 rounded-xl mt-3 shadow-2xs">
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

                              {/* Section for User Remarks & Feedback for this Worker */}
                              <div className="mt-2.5 bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1.5 text-xs">
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                                    <span>Client Remarks on Order ID #{task.orderNumber || 'LH-101'}:</span>
                                  </span>
                                  <div className="flex items-center gap-1 font-bold text-slate-700">
                                    <span className="text-amber-500">★ {bid.rating}</span>
                                    <span className="text-slate-400 text-[11px]">({bid.completedJobs} verified jobs)</span>
                                  </div>
                                </div>
                                <p className="text-slate-600 italic bg-white p-2.5 rounded-lg border border-slate-200 text-xs">
                                  "{bid.workerRemarks || 'Punctual karigar with genuine tools and high skill level. Fully recommended for this job.'}"
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Trust Barricade Educational Section */}
      <section className="bg-slate-100 rounded-3xl p-8 sm:p-10 border border-slate-200">
        <div className="max-w-3xl space-y-4">
          <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
            Aitemaad Ki Zindagi (The Trust Barricade)
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Why Pakistani Families Trust LabourHub.pk Over Chowk Mistris
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            In Pakistan, picking up an unverified worker from the local road crossing (*chowk*) carries immense security risks, unpredictable overcharging, and zero accountability when things break the next morning.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-sm">100% CNIC Tracked</h3>
              <p className="text-xs text-slate-500">
                Every worker is logged with a 13-digit National ID and mobile OTP before bidding on your home.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Escrow Protection</h3>
              <p className="text-xs text-slate-500">
                No advance demands. Your PKR payment is held safely until you inspect and approve the work.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Live Competitive Bids</h3>
              <p className="text-xs text-slate-500">
                Multiple mistris bid against your job. You choose the fair rate without endless bargaining.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
