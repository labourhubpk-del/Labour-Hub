import React, { useState } from 'react';
import { X, Copy, Check, Globe, Code2, ExternalLink, ShieldCheck, Sparkles, BookOpen, CheckCircle2 } from 'lucide-react';

interface EmbedWebsiteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmbedWebsiteModal: React.FC<EmbedWebsiteModalProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'wordpress' | 'iframe' | 'urdu' | 'domain'>('wordpress');

  // Detect environment URL, defaulting to the live public Cloud Run app URL for production embeds
  const defaultPublicUrl = 'https://ais-pre-dfpelpbfz2z4wcryxbkanv-370972760511.asia-northeast1.run.app';
  const browserOrigin = typeof window !== 'undefined' ? window.location.origin : defaultPublicUrl;
  
  const [selectedUrlType, setSelectedUrlType] = useState<'cloud' | 'custom' | 'browser'>(
    browserOrigin.includes('localhost') ? 'cloud' : 'cloud'
  );
  const [customDomainInput, setCustomDomainInput] = useState('https://labourhub.pk');

  if (!isOpen) return null;

  const activeAppUrl =
    selectedUrlType === 'cloud'
      ? defaultPublicUrl
      : selectedUrlType === 'custom'
      ? customDomainInput
      : browserOrigin;

  const iframeSnippet = `<!-- LabourHub.pk On-Demand Task Marketplace Embed -->
<div id="labourhub-embed-container" style="width: 100%; min-height: 850px; position: relative;">
  <iframe 
    src="${activeAppUrl}"
    title="LabourHub.pk - Pakistan's Task & Skill Marketplace"
    width="100%" 
    height="850" 
    style="width: 100%; height: 850px; border: none; border-radius: 16px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);" 
    allow="geolocation; camera; microphone"
    loading="lazy">
  </iframe>
</div>`;

  const wpShortcodePhp = `/**
 * Add this snippet to your WordPress theme's functions.php or via WPCode plugin.
 * Usage: Paste shortcode [labourhub_marketplace] on any WordPress page (e.g. /marketplace or homepage)
 */
function register_labourhub_marketplace_shortcode() {
    ob_start();
    ?>
    <div class="labourhub-app-wrapper" style="width:100%;margin:0 auto;max-width:1440px;">
        <iframe 
            src="${activeAppUrl}" 
            style="width:100%;height:90vh;min-height:850px;border:none;border-radius:18px;box-shadow:0 12px 30px rgba(0,0,0,0.08);" 
            allow="camera; geolocation"
            loading="lazy">
        </iframe>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('labourhub_marketplace', 'register_labourhub_marketplace_shortcode');`;

  const elementorGuide = [
    {
      step: '1. Log into your WordPress Dashboard',
      desc: 'Open your WordPress admin at labourhub.pk/wp-admin with your login credentials.',
      urdu: 'WordPress admin dashboard login karein.',
    },
    {
      step: '2. Open your Page with Elementor or Block Editor',
      desc: 'Edit your homepage or create a new page like "Find Karigars" or "Post a Task" (/marketplace).',
      urdu: 'Elementor ke zariye homepage ya naya page edit karein.',
    },
    {
      step: '3. Drag & Drop the "HTML" Widget',
      desc: 'Search for "HTML" or "Custom HTML" widget in the Elementor left sidebar and drop it into a full-width container.',
      urdu: 'Elementor mein "HTML" widget drag karke page par drop karein.',
    },
    {
      step: '4. Paste the Embed Snippet & Click Update',
      desc: 'Paste the copied code below into the HTML field. Click "Update" / "Publish". Your live app is immediately live on your site!',
      urdu: 'Code paste karein aur Update par click karein. Aapki website live ho chuki hai!',
    },
  ];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold tracking-tight">Add LabourHub into Your Website</h2>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-400/30">
                  WordPress &amp; HTML Embed
                </span>
              </div>
              <p className="text-xs text-slate-400">
                1-click responsive embed with Firebase auth, CNIC verification, live bidding &amp; AI
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

        {/* Quick URL Picker for Embedding */}
        <div className="bg-slate-100 border-b border-slate-200 px-5 py-3 text-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Embedding URL:</span>
            <div className="inline-flex rounded-lg p-0.5 bg-white border border-slate-300">
              <button
                onClick={() => setSelectedUrlType('cloud')}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all cursor-pointer ${
                  selectedUrlType === 'cloud'
                    ? 'bg-emerald-800 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Live Cloud App
              </button>
              <button
                onClick={() => setSelectedUrlType('custom')}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all cursor-pointer ${
                  selectedUrlType === 'custom'
                    ? 'bg-emerald-800 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Custom Domain (labourhub.pk)
              </button>
            </div>
          </div>

          <a
            href={activeAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-emerald-800 hover:text-emerald-950 text-[11px] hover:underline"
          >
            <span>Open Preview in New Tab</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {selectedUrlType === 'custom' && (
          <div className="bg-amber-50 border-b border-amber-200 px-5 py-2 flex items-center gap-2 text-xs">
            <span className="font-medium text-amber-900">Your Domain URL:</span>
            <input
              type="text"
              value={customDomainInput}
              onChange={(e) => setCustomDomainInput(e.target.value)}
              placeholder="https://labourhub.pk"
              className="bg-white border border-amber-300 rounded px-2 py-0.5 text-xs text-slate-800 flex-1 max-w-xs font-mono"
            />
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 pt-2 gap-2 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('wordpress')}
            className={`px-3.5 py-2.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'wordpress'
                ? 'border-emerald-600 text-emerald-800 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            WordPress &amp; Elementor (2 Mins)
          </button>
          <button
            onClick={() => setActiveTab('iframe')}
            className={`px-3.5 py-2.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'iframe'
                ? 'border-emerald-600 text-emerald-800 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Universal HTML Embed
          </button>
          <button
            onClick={() => setActiveTab('urdu')}
            className={`px-3.5 py-2.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'urdu'
                ? 'border-emerald-600 text-emerald-800 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            اردو میں طریقہ (Urdu Guide)
          </button>
          <button
            onClick={() => setActiveTab('domain')}
            className={`px-3.5 py-2.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'domain'
                ? 'border-emerald-600 text-emerald-800 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Hostinger / Domain DNS
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          {/* TAB 1: WordPress & Elementor */}
          {activeTab === 'wordpress' && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-emerald-950 text-sm">
                    Direct Integration into labourhub.pk
                  </span>
                  <p className="text-emerald-900 text-xs leading-relaxed">
                    You can embed this fully functioning marketplace directly into your WordPress site. All features (Firebase database, live bidding, CNIC verification, stars rating, and Gemini AI Ustad) will run seamlessly inside your WordPress layout.
                  </p>
                </div>
              </div>

              {/* 1-Click Code Box */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-xs">
                    Elementor HTML Snippet (Copy &amp; Paste):
                  </span>
                  <button
                    onClick={() => handleCopy(iframeSnippet, 'wp-iframe')}
                    className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    {copiedKey === 'wp-iframe' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'wp-iframe' ? 'Copied to Clipboard!' : 'Copy Embed Code'}</span>
                  </button>
                </div>
                <pre className="bg-slate-900 text-emerald-400 p-3.5 rounded-xl font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-800">
                  {iframeSnippet}
                </pre>
              </div>

              {/* Step by Step Elementor instructions */}
              <div className="space-y-2 pt-2">
                <h4 className="font-bold text-slate-800 text-sm">4 Simple Steps in WordPress Elementor:</h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {elementorGuide.map((item, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span>{item.step}</span>
                      </div>
                      <div className="text-slate-600 pl-6">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shortcode Option */}
              <div className="space-y-1.5 pt-3 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">Option B: WordPress Shortcode [labourhub_marketplace]</span>
                  <button
                    onClick={() => handleCopy(wpShortcodePhp, 'wp-php')}
                    className="flex items-center gap-1 text-emerald-700 hover:text-emerald-900 font-semibold cursor-pointer"
                  >
                    {copiedKey === 'wp-php' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'wp-php' ? 'Copied!' : 'Copy PHP Code'}</span>
                  </button>
                </div>
                <p className="text-slate-500 text-[11px]">
                  Add to your theme's <code>functions.php</code> or using the free <strong>WPCode</strong> plugin, then place <code>[labourhub_marketplace]</code> anywhere!
                </p>
                <pre className="bg-slate-900 text-slate-200 p-3 rounded-xl font-mono text-[10px] overflow-x-auto leading-relaxed">
                  {wpShortcodePhp}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 2: Direct Responsive Iframe */}
          {activeTab === 'iframe' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 text-sm">Universal Embed HTML Snippet</span>
                  <p className="text-slate-500 text-xs">
                    Works on any website (WordPress, Wix, Shopify, custom PHP, HTML pages)
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(iframeSnippet, 'uni-iframe')}
                  className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  {copiedKey === 'uni-iframe' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'uni-iframe' ? 'Copied!' : 'Copy HTML'}</span>
                </button>
              </div>

              <pre className="bg-slate-900 text-emerald-400 p-4 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
                {iframeSnippet}
              </pre>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
                <span className="font-bold text-slate-800">Included Full Features:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  <li>Direct phone numbers &amp; 13-digit CNIC verification (no OTP friction).</li>
                  <li>Labour star rating declarations on bids showing professional level.</li>
                  <li>Mutual completion reviews with star ratings and remarks.</li>
                  <li>Real-time Firestore live bidding &amp; Google Maps rate advisor.</li>
                  <li>Responsive layout for Android/iPhone and desktop screens.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: Urdu Guide */}
          {activeTab === 'urdu' && (
            <div className="space-y-4 text-right" dir="rtl">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-right">
                <h3 className="font-bold text-emerald-950 text-base mb-1">
                  اپنی ویب سائٹ (WordPress / Elementor) میں شامل کرنے کا آسان طریقہ
                </h3>
                <p className="text-emerald-900 text-xs leading-relaxed">
                  آپ بغیر کسی کوڈنگ کے 2 منٹ میں اس مکمل لیبر ہب مارکیٹ پلیس کو اپنی ویب سائٹ پر چلا سکتے ہیں۔
                </p>
              </div>

              <div className="space-y-3">
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                  <div className="font-bold text-slate-900 text-sm">1. ورڈپریس ایڈمن لاگ ان کریں:</div>
                  <div className="text-slate-600 text-xs">
                    اپنے ورڈپریس ڈیش بورڈ پر جائیں (مثلاً labourhub.pk/wp-admin)۔
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                  <div className="font-bold text-slate-900 text-sm">2. ایلیمنٹر میں پیج کھولیں:</div>
                  <div className="text-slate-600 text-xs">
                    ہوم پیج پر "Edit with Elementor" پر کلک کریں یا نیا پیج بنائیں۔
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                  <div className="font-bold text-slate-900 text-sm">3. HTML وجٹ شامل کریں:</div>
                  <div className="text-slate-600 text-xs">
                    بائیں پینل سے "Custom HTML" وجٹ کو ڈریگ کر کے فل ودتھ (Full Width) کنٹینر میں رکھیں۔
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                  <div className="font-bold text-slate-900 text-sm">4. کوڈ پیسٹ کریں اور پبلش کریں:</div>
                  <div className="text-slate-600 text-xs">
                    دیے گئے کوڈ کو کاپی کر کے پیسٹ کریں اور "Update" پر کلک کر دیں۔ لائیو بِڈنگ اور تمام فیچرز فوراً چل پڑیں گے!
                  </div>
                </div>
              </div>

              <div className="text-left pt-2" dir="ltr">
                <button
                  onClick={() => handleCopy(iframeSnippet, 'urdu-copy')}
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg font-bold flex items-center gap-2 cursor-pointer shadow-sm text-xs"
                >
                  {copiedKey === 'urdu-copy' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedKey === 'urdu-copy' ? 'Copied Code!' : 'Copy Embed Code Now'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: Custom Domain Setup */}
          {activeTab === 'domain' && (
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                  <span>Pointing Hostinger / Cloudflare to this Web App</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  If you want this exact marketplace to load as a direct domain or subdomain (e.g. <strong>app.labourhub.pk</strong> or <strong>labourhub.pk</strong>):
                </p>
                <div className="space-y-2 pt-1 font-mono text-xs">
                  <div className="bg-white p-3 rounded-lg border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-slate-400">Record:</span> <strong>CNAME</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">Host:</span> <strong>app</strong> or <strong>@</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">Points to:</span> <strong>ais-pre-dfpelpbfz2z4wcryxbkanv-370972760511.asia-northeast1.run.app</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-500">
            <span>Target:</span>
            <code className="text-slate-800 font-mono bg-white px-2 py-0.5 rounded border border-slate-200">
              {activeAppUrl}
            </code>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg cursor-pointer ml-auto"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
