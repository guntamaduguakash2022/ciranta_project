/**
 * js/utils/toast.js
 * Lightweight, accessible toast notification system
 */

window.Ciranta = window.Ciranta || {};

(function (app) {
  'use strict';

  let container = null;

  function getToastContainer() {
    if (!container) {
      container = document.querySelector('.ciranta-toast-container');
      if (!container) {
        container = document.createElement('div');
        container.className = 'ciranta-toast-container';
        container.setAttribute('aria-live', 'polite');
        document.body.appendChild(container);
      }
    }
    return container;
  }

  const Toast = {
    /**
     * Show toast message
     * @param {string} message
     * @param {'success'|'error'|'info'|'warning'} type
     * @param {number} duration
     */
    show(message, type = 'info', duration = 3200) {
      const parent = getToastContainer();
      const toast = document.createElement('div');
      toast.className = `ciranta-toast ciranta-toast-${type}`;

      const iconMap = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
      };

      toast.innerHTML = `
        <span class="ciranta-toast-icon">${iconMap[type] || 'ℹ'}</span>
        <span class="ciranta-toast-msg">${message}</span>
        <button class="ciranta-toast-close" aria-label="Close">&times;</button>
      `;

      parent.appendChild(toast);

      // Trigger animation
      requestAnimationFrame(() => {
        toast.classList.add('show');
      });

      const closeBtn = toast.querySelector('.ciranta-toast-close');
      const removeToast = () => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 250);
      };

      closeBtn.addEventListener('click', removeToast);

      if (duration > 0) {
        setTimeout(removeToast, duration);
      }
    },

    success(msg, duration) {
      this.show(msg, 'success', duration);
    },

    error(msg, duration) {
      this.show(msg, 'error', duration);
    },

    warning(msg, duration) {
      this.show(msg, 'warning', duration);
    },

    info(msg, duration) {
      this.show(msg, 'info', duration);
    }
  };

  app.Toast = Toast;
})(window.Ciranta);
