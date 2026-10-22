import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Lock, ArrowRight, Camera, User, Phone, MapPin, X, Upload } from 'lucide-react';
import { PakistanCity, UserRole } from '../types';
import { CITIES } from '../data/mockData';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerificationSuccess: (data: {
    fullName: string;
    cnic: string;
    phone: string;
    city: PakistanCity;
    selfieImage: string;
  }) => void;
  initialRole: UserRole;
  initialPhone: string;
  initialCity: PakistanCity;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({
  isOpen,
  onClose,
  onVerificationSuccess,
  initialRole,
  initialPhone,
  initialCity,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [fullName, setFullName] = useState('Tariq Mehmood');
  const [phone, setPhone] = useState(initialPhone || '0300 8472910');
  const [cnicNumber, setCnicNumber] = useState('35201-4920193-7');
  const [city, setCity] = useState<PakistanCity>(initialCity === 'All Pakistan' ? 'Lahore' : initialCity);
  
  // Document and Selfie state
  const [hasFrontCard, setHasFrontCard] = useState(true);
  const [hasBackCard, setHasBackCard] = useState(true);
  const [selfieTaken, setSelfieTaken] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleCnicChange = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 13);
    let formatted = cleaned;
    if (cleaned.length > 5 && cleaned.length <= 12) {
      formatted = `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`;
    } else if (cleaned.length > 12) {
      formatted = `${cleaned.slice(0, 5)}-${cleaned.slice(5, 12)}-${cleaned.slice(12, 13)}`;
    }
    setCnicNumber(formatted);
  };

  const handleSubmitVerification = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
      onVerificationSuccess({
        fullName,
        cnic: cnicNumber,
        phone,
        city,
        selfieImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-emerald-950 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800/80 flex items-center justify-center text-emerald-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold tracking-tight">Identity Verification (Both Users)</h2>
                <span className="text-[10px] bg-emerald-800 px-2 py-0.5 rounded font-semibold text-emerald-200 uppercase">
                  {initialRole === 'employer' ? 'Homeowner' : 'Worker'}
                </span>
              </div>
              <p className="text-xs text-emerald-300">
                Mobile Number + 13-Digit CNIC + Picture Selfie + City (Direct Verification)
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

        {/* Step Tabs */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                step >= 1 ? 'bg-emerald-800 text-white' : 'bg-slate-200 text-slate-600'
              }`}
            >
              1
            </span>
            <span className={step >= 1 ? 'font-bold text-slate-800' : 'text-slate-500'}>
              Mobile, CNIC &amp; City
            </span>
          </div>
          <span className="text-slate-300">──</span>
          <div className="flex items-center gap-2">
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                step >= 2 ? 'bg-emerald-800 text-white' : 'bg-slate-200 text-slate-600'
              }`}
            >
              2
            </span>
            <span className={step >= 2 ? 'font-bold text-slate-800' : 'text-slate-500'}>
              CNIC Cards &amp; Picture Selfie
            </span>
          </div>
          <span className="text-slate-300">──</span>
          <div className="flex items-center gap-2">
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                step >= 3 ? 'bg-emerald-800 text-white' : 'bg-slate-200 text-slate-600'
              }`}
            >
              3
            </span>
            <span className={step >= 3 ? 'font-bold text-slate-800' : 'text-slate-500'}>
              Verified Shield
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {step === 1 && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-xs text-emerald-900 flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong>Pakistani Trust Constitution:</strong> Both Employers (*Worker Chahiye*) and Helpers (*Kaam Chahiye*) must provide a registered mobile number, 13-digit CNIC, picture selfie, and verified city to participate in the marketplace.
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Poora Naam (Full Name as per CNIC) *</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Tariq Mehmood / Salman Sheikh"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              {/* Mobile Number (Mandatory) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>Mobile Number (موبائل نمبر) *</span>
                  </span>
                  <span className="text-[10px] text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded font-semibold">
                    Direct Contact
                  </span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0300-1234567"
                  className="w-full font-mono px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Both employers and workers are contacted directly on this mobile number.
                </p>
              </div>

              {/* 13-Digit CNIC */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  13-Digit Pakistani CNIC Number (قومی شناختی کارڈ نمبر) *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={cnicNumber}
                    onChange={(e) => handleCnicChange(e.target.value)}
                    placeholder="35201-XXXXXXX-X"
                    maxLength={15}
                    className="w-full font-mono text-base tracking-widest px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                  <div className="absolute right-3 top-2.5 text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    NADRA 13-Digit
                  </div>
                </div>
              </div>

              {/* City Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Select Registered City (شہر منتخب کریں) *</span>
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
                <p className="text-[11px] text-slate-500 mt-1">
                  * City strict rule: Workers are only assigned and shown tasks originating from their selected city!
                </p>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={cnicNumber.length < 15 || !phone.trim() || !fullName.trim()}
                className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white font-semibold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Aagay Barhain: Upload CNIC &amp; Picture Selfie</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="text-xs text-slate-600">
                Please attach clear photos of your <strong>CNIC (Front &amp; Back)</strong> and take/upload a clear <strong>Picture Selfie</strong> to match your identity.
              </div>

              {/* 3 Upload Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* 1. CNIC Front */}
                <div className="border-2 border-dashed border-emerald-300 bg-emerald-50/40 rounded-xl p-3 text-center flex flex-col items-center justify-between min-h-[140px]">
                  <div className="w-8 h-6 bg-emerald-200 rounded border border-emerald-400 flex items-center justify-center text-[9px] font-bold text-emerald-900">
                    FRONT
                  </div>
                  <div className="my-1">
                    <p className="text-xs font-bold text-slate-800">CNIC Front</p>
                    <p className="text-[10px] text-slate-500">Photo &amp; Name</p>
                  </div>
                  {hasFrontCard ? (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                      Uploaded
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setHasFrontCard(true)}
                      className="text-[11px] text-emerald-800 underline font-semibold cursor-pointer"
                    >
                      Attach
                    </button>
                  )}
                </div>

                {/* 2. CNIC Back */}
                <div className="border-2 border-dashed border-emerald-300 bg-emerald-50/40 rounded-xl p-3 text-center flex flex-col items-center justify-between min-h-[140px]">
                  <div className="w-8 h-6 bg-emerald-200 rounded border border-emerald-400 flex items-center justify-center text-[9px] font-bold text-emerald-900">
                    BACK
                  </div>
                  <div className="my-1">
                    <p className="text-xs font-bold text-slate-800">CNIC Back</p>
                    <p className="text-[10px] text-slate-500">Address &amp; Barcode</p>
                  </div>
                  {hasBackCard ? (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                      Uploaded
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setHasBackCard(true)}
                      className="text-[11px] text-emerald-800 underline font-semibold cursor-pointer"
                    >
                      Attach
                    </button>
                  )}
                </div>

                {/* 3. Picture Selfie (Requested by User) */}
                <div className="border-2 border-dashed border-emerald-500 bg-emerald-50 rounded-xl p-3 text-center flex flex-col items-center justify-between min-h-[140px] ring-1 ring-emerald-400">
                  <div className="w-8 h-8 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-900">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div className="my-1">
                    <p className="text-xs font-extrabold text-emerald-950">Picture Selfie *</p>
                    <p className="text-[10px] text-emerald-800">Face Match Check</p>
                  </div>
                  {selfieTaken ? (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-200/80 px-2 py-0.5 rounded flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-800" />
                      Selfie Ready
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSelfieTaken(true)}
                      className="text-[11px] text-emerald-900 underline font-bold cursor-pointer"
                    >
                      Capture Photo
                    </button>
                  )}
                </div>
              </div>

              {/* Summary Checklist */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Registered Mobile Phone:</span>
                  <span className="font-mono font-bold text-slate-900">{phone}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>CNIC Number:</span>
                  <span className="font-mono font-bold text-slate-900">{cnicNumber}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Assigned City:</span>
                  <span className="font-bold text-emerald-800">{city}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Photo Selfie:</span>
                  <span className="font-bold text-emerald-800">Face Verified ✓</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmitVerification}
                  disabled={isSubmitting || !hasFrontCard || !hasBackCard || !selfieTaken}
                  className="flex-1 py-3 bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white font-semibold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Verifying Selfie &amp; CNIC with Database...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Complete Verification &amp; Activate Badge</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/30">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Mubarak Ho! You Are 100% Verified
                </h3>
                <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                  Mobile Number, 13-Digit CNIC, Picture Selfie, and City <strong>({city})</strong> have been verified and saved to your account.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left max-w-sm mx-auto space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Name:</span>
                  <span className="font-bold text-slate-900">{fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Mobile Phone:</span>
                  <span className="font-mono font-bold text-slate-900">{phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">CNIC:</span>
                  <span className="font-mono font-bold text-slate-900">{cnicNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">City Hub:</span>
                  <span className="font-bold text-emerald-800">{city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Selfie Authentication:</span>
                  <span className="font-semibold text-emerald-800">Approved ✓</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm rounded-xl transition-all shadow-md cursor-pointer"
              >
                Done · Continue to Marketplace
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
