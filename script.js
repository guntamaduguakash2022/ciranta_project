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

  const carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    const track = carousel.querySelector('.carousel-track');
    const slides = [...carousel.querySelectorAll('.carousel-slide')];
    const dots = [...carousel.querySelectorAll('.carousel-dot')];
    let currentSlide = 0;
    let timer;

    const showSlide = (index) => {
      currentSlide = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
      slides.forEach((slide, slideIndex) => {
        slide.setAttribute('aria-hidden', slideIndex === currentSlide ? 'false' : 'true');
      });
      dots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === currentSlide;
        dot.classList.toggle('active', isActive);
        dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
    };

    const restartTimer = () => {
      window.clearInterval(timer);
      timer = window.setInterval(() => showSlide(currentSlide + 1), 5000);
    };

    carousel.querySelector('[data-carousel-prev]').addEventListener('click', () => {
      showSlide(currentSlide - 1);
      restartTimer();
    });
    carousel.querySelector('[data-carousel-next]').addEventListener('click', () => {
      showSlide(currentSlide + 1);
      restartTimer();
    });
    dots.forEach((dot, dotIndex) => dot.addEventListener('click', () => {
      showSlide(dotIndex);
      restartTimer();
    }));
    carousel.addEventListener('mouseenter', () => window.clearInterval(timer));
    carousel.addEventListener('mouseleave', restartTimer);
    restartTimer();
  }
});
