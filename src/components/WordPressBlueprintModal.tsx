import React, { useState } from 'react';
import { Code2, Copy, Check, BookOpen, Layers, ShieldCheck, CreditCard, Sparkles, X } from 'lucide-react';

interface WordPressBlueprintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WordPressBlueprintModal: React.FC<WordPressBlueprintModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'stack' | 'copywriting' | 'cnic_code' | 'payment_code' | 'elementor'>('stack');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const cnicPhpCode = `/**
 * LabourHub.pk - NADRA 13-Digit CNIC Validation & Document Upload Hook
 * Add this to child theme's functions.php or a custom plugin 'labourhub-core.php'
 */

// 1. Validate Pakistani CNIC Format (13 digits: XXXXX-XXXXXXX-X)
add_filter('registration_errors', 'labourhub_validate_cnic_registration', 10, 3);
add_action('user_profile_update_errors', 'labourhub_validate_cnic_profile', 10, 3);

function labourhub_validate_cnic_registration($errors, $sanitized_user_login, $user_email) {
    if (isset($_POST['labourhub_user_role']) && $_POST['labourhub_user_role'] === 'helper') {
        $cnic = isset($_POST['labourhub_cnic']) ? sanitize_text_field($_POST['labourhub_cnic']) : '';
        
        // Exact NADRA 13-digit pattern: 5 digits - 7 digits - 1 digit
        $pattern = '/^[0-9]{5}-[0-9]{7}-[0-9]{1}$/';
        
        if (empty($cnic)) {
            $errors->add('cnic_empty', __('<strong>Ghalti</strong>: National CNIC number zaroori hai.', 'labourhub'));
        } elseif (!preg_match($pattern, $cnic)) {
            $errors->add('cnic_invalid', __('<strong>Ghalti</strong>: Baraye meharbani durust CNIC darj karein (e.g. 35201-1234567-1).', 'labourhub'));
        }
    }
    return $errors;
}

// 2. Save CNIC and Verification Status to User Meta
add_action('user_register', 'labourhub_save_cnic_meta', 10, 1);
function labourhub_save_cnic_meta($user_id) {
    if (isset($_POST['labourhub_cnic'])) {
        $clean_cnic = sanitize_text_field($_POST['labourhub_cnic']);
        update_user_meta($user_id, '_labourhub_cnic', $clean_cnic);
        update_user_meta($user_id, '_labourhub_cnic_verified', 0); // 0 = Pending, 1 = Verified
        update_user_meta($user_id, '_labourhub_worker_tier', 'standard'); // 'standard' or 'pro'
    }
}

// 3. Helper Badge Function for Listings & Bids
function labourhub_get_worker_badge($user_id) {
    $is_verified = get_user_meta($user_id, '_labourhub_cnic_verified', true);
    $tier = get_user_meta($user_id, '_labourhub_worker_tier', true);
    
    $output = '';
    if ($tier === 'pro') {
        $output .= '<span class="lh-badge lh-badge-pro"><i class="dashicons dashicons-awards"></i> Gold Pro (0% Fee)</span> ';
    }
    if ($is_verified) {
        $output .= '<span class="lh-badge lh-badge-cnic"><i class="dashicons dashicons-yes-alt"></i> CNIC Verified</span>';
    }
    return $output;
}`;

  const paymentPhpCode = `/**
 * LabourHub.pk - JazzCash / EasyPaisa Commission Split & Pro 0% Fee Logic
 * Integrates with WooCommerce or HivePress Marketplace Escrow
 */

add_action('woocommerce_order_status_completed', 'labourhub_calculate_marketplace_commission', 20, 1);

function labourhub_calculate_marketplace_commission($order_id) {
    $order = wc_get_order($order_id);
    $total_amount = $order->get_total();
    
    $worker_id = $order->get_meta('_labourhub_assigned_worker_id');
    if (!$worker_id) return;
    
    // Check if worker holds active monthly Pro Subscription
    $worker_tier = get_user_meta($worker_id, '_labourhub_worker_tier', true);
    
    if ($worker_tier === 'pro') {
        // 0% Platform Commission for Pro Workers
        $commission_rate = 0.00;
        $platform_fee = 0;
        $payout_amount = $total_amount;
    } else {
        // Standard Free Tier: 10% platform fee
        $commission_rate = 0.10;
        $platform_fee = round($total_amount * $commission_rate);
        $payout_amount = $total_amount - $platform_fee;
    }
    
    // Record escrow transaction in worker wallet
    update_post_meta($order_id, '_labourhub_platform_commission', $platform_fee);
    update_post_meta($order_id, '_labourhub_worker_payout', $payout_amount);
    
    // Trigger instant JazzCash / EasyPaisa Merchant Disbursement API
    labourhub_dispatch_mobile_wallet_payout($worker_id, $payout_amount, $order_id);
}

function labourhub_dispatch_mobile_wallet_payout($worker_id, $amount, $task_id) {
    $wallet_num = get_user_meta($worker_id, '_labourhub_payout_mobile', true);
    $wallet_type = get_user_meta($worker_id, '_labourhub_payout_type', true); // 'jazzcash' or 'easypaisa'
    
    // Log disbursement in custom audit table
    error_log("Dispatched Rs. {$amount} via {$wallet_type} to {$wallet_num} for Task #{$task_id}");
}`;

  const elementorShortcodeCode = `/**
 * LabourHub.pk - Live Bidding Feed Shortcode for Elementor
 * Usage in Elementor: [labourhub_live_bids city="Lahore" limit="6"]
 */

add_shortcode('labourhub_live_bids', 'labourhub_render_live_bids_ticker');

function labourhub_render_live_bids_ticker($atts) {
    $atts = shortcode_atts(array(
        'city' => 'All',
        'limit' => 6,
    ), $atts);
    
    $args = array(
        'post_type' => 'hp_listing', // HivePress or custom post type 'lh_task'
        'posts_per_page' => intval($atts['limit']),
        'post_status' => 'publish',
        'meta_query' => array(
            array(
                'key' => '_labourhub_task_status',
                'value' => 'open',
            ),
        ),
    );
    
    if ($atts['city'] !== 'All') {
        $args['meta_query'][] = array(
            'key' => '_labourhub_city',
            'value' => sanitize_text_field($atts['city']),
        );
    }
    
    $query = new WP_Query($args);
    ob_start();
    ?>
    <div class="labourhub-ticker-grid">
      <?php if ($query->have_posts()) : while ($query->have_posts()) : $query->the_post(); 
          $budget = get_post_meta(get_the_ID(), '_labourhub_budget_pkr', true);
          $bids_count = get_post_meta(get_the_ID(), '_labourhub_bids_count', true);
          $is_featured = get_post_meta(get_the_ID(), '_labourhub_is_featured', true);
      ?>
        <div class="lh-task-card <?php echo $is_featured ? 'lh-card-featured' : ''; ?>">
          <div class="lh-card-header">
            <span class="lh-city-tag"><?php echo esc_html(get_post_meta(get_the_ID(), '_labourhub_area', true)); ?></span>
            <span class="lh-budget-pkr">Rs. <?php echo number_format($budget); ?></span>
          </div>
          <h4 class="lh-task-title"><?php the_title(); ?></h4>
          <div class="lh-card-footer">
            <span><?php echo intval($bids_count); ?> Bids Placed</span>
            <a href="<?php the_permalink(); ?>" class="lh-bid-btn">Place Bid</a>
          </div>
        </div>
      <?php endwhile; wp_reset_postdata(); endif; ?>
    </div>
    <?php
    return ob_get_clean();
}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-indigo-950 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold tracking-tight">
                  LabourHub.pk — WordPress Execution Architecture
                </h2>
                <span className="bg-indigo-500/30 text-indigo-200 text-[10px] font-bold px-2 py-0.5 rounded border border-indigo-400/40">
                  Production WP Stack
                </span>
              </div>
              <p className="text-xs text-indigo-200 mt-0.5">
                Turn-key technical roadmap, custom PHP hooks, ACF schemas, and localized conversion copy
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-indigo-300 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-2 flex items-center gap-2 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('stack')}
            className={`px-3 py-1.5 font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'stack' ? 'bg-indigo-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 inline mr-1.5" />
            1. Recommended Plugin Stack
          </button>
          <button
            onClick={() => setActiveTab('copywriting')}
            className={`px-3 py-1.5 font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'copywriting' ? 'bg-indigo-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 inline mr-1.5" />
            2. Localized Microcopy Playbook
          </button>
          <button
            onClick={() => setActiveTab('cnic_code')}
            className={`px-3 py-1.5 font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'cnic_code' ? 'bg-indigo-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 inline mr-1.5" />
            3. CNIC Validation PHP Hook
          </button>
          <button
            onClick={() => setActiveTab('payment_code')}
            className={`px-3 py-1.5 font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'payment_code' ? 'bg-indigo-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5 inline mr-1.5" />
            4. Commission &amp; JazzCash Hook
          </button>
          <button
            onClick={() => setActiveTab('elementor')}
            className={`px-3 py-1.5 font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'elementor' ? 'bg-indigo-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 inline mr-1.5" />
            5. Elementor Bidding Shortcode
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          {activeTab === 'stack' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Turnkey WordPress Execution Paths for LabourHub.pk
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Replace the static one-page layout with a battle-tested marketplace plugin architecture designed for peer-to-peer task bidding.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Stack A: HivePress */}
                <div className="border-2 border-emerald-500 bg-emerald-50/30 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">
                      Stack Option A: HivePress + Marketplace
                    </span>
                    <span className="text-[10px] font-bold bg-emerald-700 text-white px-2 py-0.5 rounded">
                      RECOMMENDED
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    The cleanest TaskRabbit clone engine for WordPress with native bidding, request postings, and vendor escrow.
                  </p>
                  <ul className="text-xs space-y-1.5 text-slate-700">
                    <li>• <strong>HivePress Core</strong> (Free framework for listings &amp; vendors)</li>
                    <li>• <strong>HivePress Marketplace Addon</strong> (Payouts, commissions, &amp; vendor wallets)</li>
                    <li>• <strong>HivePress Requests</strong> (Allows employers to post "Worker Chahiye" jobs)</li>
                    <li>• <strong>HivePress Messages</strong> (Direct chat between homeowner and helper)</li>
                    <li>• <strong>WooCommerce</strong> (Checkout engine for Featured Pins and Pro Subscriptions)</li>
                  </ul>
                  <div className="text-[11px] font-semibold text-emerald-900 bg-emerald-100 p-2 rounded">
                    Best for: Fastest deployment (under 48 hours) with zero database architecture overhead.
                  </div>
                </div>

                {/* Stack B: Custom ACF Pro + Fluent Forms */}
                <div className="border border-slate-200 bg-slate-50 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">
                      Stack Option B: Custom ACF Pro + CPT
                    </span>
                    <span className="text-[10px] font-semibold bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                      MAX FLEXIBILITY
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Custom Post Types (CPT) for complete visual freedom inside Elementor Pro.
                  </p>
                  <ul className="text-xs space-y-1.5 text-slate-700">
                    <li>• <strong>Custom Post Types (CPT UI)</strong>: <code>lh_task</code> and <code>lh_bid</code></li>
                    <li>• <strong>Advanced Custom Fields (ACF Pro)</strong>: CNIC, budget PKR, city, urgent status</li>
                    <li>• <strong>Fluent Forms Pro</strong>: Multi-step frontend submission with SMS OTP addon</li>
                    <li>• <strong>WP Fusion / Paid Memberships Pro</strong>: Monthly Pro worker subscription management</li>
                  </ul>
                  <div className="text-[11px] font-semibold text-slate-700 bg-slate-200/80 p-2 rounded">
                    Best for: 100% custom pixel-perfect design matching LabourHub.pk specific UI components.
                  </div>
                </div>
              </div>

              {/* SMS OTP Gateway */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-2">
                <h4 className="font-bold text-slate-900">
                  Pakistani SMS Gateway &amp; OTP Integration
                </h4>
                <p className="text-slate-600">
                  To eliminate bogus accounts and protect homeowners, route user verification through local Pakistani telecom gateways:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-mono text-[11px]">
                  <div className="bg-white p-2 rounded border border-slate-200">
                    <strong>1. Telenor SMS API</strong> (Rs. 0.45/SMS, high delivery rate in Punjab)
                  </div>
                  <div className="bg-white p-2 rounded border border-slate-200">
                    <strong>2. Jazz Business SMS</strong> (Ideal for Karachi &amp; Sindh delivery)
                  </div>
                  <div className="bg-white p-2 rounded border border-slate-200">
                    <strong>3. Twilio / Vonage</strong> (Direct plug-and-play with Fluent Forms SMS)
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'copywriting' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  High-Converting Bilingual Copywriting (English + Roman Urdu)
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Engineered to conquer the local trust barricade while feeling natural to both educated homeowners and working mistris.
                </p>
              </div>

              <div className="space-y-3">
                <div className="border border-slate-200 rounded-xl p-3 bg-slate-50">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                    Hero Section Headline (Homeowner Trust)
                  </span>
                  <p className="font-bold text-slate-900 text-sm mt-0.5">
                    "Ghar Ka Kaam Ho Ya Dukan Ka — 30 Minute Me Ba-Aitemaad Karigar Payen"
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    "Post your repair task in 60 seconds. Receive live bids from 100% NADRA CNIC verified Electricians, Plumbers, and Carpenters in Lahore, Karachi &amp; Islamabad."
                  </p>
                </div>

                <div className="border border-slate-200 rounded-xl p-3 bg-slate-50">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                    Worker Hook ("Kaam Chahiye" Conversion)
                  </span>
                  <p className="font-bold text-slate-900 text-sm mt-0.5">
                    "Chowk Pe Intezar Khatam. Rozana Kaam Aur Poori Mehnat Ki Kamai Direct Aapke JazzCash Me!"
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    "Join Pakistan's fastest growing skilled worker network. 0% Commission for Pro members, guaranteed direct payments, zero middleman bickering."
                  </p>
                </div>

                <div className="border border-slate-200 rounded-xl p-3 bg-slate-50">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-800">
                    Trust Shield Microcopy (Barricade Destroyer)
                  </span>
                  <p className="font-bold text-slate-900 text-sm mt-0.5">
                    "100% NADRA Card Checked · Zero Advance Risk · Escrow Protection"
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    "Jab tak aap mukammal mutmain na hon, payment release nahi hoti. Every helper carries verified government identification."
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cnic_code' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    NADRA 13-Digit CNIC Validation &amp; Upload Hook
                  </h3>
                  <p className="text-xs text-slate-500">
                    Enforces <code>XXXXX-XXXXXXX-X</code> format during worker onboarding and prevents duplicate IDs.
                  </p>
                </div>
                <button
                  onClick={() => handleCopy('cnic', cnicPhpCode)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-900 hover:bg-indigo-950 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  {copiedKey === 'cnic' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'cnic' ? 'Copied!' : 'Copy PHP Code'}</span>
                </button>
              </div>
              <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">
                <code>{cnicPhpCode}</code>
              </pre>
            </div>
          )}

          {activeTab === 'payment_code' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Commission Calculation &amp; Pro 0% Split Logic
                  </h3>
                  <p className="text-xs text-slate-500">
                    Deducts 10% on standard tasks or 0% for Pro workers upon WooCommerce order completion.
                  </p>
                </div>
                <button
                  onClick={() => handleCopy('payment', paymentPhpCode)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-900 hover:bg-indigo-950 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  {copiedKey === 'payment' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'payment' ? 'Copied!' : 'Copy PHP Code'}</span>
                </button>
              </div>
              <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">
                <code>{paymentPhpCode}</code>
              </pre>
            </div>
          )}

          {activeTab === 'elementor' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Elementor Pro Dynamic Bidding Shortcode
                  </h3>
                  <p className="text-xs text-slate-500">
                    Renders an interactive live bidding ticker widget anywhere in Elementor via <code>[labourhub_live_bids]</code>.
                  </p>
                </div>
                <button
                  onClick={() => handleCopy('elementor', elementorShortcodeCode)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-900 hover:bg-indigo-950 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  {copiedKey === 'elementor' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'elementor' ? 'Copied!' : 'Copy PHP Code'}</span>
                </button>
              </div>
              <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">
                <code>{elementorShortcodeCode}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
