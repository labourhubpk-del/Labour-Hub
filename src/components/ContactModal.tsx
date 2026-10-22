import React, { useState } from 'react';
import { Phone, MessageCircle, Copy, Check, ShieldCheck, X } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  workerName: string;
  workerTrade: string;
  phone: string;
  taskTitle: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  workerName,
  workerTrade,
  phone,
  taskTitle,
}) => {
  const [copied, setCopied] = useState(false);
  const [callAlert, setCallAlert] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateCall = () => {
    setCallAlert(true);
    setTimeout(() => setCallAlert(false), 3500);
  };

  const whatsappMessage = encodeURIComponent(
    `Salam ${workerName} bhai! LabourHub.pk pe aapki bid accept kar li hai for "${taskTitle}". Aap kab tak pohnch saktay hain?`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-emerald-950 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800/80 flex items-center justify-center text-emerald-200">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">Direct Worker Contact</h3>
              <p className="text-xs text-emerald-300">
                100% CNIC Verified &amp; Identity Matched
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

        {/* Body */}
        <div className="p-6 space-y-5">
          <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 text-sm">{workerName}</span>
                <span className="bg-emerald-100 text-emerald-900 text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-700" />
                  NADRA Verified
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{workerTrade} Specialist</p>
            </div>
            <div className="text-right">
              <div className="font-mono text-sm font-bold text-slate-800">{phone}</div>
              <button
                onClick={handleCopy}
                className="text-[11px] font-semibold text-emerald-800 hover:underline flex items-center gap-1 justify-end mt-0.5 cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy Number'}</span>
              </button>
            </div>
          </div>

          {callAlert && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-xs flex items-center gap-2 animate-fadeIn">
              <Phone className="w-4 h-4 animate-bounce text-emerald-700 shrink-0" />
              <span>Simulating phone call connection to <strong>{phone}</strong>...</span>
            </div>
          )}

          <div className="space-y-2.5">
            <button
              onClick={handleSimulateCall}
              className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Call Worker Now (کال کریں)</span>
            </button>

            <a
              href={`https://wa.me/923000000000?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer text-center"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp (واٹس ایپ)</span>
            </a>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 leading-relaxed">
            <strong>Tahafuz Ki Hidayat (Safety Notice):</strong> Never transfer cash advances outside the LabourHub.pk escrow mechanism. Once the helper completes the repair and you verify with your own eyes, approve the release via the app.
          </div>
        </div>
      </div>
    </div>
  );
};
