/**
 * js/app.js
 * Application Bootstrap & Module Orchestrator
 * Detects current page and activates required modules.
 */

window.Ciranta = window.Ciranta || {};

(function (app) {
  'use strict';

  function initApp() {
    // 1. Initialize UI Foundations
    if (app.InjectedStyles) app.InjectedStyles.init();
    if (app.Modal) app.Modal.init();
    if (app.NavManager) app.NavManager.init();
    if (app.CartDrawer) app.CartDrawer.init();

    const page = document.body.dataset.page || '';
    const pathname = window.location.pathname.toLowerCase();

    // 2. Page Specific Initializations
    if (page === 'courses' || pathname.includes('courses.html')) {
      if (app.CourseRenderer) app.CourseRenderer.enhanceExistingGrid('#course-grid');
      if (app.CourseFilter) app.CourseFilter.init();
    }

    if (page === 'home' || pathname.endsWith('index.html') || pathname === '/' || pathname.endsWith('/cr/')) {
      // Enhance Home Page Featured Courses Grid
      const homeGrid = document.querySelector('#courses .grid-3');
      if (homeGrid && app.CourseRenderer) {
        app.CourseRenderer.enhanceExistingGrid('#courses .grid-3');
      }
    }

    if (pathname.includes('course-details.html')) {
      if (app.CourseDetail) app.CourseDetail.init();
    }

    if (['login', 'register', 'contact'].includes(page) ||
        pathname.includes('login') || pathname.includes('register') || pathname.includes('contact')) {
      if (app.FormValidator) app.FormValidator.init();
    }
  }

  // Export & auto-run when DOM is ready
  app.init = initApp;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})(window.Ciranta);
