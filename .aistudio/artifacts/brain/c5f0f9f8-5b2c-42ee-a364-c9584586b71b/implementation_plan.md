# LabourHub.pk — Pakistan's On-Demand Task & Skill Marketplace

LabourHub.pk transforms from a static one-page WordPress presence into a high-trust, multi-city localized peer-to-peer task marketplace. The platform connects everyday Pakistani homeowners and small businesses seeking trusted help (*"Worker Chahiye"*) with verified blue-collar tradespeople and freelancers (*"Kaam Chahiye"*), backed by NADRA CNIC badge verification, live real-time bidding, and monthly Pro worker subscriptions.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The following decisions synthesize your confirmed Phase 1 specifications and regional marketplace priorities.

- **Confirmed Mode & Scope**: Fully interactive marketplace prototype featuring instant role-switching (*Worker Chahiye* vs *Kaam Chahiye*), live job bidding ticker, multi-step CNIC verification simulation, and an exportable WordPress deployment architecture blueprint.
- **Confirmed Trades & City Coverage**: Nationwide multi-city support (Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, Gujranwala, Sialkot) across all requested core trades: Electrician (*Bijli Mistri*), Plumber (*Plumber / Nalkar*), Mechanic (*Auto / Generator Mistri*), Construction (*Mason / Raj Mistri*), Woodwork (*Carpenter / Tarkhan*), Painter (*Rang Mistri*), AC & Appliance Repair, Deep Cleaning, and Digital/Freelance gigs.
- **Confirmed Monetization**: Monthly Pro Worker Subscription (PKR 1,499/mo with 0% commission, priority bid placement, and Gold Pro Verified Badge), alongside standard pay-as-you-go commission (10% platform fee on completed jobs) and Featured Task pinning (PKR 350 per urgent job) with simulated JazzCash, EasyPaisa, and Raast payouts.

---

## 1. Overview & Core Concept

- **What It Does**: A bilingual, trust-first service marketplace enabling Pakistani customers to post jobs with photos, voice notes, and PKR budgets, receive competitive bids from local workers in real-time, and hire with confidence through NADRA CNIC and OTP verification badges.
- **Target Audience / Personas**:
  1. **Employers (*Worker Chahiye*)**: Homeowners, renters, and commercial shopkeepers needing swift, accountable repairs without negotiating at street corners (*chowks*).
  2. **Service Pros & Helpers (*Kaam Chahiye*)**: Independent electricians, plumbers, carpenters, mechanics, and painters seeking consistent daily work, fair direct pay, and professional reputation badges.
- **Key Value**: Eradicates traditional market distrust (*"kaam theek nahi kia, bhaag gaya"*) via verified CNIC identity, escrow milestone tracking, transparent customer reviews, and immediate mobile wallet payouts.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **City & Trade Discovery Flow**: User selects their city (e.g., Lahore - Gulberg/DHA or Karachi - Clifton) and clicks a trade card (e.g., Electrician). The view updates dynamically with localized active jobs, verified local pros, and average PKR rates.
2. **"Worker Chahiye" (Job Posting Flow)**:
   - Step 1: Select trade and write job details in English or Roman Urdu (*"2 ceiling fans lagwane hain aur wiring check karni hai"*).
   - Step 2: Set urgency (Urgent / Aaj hi / 3 Din Me) and budget (Fixed PKR or open to bids). Optional PKR 350 "Featured / Urgent" pin.
   - Step 3: Instant publish to the live bidding pool with SMS notification simulation.
3. **"Kaam Chahiye" (Live Bidding & Task Acceptance)**:
   - Helper views the live ticker of open tasks with budget brackets in PKR.
   - Places a bid with price, estimated hours, and a short voice/text proposal (*"Main 30 mins me pohnch sakta hoon with complete tools"*).
   - Employer receives bids, reviews the worker's CNIC badge status and ratings, and accepts.
4. **Trust & Verification Funnel**:
   - Helper profile verification: 13-digit CNIC input with NADRA formatting (`XXXXX-XXXXXXX-X`), front/back photo upload simulation, and 6-digit SMS OTP verification.
   - Instant award of the green "Verified CNIC Pro" shield badge.
5. **Pro Worker Membership Club**:
   - Monthly subscription checkout (PKR 1,499/mo) with JazzCash / EasyPaisa / Card.
   - Highlights 0% commission on all earnings, top-of-feed bid placement, and VIP Gold Badge.
6. **WordPress Technical Blueprint Modal**:
   - Accessible via an architectural header button, providing turn-key WordPress implementation specifications: recommended plugin stacks (HivePress + WooCommerce Marketplace / Fluent Forms + ACF Pro), NADRA CNIC upload custom fields schema, JazzCash/EasyPaisa gateway integration hooks, and Elementor landing page layout templates.

### Visual Identity & Theme

- **Aesthetic Direction**: Purposeful, modern Pakistani civic utility with clean marketplace typography. Built around trust, reliability, and high readability under bright sunlight or mobile screens.
- **Color Palette**:
  - Dominant Canvas: Crisp white (`#FFFFFF`) and slate canvas (`#F8FAFC`).
  - Brand Primary: Deep Pakistan Forest Emerald (`#065F46` / `#047857`) representing security, prosperity, and civic trust.
  - Accent / Urgency: Vibrant Amber Ochre (`#D97706` / `#F59E0B`) for live bidding, featured tags, and PKR budget highlights.
  - Verification & Safety: Crisp Emerald Green (`#10B981`) for CNIC Verified shields and phone OTP confirmation.
- **Typography & Hierarchy**:
  - Display Face: `Plus Jakarta Sans` for crisp, contemporary headlines and brand marks.
  - Body Face: `Plus Jakarta Sans` with balanced line heights for high-contrast English & Roman Urdu microcopy.
  - Figures & Rates: Tabular monospace figures (`tabular-nums`) for clean vertical alignment across PKR prices, bid counters, and CNIC numbers.
- **Component Styling & Anti-Slop Discipline**:
  - Strictly adhering to the Zero-Pill rule: unboxed metadata separated by typographic dots (`·`), clean segmented controls for role toggling, and zero fake decorative pulse dots.
  - Generous card whitespace, single-elevation shadows, and clear interactive buttons.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Dual-Persona Instant Switcher in App Header**:
  - *Approach*: A prominent top segmented toggle letting users immediately switch between *"Worker Chahiye"* (Employer view) and *"Kaam Chahiye"* (Worker bidding view) without reloading or creating separate accounts.
  - *Why*: In emerging markets like Pakistan, early platform adopters frequently oscillate between hiring a specialist and offering secondary skills. Single-tap switching drives higher engagement.
- **Decision 2: Realistic CNIC & OTP Verification Simulation**:
  - *Approach*: Interactive multi-step verification modal with auto-formatting Pakistani CNIC mask (`35201-XXXXXXX-X`), simulated front/back card document scan, and interactive 6-digit SMS OTP code verification.
  - *Why*: Trust is the #1 barricade identified in the brief. Demonstrating the exact visual verification state reassures employers and teaches workers the steps required for account certification.
- **Decision 3: Integrated WordPress Architecture Reference Engine**:
  - *Approach*: An embedded, interactive WordPress Engineering Drawer providing exact PHP snippets, ACF field groups, HivePress hooks, and Elementor template configurations.
  - *Why*: Bridges the gap between an interactive, fully tested React prototype and the client's existing production WordPress site at `labourhub.pk`.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        LabourHub.pk Application                        │
├────────────────────────────────────────────────────────────────────────┤
│  Top Bar: Brand Wordmark | City Selector (PK) | Role Toggle | WP Specs │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌────────────────────────┐  ┌──────────────────────────────────────┐  │
│  │ Employer Mode          │  │ Worker Mode                          │  │
│  │ ("Worker Chahiye")     │  │ ("Kaam Chahiye")                     │  │
│  ├────────────────────────┤  ├──────────────────────────────────────┤  │
│  │ • Category Grid        │  │ • Live PKR Bidding Ticker            │  │
│  │   (Bijli, Nalkar, etc) │  │ • Place Bid with Tools/Hours         │  │
│  │ • Post a Task Form     │  │ • Pro Subscription Upgrade (0% fee)  │  │
│  │ • Review Incoming Bids │  │ • CNIC & OTP Verification Portal     │  │
│  │ • Hire & Milestone Pay │  │ • Worker Wallet & Earning Streaks    │  │
│  └────────────────────────┘  └──────────────────────────────────────┘  │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ Shared Marketplace Engine (LocalStorage Persistence)             │  │
│  │ • Tasks Store (Active, Featured, In-Progress, Completed)         │  │
│  │ • Bids Store (Worker ID, CNIC Status, PKR Amount, Timeline)      │  │
│  │ • Verification Store (CNIC Mask, NADRA Verified, Mobile OTP)     │  │
│  │ • Subscriptions Store (Free Tier 10% vs Pro Monthly Tier 0%)     │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ WordPress Execution Blueprint Modal (Turn-Key Migration Stack)   │  │
│  │ • HivePress / WC Marketplace configuration instructions          │  │
│  │ • Custom CNIC field definitions & NADRA validation logic         │  │
│  │ • JazzCash / EasyPaisa checkout integration patterns             │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

### Data Model & State Entities

- **Task**: `id`, `title`, `descriptionUrdu`, `category`, `city`, `area`, `budgetPKR`, `isFeatured`, `urgency`, `postedBy`, `createdAt`, `status` (`'open' | 'assigned' | 'completed'`), `bidsCount`.
- **Bid**: `id`, `taskId`, `workerName`, `workerAvatar`, `workerTrade`, `isCNICVerified`, `isPro`, `rating`, `completedJobs`, `amountPKR`, `estimatedHours`, `proposal`, `createdAt`.
- **VerificationState**: `cnicNumber`, `phone`, `otpCode`, `isOtpVerified`, `isCnicVerified`, `documentFront`, `documentBack`, `verifiedAt`.
- **ProSubscription**: `tier` (`'standard' | 'pro'`), `validUntil`, `commissionRate` (10% vs 0%), `featuredSlotsLeft`.
