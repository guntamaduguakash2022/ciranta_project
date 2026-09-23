/**
 * js/forms/formValidator.js
 * Client-side validation for Login, Register, and Contact forms.
 * Prepares data cleanly before handing off to Member 3 PHP endpoints.
 */

window.Ciranta = window.Ciranta || {};

(function (app) {
  'use strict';

  const FormValidator = {
    init() {
      this.initRegisterForm();
      this.initLoginForm();
      this.initContactForm();
    },

    /**
     * Register form validation
     */
    initRegisterForm() {
      const form = document.querySelector('#registerForm');
      if (!form) return;

      form.setAttribute('novalidate', 'true');
      this.ensureFieldFeedbackPlaceholders(form);

      form.addEventListener('submit', (e) => {
        let valid = true;

        const nameInput = form.querySelector('#name');
        const emailInput = form.querySelector('#email');
        const passInput = form.querySelector('#password');
        const phoneInput = form.querySelector('#phone');

        // Name check
        if (!nameInput.value.trim()) {
          this.setError(nameInput, 'Full name is required');
          valid = false;
        } else {
          this.clearError(nameInput);
        }

        // Email check
        if (!this.isValidEmail(emailInput.value)) {
          this.setError(emailInput, 'Enter a valid email address');
          valid = false;
        } else {
          this.clearError(emailInput);
        }

        // Password check
        if (passInput.value.length < 6) {
          this.setError(passInput, 'Password must be at least 6 characters');
          valid = false;
        } else {
          this.clearError(passInput);
        }

        if (!valid) {
          e.preventDefault();
          if (app.Toast) app.Toast.error('Please fix the errors in the form.');
          return;
        }

        // If valid and running in client-demo mode, simulate session
        if (app.Storage) {
          app.Storage.set('user_profile', {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            phone: phoneInput ? phoneInput.value.trim() : '',
            registeredAt: new Date().toISOString()
          });
        }

        if (app.Toast) app.Toast.success('Account created! Forwarding to cohort dashboard...');
      });
    },

    /**
     * Login form validation
     */
    initLoginForm() {
      const form = document.querySelector('#loginForm');
      if (!form) return;

      form.setAttribute('novalidate', 'true');
      this.ensureFieldFeedbackPlaceholders(form);

      form.addEventListener('submit', (e) => {
        let valid = true;
        const emailInput = form.querySelector('#email');
        const passInput = form.querySelector('#password');

        if (!this.isValidEmail(emailInput.value)) {
          this.setError(emailInput, 'Enter a valid email address');
          valid = false;
        } else {
          this.clearError(emailInput);
        }

        if (!passInput.value.trim()) {
          this.setError(passInput, 'Password is required');
          valid = false;
        } else {
          this.clearError(passInput);
        }

        if (!valid) {
          e.preventDefault();
          if (app.Toast) app.Toast.error('Please fill all required credentials.');
          return;
        }

        if (app.Storage) {
          app.Storage.set('user_session', {
            email: emailInput.value.trim(),
            loggedInAt: new Date().toISOString()
          });
        }

        if (app.Toast) app.Toast.success('Logging in...');
      });
    },

    /**
     * Contact form validation
     */
    initContactForm() {
      const form = document.querySelector('form[action="contact-process.php"]');
      if (!form) return;

      form.setAttribute('novalidate', 'true');
      this.ensureFieldFeedbackPlaceholders(form);

      form.addEventListener('submit', (e) => {
        let valid = true;
        const nameInput = form.querySelector('#name');
        const emailInput = form.querySelector('#email');
        const subjectInput = form.querySelector('#subject');
        const messageInput = form.querySelector('#message');

        if (!nameInput.value.trim()) {
          this.setError(nameInput, 'Name is required');
          valid = false;
        } else {
          this.clearError(nameInput);
        }

        if (!this.isValidEmail(emailInput.value)) {
          this.setError(emailInput, 'Enter a valid email address');
          valid = false;
        } else {
          this.clearError(emailInput);
        }

        if (!subjectInput.value.trim()) {
          this.setError(subjectInput, 'Subject is required');
          valid = false;
        } else {
          this.clearError(subjectInput);
        }

        if (messageInput.value.trim().length < 10) {
          this.setError(messageInput, 'Message should be at least 10 characters');
          valid = false;
        } else {
          this.clearError(messageInput);
        }

        if (!valid) {
          e.preventDefault();
          if (app.Toast) app.Toast.error('Please complete all contact fields.');
          return;
        }

        if (app.Toast) app.Toast.success('Sending message to mentor team...');
      });
    },

    ensureFieldFeedbackPlaceholders(form) {
      const fields = form.querySelectorAll('.field');
      fields.forEach((field) => {
        if (!field.querySelector('.field-error-msg')) {
          const errSpan = document.createElement('div');
          errSpan.className = 'field-error-msg';
          field.appendChild(errSpan);
        }
      });
    },

    setError(input, msg) {
      const parent = input.closest('.field');
      if (parent) {
        parent.classList.add('has-error');
        const errSpan = parent.querySelector('.field-error-msg');
        if (errSpan) errSpan.textContent = msg;
      }
    },

    clearError(input) {
      const parent = input.closest('.field');
      if (parent) {
        parent.classList.remove('has-error');
        const errSpan = parent.querySelector('.field-error-msg');
        if (errSpan) errSpan.textContent = '';
      }
    },

    isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  };

  app.FormValidator = FormValidator;
})(window.Ciranta);
