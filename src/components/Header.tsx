import React from 'react';
import { PakistanCity, UserRole } from '../types';
import { CITIES } from '../data/mockData';
import { ShieldCheck, MapPin, Sparkles, Code2, PlusCircle, Hammer, Briefcase, Globe, Bot, LogIn, LogOut, User } from 'lucide-react';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  selectedCity: PakistanCity;
  onCityChange: (city: PakistanCity) => void;
  onOpenPostTask: () => void;
  onOpenVerification: () => void;
  onOpenProClub: () => void;
  onOpenWordPressBlueprint: () => void;
  onOpenEmbedGuide: () => void;
  onOpenAIAdvisor: () => void;
  currentUser: any;
  onGoogleSignIn: () => void;
  onSignOut: () => void;
  isCNICVerified: boolean;
  isPro: boolean;
  activeTab: 'tasks' | 'categories' | 'trust' | 'my-activity';
  setActiveTab: (tab: 'tasks' | 'categories' | 'trust' | 'my-activity') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  selectedCity,
  onCityChange,
  onOpenPostTask,
  onOpenVerification,
  onOpenProClub,
  onOpenWordPressBlueprint,
  onOpenEmbedGuide,
  onOpenAIAdvisor,
  currentUser,
  onGoogleSignIn,
  onSignOut,
  isCNICVerified,
  isPro,
  activeTab,
  setActiveTab,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element wordmark in display face) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('tasks')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-800 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              LH
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-emerald-800 transition-colors whitespace-nowrap">
                LabourHub<span className="text-emerald-700">.pk</span>
              </span>
              <span className="text-[10px] font-semibold text-emerald-800 uppercase tracking-wider -mt-1">
                Pakistan's Task Hub
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: 4-5 Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('tasks')}
            className={`transition-colors whitespace-nowrap hover:text-emerald-800 ${
              activeTab === 'tasks' ? 'text-emerald-800 font-semibold' : ''
            }`}
          >
            Live Tasks Feed
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`transition-colors whitespace-nowrap hover:text-emerald-800 ${
              activeTab === 'categories' ? 'text-emerald-800 font-semibold' : ''
            }`}
          >
            All Trades & Skills
          </button>
          <button
            onClick={() => setActiveTab('trust')}
            className={`transition-colors whitespace-nowrap hover:text-emerald-800 ${
              activeTab === 'trust' ? 'text-emerald-800 font-semibold' : ''
            }`}
          >
            100% CNIC Trust
          </button>
          <button
            onClick={onOpenProClub}
            className="transition-colors whitespace-nowrap hover:text-amber-700 text-slate-700 font-medium flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Starting Pro Free (0% Fee)</span>
          </button>
          <button
            onClick={onOpenAIAdvisor}
            className="transition-colors whitespace-nowrap hover:text-emerald-800 text-emerald-800 font-semibold flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200"
          >
            <Bot className="w-3.5 h-3.5 text-emerald-700" />
            <span>AI Ustad &amp; Maps</span>
          </button>
          <button
            onClick={onOpenEmbedGuide}
            className="transition-colors whitespace-nowrap hover:text-indigo-700 text-indigo-700 font-medium flex items-center gap-1.5"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Add to Website</span>
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action Area with Role Switcher & CTA */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Google Sign-in / Profile */}
          {currentUser ? (
            <div className="flex items-center gap-2 bg-slate-100 py-1 px-2.5 rounded-lg border border-slate-200 text-xs">
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || 'User'}
                  className="w-5 h-5 rounded-full"
                />
              ) : (
                <User className="w-4 h-4 text-emerald-700" />
              )}
              <span className="font-semibold text-slate-800 max-w-[100px] truncate hidden md:inline">
                {currentUser.displayName || currentUser.email?.split('@')[0]}
              </span>
              <button
                onClick={onSignOut}
                title="Sign out of Firebase"
                className="text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onGoogleSignIn}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
              title="Sign in with Google via Firebase Auth"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.97 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span className="hidden sm:inline">Google Sign In</span>
            </button>
          )}

          {/* Dual-User Role Switcher */}
          <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200">
            <button
              onClick={() => onRoleChange('employer')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                currentRole === 'employer'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Worker Chahiye</span>
            </button>
            <button
              onClick={() => onRoleChange('helper')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                currentRole === 'helper'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Hammer className="w-3.5 h-3.5" />
              <span>Kaam Chahiye</span>
            </button>
          </div>

          {/* Primary CTA depending on role */}
          {currentRole === 'employer' ? (
            <button
              onClick={onOpenPostTask}
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors shadow-sm whitespace-nowrap cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post a Task</span>
            </button>
          ) : (
            <button
              onClick={onOpenVerification}
              className={`hidden sm:flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors shadow-sm whitespace-nowrap cursor-pointer ${
                isCNICVerified
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                  : 'bg-emerald-800 hover:bg-emerald-900 text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{isCNICVerified ? 'CNIC Verified Pro' : 'Verify CNIC'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Sub-header Context Bar: Multi-City Location Filter & Quick Status */}
      <div className="bg-slate-50 border-t border-slate-200 py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* City Selection */}
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
            <span className="text-slate-500 font-medium whitespace-nowrap">Shehar / City:</span>
            <select
              value={selectedCity}
              onChange={(e) => onCityChange(e.target.value as PakistanCity)}
              aria-label="Filter tasks by city"
              className="bg-white border border-slate-300 text-slate-800 font-semibold py-1 px-2.5 rounded-md text-xs focus:ring-2 focus:ring-emerald-700 focus:outline-none cursor-pointer"
            >
              {CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <span className="text-slate-400 hidden sm:inline">·</span>
            <span className="text-slate-500 hidden sm:inline">
              Active in <strong className="text-slate-700">Lahore, Karachi, Islamabad & 8+ hubs</strong>
            </span>
          </div>

          {/* User Persona Micro-Status */}
          <div className="flex items-center gap-4 text-slate-600">
            {currentRole === 'helper' ? (
              <div className="flex items-center gap-3">
                <span className="font-medium text-slate-700">
                  Worker Tier: <strong className="text-emerald-800">Starting Pro Free (0% Fee · 30 Bids)</strong>
                </span>
                <span className="text-slate-300">·</span>
                <button
                  onClick={onOpenVerification}
                  className="font-medium text-emerald-800 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {isCNICVerified ? 'NADRA Verified ✓' : 'Verify CNIC to Bid'}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-slate-600">
                  Homeowner Escrow Protection: <strong className="text-emerald-800">100% Protected</strong>
                </span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-500">Zero advance fee without job approval</span>
              </div>
            )}
            <span className="text-slate-300 hidden sm:inline">·</span>
            <button
              onClick={onOpenEmbedGuide}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-md border border-indigo-200 transition-colors cursor-pointer"
              title="Add this marketplace to WordPress / Elementor / Website"
            >
              <Globe className="w-3 h-3 text-indigo-600" />
              <span>Add to Website</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
