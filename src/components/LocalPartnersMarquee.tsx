import React, { useState } from 'react';
import { TradeCategory, PakistanCity } from '../types';
import { X, CheckCircle2, ShieldCheck, ExternalLink, ArrowRight } from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  benefits: string;
  logo: React.ReactNode;
}

interface LocalPartnersMarqueeProps {
  onSelectCategory?: (category: TradeCategory) => void;
  selectedCity?: PakistanCity;
}

export const LocalPartnersMarquee: React.FC<LocalPartnersMarqueeProps> = ({
  onSelectCategory,
  selectedCity = 'Lahore',
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  const partners: Partner[] = [
    {
      id: 'hrl',
      name: 'HRL Construction',
      tagline: 'Habib Rafiq (Pvt) Ltd',
      category: 'Civil Infrastructure & Smart Cities',
      description: 'Official corporate contractor partner. Providing certified civil construction workers, site masons, and heavy equipment mechanics for mega housing societies.',
      benefits: 'Priority equipment rental discounts & verified master mason endorsements.',
      logo: (
        <div className="flex items-center gap-2.5">
          <svg className="w-11 h-11 shrink-0" viewBox="0 0 64 64" fill="none">
            {/* Crane & Skyline */}
            <path d="M12 56L24 16H44" stroke="#1E3A8A" strokeWidth="3" strokeLinecap="round" />
            <path d="M38 16V28L34 32" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" />
            <rect x="26" y="28" width="8" height="28" fill="#1E40AF" rx="1" />
            <rect x="36" y="20" width="10" height="36" fill="#F97316" rx="1" />
            <rect x="48" y="32" width="8" height="24" fill="#3B82F6" rx="1" />
            <line x1="8" y1="56" x2="58" y2="56" stroke="#1E3A8A" strokeWidth="3" />
          </svg>
          <div className="text-left">
            <div className="font-extrabold text-base tracking-tight text-[#0F172A] leading-tight">HRL</div>
            <div className="text-[10px] font-bold text-[#EA580C] uppercase tracking-wider">Construction</div>
          </div>
        </div>
      ),
    },
    {
      id: 'gul-ahmed',
      name: 'Gul Ahmed Textiles',
      tagline: 'Textile Mills Pakistan',
      category: 'Industrial Manufacturing & Fabricators',
      description: 'Industrial maintenance partner across Karachi, Lahore & Faisalabad. Sponsoring certified garment factory technicians and electrical safety standards.',
      benefits: 'Worker safety uniforms and subsidized certified safety gear for pros.',
      logo: (
        <div className="flex items-center gap-2.5">
          <svg className="w-11 h-11 shrink-0" viewBox="0 0 64 64" fill="none">
            <path d="M14 24C14 18 20 18 24 22C24 28 18 28 14 24Z" fill="#1E3A8A" />
            <path d="M14 36C14 42 20 42 24 38C24 32 18 32 14 36Z" fill="#1E3A8A" />
            <path d="M26 34C26 28 32 24 38 24L52 24C56 24 58 28 58 32L38 46L26 34Z" fill="#EA580C" />
            <ellipse cx="32" cy="36" rx="6" ry="10" fill="#1E40AF" />
            <ellipse cx="32" cy="36" rx="3" ry="5" fill="#FFFFFF" />
            <path d="M38 46L54 46" stroke="#F97316" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <div className="text-left">
            <div className="font-extrabold text-sm text-[#1E3A8A] leading-tight">Gul Ahmed</div>
            <div className="text-[10px] font-semibold text-slate-500">Textiles</div>
          </div>
        </div>
      ),
    },
    {
      id: 'tcs',
      name: 'TCS Logistics',
      tagline: 'Express Courier & Supply Chain',
      category: 'Nationwide Fleet & Courier',
      description: 'Pakistan largest logistics network. Partnering with LabourHub to provide verified drivers, fleet mechanics, and intercity delivery taskers.',
      benefits: 'Same-day task material transport across 100+ cities in Pakistan.',
      logo: (
        <div className="flex items-center gap-2.5">
          <svg className="w-12 h-9 shrink-0" viewBox="0 0 80 48" fill="none">
            <path d="M6 14L18 38H30L20 14H6Z" fill="#1E3A8A" />
            <path d="M26 14L32 38H42L48 14H26Z" fill="#F97316" />
            <path d="M50 14L46 38H68L74 26H58L60 14H50Z" fill="#EA580C" />
            <path d="M66 14L76 14L70 8" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <div className="text-left">
            <div className="font-black text-base italic text-[#F97316] leading-none tracking-tight">TCS</div>
            <div className="text-[10px] font-bold text-[#1E3A8A] uppercase tracking-wider">Logistics</div>
          </div>
        </div>
      ),
    },
    {
      id: 'jazz-infra',
      name: 'Jazz Infra',
      tagline: 'Jazz Telecom & Digital Infra',
      category: 'Telecom Towers & High-Voltage Power',
      description: 'Telecom cellular tower power partner. Co-certifying industrial electrical technicians and solar inverter specialists.',
      benefits: 'JazzCash instant mobile escrow payouts directly to verified CNIC holders.',
      logo: (
        <div className="flex items-center gap-2.5">
          <svg className="w-11 h-11 shrink-0" viewBox="0 0 64 64" fill="none">
            <path d="M16 28C14 34 14 38 16 44" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
            <path d="M22 24C19 32 19 40 22 48" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
            <path d="M48 28C50 34 50 38 48 44" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
            <path d="M42 24C45 32 45 40 42 48" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
            <circle cx="32" cy="22" r="4" fill="#EA580C" />
            <path d="M26 50L32 26L38 50" stroke="#EA580C" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="28" y1="42" x2="36" y2="42" stroke="#EA580C" strokeWidth="2.5" />
          </svg>
          <div className="text-left">
            <div className="font-extrabold text-sm text-[#1E3A8A] tracking-wider">INFRA</div>
            <div className="text-[10px] font-bold text-[#EA580C] uppercase">Jazz Network</div>
          </div>
        </div>
      ),
    },
    {
      id: 'pak-cables',
      name: 'Pak Cables',
      tagline: 'Pure 99.9% Copper Wiring',
      category: 'Electrical Safety & Distribution',
      description: 'Pakistan premier cable brand. Testing and validating wiring standards for all LabourHub certified electricians.',
      benefits: 'Anti-counterfeit copper certification for residential installations.',
      logo: (
        <div className="flex items-center gap-2.5">
          <svg className="w-11 h-11 shrink-0" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="24" stroke="#DC2626" strokeWidth="3" />
            <circle cx="32" cy="32" r="16" fill="#1E3A8A" />
            <circle cx="26" cy="28" r="4" fill="#EA580C" />
            <circle cx="38" cy="28" r="4" fill="#EA580C" />
            <circle cx="32" cy="38" r="4" fill="#EA580C" />
          </svg>
          <div className="text-left">
            <div className="font-extrabold text-sm text-[#DC2626] leading-tight">PAK</div>
            <div className="text-[10px] font-bold text-[#1E3A8A] uppercase">Cables</div>
          </div>
        </div>
      ),
    },
    {
      id: 'dawlance',
      name: 'Dawlance Pakistan',
      tagline: 'Reliable Home Appliances',
      category: 'HVAC & Appliance Technical Network',
      description: 'Authorized warranty repair training partner. Qualifying AC gas recharging, inverter servicing, and refrigerator diagnostics.',
      benefits: 'Genuine spare parts access at subsidized wholesale rates.',
      logo: (
        <div className="flex items-center gap-2.5">
          <svg className="w-11 h-11 shrink-0" viewBox="0 0 64 64" fill="none">
            <rect x="12" y="14" width="40" height="36" rx="6" fill="#1E40AF" />
            <path d="M22 24L32 38L42 24" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="32" cy="20" r="3" fill="#EA580C" />
          </svg>
          <div className="text-left">
            <div className="font-black text-sm text-[#1E40AF] leading-tight">Dawlance</div>
            <div className="text-[10px] font-semibold text-slate-500">Reliable Pak</div>
          </div>
        </div>
      ),
    },
    {
      id: 'master-paints',
      name: 'Master Paints',
      tagline: 'Supreme Wall Protection',
      category: 'Paints & Chemical Emulsions',
      description: 'Supplying certified painter contractors across Punjab, Sindh, and KPK with premium architectural paint systems.',
      benefits: 'Complimentary computerized color mixing and moisture meters for painters.',
      logo: (
        <div className="flex items-center gap-2.5">
          <svg className="w-11 h-11 shrink-0" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="22" fill="#E11D48" />
            <path d="M22 36C22 28 32 20 32 20C32 20 42 28 42 36C42 42 37 46 32 46C27 46 22 42 22 36Z" fill="#FACC15" />
          </svg>
          <div className="text-left">
            <div className="font-black text-sm text-[#E11D48] leading-tight">MASTER</div>
            <div className="text-[10px] font-bold text-slate-700 uppercase">Paints</div>
          </div>
        </div>
      ),
    },
    {
      id: 'master-tiles',
      name: 'Master Sanitary & Tiles',
      tagline: 'Luxury Bathrooms & Tile Work',
      category: 'Ceramic Tiles & Sanitary Engineering',
      description: 'Partner for plumbing and construction trades. Providing certified non-leak fitting training for master plumbers.',
      benefits: 'Anti-leak guarantee certification backed by Master Ceramics.',
      logo: (
        <div className="flex items-center gap-2.5">
          <svg className="w-11 h-11 shrink-0" viewBox="0 0 64 64" fill="none">
            <rect x="14" y="14" width="36" height="36" rx="4" fill="#0284C7" />
            <path d="M14 32H50M32 14V50" stroke="#FFFFFF" strokeWidth="2.5" />
            <circle cx="32" cy="32" r="6" fill="#F97316" />
          </svg>
          <div className="text-left">
            <div className="font-extrabold text-sm text-[#0284C7] leading-tight">MASTER</div>
            <div className="text-[10px] font-bold text-slate-700 uppercase">Tiles &amp; Sanitary</div>
          </div>
        </div>
      ),
    },
  ];

  // The 8 Specialized Trades directly matching the user's reference image
  const specializedTrades: {
    category: TradeCategory;
    title: string;
    urduSubtitle: string;
    description: string;
    icon: React.ReactNode;
  }[] = [
    {
      category: 'Electrician',
      title: 'Electrician',
      urduSubtitle: 'Bijli ka Kaam',
      description: 'Short circuit, fan, solar & DB breaker fix',
      icon: (
        <svg className="w-16 h-16" viewBox="0 0 80 80" fill="none">
          {/* Orange/Yellow lightning bolt */}
          <path d="M38 10L20 42H38L34 70L58 34H40L46 10H38Z" fill="#F97316" stroke="#C2410C" strokeWidth="2" strokeLinejoin="round" />
          {/* Blue Pliers crossed */}
          <path d="M46 22L62 38M46 38L62 22" stroke="#1E3A8A" strokeWidth="4" strokeLinecap="round" />
          <path d="M54 30L68 44C70 46 70 50 68 52L64 56C62 58 58 58 56 56L44 44" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
          <path d="M54 30L44 20C42 18 38 18 36 20L32 24" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
          <circle cx="54" cy="30" r="3" fill="#1E3A8A" />
        </svg>
      ),
    },
    {
      category: 'Plumber',
      title: 'Plumber',
      urduSubtitle: 'Plumber ka Kaam',
      description: 'Water leak, PPRC pipe, motor & tank fit',
      icon: (
        <svg className="w-16 h-16" viewBox="0 0 80 80" fill="none">
          {/* Cyan/Blue Pipes */}
          <path d="M16 24H32V48H48V64" stroke="#0284C7" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 24H20M48 60H48V68" stroke="#1E3A8A" strokeWidth="3" strokeLinecap="round" />
          {/* Red/Orange Pipe Wrench */}
          <path d="M22 62L52 26" stroke="#EA580C" strokeWidth="6" strokeLinecap="round" />
          <path d="M44 20L58 14C60 13 64 15 64 18V26L52 34" fill="#F97316" stroke="#9A3412" strokeWidth="2" strokeLinejoin="round" />
          <rect x="42" y="22" width="6" height="12" rx="1" fill="#475569" transform="rotate(-40 42 22)" />
          {/* Water drop */}
          <path d="M48 50C48 50 53 56 53 58C53 60 51 62 48 62C45 62 43 60 43 58C43 56 48 50 48 50Z" fill="#38BDF8" />
        </svg>
      ),
    },
    {
      category: 'Construction',
      title: 'Construction Worker',
      urduSubtitle: 'Mazdoor',
      description: 'Brickwork, plaster, tiles & boundary wall',
      icon: (
        <svg className="w-16 h-16" viewBox="0 0 80 80" fill="none">
          {/* Orange Brick Wall */}
          <rect x="18" y="44" width="44" height="24" rx="2" fill="#EA580C" stroke="#9A3412" strokeWidth="2" />
          <line x1="18" y1="52" x2="62" y2="52" stroke="#FFFFFF" strokeWidth="2" />
          <line x1="18" y1="60" x2="62" y2="60" stroke="#FFFFFF" strokeWidth="2" />
          <line x1="32" y1="44" x2="32" y2="52" stroke="#FFFFFF" strokeWidth="1.5" />
          <line x1="48" y1="44" x2="48" y2="52" stroke="#FFFFFF" strokeWidth="1.5" />
          <line x1="25" y1="52" x2="25" y2="60" stroke="#FFFFFF" strokeWidth="1.5" />
          <line x1="40" y1="52" x2="40" y2="60" stroke="#FFFFFF" strokeWidth="1.5" />
          <line x1="55" y1="52" x2="55" y2="60" stroke="#FFFFFF" strokeWidth="1.5" />
          {/* Hardhat Helmet */}
          <path d="M22 36C22 24 30 18 40 18C50 18 58 24 58 36H22Z" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
          <path d="M18 36H62" stroke="#B45309" strokeWidth="3" strokeLinecap="round" />
          {/* Mason Trowel */}
          <path d="M48 38L62 26L54 22L44 32" fill="#94A3B8" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
          <path d="M60 28L68 34" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      category: 'Mechanic',
      title: 'Mechanic',
      urduSubtitle: 'Mistri',
      description: 'Car tuning, bike brakes, gas generators',
      icon: (
        <svg className="w-16 h-16" viewBox="0 0 80 80" fill="none">
          {/* Blue Gear */}
          <path d="M40 22C30 22 22 30 22 40C22 50 30 58 40 58C50 58 58 50 58 40C58 30 50 22 40 22ZM40 48C35.6 48 32 44.4 32 40C32 35.6 35.6 32 40 32C44.4 32 48 35.6 48 40C48 44.4 44.4 48 40 48Z" fill="#E2E8F0" stroke="#1E40AF" strokeWidth="3" />
          <path d="M38 16H42V22H38V16ZM38 58H42V64H38V58ZM16 38H22V42H16V38ZM58 38H64V42H58V38Z" fill="#1E40AF" />
          {/* Steel Double Spanner */}
          <path d="M24 62L56 22" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" />
          <path d="M50 16L60 16L64 24L58 30L52 24" fill="#0284C7" stroke="#0369A1" strokeWidth="2" />
          <path d="M28 64L18 64L14 56L20 50L26 56" fill="#0284C7" stroke="#0369A1" strokeWidth="2" />
          {/* Spark Accents */}
          <path d="M58 14L62 10M66 18L70 18" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      category: 'Driver',
      title: 'Driver',
      urduSubtitle: 'Driver/Delivery',
      description: 'Intercity van, chauffeur & swift cargo',
      icon: (
        <svg className="w-16 h-16" viewBox="0 0 80 80" fill="none">
          {/* Dark Navy Steering Wheel Outer Rim */}
          <circle cx="34" cy="40" r="22" stroke="#1E3A8A" strokeWidth="5" />
          <circle cx="34" cy="40" r="7" fill="#1E3A8A" />
          <line x1="34" y1="18" x2="34" y2="33" stroke="#1E3A8A" strokeWidth="4" />
          <line x1="12" y1="40" x2="27" y2="40" stroke="#1E3A8A" strokeWidth="4" />
          <line x1="56" y1="40" x2="41" y2="40" stroke="#1E3A8A" strokeWidth="4" />
          {/* Speedy Orange Delivery Truck */}
          <rect x="42" y="38" width="22" height="15" rx="2" fill="#F97316" stroke="#EA580C" strokeWidth="1.5" />
          <path d="M64 42H70L74 48V53H64V42Z" fill="#EA580C" />
          <circle cx="48" cy="54" r="3.5" fill="#1E293B" />
          <circle cx="68" cy="54" r="3.5" fill="#1E293B" />
          {/* Speed Wind Lines */}
          <line x1="32" y1="34" x2="40" y2="34" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
          <line x1="30" y1="48" x2="38" y2="48" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      category: 'Painter',
      title: 'Painter',
      urduSubtitle: 'Rangsaaz',
      description: 'Emulsion, weather sheet, putty & spray',
      icon: (
        <svg className="w-16 h-16" viewBox="0 0 80 80" fill="none">
          {/* Paint Roller with Teal Wash */}
          <rect x="22" y="16" width="30" height="12" rx="3" fill="#0D9488" stroke="#115E59" strokeWidth="2" />
          <path d="M37 28V36H48V48" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="45" y="48" width="6" height="14" rx="2" fill="#92400E" />
          {/* Hand Paint Brush with Colorful Paint Swatches */}
          <path d="M16 46L28 34L36 42L24 54Z" fill="#3B82F6" />
          <path d="M16 46L12 56C12 58 14 60 16 60L24 54" fill="#1E40AF" />
          {/* Colorful splashes: yellow, coral, cyan */}
          <circle cx="58" cy="22" r="3" fill="#F59E0B" />
          <circle cx="64" cy="30" r="4" fill="#EF4444" />
          <circle cx="58" cy="38" r="3" fill="#06B6D4" />
          <path d="M22 28C22 34 26 34 26 28" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      category: 'Woodwork',
      title: 'Carpenter',
      urduSubtitle: 'Tarkhan',
      description: 'Door locks, wardrobes, kitchen cabinets',
      icon: (
        <svg className="w-16 h-16" viewBox="0 0 80 80" fill="none">
          {/* Wood Beam / Block */}
          <rect x="16" y="48" width="48" height="14" rx="2" fill="#B45309" stroke="#78350F" strokeWidth="2" />
          <line x1="22" y1="52" x2="58" y2="52" stroke="#FDE68A" strokeWidth="1.5" />
          <line x1="28" y1="58" x2="52" y2="58" stroke="#FDE68A" strokeWidth="1.5" />
          {/* Hand Saw with sharp teeth */}
          <path d="M18 42L56 16L58 20L22 46Z" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
          <path d="M18 42L14 46C12 48 12 52 16 54L20 52" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" />
          {/* Claw Hammer crossed */}
          <path d="M38 20L62 48" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
          <path d="M34 16L44 14L46 22L36 24Z" fill="#475569" stroke="#1E293B" strokeWidth="1.5" />
          <path d="M44 14C48 10 52 10 54 12" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      category: 'Security Guard',
      title: 'Security Guard',
      urduSubtitle: 'Chowkidar',
      description: 'Armed guard, residence & factory watchman',
      icon: (
        <svg className="w-16 h-16" viewBox="0 0 80 80" fill="none">
          {/* Shield Outline with Golden/Blue border */}
          <path d="M40 14L62 22V38C62 52 40 66 40 66C40 66 18 52 18 38V22L40 14Z" fill="#EFF6FF" stroke="#1E3A8A" strokeWidth="3" strokeLinejoin="round" />
          <path d="M40 18L58 25V37C58 48 40 60 40 60C40 60 22 48 22 37V25L40 18Z" fill="#DBEAFE" />
          {/* Guard Silhouette */}
          <circle cx="40" cy="32" r="5" fill="#1E3A8A" />
          <path d="M32 46C32 40 35 38 40 38C45 38 48 40 48 46V52H32V46Z" fill="#1E3A8A" />
          {/* Red Tie / Badge Accent */}
          <path d="M39 40H41L42 46L40 49L38 46L39 40Z" fill="#EA580C" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-12">
      {/* 1. TOP SECTION: OUR LOCAL PARTNERS MARQUEE SCROLLER */}
      <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        {/* Section Heading matching screenshot */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Pakistan Leading Corporate &amp; Industrial Network</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            Our Local Partners
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Trusted by Pakistan top infrastructure developers, textile mills, logistics fleets, and consumer electronics brands
          </p>
        </div>

        {/* Scrolling Partner Logo Strip (Seamless Infinite Marquee) */}
        <div className="relative w-full overflow-hidden mask-fade-edges py-2">
          {/* Edge fade gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Marquee Track */}
          <div className="flex items-center gap-6 sm:gap-8 animate-marquee hover:pause-marquee">
            {/* Duplicated list for seamless infinite loop */}
            {[...partners, ...partners].map((partner, idx) => (
              <button
                key={`${partner.id}-${idx}`}
                onClick={() => setSelectedPartner(partner)}
                className="bg-slate-50/80 hover:bg-white rounded-2xl px-6 py-4 border border-slate-200/80 hover:border-emerald-300 hover:shadow-md transition-all shrink-0 flex items-center gap-3 cursor-pointer group text-left min-w-[210px]"
                title={`Click to view ${partner.name} partnership details`}
              >
                {partner.logo}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel Slide Indicators matching screenshot */}
        <div className="flex items-center justify-center gap-2 pt-1">
          <button
            onClick={() => setActiveSlide(0)}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${
              activeSlide === 0 ? 'w-8 bg-[#1E3A8A]' : 'w-4 bg-slate-300 hover:bg-slate-400'
            }`}
            aria-label="Partner slide 1"
          />
          <button
            onClick={() => setActiveSlide(1)}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${
              activeSlide === 1 ? 'w-8 bg-[#1E3A8A]' : 'w-4 bg-slate-300 hover:bg-slate-400'
            }`}
            aria-label="Partner slide 2"
          />
        </div>
      </section>

      {/* 2. BOTTOM SECTION: EXPLORE SPECIALIZED TRADES IN PAKISTAN (EXACT MATCH TO REFERENCE SCREENSHOT) */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            Explore Specialized Trades in Pakistan
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Hunar-mand Karigars available in <strong>{selectedCity}</strong> — 100% CNIC verified with direct mobile connection and zero advance risk
          </p>
        </div>

        {/* 8 Trade Cards Grid (Exact matching layout of user attachment) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {specializedTrades.map((trade) => (
            <div
              key={trade.category}
              onClick={() => onSelectCategory && onSelectCategory(trade.category)}
              className="group bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-col items-center text-center shadow-xs hover:shadow-xl hover:border-emerald-500 hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden"
            >
              {/* Top Subtle Glow */}
              <div className="absolute top-0 inset-x-0 h-1 bg-transparent group-hover:bg-gradient-to-r group-hover:from-emerald-500 group-hover:to-teal-500 transition-colors" />

              {/* Bespoke Illustrated Icon */}
              <div className="w-20 h-20 rounded-2xl bg-slate-50 group-hover:bg-emerald-50/70 border border-slate-100 group-hover:border-emerald-200 flex items-center justify-center transition-colors mb-4 group-hover:scale-105 transform duration-300">
                {trade.icon}
              </div>

              {/* English Title */}
              <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-emerald-800 transition-colors">
                {trade.title}
              </h3>

              {/* Urdu Subtitle as in screenshot */}
              <p className="text-xs font-bold text-slate-500 group-hover:text-emerald-700 mt-0.5 tracking-wide">
                {trade.urduSubtitle}
              </p>

              {/* Short Scannable Spec */}
              <p className="text-[11px] text-slate-400 mt-2 line-clamp-1">
                {trade.description}
              </p>

              {/* Action Link */}
              <div className="mt-4 pt-3 border-t border-slate-100 w-full flex items-center justify-between text-xs font-semibold text-emerald-800 group-hover:text-emerald-900">
                <span>Find in {selectedCity}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Partner Detail Popover / Modal (Safe replacement for window.alert) */}
      {selectedPartner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white p-1 rounded-lg">
                  {selectedPartner.logo}
                </div>
              </div>
              <button
                onClick={() => setSelectedPartner(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {selectedPartner.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  {selectedPartner.name}
                </h3>
                <p className="text-xs text-slate-500 font-semibold">
                  {selectedPartner.tagline}
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-700 space-y-2">
                <p className="leading-relaxed">{selectedPartner.description}</p>
                <div className="pt-2 border-t border-slate-200 flex items-start gap-2 text-emerald-900 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Marketplace Benefit:</strong> {selectedPartner.benefits}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => setSelectedPartner(null)}
                  className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Close &amp; Continue Browsing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
