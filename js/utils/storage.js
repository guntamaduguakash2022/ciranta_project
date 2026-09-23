/**
 * js/utils/storage.js
 * Safe LocalStorage wrapper with error handling and fallback
 */

window.Ciranta = window.Ciranta || {};

(function (app) {
  'use strict';

  const PREFIX = 'ciranta_';

  const Storage = {
    /**
     * Get item from localStorage parsed as JSON
     * @param {string} key
     * @param {any} defaultValue
     * @returns {any}
     */
    get(key, defaultValue = null) {
      try {
        const item = localStorage.getItem(PREFIX + key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (e) {
        console.warn(`[Ciranta Storage] Error reading key "${key}":`, e);
        return defaultValue;
      }
    },

    /**
     * Set item in localStorage serialized as JSON
     * @param {string} key
     * @param {any} value
     * @returns {boolean} success
     */
    set(key, value) {
      try {
        localStorage.setItem(PREFIX + key, JSON.stringify(value));
        return true;
      } catch (e) {
        console.warn(`[Ciranta Storage] Error saving key "${key}":`, e);
        return false;
      }
    },

    /**
     * Remove item from localStorage
     * @param {string} key
     */
    remove(key) {
      try {
        localStorage.removeItem(PREFIX + key);
      } catch (e) {
        console.warn(`[Ciranta Storage] Error removing key "${key}":`, e);
      }
    },

    /**
     * Clear all ciranta-specific items
     */
    clearAll() {
      try {
        Object.keys(localStorage)
          .filter((k) => k.startsWith(PREFIX))
          .forEach((k) => localStorage.removeItem(k));
      } catch (e) {
        console.warn('[Ciranta Storage] Error clearing storage:', e);
      }
    }
  };

  app.Storage = Storage;
})(window.Ciranta);
