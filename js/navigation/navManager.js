/**
 * js/navigation/navManager.js
 * Manages top navigation active states, mobile hamburger toggle,
 * and updates cart item count in header.
 */

window.Ciranta = window.Ciranta || {};

(function (app) {
  'use strict';

  const NavManager = {
    init() {
      this.highlightActivePage();
      this.setupMobileMenu();
      this.injectNavCartBadge();
    },

    /**
     * Highlights current page based on body dataset
     */
    highlightActivePage() {
      const page = document.body.dataset.page;
      if (page) {
        const link = document.querySelector(`[data-nav="${page}"]`);
        if (link) link.classList.add('active');
      }
    },

    /**
     * Toggle mobile hamburger menu (retaining Member 1's behavior)
     */
    setupMobileMenu() {
      const menuBtn = document.querySelector('.menu-btn');
      const navLinks = document.querySelector('.nav-links');
      if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
          navLinks.classList.toggle('show');
        });
      }
    },

    /**
     * Add clean Cart counter in nav actions without breaking layout
     */
    injectNavCartBadge() {
      const navActions = document.querySelector('.nav-actions');
      if (!navActions || document.getElementById('nav-cart-trigger')) return;

      const cartTrigger = document.createElement('button');
      cartTrigger.id = 'nav-cart-trigger';
      cartTrigger.className = 'nav-cart-icon-btn';
      cartTrigger.setAttribute('aria-label', 'Open Cart');
      cartTrigger.innerHTML = `
        <span style="font-size:1.1rem;cursor:pointer;">🛒</span>
        <span class="nav-cart-count" style="display:none;background:var(--coral);color:#fff;font-size:0.7rem;font-weight:700;padding:1px 6px;border-radius:10px;margin-left:2px;vertical-align:top;">0</span>
      `;
      cartTrigger.style.background = 'none';
      cartTrigger.style.border = 'none';
      cartTrigger.style.cursor = 'pointer';
      cartTrigger.style.display = 'inline-flex';
      cartTrigger.style.alignItems = 'center';
      cartTrigger.style.padding = '4px 8px';

      cartTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        if (app.CartDrawer) {
          app.CartDrawer.open();
        }
      });

      // Insert before login link
      navActions.insertBefore(cartTrigger, navActions.firstChild);
      this.updateCartCount();
    },

    /**
     * Update cart counter badges across nav and floating trigger
     */
    updateCartCount() {
      const count = app.CartManager ? app.CartManager.getItemCount() : 0;
      const countBadges = document.querySelectorAll('.nav-cart-count, .cart-badge');
      countBadges.forEach((badge) => {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'inline-block' : 'none';
      });
    }
  };

  app.NavManager = NavManager;
})(window.Ciranta);
