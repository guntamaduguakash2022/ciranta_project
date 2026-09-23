/**
 * js/ui/injectedStyles.js
 * Injects non-intrusive CSS styles for Member 2 interactive components:
 * Cart Drawer, Modals, Toasts, Search Bar, Rating Stars, Wishlist Icons.
 * Reuses Member 1 CSS variables perfectly (--ink, --paper, --blue, --coral, --line, --muted).
 */

window.Ciranta = window.Ciranta || {};

(function (app) {
  'use strict';

  function initInjectedStyles() {
    if (document.getElementById('ciranta-member2-styles')) return;

    const styleEl = document.createElement('style');
    styleEl.id = 'ciranta-member2-styles';
    styleEl.textContent = `
      /* ====== CIRANTA MEMBER 2 EXTENSIONS ====== */

      /* Dynamic Course Card Improvements */
      .cell.enhanced-card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      .cell.enhanced-card:hover {
        transform: translateY(-2px);
        background: #fafbf9;
      }
      .course-card-top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 8px;
      }
      .badge-tag {
        font-size: 0.72rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        padding: 3px 8px;
        border-radius: 2px;
      }
      .badge-bestseller { background: #ffe8e4; color: var(--coral); }
      .badge-new { background: #e3ebff; color: var(--blue); }
      .badge-hot { background: #fdf3d8; color: #b7791f; }

      .wishlist-btn {
        background: transparent;
        border: none;
        cursor: pointer;
        font-size: 1.25rem;
        line-height: 1;
        color: #a0a6b2;
        transition: color 0.15s ease, transform 0.15s ease;
        padding: 2px;
      }
      .wishlist-btn:hover {
        transform: scale(1.15);
        color: var(--coral);
      }
      .wishlist-btn.active {
        color: var(--coral);
      }

      .course-card-meta-row {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 0.8rem;
        color: var(--muted);
        margin: 10px 0 14px;
      }
      .course-rating {
        color: #e59819;
        font-weight: 600;
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
      .course-pricing-row {
        display: flex;
        align-items: baseline;
        gap: 8px;
        margin-top: 10px;
      }
      .current-price {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 1.15rem;
        font-weight: 700;
        color: var(--ink);
      }
      .original-price {
        font-size: 0.82rem;
        text-decoration: line-through;
        color: #8c93a0;
      }
      .card-actions-row {
        display: flex;
        gap: 8px;
        margin-top: 16px;
        padding-top: 14px;
        border-top: 1px solid var(--line);
      }
      .card-actions-row .btn-sm {
        padding: 8px 12px;
        font-size: 0.8rem;
        flex: 1;
        text-align: center;
        justify-content: center;
      }

      /* Search & Controls Bar */
      .courses-toolbar {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
        padding: 18px 0;
        border-bottom: 1px solid var(--line);
      }
      .search-box-wrap {
        position: relative;
        flex: 1;
        max-width: 380px;
        min-width: 240px;
      }
      .search-input {
        width: 100%;
        padding: 10px 14px 10px 38px;
        border: 1px solid var(--line);
        background: #fff;
        border-radius: 2px;
        font-family: 'Inter', sans-serif;
        font-size: 0.88rem;
        outline: none;
        transition: border-color 0.15s;
      }
      .search-input:focus {
        border-color: var(--blue);
        box-shadow: 0 0 0 1px var(--blue);
      }
      .search-icon {
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        color: var(--muted);
        pointer-events: none;
        font-size: 0.9rem;
      }
      .sort-select {
        padding: 9px 14px;
        border: 1px solid var(--line);
        background: #fff;
        border-radius: 2px;
        font-family: 'Inter', sans-serif;
        font-size: 0.85rem;
        color: var(--ink);
        cursor: pointer;
        outline: none;
      }
      .results-count {
        font-size: 0.85rem;
        color: var(--muted);
      }

      /* Floating Cart Button */
      .floating-cart-btn {
        position: fixed;
        bottom: 28px;
        right: 28px;
        background: var(--ink);
        color: #fff;
        border: 1px solid var(--line-dark);
        border-radius: 50px;
        padding: 12px 20px;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        font-family: 'Space Grotesk', sans-serif;
        font-weight: 600;
        font-size: 0.92rem;
        box-shadow: 0 8px 24px rgba(18, 24, 31, 0.2);
        z-index: 99;
        transition: transform 0.2s ease, background 0.2s ease;
      }
      .floating-cart-btn:hover {
        transform: translateY(-3px);
        background: var(--blue);
      }
      .cart-badge {
        background: var(--coral);
        color: #fff;
        font-size: 0.72rem;
        padding: 2px 7px;
        border-radius: 20px;
        font-weight: 700;
      }

      /* Slide-Over Cart Drawer */
      .cart-overlay {
        position: fixed;
        inset: 0;
        background: rgba(18, 24, 31, 0.6);
        backdrop-filter: blur(2px);
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
      }
      .cart-overlay.active {
        opacity: 1;
        visibility: visible;
      }
      .cart-drawer {
        position: fixed;
        top: 0;
        right: -420px;
        width: 100%;
        max-width: 420px;
        height: 100%;
        background: var(--paper);
        border-left: 1px solid var(--line);
        box-shadow: -4px 0 30px rgba(0, 0, 0, 0.15);
        z-index: 1001;
        display: flex;
        flex-direction: column;
        transition: right 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .cart-overlay.active .cart-drawer {
        right: 0;
      }
      .cart-header {
        padding: 24px;
        border-bottom: 1px solid var(--line);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .cart-header h3 {
        font-size: 1.25rem;
      }
      .cart-close-btn {
        background: none;
        border: none;
        font-size: 1.4rem;
        cursor: pointer;
        color: var(--muted);
      }
      .cart-body {
        flex: 1;
        overflow-y: auto;
        padding: 24px;
      }
      .cart-empty-state {
        text-align: center;
        padding: 60px 20px;
        color: var(--muted);
      }
      .cart-empty-state span {
        font-size: 2.5rem;
        display: block;
        margin-bottom: 12px;
      }
      .cart-item {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 16px 0;
        border-bottom: 1px solid var(--line);
        gap: 12px;
      }
      .cart-item-info h4 {
        font-size: 0.95rem;
        margin-bottom: 4px;
      }
      .cart-item-info p {
        font-size: 0.8rem;
        color: var(--muted);
      }
      .cart-item-price {
        font-family: 'Space Grotesk', sans-serif;
        font-weight: 700;
        font-size: 0.95rem;
      }
      .cart-remove-btn {
        background: none;
        border: none;
        color: #ff4757;
        font-size: 0.8rem;
        cursor: pointer;
        padding: 0;
        margin-top: 6px;
      }
      .cart-footer {
        padding: 24px;
        border-top: 1px solid var(--line);
        background: #fff;
      }
      .coupon-box {
        display: flex;
        gap: 8px;
        margin-bottom: 18px;
      }
      .coupon-input {
        flex: 1;
        border: 1px solid var(--line);
        padding: 8px 12px;
        border-radius: 2px;
        font-size: 0.85rem;
        text-transform: uppercase;
      }
      .coupon-btn {
        padding: 8px 14px;
        font-size: 0.82rem;
      }
      .cart-summary-line {
        display: flex;
        justify-content: space-between;
        font-size: 0.9rem;
        color: var(--muted);
        margin-bottom: 8px;
      }
      .cart-summary-total {
        display: flex;
        justify-content: space-between;
        font-size: 1.15rem;
        font-family: 'Space Grotesk', sans-serif;
        font-weight: 700;
        color: var(--ink);
        padding-top: 12px;
        margin-top: 10px;
        border-top: 1px solid var(--line);
      }

      /* Modal System */
      .ciranta-modal-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(18, 24, 31, 0.7);
        backdrop-filter: blur(3px);
        z-index: 1100;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.25s ease, visibility 0.25s ease;
      }
      .ciranta-modal-backdrop.show {
        opacity: 1;
        visibility: visible;
      }
      .ciranta-modal-box {
        background: var(--paper);
        border: 1px solid var(--line);
        max-width: 640px;
        width: 100%;
        max-height: 88vh;
        overflow-y: auto;
        padding: 36px;
        position: relative;
        box-shadow: 0 16px 40px rgba(0,0,0,0.2);
        transform: translateY(20px);
        transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .ciranta-modal-backdrop.show .ciranta-modal-box {
        transform: translateY(0);
      }
      .modal-close-btn {
        position: absolute;
        top: 20px;
        right: 20px;
        background: transparent;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--muted);
      }

      /* Syllabus Accordion */
      .syllabus-accordion {
        border-top: 1px solid var(--line);
        margin-top: 24px;
      }
      .accordion-item {
        border-bottom: 1px solid var(--line);
      }
      .accordion-header {
        width: 100%;
        text-align: left;
        padding: 16px 0;
        background: none;
        border: none;
        font-family: 'Space Grotesk', sans-serif;
        font-size: 1.05rem;
        font-weight: 600;
        color: var(--ink);
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
      }
      .accordion-header span.toggle-symbol {
        font-size: 1.2rem;
        color: var(--blue);
        transition: transform 0.2s ease;
      }
      .accordion-item.active .accordion-header span.toggle-symbol {
        transform: rotate(45deg);
      }
      .accordion-body {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease, padding 0.3s ease;
      }
      .accordion-item.active .accordion-body {
        max-height: 350px;
        padding-bottom: 16px;
      }
      .accordion-body ul {
        list-style: none;
        padding-left: 0;
      }
      .accordion-body li {
        font-size: 0.88rem;
        color: var(--muted);
        padding: 6px 0;
        border-bottom: 1px dashed #e6e8e2;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .accordion-body li:before {
        content: '•';
        color: var(--blue);
      }

      /* Toasts */
      .ciranta-toast-container {
        position: fixed;
        bottom: 24px;
        left: 24px;
        z-index: 2000;
        display: flex;
        flex-direction: column;
        gap: 10px;
        pointer-events: none;
      }
      .ciranta-toast {
        background: var(--ink);
        color: #fff;
        padding: 12px 18px;
        border-radius: 3px;
        font-size: 0.88rem;
        display: flex;
        align-items: center;
        gap: 12px;
        box-shadow: 0 6px 20px rgba(0,0,0,0.25);
        pointer-events: auto;
        opacity: 0;
        transform: translateY(12px);
        transition: opacity 0.2s ease, transform 0.2s ease;
        max-width: 360px;
      }
      .ciranta-toast.show {
        opacity: 1;
        transform: translateY(0);
      }
      .ciranta-toast-success { border-left: 4px solid #10b981; }
      .ciranta-toast-error { border-left: 4px solid var(--coral); }
      .ciranta-toast-info { border-left: 4px solid var(--blue); }
      .ciranta-toast-warning { border-left: 4px solid #f59e0b; }
      .ciranta-toast-icon { font-weight: bold; }
      .ciranta-toast-close {
        background: none;
        border: none;
        color: #a0a6b2;
        cursor: pointer;
        font-size: 1.1rem;
        margin-left: auto;
      }

      /* Form Validation Feedback */
      .field-error-msg {
        color: var(--coral);
        font-size: 0.78rem;
        margin-top: 4px;
        display: none;
      }
      .field.has-error input, .field.has-error textarea {
        border-color: var(--coral) !important;
      }
      .field.has-error .field-error-msg {
        display: block;
      }

      /* Cohort Countdown Widget */
      .countdown-timer-box {
        background: #fff;
        border: 1px solid var(--line);
        padding: 14px;
        margin: 18px 0;
        border-radius: 2px;
      }
      .countdown-title {
        font-size: 0.78rem;
        text-transform: uppercase;
        color: var(--muted);
        letter-spacing: 0.05em;
        font-weight: 600;
        margin-bottom: 8px;
      }
      .countdown-digits {
        display: flex;
        gap: 12px;
      }
      .digit-col {
        text-align: center;
      }
      .digit-val {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 1.3rem;
        font-weight: 700;
        color: var(--ink);
      }
      .digit-label {
        font-size: 0.68rem;
        color: var(--muted);
        text-transform: uppercase;
      }
    `;

    document.head.appendChild(styleEl);
  }

  app.InjectedStyles = { init: initInjectedStyles };
})(window.Ciranta);
