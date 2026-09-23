/**
 * js/cart/cartManager.js
 * State management for Shopping Cart & Cohort Enrollments
 * LocalStorage backed, supports coupons & subtotal calculations.
 */

window.Ciranta = window.Ciranta || {};

(function (app) {
  'use strict';

  const STORAGE_KEY = 'cart_items';
  const COUPON_KEY = 'cart_coupon';

  const VALID_COUPONS = {
    CIRANTA20: 0.20,
    WELCOME10: 0.10,
    STUDENT15: 0.15
  };

  const CartManager = {
    /**
     * Get list of items currently in cart
     * @returns {Array}
     */
    getItems() {
      return app.Storage ? app.Storage.get(STORAGE_KEY, []) : [];
    },

    /**
     * Check if a course is already in cart
     * @param {string} courseId
     * @returns {boolean}
     */
    hasItem(courseId) {
      const items = this.getItems();
      return items.some((item) => item.id === courseId);
    },

    /**
     * Add course to cart
     * @param {Object} course
     * @returns {boolean}
     */
    addItem(course) {
      if (!course || !course.id) return false;

      const items = this.getItems();
      if (this.hasItem(course.id)) {
        if (app.Toast) app.Toast.info(`"${course.title}" is already in your cart.`);
        return false;
      }

      items.push({
        id: course.id,
        title: course.title,
        price: course.price,
        duration: course.duration,
        categoryLabel: course.categoryLabel,
        instructor: course.instructor ? course.instructor.name : 'Ciranta Mentor',
        addedAt: new Date().toISOString()
      });

      if (app.Storage) app.Storage.set(STORAGE_KEY, items);
      if (app.Toast) app.Toast.success(`Added "${course.title}" to cart!`);

      this.onCartUpdated();
      return true;
    },

    /**
     * Remove course from cart
     * @param {string} courseId
     */
    removeItem(courseId) {
      let items = this.getItems();
      const removed = items.find((i) => i.id === courseId);
      items = items.filter((i) => i.id !== courseId);

      if (app.Storage) app.Storage.set(STORAGE_KEY, items);
      if (removed && app.Toast) {
        app.Toast.info(`Removed "${removed.title}" from cart.`);
      }

      this.onCartUpdated();
    },

    /**
     * Clear all cart contents
     */
    clearCart() {
      if (app.Storage) {
        app.Storage.remove(STORAGE_KEY);
        app.Storage.remove(COUPON_KEY);
      }
      this.onCartUpdated();
    },

    /**
     * Total number of items in cart
     * @returns {number}
     */
    getItemCount() {
      return this.getItems().length;
    },

    /**
     * Get current active coupon
     * @returns {string|null}
     */
    getAppliedCoupon() {
      return app.Storage ? app.Storage.get(COUPON_KEY, null) : null;
    },

    /**
     * Apply coupon code
     * @param {string} code
     * @returns {{success: boolean, message: string}}
     */
    applyCoupon(code) {
      if (!code) return { success: false, message: 'Please enter a coupon code' };
      const normalized = code.trim().toUpperCase();

      if (VALID_COUPONS[normalized]) {
        if (app.Storage) app.Storage.set(COUPON_KEY, normalized);
        this.onCartUpdated();
        return {
          success: true,
          discountPercent: VALID_COUPONS[normalized] * 100,
          message: `Coupon "${normalized}" applied! (${VALID_COUPONS[normalized] * 100}% OFF)`
        };
      }
      return { success: false, message: 'Invalid or expired coupon code' };
    },

    /**
     * Remove applied coupon
     */
    removeCoupon() {
      if (app.Storage) app.Storage.remove(COUPON_KEY);
      this.onCartUpdated();
    },

    /**
     * Calculate financial summary: subtotal, discount, total
     */
    getFinancialSummary() {
      const items = this.getItems();
      const subtotal = items.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
      const coupon = this.getAppliedCoupon();
      const discountRate = coupon && VALID_COUPONS[coupon] ? VALID_COUPONS[coupon] : 0;
      const discountAmount = Math.round(subtotal * discountRate);
      const total = Math.max(0, subtotal - discountAmount);

      return {
        subtotal,
        discountAmount,
        discountRate,
        appliedCoupon: coupon,
        total
      };
    },

    /**
     * Checkout handler
     */
    async checkout() {
      const items = this.getItems();
      if (items.length === 0) {
        if (app.Toast) app.Toast.warning('Your cart is empty.');
        return;
      }

      const summary = this.getFinancialSummary();

      if (app.ApiBridge) {
        const result = await app.ApiBridge.submitEnrollment({
          items,
          summary
        });

        if (result.success) {
          this.clearCart();
          if (app.CartDrawer) app.CartDrawer.close();
          if (app.Toast) {
            app.Toast.success(`🎉 Enrollment confirmed! Order #${result.orderId}`, 6000);
          }
        }
      }
    },

    /**
     * Internal refresh trigger
     */
    onCartUpdated() {
      if (app.NavManager) app.NavManager.updateCartCount();
      if (app.CartDrawer) app.CartDrawer.render();
    }
  };

  app.CartManager = CartManager;
})(window.Ciranta);
