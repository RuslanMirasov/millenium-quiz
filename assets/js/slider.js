import { debounce } from './scripts.js';
import { scrollToBlock } from './scrollToBlock.js';

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

const onNextBtnClick = e => {
  if (e.target.dataset.js !== 'next') return;
  slideNext();
};

export const slideNext = () => {
  const duration = window.scrollY > 0 ? 600 : 0;
  const timeout = duration === 600 ? 500 : 0;

  scrollToBlock('.body', duration);
  setTimeout(() => {
    swiper.slideNext();
  }, timeout);
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
  setTimeout(() => {
    swiper.update();
  }, 1000);
}, 300);

slider.addEventListener('click', onNextBtnClick);
document.addEventListener('DOMContentLoaded', changeHash);
window.addEventListener('hashchange', changeHash);
window.addEventListener('resize', handleResize);
window.addEventListener('orientationchange', handleResize);
