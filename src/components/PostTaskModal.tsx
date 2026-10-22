import React, { useState } from 'react';
import { TradeCategory, PakistanCity, Task } from '../types';
import { CATEGORIES, CITIES } from '../data/mockData';
import { PlusCircle, Sparkles, X, Check } from 'lucide-react';

interface PostTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated: (task: Task) => void;
  defaultCity: PakistanCity;
}

export const PostTaskModal: React.FC<PostTaskModalProps> = ({
  isOpen,
  onClose,
  onTaskCreated,
  defaultCity,
}) => {
  const [category, setCategory] = useState<TradeCategory>('Electrician');
  const [title, setTitle] = useState('');
  const [urduTitle, setUrduTitle] = useState('');
  const [city, setCity] = useState<PakistanCity>(defaultCity === 'All Pakistan' ? 'Lahore' : defaultCity);
  const [area, setArea] = useState('DHA Phase 5');
  const [description, setDescription] = useState('');
  const [budgetPKR, setBudgetPKR] = useState(2500);
  const [isFixedBudget, setIsFixedBudget] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [urgency, setUrgency] = useState<'Urgent (Aaj hi)' | '24 Ghante me' | 'Is haftay'>('Urgent (Aaj hi)');
  const [employerName, setEmployerName] = useState('Malik Naveed');
  const [employerPhone, setEmployerPhone] = useState('0301-8472910');
  const [employerCnic, setEmployerCnic] = useState('35201-8392014-3');

  if (!isOpen) return null;

  const quickTemplates: { title: string; urdu: string; cat: TradeCategory; desc: string; budget: number }[] = [
    {
      title: 'AC Jet Chemical Wash & Gas Leakage Check',
      urdu: 'ڈیڑھ ٹن انورٹر اے سی کی سروس اور کولنگ گیس چیکنگ',
      cat: 'AC & Appliances',
      desc: 'Inverter AC compressor running but air is warm. Need coil jet wash and gas pressure check.',
      budget: 3500,
    },
    {
      title: 'Water Motor Not Pumping & Switch Sparking',
      urdu: 'پانی کی موٹر نہیں چل رہی اور بٹن سے چنگاریاں نکل رہی ہیں',
      cat: 'Plumber',
      desc: 'Ground water pump made burning smell and stopped. Need emergency plumber/electrician.',
      budget: 2500,
    },
    {
      title: 'Main Door Mortise Lock Stuck & Key Broken',
      urdu: 'مین گیٹ کا تالہ پھنس گیا ہے اور چابی اندر ٹوٹ گئی ہے',
      cat: 'Woodwork',
      desc: 'Need skilled carpenter to remove broken key and install new brass cylinder lock.',
      budget: 2000,
    },
    {
      title: '2 Bedrooms Fresh Emulsion Paint & Putty',
      urdu: 'دو کمروں میں دیواروں کی پٹین اور ڈبل کوٹ پینٹ',
      cat: 'Painter',
      desc: 'Master bedroom and kids room need scraping, 1 coat sealer, 2 coats silk emulsion.',
      budget: 14000,
    },
  ];

  const handleApplyTemplate = (tpl: typeof quickTemplates[0]) => {
    setTitle(tpl.title);
    setUrduTitle(tpl.urdu);
    setCategory(tpl.cat);
    setDescription(tpl.desc);
    setBudgetPKR(tpl.budget);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      orderNumber: `LH-${Math.floor(120 + Math.random() * 880)}`,
      title,
      urduTitle: urduTitle || title,
      category,
      city,
      area,
      description,
      budgetPKR: Number(budgetPKR) || 2000,
      isFixedBudget,
      isFeatured,
      urgency,
      postedBy: employerName,
      postedByPhone: employerPhone,
      postedByCnic: employerCnic,
      postedAt: 'Just now',
      status: 'open',
      bids: [],
    };

    onTaskCreated(newTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-emerald-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-700/50 flex items-center justify-center text-emerald-200">
              <PlusCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight">Post a New Task (Worker Chahiye)</h2>
              <p className="text-xs text-emerald-200">
                Receive instant competitive bids from verified Pakistani tradespeople
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-emerald-300 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          {/* Quick Roman Urdu Templates */}
          <div>
            <div className="text-xs font-semibold text-slate-700 mb-2 flex items-center justify-between">
              <span>Quick Roman Urdu Templates:</span>
              <span className="text-[11px] text-slate-500 font-normal">Click to prefill</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {quickTemplates.map((tpl, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleApplyTemplate(tpl)}
                  className="p-2 text-left bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-lg text-xs transition-colors cursor-pointer"
                >
                  <p className="font-semibold text-slate-900 line-clamp-1">{tpl.title}</p>
                  <p className="text-slate-500 text-[11px] mt-0.5 line-clamp-1">{tpl.urdu}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Trade Category Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Select Trade / Skill Needed (ہنر منتخب کریں)
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => setCategory(cat.name)}
                  className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                    category === cat.name
                      ? 'border-emerald-600 bg-emerald-50/80 ring-1 ring-emerald-500'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="font-bold text-xs text-slate-900">{cat.name}</div>
                  <div className="text-[10px] text-slate-500 truncate">{cat.urduName.split('(')[0]}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Task Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Task Title (e.g., Short circuit wiring check, Ceiling fan installation)
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What do you need done?"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-none"
            />
          </div>

          {/* Employer Contact & CNIC Verification (Mandatory for both users) */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">
                Employer Contact &amp; CNIC (ضروری معلومات)
              </span>
              <span className="text-[10px] text-emerald-800 bg-emerald-100 font-semibold px-2 py-0.5 rounded">
                Direct Contact · No OTP Required
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Aapka Naam (Name) *
                </label>
                <input
                  type="text"
                  required
                  value={employerName}
                  onChange={(e) => setEmployerName(e.target.value)}
                  placeholder="e.g. Salman Sheikh"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Mobile Number (No OTP) *
                </label>
                <input
                  type="tel"
                  required
                  value={employerPhone}
                  onChange={(e) => setEmployerPhone(e.target.value)}
                  placeholder="0300-1234567"
                  className="w-full font-mono px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  13-Digit CNIC Number *
                </label>
                <input
                  type="text"
                  required
                  value={employerCnic}
                  onChange={(e) => {
                    const cleaned = e.target.value.replace(/\D/g, '').slice(0, 13);
                    let formatted = cleaned;
                    if (cleaned.length > 5 && cleaned.length <= 12) {
                      formatted = `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`;
                    } else if (cleaned.length > 12) {
                      formatted = `${cleaned.slice(0, 5)}-${cleaned.slice(5, 12)}-${cleaned.slice(12, 13)}`;
                    }
                    setEmployerCnic(formatted);
                  }}
                  placeholder="35201-XXXXXXX-X"
                  maxLength={15}
                  className="w-full font-mono px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>
            </div>
            <p className="text-[10px] text-slate-500">
              * Local privacy: Your CNIC is securely recorded for verified hiring safety. Workers are provided your mobile number only upon bid acceptance.
            </p>
          </div>

          {/* City & Neighborhood */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Shehar / City (Target City) *
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value as PakistanCity)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-none cursor-pointer"
              >
                {CITIES.filter((c) => c !== 'All Pakistan').map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-emerald-800 font-semibold mt-1">
                ✓ Order will strictly be dispatched to verified workers in {city}.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ilaqa / Area / Phase *
              </label>
              <input
                type="text"
                required
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="e.g. DHA Phase 5, Gulberg, Clifton"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-none"
              />
            </div>
          </div>

          {/* Detailed Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tafseel / Job Description (English or Roman Urdu)
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain the issue clearly. Mention if helper needs to bring specialized materials or ladders..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-none"
            />
          </div>

          {/* Budget & Urgency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Aapka Budget (PKR)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-500">Rs.</span>
                <input
                  type="number"
                  min={500}
                  step={100}
                  value={budgetPKR}
                  onChange={(e) => setBudgetPKR(Number(e.target.value))}
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-3 mt-2 text-xs">
                <button
                  type="button"
                  onClick={() => setIsFixedBudget(true)}
                  className={`font-semibold cursor-pointer ${
                    isFixedBudget ? 'text-emerald-800 underline' : 'text-slate-500'
                  }`}
                >
                  Fixed Price
                </button>
                <span className="text-slate-300">·</span>
                <button
                  type="button"
                  onClick={() => setIsFixedBudget(false)}
                  className={`font-semibold cursor-pointer ${
                    !isFixedBudget ? 'text-emerald-800 underline' : 'text-slate-500'
                  }`}
                >
                  Open to Bids
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kab Chahiye? (Urgency)
              </label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-none cursor-pointer"
              >
                <option value="Urgent (Aaj hi)">Urgent (Aaj hi / Within hours)</option>
                <option value="24 Ghante me">24 Ghante me (Tomorrow)</option>
                <option value="Is haftay">Is haftay (Flexible this week)</option>
              </select>
            </div>
          </div>

          {/* Featured Pin (Monetization stream) */}
          <div
            onClick={() => setIsFeatured(!isFeatured)}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
              isFeatured
                ? 'border-amber-400 bg-amber-50/70 ring-1 ring-amber-400'
                : 'border-slate-200 bg-slate-50 hover:bg-slate-100/70'
            }`}
          >
            <div
              className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 ${
                isFeatured ? 'bg-amber-600 text-white' : 'border border-slate-300 bg-white'
              }`}
            >
              {isFeatured && <Check className="w-3.5 h-3.5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-slate-900">
                  Featured / Urgent Pin (+Rs. 350)
                </span>
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Pin your task to the very top of worker bidding tickers. Receive bids <strong>3x faster</strong> from top-rated CNIC verified pros.
              </p>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Publish Task &amp; Receive Worker Bids</span>
          </button>
        </form>
      </div>
    </div>
  );
};
