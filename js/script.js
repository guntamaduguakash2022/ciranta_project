/**
 * js/script.js
 * Main Entry Point for Ciranta Academy
 * Courses, Interactive Functionality, and Cart Architecture
 *
 * Dynamically and sequentially loads all modular sub-components.
 * Zero merge conflicts with Member 1.
 */

(function () {
  'use strict';

  // Determine base path to js folder dynamically
  const scripts = document.getElementsByTagName('script');
  let basePath = 'js/';
  for (let i = 0; i < scripts.length; i++) {
    const src = scripts[i].src;
    if (src && src.includes('script.js')) {
      basePath = src.substring(0, src.lastIndexOf('/') + 1);
      break;
    }
  }

  // List of modular components in dependency order
  const moduleFiles = [
    'utils/storage.js',
    'utils/helpers.js',
    'utils/toast.js',
    'ui/injectedStyles.js',
    'data/categoriesData.js',
    'data/coursesData.js',
    'api/apiBridge.js',
    'navigation/navManager.js',
    'cart/cartManager.js',
    'ui/cartDrawer.js',
    'ui/modal.js',
    'ui/accordion.js',
    'courses/wishlistManager.js',
    'courses/courseRenderer.js',
    'courses/courseFilter.js',
    'courses/courseDetail.js',
    'forms/formValidator.js',
    'app.js'
  ];

  /**
   * Helper to load a script asynchronously
   * @param {string} src
   * @returns {Promise}
   */
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = false; // Preserve execution order
      script.onload = resolve;
      script.onerror = () => {
        console.warn(`[Ciranta Loader] Could not load: ${src}`);
        resolve(); // Continue with next module
      };
      document.head.appendChild(script);
    });
  }

  /**
   * Load all modules sequentially then initialize application
   */
  async function bootstrap() {
    for (let i = 0; i < moduleFiles.length; i++) {
      await loadScript(basePath + moduleFiles[i]);
    }
  }

  bootstrap();
})();
