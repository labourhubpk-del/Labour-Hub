import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  MapPin,
  Bot,
  User,
  X,
  Search,
  ExternalLink,
  Zap,
  Cpu,
  Clock,
  Compass,
} from 'lucide-react';
import { PakistanCity } from '../types';

interface Message {
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

interface GeminiAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity: PakistanCity;
}

export const GeminiAdvisorModal: React.FC<GeminiAdvisorModalProps> = ({
  isOpen,
  onClose,
  selectedCity,
}) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'maps'>('chat');
  
  // Model selection state
  // gemini-3.8-flash: general, gemini-3.1-flash-lite: fast, gemini-4-argon: complex
  const [modelChoice, setModelChoice] = useState<'gemini-3.8-flash' | 'gemini-3.1-flash-lite' | 'gemini-4-argon'>('gemini-3.8-flash');

  // Chat conversation state
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: `Assalam o Alaikum! Main hoon "LabourHub AI Ustad". Main aapko ${selectedCity} me kisi bhi kaam ka sahi PKR rate estimate karne, saman ki khareedari k wholesale markets dhoondne, aur behtareen Karigar proposal likhne me madad deta hoon.\n\nAap mujh se pooch saktay hain: e.g. "1.5 ton AC gas refill ka Lahore me kia rate hai?", ya "Schneider breaker kahan sy wholesale milte hain?"`,
      timestamp: 'Just now',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Maps Grounding state
  const [mapsQuery, setMapsQuery] = useState('');
  const [mapsResult, setMapsResult] = useState<string | null>(null);
  const [isSearchingMaps, setIsSearchingMaps] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeTab === 'chat') {
      scrollToBottom();
    }
  }, [messages, activeTab]);

  if (!isOpen) return null;

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || isSending) return;

    const userText = inputMessage.trim();
    setInputMessage('');

    const newMessages: Message[] = [
      ...messages,
      {
        role: 'user',
        content: userText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
    setMessages(newMessages);
    setIsSending(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          modelChoice,
          userCity: selectedCity,
        }),
      });

      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'model',
            content: data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      } else {
        throw new Error(data.error || 'No response');
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          content: 'Maazrat, rabta toot gaya hai. Baraye meherbani dobara try karein.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleSearchMapsGrounding = async (queryToSearch: string) => {
    const q = queryToSearch || mapsQuery;
    if (!q.trim() || isSearchingMaps) return;

    setIsSearchingMaps(true);
    setMapsResult(null);

    try {
      const res = await fetch('/api/maps-grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          city: selectedCity === 'All Pakistan' ? 'Lahore' : selectedCity,
        }),
      });

      const data = await res.json();
      setMapsResult(data.reply || 'No results found.');
    } catch (err: any) {
      setMapsResult('Maps Grounding search failed. Please try again.');
    } finally {
      setIsSearchingMaps(false);
    }
  };

  const quickRateQuestions = [
    'Lahore me DB box breaker repair ka munasib labor rate kia hai?',
    'Water pump motor winding aur plumbing fitting charges in PKR?',
    'Karachi me 2 rooms paint aur wall putty ki labor cost?',
    'Karigar k tor pr client ko jeetne wali proposal likh kar dain.',
  ];

  const quickMapsSearches = [
    'Sanitary & PPRC Pipes Wholesale Market',
    'Electrical Wires, Fans & Breakers Hub',
    'Woodwork, Timber & Furniture Hardware',
    'Auto Spare Parts & Mechanic Chowk',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[90vh] max-h-[750px]">
        {/* Header */}
        <div className="bg-emerald-950 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold tracking-tight">
                  LabourHub AI Ustad &amp; Market Guide
                </h2>
                <span className="text-[10px] bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded font-mono font-bold">
                  {selectedCity}
                </span>
              </div>
              <p className="text-xs text-emerald-300">
                Multi-turn Rate Estimator &amp; Google Maps Wholesale Grounding
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

        {/* Sub-bar: Model Selection & Tabs */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
          {/* Main Mode Tabs */}
          <div className="flex items-center gap-1 bg-slate-200/80 p-0.5 rounded-lg font-semibold">
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'chat' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-emerald-700" />
              <span>AI Chatbot</span>
            </button>
            <button
              onClick={() => setActiveTab('maps')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'maps' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-amber-600" />
              <span>Google Maps Grounding</span>
            </button>
          </div>

          {/* Model Selector for Chat */}
          {activeTab === 'chat' && (
            <div className="flex items-center gap-1.5 text-[11px]">
              <span className="text-slate-500 font-medium">Model:</span>
              <select
                value={modelChoice}
                onChange={(e) => setModelChoice(e.target.value as any)}
                className="bg-white border border-slate-300 rounded px-2 py-1 font-mono text-[11px] font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-700 cursor-pointer"
              >
                <option value="gemini-3.8-flash">gemini-3.8-flash (General)</option>
                <option value="gemini-3.1-flash-lite">gemini-3.1-flash-lite (Fast)</option>
                <option value="gemini-4-argon">gemini-4-argon (Complex)</option>
              </select>
            </div>
          )}
        </div>

        {/* TAB 1: Multi-Turn Conversation Thread */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col min-h-0 bg-slate-50/50">
            {/* Scrollable message thread */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, idx) => {
                const isModel = m.role === 'model';
                return (
                  <div
                    key={idx}
                    className={`flex items-start gap-2.5 max-w-[85%] ${
                      isModel ? 'mr-auto' : 'ml-auto flex-row-reverse'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                        isModel ? 'bg-emerald-800 text-white' : 'bg-slate-800 text-white'
                      }`}
                    >
                      {isModel ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>

                    <div className="space-y-1">
                      <div
                        className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                          isModel
                            ? 'bg-white text-slate-800 border border-slate-200/90 shadow-2xs rounded-tl-none'
                            : 'bg-emerald-800 text-white rounded-tr-none font-medium'
                        }`}
                      >
                        {m.content}
                      </div>
                      <div
                        className={`text-[10px] text-slate-400 px-1 ${
                          isModel ? 'text-left' : 'text-right'
                        }`}
                      >
                        {m.timestamp}
                      </div>
                    </div>
                  </div>
                );
              })}

              {isSending && (
                <div className="flex items-center gap-2 text-xs text-slate-500 bg-white p-3 rounded-2xl border border-slate-200 w-fit">
                  <div className="w-2 h-2 rounded-full bg-emerald-700 animate-ping" />
                  <span>LabourHub AI Ustad jawab likh raha hai...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Pills */}
            <div className="px-4 py-2 border-t border-slate-200 bg-white flex items-center gap-1.5 overflow-x-auto text-[11px]">
              <span className="text-slate-400 shrink-0 font-medium">Quick:</span>
              {quickRateQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setInputMessage(q);
                  }}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 rounded-full border border-slate-200 whitespace-nowrap transition-colors cursor-pointer"
                >
                  {q.slice(0, 36)}...
                </button>
              ))}
            </div>

            {/* Input form */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Poochhein (e.g. Electrician k per point charges kia hain?)..."
                disabled={isSending}
                className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isSending}
                className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 disabled:bg-slate-300 text-white rounded-xl transition-all shadow-xs flex items-center gap-1.5 font-semibold text-xs cursor-pointer shrink-0"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: Google Maps Grounding Market Finder */}
        {activeTab === 'maps' && (
          <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-50/50">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-700" />
                <h3 className="text-sm font-bold text-slate-900">
                  Google Maps Wholesale &amp; Karigar Hub Grounding
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Powered by <strong>gemini-3.8-flash with Google Maps tool</strong>. Discover verified physical hardware markets, sanitary spare parts dealers, electrical hubs, and Karigar addas in <strong>{selectedCity}</strong>.
              </p>

              {/* Search Bar */}
              <div className="flex items-center gap-2 pt-1">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={mapsQuery}
                    onChange={(e) => setMapsQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearchMapsGrounding(mapsQuery)}
                    placeholder={`e.g. Sanitary pipes, Hall road electronics, Wood timber in ${selectedCity}...`}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>
                <button
                  onClick={() => handleSearchMapsGrounding(mapsQuery)}
                  disabled={!mapsQuery.trim() || isSearchingMaps}
                  className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 disabled:bg-slate-300 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  {isSearchingMaps ? (
                    <span>Grounding...</span>
                  ) : (
                    <>
                      <Compass className="w-3.5 h-3.5" />
                      <span>Find Markets</span>
                    </>
                  )}
                </button>
              </div>

              {/* Quick Suggestions */}
              <div className="pt-2 flex flex-wrap gap-1.5 text-[11px]">
                <span className="text-slate-400 font-semibold self-center">Popular in {selectedCity}:</span>
                {quickMapsSearches.map((tag, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setMapsQuery(tag);
                      handleSearchMapsGrounding(tag);
                    }}
                    className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-lg transition-colors cursor-pointer font-medium"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Result */}
            {isSearchingMaps && (
              <div className="text-center py-10 bg-white rounded-2xl border border-slate-200 space-y-2">
                <Compass className="w-8 h-8 text-emerald-700 mx-auto animate-spin" />
                <p className="text-xs font-bold text-slate-800">
                  Retrieving Google Maps data for {selectedCity}...
                </p>
                <p className="text-[11px] text-slate-500">
                  Scanning real local wholesale shops, landmark roads, and trader markets
                </p>
              </div>
            )}

            {mapsResult && !isSearchingMaps && (
              <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-sm space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold text-slate-900">
                      Grounded Market Recommendations ({selectedCity})
                    </span>
                  </div>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                    Google Maps Data Verified
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-wrap font-sans">
                  {mapsResult}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
