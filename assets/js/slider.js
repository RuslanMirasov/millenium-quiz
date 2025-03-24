import { debounce } from './scripts.js';

const slider = document.querySelector('.swiper');

const swiper = new Swiper(slider, {
  effect: 'slide', //fade
  speed: 1000,
  autoHeight: true,
  lazy: {
    loadOnTransitionStart: true,
    loadPrevNext: true,
    loadPrevNextAmount: 1,
  },
  allowTouchMove: false,
  on: {
    slideChange: () => {
      const currentSlide = swiper.slides[swiper.activeIndex];
      const step = currentSlide.dataset.step;

      if (step) {
        const newHash = `#step-${step}`;
        if (window.location.hash !== newHash) {
          history.replaceState(null, '', newHash);
        }
      }
    },
  },
});

const slideNext = e => {
  if (e.target.dataset.js !== 'next') return;
  swiper.slideNext();
};

const changeHash = () => {
  const hash = window.location.hash;

  if (hash.startsWith('#step-')) {
    const targetStep = hash.split('-')[1];
    const allSlides = slider.querySelectorAll('.swiper-slide');

    allSlides.forEach((slide, index) => {
      if (slide.dataset.step === targetStep) {
        swiper.slideTo(index, 0);
      }
    });
  }
};

const handleResize = debounce(() => {
  if (swiper && swiper.update) {
    swiper.update(); // Пересчитать размеры и позиции
  }
}, 300);

slider.addEventListener('click', slideNext);
document.addEventListener('DOMContentLoaded', changeHash);
window.addEventListener('hashchange', changeHash);
window.addEventListener('resize', handleResize);
