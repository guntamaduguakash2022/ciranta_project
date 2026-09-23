/**
 * js/utils/helpers.js
 * Common utility helpers: currency formatting, debounce, slugify, date formatting
 */

window.Ciranta = window.Ciranta || {};

(function (app) {
  'use strict';

  const Helpers = {
    /**
     * Format number into Indian Rupee / USD format
     * @param {number} amount
     * @param {string} currency
     * @returns {string}
     */
    formatCurrency(amount, currency = 'INR') {
      if (amount === 0) return 'Free';
      if (currency === 'INR') {
        return new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          maximumFractionDigits: 0
        }).format(amount);
      }
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount);
    },

    /**
     * Convert string into URL-friendly slug
     * @param {string} text
     * @returns {string}
     */
    slugify(text) {
      return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
    },

    /**
     * Debounce function calls (useful for search input)
     * @param {Function} func
     * @param {number} delay
     * @returns {Function}
     */
    debounce(func, delay = 250) {
      let timeoutId;
      return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
      };
    },

    /**
     * Truncate text with ellipsis
     * @param {string} text
     * @param {number} maxLength
     * @returns {string}
     */
    truncate(text, maxLength = 80) {
      if (!text || text.length <= maxLength) return text;
      return text.slice(0, maxLength) + '...';
    },

    /**
     * Extract URL query parameter
     * @param {string} param
     * @returns {string|null}
     */
    getQueryParam(param) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    }
  };

  app.Helpers = Helpers;
})(window.Ciranta);
