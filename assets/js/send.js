//mongodb+srv://mirasovdev:QWERTmnbvc100@milleniumstyle.q1542.mongodb.net/?retryWrites=true&w=majority&appName=MilleniumStyle

import { quizData } from './form.js';
import { slideNext } from './slider.js';
const submitButton = document.querySelector('[data-js="submit"]');

const cleenData = data => {
  const newData = { ...data };

  if (Array.isArray(newData.beautyServices)) {
    newData.beautyServices = newData.beautyServices.map(service => {
      if (typeof service === 'string' && service.startsWith('__text__')) {
        return service.replace('__text__', '').trim();
      }
      return service;
    });
  }

  return newData;
};

const handleSubmit = async e => {
  const submitButton = e.currentTarget;

  try {
    submitButton.classList.add('loading');
    const newData = cleenData(quizData);
    const { phone } = newData;
    console.log(phone);
    slideNext();
  } catch (error) {
    console.log('Ошибка записи в MongoDB', error);
  } finally {
    submitButton.classList.remove('loading');
  }
};

submitButton.addEventListener('click', handleSubmit);
