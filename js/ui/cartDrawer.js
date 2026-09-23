/**
 * js/ui/cartDrawer.js
 * Renders and controls the Slide-Over Cart Drawer and Floating Cart Button
 */

window.Ciranta = window.Ciranta || {};

(function (app) {
  'use strict';

  let overlayEl = null;
  let floatingBtn = null;

  const CartDrawer = {
    init() {
      this.createDrawerDOM();
      this.createFloatingButton();
      this.bindEvents();
      this.render();
    },

    createDrawerDOM() {
      if (document.getElementById('ciranta-cart-overlay')) return;

      overlayEl = document.createElement('div');
      overlayEl.id = 'ciranta-cart-overlay';
      overlayEl.className = 'cart-overlay';
      overlayEl.innerHTML = `
        <div class="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
          <div class="cart-header">
            <h3 id="cart-title">Your Cohort Cart</h3>
            <button class="cart-close-btn" aria-label="Close cart">&times;</button>
          </div>
          <div class="cart-body" id="cart-items-container">
            <!-- Items dynamically injected -->
          </div>
          <div class="cart-footer" id="cart-footer-container">
            <!-- Totals & checkout button dynamically injected -->
          </div>
        </div>
      `;
      document.body.appendChild(overlayEl);
    },

    createFloatingButton() {
      if (document.getElementById('ciranta-floating-cart')) return;

      floatingBtn = document.createElement('button');
      floatingBtn.id = 'ciranta-floating-cart';
      floatingBtn.className = 'floating-cart-btn';
      floatingBtn.setAttribute('aria-label', 'Open Cart');
      floatingBtn.innerHTML = `
        <span>🛒 Cart</span>
        <span class="cart-badge">0</span>
      `;
      document.body.appendChild(floatingBtn);

      floatingBtn.addEventListener('click', () => this.open());
    },

    bindEvents() {
      const closeBtn = overlayEl.querySelector('.cart-close-btn');
      closeBtn.addEventListener('click', () => this.close());

      // Close on backdrop click
      overlayEl.addEventListener('click', (e) => {
        if (e.target === overlayEl) this.close();
      });

      // Close on ESC
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlayEl.classList.contains('active')) {
          this.close();
        }
      });
    },

    open() {
      if (overlayEl) {
        overlayEl.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.render();
      }
    },

    close() {
      if (overlayEl) {
        overlayEl.classList.remove('active');
        document.body.style.overflow = '';
      }
    },

    render() {
      if (!overlayEl || !app.CartManager) return;

      const items = app.CartManager.getItems();
      const bodyContainer = overlayEl.querySelector('#cart-items-container');
      const footerContainer = overlayEl.querySelector('#cart-footer-container');
      const count = items.length;

      // Update floating button badge
      if (floatingBtn) {
        const badge = floatingBtn.querySelector('.cart-badge');
        if (badge) {
          badge.textContent = count;
        }
        floatingBtn.style.display = count > 0 ? 'inline-flex' : 'none';
      }

      if (count === 0) {
        bodyContainer.innerHTML = `
          <div class="cart-empty-state">
            <span>🎒</span>
            <h4>Your cart is empty</h4>
            <p>Explore our cohort-based tracks and choose a course to start your learning journey.</p>
            <a href="courses.html" class="btn" style="margin-top:16px;">Browse courses</a>
          </div>
        `;
        footerContainer.innerHTML = '';
        return;
      }

      // Render cart items
      bodyContainer.innerHTML = items
        .map(
          (item) => `
          <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-info">
              <h4>${item.title}</h4>
              <p>${item.duration} &bull; Mentor: ${item.instructor}</p>
              <button class="cart-remove-btn" data-remove="${item.id}">Remove</button>
            </div>
            <div class="cart-item-price">
              ${app.Helpers ? app.Helpers.formatCurrency(item.price) : '₹' + item.price}
            </div>
          </div>
        `
        )
        .join('');

      // Bind remove buttons
      bodyContainer.querySelectorAll('[data-remove]').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.dataset.remove;
          app.CartManager.removeItem(id);
        });
      });

      // Render footer with calculations and coupon
      const summary = app.CartManager.getFinancialSummary();
      const format = (amt) => (app.Helpers ? app.Helpers.formatCurrency(amt) : '₹' + amt);

      footerContainer.innerHTML = `
        <div class="coupon-box">
          <input type="text" id="coupon-code-input" class="coupon-input" placeholder="Coupon (e.g. CIRANTA20)" value="${summary.appliedCoupon || ''}" ${summary.appliedCoupon ? 'disabled' : ''}>
          ${
            summary.appliedCoupon
              ? `<button id="remove-coupon-btn" class="btn ghost coupon-btn">Remove</button>`
              : `<button id="apply-coupon-btn" class="btn coupon-btn">Apply</button>`
          }
        </div>
        <div class="cart-summary-line">
          <span>Subtotal</span>
          <span>${format(summary.subtotal)}</span>
        </div>
        ${
          summary.discountAmount > 0
            ? `
          <div class="cart-summary-line" style="color:var(--coral);">
            <span>Discount (${summary.appliedCoupon})</span>
            <span>-${format(summary.discountAmount)}</span>
          </div>
        `
            : ''
        }
        <div class="cart-summary-total">
          <span>Total</span>
          <span>${format(summary.total)}</span>
        </div>
        <button id="cart-checkout-btn" class="btn block" style="margin-top:16px;">
          Enroll Now &bull; ${format(summary.total)}
        </button>
        <p style="font-size:0.75rem;color:var(--muted);text-align:center;margin-top:8px;">
          ✓ 100% money-back guarantee within 7 days of cohort launch.
        </p>
      `;

      // Bind coupon & checkout buttons
      const applyBtn = footerContainer.querySelector('#apply-coupon-btn');
      if (applyBtn) {
        applyBtn.addEventListener('click', () => {
          const input = footerContainer.querySelector('#coupon-code-input');
          const res = app.CartManager.applyCoupon(input.value);
          if (res.success) {
            if (app.Toast) app.Toast.success(res.message);
          } else {
            if (app.Toast) app.Toast.error(res.message);
          }
        });
      }

      const removeCouponBtn = footerContainer.querySelector('#remove-coupon-btn');
      if (removeCouponBtn) {
        removeCouponBtn.addEventListener('click', () => {
          app.CartManager.removeCoupon();
          if (app.Toast) app.Toast.info('Coupon removed.');
        });
      }

      const checkoutBtn = footerContainer.querySelector('#cart-checkout-btn');
      if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
          app.CartManager.checkout();
        });
      }
    }
  };

  app.CartDrawer = CartDrawer;
})(window.Ciranta);
