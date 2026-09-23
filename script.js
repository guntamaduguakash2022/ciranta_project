document.addEventListener('DOMContentLoaded', () => {
  // highlight current page in nav
  const page = document.body.dataset.page;
  if (page) {
    const link = document.querySelector(`[data-nav="${page}"]`);
    if (link) link.classList.add('active');
  }

  // mobile menu toggle
  const menuBtn = document.querySelector('.menu-btn');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      document.querySelector('.nav-links').classList.toggle('show');
    });
  }
});
