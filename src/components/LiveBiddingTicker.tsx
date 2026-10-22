import React, { useState, useEffect } from 'react';
import { Gavel, ShieldCheck, CheckCircle2, TrendingUp } from 'lucide-react';

interface TickerEvent {
  id: string;
  type: 'bid' | 'hired' | 'verified';
  text: string;
  city: string;
  timeAgo: string;
}

const INITIAL_EVENTS: TickerEvent[] = [
  {
    id: 'ev-1',
    type: 'bid',
    text: 'Tariq M. (Electrician) placed bid of Rs. 3,200',
    city: 'Lahore DHA',
    timeAgo: 'Just now',
  },
  {
    id: 'ev-2',
    type: 'hired',
    text: 'Muhammad Asif won Plumber job (Rs. 2,600)',
    city: 'Karachi Clifton',
    timeAgo: '2m ago',
  },
  {
    id: 'ev-3',
    type: 'verified',
    text: 'Ustad Bashir verified 13-digit NADRA CNIC',
    city: 'Islamabad F-8',
    timeAgo: '4m ago',
  },
  {
    id: 'ev-4',
    type: 'bid',
    text: 'Kamran HVAC placed bid of Rs. 3,200 on Inverter AC',
    city: 'Faisalabad',
    timeAgo: '7m ago',
  },
  {
    id: 'ev-5',
    type: 'hired',
    text: 'Zubair Ali hired for Drawing Room Paint (Rs. 11,500)',
    city: 'Rawalpindi Bahria',
    timeAgo: '11m ago',
  },
];

export const LiveBiddingTicker: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % INITIAL_EVENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const activeEvent = INITIAL_EVENTS[currentIndex];

  return (
    <div className="bg-slate-900 text-white border-y border-slate-800 py-2.5 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs">
        {/* Left: Ticker Label */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-amber-400" />
            Live Marketplace Ticker
          </span>
          <span className="hidden sm:inline text-slate-400 text-[11px]">· Real-time activity across Pakistan:</span>
        </div>

        {/* Center: Active Rotating Event */}
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center gap-2 transition-all duration-500 truncate">
            {activeEvent.type === 'bid' && <Gavel className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
            {activeEvent.type === 'hired' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
            {activeEvent.type === 'verified' && <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />}

            <span className="font-medium text-slate-200 truncate">{activeEvent.text}</span>
            <span className="text-slate-400 font-normal shrink-0">({activeEvent.city})</span>
            <span className="text-slate-500 text-[10px] shrink-0 font-mono">· {activeEvent.timeAgo}</span>
          </div>
        </div>

        {/* Right: Quick metrics */}
        <div className="hidden md:flex items-center gap-4 text-[11px] text-slate-400 shrink-0">
          <span>Active Bids Today: <strong className="text-white font-mono">342</strong></span>
          <span>·</span>
          <span>Avg Response: <strong className="text-emerald-400 font-mono">4.2 Mins</strong></span>
        </div>
      </div>
    </div>
  );
};
