/**
 * js/courses/courseRenderer.js
 * Enhances course cards with pricing, ratings, badges, quick-view, and cart actions.
 * Preserves Member 1's markup classes (.cell, .course-cat, .meta) seamlessly.
 */

window.Ciranta = window.Ciranta || {};

(function (app) {
  'use strict';

  const CourseRenderer = {
    /**
     * Enhances static course cells already rendered in Member 1 HTML
     * Matches cell titles to app.CoursesData to inject rich UI elements.
     */
    enhanceExistingGrid(gridSelector = '#course-grid') {
      const grid = document.querySelector(gridSelector);
      if (!grid) return;

      const cells = grid.querySelectorAll('.cell');
      const courses = app.CoursesData || [];

      cells.forEach((cell) => {
        const titleEl = cell.querySelector('h3');
        if (!titleEl) return;

        const titleText = titleEl.textContent.trim().toLowerCase();
        const course = courses.find(
          (c) =>
            c.title.toLowerCase() === titleText ||
            c.id.toLowerCase() === app.Helpers.slugify(titleText)
        );

        if (!course) return;

        // Mark cell as enhanced
        cell.classList.add('enhanced-card');
        cell.setAttribute('data-id', course.id);

        const format = (amt) => (app.Helpers ? app.Helpers.formatCurrency(amt) : '₹' + amt);
        const isSaved = app.WishlistManager ? app.WishlistManager.isSaved(course.id) : false;

        // Enhance header with badge & bookmark
        let topBar = cell.querySelector('.course-card-top');
        if (!topBar) {
          topBar = document.createElement('div');
          topBar.className = 'course-card-top';
          topBar.innerHTML = `
            <span class="badge-tag badge-${course.badge}">${course.badgeLabel || 'Cohort'}</span>
            <button class="wishlist-btn ${isSaved ? 'active' : ''}" data-wishlist="${course.id}" title="${isSaved ? 'Remove from wishlist' : 'Save to wishlist'}">
              ${isSaved ? '&#9829;' : '&#9825;'}
            </button>
          `;
          cell.insertBefore(topBar, cell.firstChild);
        }

        // Enhance meta with rating and pricing
        let metaRow = cell.querySelector('.course-card-meta-row');
        if (!metaRow) {
          metaRow = document.createElement('div');
          metaRow.className = 'course-card-meta-row';
          metaRow.innerHTML = `
            <span class="course-rating">★ ${course.rating}</span>
            <span>(${course.reviewsCount} learners)</span>
            <span>&bull;</span>
            <span>${course.level}</span>
          `;
          const desc = cell.querySelector('p');
          if (desc) {
            desc.after(metaRow);
          }
        }

        // Enhance pricing row
        let priceRow = cell.querySelector('.course-pricing-row');
        if (!priceRow) {
          priceRow = document.createElement('div');
          priceRow.className = 'course-pricing-row';
          priceRow.innerHTML = `
            <span class="current-price">${format(course.price)}</span>
            <span class="original-price">${format(course.originalPrice)}</span>
          `;
          metaRow.after(priceRow);
        }

        // Update Member 1's link to include ?id parameter
        const viewLink = cell.querySelector('.meta a');
        if (viewLink) {
          viewLink.href = `course-details.html?id=${course.id}`;
        }

        // Add Quick-View and Quick Add buttons
        let actionsRow = cell.querySelector('.card-actions-row');
        if (!actionsRow) {
          actionsRow = document.createElement('div');
          actionsRow.className = 'card-actions-row';
          actionsRow.innerHTML = `
            <button class="btn btn-sm ghost quick-view-btn" data-course-id="${course.id}">Quick View</button>
            <button class="btn btn-sm quick-add-btn" data-course-id="${course.id}">Add to Cart</button>
          `;
          cell.appendChild(actionsRow);
        }
      });

      this.bindCardEvents(grid);
    },

    /**
     * Bind click listeners for Quick-View, Add-to-Cart, Wishlist
     */
    bindCardEvents(container) {
      // Wishlist toggle
      container.querySelectorAll('.wishlist-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const id = e.currentTarget.dataset.wishlist;
          const course = (app.CoursesData || []).find((c) => c.id === id);
          if (app.WishlistManager) {
            app.WishlistManager.toggle(id, course ? course.title : '');
          }
        });
      });

      // Quick-View modal
      container.querySelectorAll('.quick-view-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const id = e.currentTarget.dataset.courseId;
          const course = (app.CoursesData || []).find((c) => c.id === id);
          if (course && app.Modal) {
            app.Modal.showCourseQuickView(course);
          }
        });
      });

      // Quick Add to Cart
      container.querySelectorAll('.quick-add-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const id = e.currentTarget.dataset.courseId;
          const course = (app.CoursesData || []).find((c) => c.id === id);
          if (course && app.CartManager) {
            app.CartManager.addItem(course);
          }
        });
      });
    }
  };

  app.CourseRenderer = CourseRenderer;
})(window.Ciranta);
