/**
 * js/api/apiBridge.js
 * API Bridge Interface
 * Prepared for Backend (PHP Backend Developer).
 * Allows seamless switching between client-side mock data and PHP REST API endpoints.
 */

window.Ciranta = window.Ciranta || {};

(function (app) {
  'use strict';

  // Toggle this to true once Backend (PHP) creates backend API endpoints
  const USE_PHP_BACKEND = false;

  const ENDPOINTS = {
    COURSES: 'api/courses.php',
    COURSE_BY_ID: (id) => `api/courses.php?id=${encodeURIComponent(id)}`,
    ENROLL: 'api/enroll.php',
    CONTACT: 'contact-process.php',
    LOGIN: 'login-process.php',
    REGISTER: 'register-process.php'
  };

  const ApiBridge = {
    /**
     * Get all courses (fetches from PHP API if enabled, else returns local dataset)
     * @returns {Promise<Array>}
     */
    async getCourses() {
      if (USE_PHP_BACKEND) {
        try {
          const res = await fetch(ENDPOINTS.COURSES);
          if (!res.ok) throw new Error('Failed to fetch from PHP server');
          return await res.json();
        } catch (err) {
          console.warn('[ApiBridge] PHP API fetch failed, falling back to local data:', err);
          return app.CoursesData || [];
        }
      }
      // Default local data promise
      return Promise.resolve(app.CoursesData || []);
    },

    /**
     * Get single course by ID or slug
     * @param {string} idOrSlug
     * @returns {Promise<Object|null>}
     */
    async getCourseById(idOrSlug) {
      if (!idOrSlug) return Promise.resolve(null);
      const courses = await this.getCourses();
      const cleanTarget = idOrSlug.toString().toLowerCase().trim();
      const found = courses.find(
        (c) => c.id.toLowerCase() === cleanTarget || c.slug.toLowerCase() === cleanTarget
      );
      return Promise.resolve(found || null);
    },

    /**
     * Process Enrollment
     * @param {Object} enrollmentData
     * @returns {Promise<Object>}
     */
    async submitEnrollment(enrollmentData) {
      if (USE_PHP_BACKEND) {
        try {
          const res = await fetch(ENDPOINTS.ENROLL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(enrollmentData)
          });
          return await res.json();
        } catch (err) {
          console.warn('[ApiBridge] PHP enrollment call failed:', err);
        }
      }

      // Local mock persistence in Storage
      const enrolled = app.Storage ? app.Storage.get('enrolled_courses', []) : [];
      const record = {
        ...enrollmentData,
        orderId: 'CR-' + Math.floor(100000 + Math.random() * 900000),
        enrolledAt: new Date().toISOString()
      };
      enrolled.push(record);
      if (app.Storage) app.Storage.set('enrolled_courses', enrolled);

      return Promise.resolve({
        success: true,
        orderId: record.orderId,
        message: 'Successfully enrolled into cohort!'
      });
    }
  };

  app.ApiBridge = ApiBridge;
})(window.Ciranta);
