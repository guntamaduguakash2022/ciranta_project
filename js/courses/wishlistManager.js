/**
 * js/courses/wishlistManager.js
 * Manages saved / bookmarked courses with LocalStorage persistence.
 */

window.Ciranta = window.Ciranta || {};

(function (app) {
  'use strict';

  const STORAGE_KEY = 'wishlist_ids';

  const WishlistManager = {
    /**
     * Get array of bookmarked course IDs
     * @returns {Array<string>}
     */
    getSavedIds() {
      return app.Storage ? app.Storage.get(STORAGE_KEY, []) : [];
    },

    /**
     * Check if course is bookmarked
     * @param {string} courseId
     * @returns {boolean}
     */
    isSaved(courseId) {
      const ids = this.getSavedIds();
      return ids.includes(courseId);
    },

    /**
     * Toggle bookmark state
     * @param {string} courseId
     * @param {string} courseTitle
     * @returns {boolean} isSaved now
     */
    toggle(courseId, courseTitle = '') {
      let ids = this.getSavedIds();
      let nowSaved = false;

      if (ids.includes(courseId)) {
        ids = ids.filter((id) => id !== courseId);
        nowSaved = false;
        if (app.Toast) app.Toast.info(`Removed from saved courses.`);
      } else {
        ids.push(courseId);
        nowSaved = true;
        if (app.Toast) app.Toast.success(`Saved "${courseTitle || 'Course'}" to wishlist!`);
      }

      if (app.Storage) app.Storage.set(STORAGE_KEY, ids);
      this.updateWishlistButtons(courseId, nowSaved);
      return nowSaved;
    },

    /**
     * Sync UI button states
     * @param {string} courseId
     * @param {boolean} active
     */
    updateWishlistButtons(courseId, active) {
      const buttons = document.querySelectorAll(`[data-wishlist="${courseId}"]`);
      buttons.forEach((btn) => {
        btn.classList.toggle('active', active);
        btn.innerHTML = active ? '&#9829;' : '&#9825;'; // Solid heart vs Outline heart
        btn.setAttribute('title', active ? 'Remove from wishlist' : 'Save to wishlist');
      });
    }
  };

  app.WishlistManager = WishlistManager;
})(window.Ciranta);
