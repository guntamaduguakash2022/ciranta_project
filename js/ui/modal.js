/**
 * js/ui/modal.js
 * Generic accessible modal dialog system
 * Used for Course Quick-Views, syllabus previews, and confirmation dialogs.
 */

window.Ciranta = window.Ciranta || {};

(function (app) {
  'use strict';

  let modalEl = null;

  const Modal = {
    init() {
      this.createModalDOM();
      this.bindEvents();
    },

    createModalDOM() {
      if (document.getElementById('ciranta-modal-backdrop')) return;

      modalEl = document.createElement('div');
      modalEl.id = 'ciranta-modal-backdrop';
      modalEl.className = 'ciranta-modal-backdrop';
      modalEl.setAttribute('role', 'dialog');
      modalEl.setAttribute('aria-modal', 'true');
      modalEl.innerHTML = `
        <div class="ciranta-modal-box">
          <button class="modal-close-btn" aria-label="Close modal">&times;</button>
          <div class="modal-content" id="ciranta-modal-content">
            <!-- Injected dynamic content -->
          </div>
        </div>
      `;
      document.body.appendChild(modalEl);
    },

    bindEvents() {
      const closeBtn = modalEl.querySelector('.modal-close-btn');
      closeBtn.addEventListener('click', () => this.close());

      // Backdrop click
      modalEl.addEventListener('click', (e) => {
        if (e.target === modalEl) this.close();
      });

      // Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalEl.classList.contains('show')) {
          this.close();
        }
      });
    },

    /**
     * Show modal with custom HTML content
     * @param {string} htmlContent
     */
    open(htmlContent) {
      if (!modalEl) this.init();
      const contentEl = modalEl.querySelector('#ciranta-modal-content');
      contentEl.innerHTML = htmlContent;
      modalEl.classList.add('show');
      document.body.style.overflow = 'hidden';
    },

    close() {
      if (modalEl) {
        modalEl.classList.remove('show');
        document.body.style.overflow = '';
      }
    },

    /**
     * Helper to show Quick-View for a given course object
     * @param {Object} course
     */
    showCourseQuickView(course) {
      if (!course) return;
      const format = (amt) => (app.Helpers ? app.Helpers.formatCurrency(amt) : '₹' + amt);

      const html = `
        <div class="tag" style="margin-bottom:8px;"><i></i>${course.categoryLabel}</div>
        <h2 style="font-size:1.8rem;margin-bottom:12px;">${course.title}</h2>
        <p style="color:var(--muted);margin-bottom:20px;">${course.fullDescription || course.shortDescription}</p>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;background:#fff;border:1px solid var(--line);padding:18px;margin-bottom:24px;">
          <div><span style="font-size:0.8rem;color:var(--muted);display:block;">Duration</span><strong>${course.duration}</strong></div>
          <div><span style="font-size:0.8rem;color:var(--muted);display:block;">Level</span><strong>${course.level}</strong></div>
          <div><span style="font-size:0.8rem;color:var(--muted);display:block;">Cohort Start</span><strong style="color:var(--blue);">${course.nextCohort}</strong></div>
          <div><span style="font-size:0.8rem;color:var(--muted);display:block;">Tuition</span><strong style="font-size:1.1rem;">${format(course.price)}</strong></div>
        </div>

        <h4 style="margin-bottom:10px;">Mentor</h4>
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px;">
          <div style="width:42px;height:42px;background:var(--ink);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;border-radius:2px;">
            ${course.instructor ? course.instructor.name.charAt(0) : 'M'}
          </div>
          <div>
            <strong>${course.instructor ? course.instructor.name : 'Industry Mentor'}</strong>
            <p style="font-size:0.82rem;color:var(--muted);margin:0;">${course.instructor ? course.instructor.role : 'Expert'}</p>
          </div>
        </div>

        <div style="display:flex;gap:12px;margin-top:24px;">
          <button id="modal-quick-add-btn" class="btn" style="flex:1;justify-content:center;">
            Add to Cart (${format(course.price)})
          </button>
          <a href="course-details.html?id=${course.id}" class="btn ghost">
            Full Details &rarr;
          </a>
        </div>
      `;

      this.open(html);

      // Bind dynamic quick add button
      const addBtn = modalEl.querySelector('#modal-quick-add-btn');
      if (addBtn) {
        addBtn.addEventListener('click', () => {
          if (app.CartManager) {
            app.CartManager.addItem(course);
            this.close();
            if (app.CartDrawer) app.CartDrawer.open();
          }
        });
      }
    }
  };

  app.Modal = Modal;
})(window.Ciranta);
