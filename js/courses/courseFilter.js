/**
 * js/courses/courseFilter.js
 * Controls Search, Category Filtering, and Sorting on the Courses page.
 * Synchronizes seamlessly with Member 1's existing filter buttons.
 */

window.Ciranta = window.Ciranta || {};

(function (app) {
  'use strict';

  const CourseFilter = {
    currentCategory: 'all',
    searchQuery: '',
    sortOrder: 'featured',

    init() {
      const grid = document.querySelector('#course-grid');
      if (!grid) return;

      this.injectToolbar();
      this.bindCategoryButtons();
      this.bindSearchAndSort();
    },

    /**
     * Injects search box and sort selector above the courses section
     */
    injectToolbar() {
      const filtersWrap = document.querySelector('.filters');
      if (!filtersWrap || document.getElementById('ciranta-courses-toolbar')) return;

      const toolbar = document.createElement('div');
      toolbar.id = 'ciranta-courses-toolbar';
      toolbar.className = 'courses-toolbar';
      toolbar.innerHTML = `
        <div class="search-box-wrap">
          <span class="search-icon">🔍</span>
          <input type="text" id="course-search-input" class="search-input" placeholder="Search courses, skills, or mentors..." aria-label="Search courses">
        </div>
        <div style="display:flex;align-items:center;gap:12px;">
          <label for="course-sort-select" style="font-size:0.85rem;color:var(--muted);font-weight:500;">Sort by:</label>
          <select id="course-sort-select" class="sort-select" aria-label="Sort courses">
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="duration">Duration (Weeks)</option>
          </select>
          <span class="results-count" id="courses-count-indicator">Showing 9 courses</span>
        </div>
      `;

      // Insert toolbar right after filters wrap
      filtersWrap.parentNode.insertBefore(toolbar, filtersWrap.nextSibling);
    },

    /**
     * Intercepts and enhances Member 1's category buttons
     */
    bindCategoryButtons() {
      const buttons = document.querySelectorAll('.filter-btn');
      buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
          this.currentCategory = btn.dataset.filter || 'all';
          this.applyFilters();
        });
      });
    },

    /**
     * Bind search input and sort dropdown
     */
    bindSearchAndSort() {
      const searchInput = document.querySelector('#course-search-input');
      if (searchInput) {
        const debouncedSearch = app.Helpers
          ? app.Helpers.debounce((val) => {
              this.searchQuery = val.trim().toLowerCase();
              this.applyFilters();
            }, 200)
          : (val) => {
              this.searchQuery = val.trim().toLowerCase();
              this.applyFilters();
            };

        searchInput.addEventListener('input', (e) => debouncedSearch(e.target.value));
      }

      const sortSelect = document.querySelector('#course-sort-select');
      if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
          this.sortOrder = e.target.value;
          this.applyFilters();
        });
      }
    },

    /**
     * Apply filter and sort criteria to course cards
     */
    applyFilters() {
      const grid = document.querySelector('#course-grid');
      if (!grid) return;

      const cells = Array.from(grid.querySelectorAll('.cell'));
      const courses = app.CoursesData || [];
      let visibleCount = 0;

      cells.forEach((cell) => {
        const cat = cell.dataset.cat || '';
        const titleEl = cell.querySelector('h3');
        const descEl = cell.querySelector('p');
        const titleText = titleEl ? titleEl.textContent.toLowerCase() : '';
        const descText = descEl ? descEl.textContent.toLowerCase() : '';

        // Match category
        const matchesCat = this.currentCategory === 'all' || cat === this.currentCategory;

        // Match search
        const matchesSearch =
          !this.searchQuery ||
          titleText.includes(this.searchQuery) ||
          descText.includes(this.searchQuery);

        const isVisible = matchesCat && matchesSearch;
        cell.style.display = isVisible ? '' : 'none';
        if (isVisible) visibleCount++;
      });

      // Update count indicator
      const countEl = document.querySelector('#courses-count-indicator');
      if (countEl) {
        countEl.textContent = `Showing ${visibleCount} course${visibleCount === 1 ? '' : 's'}`;
      }

      // Re-sort visible cells if sort order changed
      if (this.sortOrder !== 'featured') {
        this.sortGrid(grid, cells, courses);
      }
    },

    /**
     * Re-order cells according to sort order
     */
    sortGrid(grid, cells, courses) {
      const sorted = [...cells].sort((a, b) => {
        const courseA = courses.find((c) => c.id === a.getAttribute('data-id')) || {};
        const courseB = courses.find((c) => c.id === b.getAttribute('data-id')) || {};

        switch (this.sortOrder) {
          case 'price-low':
            return (courseA.price || 0) - (courseB.price || 0);
          case 'price-high':
            return (courseB.price || 0) - (courseA.price || 0);
          case 'rating':
            return (courseB.rating || 0) - (courseA.rating || 0);
          case 'duration':
            return (courseA.weeks || 0) - (courseB.weeks || 0);
          default:
            return 0;
        }
      });

      sorted.forEach((cell) => grid.appendChild(cell));
    }
  };

  app.CourseFilter = CourseFilter;
})(window.Ciranta);
