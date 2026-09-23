/**
 * js/ui/accordion.js
 * Interactive syllabus and FAQ accordion controller
 */

window.Ciranta = window.Ciranta || {};

(function (app) {
  'use strict';

  const Accordion = {
    /**
     * Initializes accordion interactivity on any container element
     * @param {HTMLElement|string} targetContainer
     */
    init(targetContainer = '.syllabus-accordion') {
      const container =
        typeof targetContainer === 'string'
          ? document.querySelector(targetContainer)
          : targetContainer;

      if (!container) return;

      const items = container.querySelectorAll('.accordion-item');
      items.forEach((item) => {
        const header = item.querySelector('.accordion-header');
        if (!header) return;

        header.addEventListener('click', () => {
          const isActive = item.classList.contains('active');

          // Optional: close other accordion items in the same container for clean accordion effect
          items.forEach((other) => {
            if (other !== item) other.classList.remove('active');
          });

          item.classList.toggle('active', !isActive);
        });
      });
    },

    /**
     * Helper to render syllabus modules into HTML
     * @param {Array} syllabusModules
     * @returns {string} HTML string
     */
    renderSyllabusHTML(syllabusModules = []) {
      if (!syllabusModules.length) return '';

      return `
        <div class="syllabus-accordion">
          ${syllabusModules
            .map(
              (mod, index) => `
            <div class="accordion-item ${index === 0 ? 'active' : ''}">
              <button class="accordion-header" type="button">
                <span>${mod.module}</span>
                <span class="toggle-symbol">+</span>
              </button>
              <div class="accordion-body">
                <ul>
                  ${mod.lessons.map((lesson) => `<li>${lesson}</li>`).join('')}
                </ul>
              </div>
            </div>
          `
            )
            .join('')}
        </div>
      `;
    }
  };

  app.Accordion = Accordion;
})(window.Ciranta);
