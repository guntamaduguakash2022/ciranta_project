/**
 * js/data/categoriesData.js
 * Categories configuration and metadata
 */

window.Ciranta = window.Ciranta || {};

(function (app) {
  'use strict';

  const Categories = [
    { id: 'all', label: 'All Courses', count: 10 },
    { id: 'career', label: 'Career Advancement', count: 3 },
    { id: 'hr', label: 'Strategic HR', count: 2 },
    { id: 'mgmt', label: 'Business Management', count: 2 },
    { id: 'marketing', label: 'Digital Marketing', count: 2 },
    { id: 'data', label: 'Data & Analytics', count: 1 }
  ];

  app.CategoriesData = Categories;
})(window.Ciranta);
