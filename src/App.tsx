import React, { useState, useEffect } from 'react';
import { UserRole, PakistanCity, TradeCategory, Task, Bid, UserProfile } from './types';
import { INITIAL_TASKS, INITIAL_USER, CITIES } from './data/mockData';
import { Header } from './components/Header';
import { LiveBiddingTicker } from './components/LiveBiddingTicker';
import { EmployerHome } from './components/EmployerHome';
import { WorkerHome } from './components/WorkerHome';
import { VerificationModal } from './components/VerificationModal';
import { ProSubscriptionModal } from './components/ProSubscriptionModal';
import { PostTaskModal } from './components/PostTaskModal';
import { PlaceBidModal } from './components/PlaceBidModal';
import { WordPressBlueprintModal } from './components/WordPressBlueprintModal';
import { ContactModal } from './components/ContactModal';
import { LocalPartnersMarquee } from './components/LocalPartnersMarquee';
import { OrderReviewModal } from './components/OrderReviewModal';
import { EmbedWebsiteModal } from './components/EmbedWebsiteModal';
import { GeminiAdvisorModal } from './components/GeminiAdvisorModal';
import {
  auth,
  signInWithGoogle,
  logoutUser,
  testFirestoreConnection,
  subscribeToTasks,
  saveTaskToFirestore,
  addBidToFirestore,
  completeTaskInFirestore,
  syncUserProfileToFirestore,
} from './firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import {
  ShieldCheck,
  Zap,
  CheckCircle2,
  Lock,
  Sparkles,
  Phone,
  Code2,
  Briefcase,
  Hammer,
  PlusCircle,
  Home,
  Bot,
  Globe,
  Compass,
} from 'lucide-react';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('employer');
  const [selectedCity, setSelectedCity] = useState<PakistanCity>('Lahore');
  const [selectedCategory, setSelectedCategory] = useState<TradeCategory | 'All'>('All');
  const [activeTab, setActiveTab] = useState<'tasks' | 'categories' | 'trust' | 'my-activity'>('tasks');

  // Contact modal state
  const [contactTarget, setContactTarget] = useState<{
    workerName: string;
    trade: string;
    phone: string;
    taskTitle: string;
  } | null>(null);

  // Load tasks from localStorage or mockData
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('labourhub_tasks');
    if (saved) {
      try {
        const parsed: Task[] = JSON.parse(saved);
        if (parsed && parsed.length > 0) {
          return parsed.map((t, idx) => ({
            ...t,
            orderNumber: t.orderNumber || `LH-${100 + idx}`,
          }));
        }
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_TASKS;
  });

  // User state
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('labourhub_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_USER;
  });

  // Firebase Auth user state
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);

  // Modals state
  const [isPostTaskOpen, setIsPostTaskOpen] = useState(false);
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const [isProClubOpen, setIsProClubOpen] = useState(false);
  const [isWordPressOpen, setIsWordPressOpen] = useState(false);
  const [isEmbedOpen, setIsEmbedOpen] = useState(false);
  const [isAIAdvisorOpen, setIsAIAdvisorOpen] = useState(false);
  const [biddingTask, setBiddingTask] = useState<Task | null>(null);
  const [reviewingTask, setReviewingTask] = useState<Task | null>(null);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 1. Firebase Firestore Test Connection & Auth Listener
  useEffect(() => {
    testFirestoreConnection();

    const unsubscribeAuth = onAuthStateChanged(auth, (userAuth) => {
      setCurrentUser(userAuth);
      if (userAuth) {
        showToast(`Signed in to Firebase as ${userAuth.displayName || userAuth.email}`);
        syncUserProfileToFirestore({
          id: userAuth.uid,
          name: userAuth.displayName || user.name,
          phone: user.phone,
          city: selectedCity,
          role: currentRole,
          isCNICVerified: user.isCNICVerified,
          isPro: true,
        });
      }
    });

    // 2. Real-time Firestore Tasks Subscription
    const unsubscribeTasks = subscribeToTasks(
      (liveTasks) => {
        if (liveTasks && liveTasks.length > 0) {
          // Merge with INITIAL_TASKS so user always has rich data
          setTasks((prev) => {
            const liveIds = new Set(liveTasks.map((t) => t.id));
            const retainedPrev = prev.filter((p) => !liveIds.has(p.id));
            return [...liveTasks, ...retainedPrev];
          });
        }
      },
      (err) => {
        console.warn('Using local tasks cache:', err.message);
      }
    );

    return () => {
      unsubscribeAuth();
      unsubscribeTasks();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('labourhub_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('labourhub_user', JSON.stringify(user));
  }, [user]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleGoogleSignIn = async () => {
    try {
      const userRes = await signInWithGoogle();
      if (userRes) {
        showToast(`Welcome ${userRes.displayName || 'User'}! Connected to Firebase.`);
      }
    } catch (err: any) {
      console.error(err);
      showToast('Google Sign In cancelled or unavailable.');
    }
  };

  const handleSignOut = async () => {
    await logoutUser();
    setCurrentUser(null);
    showToast('Signed out from Firebase successfully.');
  };

  const handleCreateTask = (newTask: Task) => {
    setTasks([newTask, ...tasks]);
    saveTaskToFirestore(newTask);
    showToast(`Task posted successfully in ${newTask.city}! Saved to Firestore.`);
  };

  const handleQuickPostDemoTask = (city: PakistanCity) => {
    const demoTrades: TradeCategory[] = ['Electrician', 'Plumber', 'Woodwork', 'Painter', 'Mechanic', 'Construction'];
    const randomTrade = demoTrades[Math.floor(Math.random() * demoTrades.length)];
    const sampleTask: Task = {
      id: `task-demo-${Date.now()}`,
      orderNumber: `LH-${Math.floor(120 + Math.random() * 880)}`,
      title: `${randomTrade} Service & Urgent Repair in ${city}`,
      urduTitle: `${city} میں فوری ${randomTrade} کی ضرورت`,
      category: randomTrade,
      city,
      area: 'Main Urban Sector / Model Town',
      description: `Homeowner in ${city} placed this request. Strict rule: this order is only visible to karigars & workers in ${city}.`,
      budgetPKR: 3500,
      isFixedBudget: true,
      isFeatured: true,
      urgency: 'Urgent (Aaj hi)',
      postedBy: 'Haji Aslam (Verified)',
      postedByPhone: '0300-8472910',
      postedByCnic: '35201-9876543-1',
      postedAt: 'Just now',
      status: 'open',
      bids: [],
    };
    setTasks([sampleTask, ...tasks]);
    showToast(`Order #${sampleTask.orderNumber} dispatched in ${city}! Strictly visible to ${city} workers.`);
  };

  const handleBidSubmitted = (newBid: Bid) => {
    const targetTask = tasks.find((t) => t.id === newBid.taskId);
    setTasks(
      tasks.map((t) => {
        if (t.id === newBid.taskId) {
          return {
            ...t,
            bids: [newBid, ...t.bids],
          };
        }
        return t;
      })
    );
    if (targetTask) {
      addBidToFirestore(newBid.taskId, newBid, targetTask.bids);
    }
    showToast(`Bid of Rs. ${newBid.amountPKR.toLocaleString()} submitted with ${newBid.skillStars || 5}-Star Skill Rating! Synced to Firestore.`);
  };

  const handleAcceptBid = (taskId: string, bidId: string) => {
    setTasks(
      tasks.map((t) => {
        if (t.id === taskId) {
          return {
            ...t,
            acceptedBidId: bidId,
            status: 'assigned',
          };
        }
        return t;
      })
    );
    const target = tasks.find((t) => t.id === taskId);
    showToast(`Order #${target?.orderNumber || 'LH-101'}: Bid accepted! Escrow payment held safely until completion.`);
  };

  const handleCompleteTask = (taskId: string) => {
    const target = tasks.find((t) => t.id === taskId);
    if (target) {
      setReviewingTask(target);
    }
  };

  const handleSubmitOrderReview = (data: {
    taskId: string;
    employerRemarks: string;
    employerRating: number;
    workerRemarks: string;
    workerRating: number;
  }) => {
    setTasks(
      tasks.map((t) => {
        if (t.id === data.taskId) {
          return {
            ...t,
            status: 'completed',
            employerRemarks: data.employerRemarks,
            employerRating: data.employerRating,
            workerRemarks: data.workerRemarks,
            workerRating: data.workerRating,
            completionDate: 'Just now',
          };
        }
        return t;
      })
    );
    completeTaskInFirestore(
      data.taskId,
      data.employerRemarks,
      data.employerRating,
      data.workerRemarks,
      data.workerRating
    );
    const targetTask = tasks.find((t) => t.id === data.taskId);
    showToast(`Order #${targetTask?.orderNumber || 'LH-101'} completed! Mutual remarks & stars recorded in Firestore.`);
  };

  const handleVerificationSuccess = (data: {
    fullName: string;
    cnic: string;
    phone: string;
    city: PakistanCity;
    selfieImage: string;
  }) => {
    setUser({
      ...user,
      name: data.fullName,
      phone: data.phone,
      city: data.city,
      cnicNumber: data.cnic,
      selfieImage: data.selfieImage,
      isCNICVerified: true,
    });
    setSelectedCity(data.city);
    showToast(`Mubarak ho! 100% CNIC & Selfie verified for ${data.city}. Direct mobile access activated.`);
  };

  const handleProUpgradeSuccess = () => {
    setUser({
      ...user,
      isPro: true,
      proExpiry: '30 Days Remaining',
    });
    showToast('Welcome to LabourHub Pro Club! 0% platform commission activated.');
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] flex flex-col font-sans text-slate-900 antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-2.5 text-xs animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
        onOpenPostTask={() => setIsPostTaskOpen(true)}
        onOpenVerification={() => setIsVerificationOpen(true)}
        onOpenProClub={() => setIsProClubOpen(true)}
        onOpenWordPressBlueprint={() => setIsWordPressOpen(true)}
        onOpenEmbedGuide={() => setIsEmbedOpen(true)}
        onOpenAIAdvisor={() => setIsAIAdvisorOpen(true)}
        currentUser={currentUser}
        onGoogleSignIn={handleGoogleSignIn}
        onSignOut={handleSignOut}
        isCNICVerified={user.isCNICVerified}
        isPro={user.isPro}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Live Rotating Marketplace Ticker */}
      <LiveBiddingTicker />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* TAB 1: Tasks Feed (Employer or Worker view based on currentRole) */}
        {activeTab === 'tasks' && (
          <div>
            {currentRole === 'employer' ? (
              <EmployerHome
                tasks={tasks}
                selectedCity={selectedCity}
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
                onOpenPostTask={() => setIsPostTaskOpen(true)}
                onAcceptBid={handleAcceptBid}
                onCompleteTask={handleCompleteTask}
                onContactWorker={(workerName, trade, taskTitle, phone) =>
                  setContactTarget({
                    workerName,
                    trade,
                    phone: phone || '+92 300 8472910',
                    taskTitle,
                  })
                }
              />
            ) : (
              <WorkerHome
                tasks={tasks}
                selectedCity={selectedCity}
                onCityChange={setSelectedCity}
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
                onOpenBidModal={(task) => setBiddingTask(task)}
                onOpenVerification={() => setIsVerificationOpen(true)}
                onOpenProClub={() => setIsProClubOpen(true)}
                isCNICVerified={user.isCNICVerified}
                isPro={user.isPro}
                walletBalancePKR={user.walletBalancePKR}
                streakDays={user.streakDays}
                onContactEmployer={(employerName, phone, taskTitle) =>
                  setContactTarget({
                    workerName: employerName,
                    trade: 'Homeowner / Employer',
                    phone,
                    taskTitle,
                  })
                }
                onQuickPostDemoTask={handleQuickPostDemoTask}
              />
            )}
          </div>
        )}

        {/* TAB 2: Categories Detailed Hub (Picture-based Specialized Trades & Partners) */}
        {activeTab === 'categories' && (
          <div className="space-y-6 pb-16">
            <LocalPartnersMarquee
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                setActiveTab('tasks');
              }}
              selectedCity={selectedCity}
            />
          </div>
        )}

        {/* TAB 3: 100% CNIC Trust & Security Portal */}
        {activeTab === 'trust' && (
          <div className="space-y-10 pb-16">
            <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
              <div className="relative z-10 max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 bg-emerald-800/80 text-emerald-200 px-3 py-1 rounded-full text-xs font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>The LabourHub Trust Guarantee</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  Overcoming Pakistan's Street Hiring Barricade
                </h1>
                <p className="text-sm text-emerald-100 leading-relaxed">
                  Traditional informal labor hiring in Pakistan forces homeowners to pick up strangers at street corners with zero background checks, inflated quotes, and zero recourse when plumbing leaks or wiring catches fire.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => setIsVerificationOpen(true)}
                    className="px-5 py-3 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
                  >
                    Verify Your CNIC Now
                  </button>
                  <button
                    onClick={() => setIsWordPressOpen(true)}
                    className="px-5 py-3 bg-emerald-900/80 hover:bg-emerald-900 text-white border border-emerald-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    View WordPress Verification Hook
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  NADRA 13-Digit Format Verification
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every helper's identity is authenticated against National Database &amp; Registration Authority standard format rules (XXXXX-XXXXXXX-X), requiring physical card photo uploads.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Biometric Mobile OTP Pairing
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Accounts require real-time 6-digit SMS verification paired with SIM cards registered under the worker's own government CNIC, deterring fraudulent behavior.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Milestone Escrow Protection
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Zero advance payments to unknown individuals. Employers deposit funds via JazzCash or EasyPaisa; money is only disbursed once the homeowner tests and approves the repair.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-800 flex items-center justify-center text-white font-bold text-sm">
                  LH
                </div>
                <span className="text-lg font-bold text-white tracking-tight">
                  LabourHub<span className="text-emerald-400">.pk</span>
                </span>
              </div>
              <p className="text-slate-400 text-xs max-w-md leading-relaxed">
                Pakistan's premier on-demand task and skill marketplace. Transforming localized hiring through digital CNIC verification, transparent bidding, and direct mobile wallet payouts.
              </p>
              <div className="pt-1 flex items-center gap-3 text-[11px] text-slate-500">
                <span>Emergency Services: Rescue 1122 · Police 15</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider">
                Major City Hubs
              </h4>
              <ul className="space-y-1.5 text-xs">
                <li>Lahore (DHA, Gulberg, Bahria)</li>
                <li>Karachi (Clifton, DHA, Gulshan)</li>
                <li>Islamabad &amp; Rawalpindi</li>
                <li>Faisalabad, Multan, Peshawar</li>
                <li>Gujranwala, Sialkot, Quetta</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider">
                WordPress Deployment
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connected to <strong className="text-slate-200">labourhub.pk</strong>.
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setIsEmbedOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg transition-colors text-xs cursor-pointer font-bold shadow-xs"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Add to Website (Embed Code)</span>
                </button>
                <button
                  onClick={() => setIsWordPressOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-900/60 hover:bg-indigo-900 text-indigo-200 rounded-lg border border-indigo-700/60 transition-colors text-xs cursor-pointer font-semibold"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>WordPress Blueprint</span>
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
            <div>
              © 2026 LabourHub.pk. Built for the Pakistani workforce. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span>Privacy Policy</span>
              <span>·</span>
              <span>Terms of Service</span>
              <span>·</span>
              <span>NADRA Compliance</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Contact Worker Modal */}
      {contactTarget && (
        <ContactModal
          isOpen={!!contactTarget}
          onClose={() => setContactTarget(null)}
          workerName={contactTarget.workerName}
          workerTrade={contactTarget.trade}
          phone={contactTarget.phone}
          taskTitle={contactTarget.taskTitle}
        />
      )}

      {/* Mobile Bottom Navigation Bar (Thumb-friendly for Pakistani Smartphone Users) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 flex items-center justify-around text-[10px] text-slate-600 shadow-lg">
        <button
          onClick={() => {
            setActiveTab('tasks');
            setCurrentRole('employer');
          }}
          className={`flex flex-col items-center gap-0.5 cursor-pointer ${
            activeTab === 'tasks' && currentRole === 'employer' ? 'text-emerald-800 font-bold' : ''
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Employer</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('tasks');
            setCurrentRole('helper');
          }}
          className={`flex flex-col items-center gap-0.5 cursor-pointer ${
            activeTab === 'tasks' && currentRole === 'helper' ? 'text-amber-700 font-bold' : ''
          }`}
        >
          <Hammer className="w-4 h-4" />
          <span>Worker</span>
        </button>

        <button
          onClick={() => setIsPostTaskOpen(true)}
          className="flex flex-col items-center -mt-4 bg-emerald-800 text-white p-2.5 rounded-full shadow-md cursor-pointer"
        >
          <PlusCircle className="w-5 h-5" />
          <span className="sr-only">Post Task</span>
        </button>

        <button
          onClick={() => setIsVerificationOpen(true)}
          className="flex flex-col items-center gap-0.5 cursor-pointer hover:text-emerald-800"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>CNIC</span>
        </button>

        <button
          onClick={() => setIsProClubOpen(true)}
          className="flex flex-col items-center gap-0.5 cursor-pointer hover:text-amber-700"
        >
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Pro 0%</span>
        </button>
      </div>

      {/* Modals */}
      <VerificationModal
        isOpen={isVerificationOpen}
        onClose={() => setIsVerificationOpen(false)}
        onVerificationSuccess={handleVerificationSuccess}
        initialRole={currentRole}
        initialPhone={user.phone}
        initialCity={selectedCity}
      />

      <ProSubscriptionModal
        isOpen={isProClubOpen}
        onClose={() => setIsProClubOpen(false)}
        onUpgradeSuccess={handleProUpgradeSuccess}
        isPro={user.isPro}
      />

      <PostTaskModal
        isOpen={isPostTaskOpen}
        onClose={() => setIsPostTaskOpen(false)}
        onTaskCreated={handleCreateTask}
        defaultCity={selectedCity}
      />

      <PlaceBidModal
        isOpen={!!biddingTask}
        onClose={() => setBiddingTask(null)}
        task={biddingTask}
        onBidSubmitted={handleBidSubmitted}
        isCNICVerified={user.isCNICVerified}
        isPro={user.isPro}
        onOpenVerification={() => {
          setBiddingTask(null);
          setIsVerificationOpen(true);
        }}
        onOpenProClub={() => {
          setBiddingTask(null);
          setIsProClubOpen(true);
        }}
      />

      <WordPressBlueprintModal
        isOpen={isWordPressOpen}
        onClose={() => setIsWordPressOpen(false)}
      />

      <OrderReviewModal
        isOpen={!!reviewingTask}
        onClose={() => setReviewingTask(null)}
        task={reviewingTask}
        onSubmitReview={handleSubmitOrderReview}
      />

      <EmbedWebsiteModal
        isOpen={isEmbedOpen}
        onClose={() => setIsEmbedOpen(false)}
      />

      <GeminiAdvisorModal
        isOpen={isAIAdvisorOpen}
        onClose={() => setIsAIAdvisorOpen(false)}
        selectedCity={selectedCity}
      />

      {/* Floating Launcher for Gemini AI Ustad & Add to Website Embed Guide */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5">
        <button
          onClick={() => setIsEmbedOpen(true)}
          className="group flex items-center gap-2 px-3.5 py-3 bg-indigo-900 hover:bg-indigo-950 text-white font-bold text-xs rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all border border-indigo-700/60 cursor-pointer"
          title="Add LabourHub to your WordPress / Elementor Website"
        >
          <div className="w-6 h-6 rounded-lg bg-indigo-500/30 text-indigo-200 flex items-center justify-center font-black">
            <Globe className="w-3.5 h-3.5" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-[11px] font-extrabold flex items-center gap-1.5 leading-tight">
              <span>Add to Website</span>
            </div>
            <div className="text-[9px] text-indigo-300 font-medium">Embed &amp; WordPress Code</div>
          </div>
        </button>

        <button
          onClick={() => setIsAIAdvisorOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-xs rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all border border-emerald-700/60 cursor-pointer"
          title="Open LabourHub AI Rate Advisor & Google Maps Grounding"
        >
          <div className="w-6 h-6 rounded-lg bg-amber-400 text-amber-950 flex items-center justify-center font-black">
            <Sparkles className="w-3.5 h-3.5 text-amber-950" />
          </div>
          <div className="text-left">
            <div className="text-[11px] font-extrabold flex items-center gap-1.5 leading-tight">
              <span>AI Ustad &amp; Maps</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-[9px] text-emerald-300 font-medium">PKR Rates &amp; Wholesale</div>
          </div>
        </button>
      </div>
    </div>
  );
}
