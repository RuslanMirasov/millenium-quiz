//mongodb+srv://mirasovdev:QWERTmnbvc100@milleniumstyle.q1542.mongodb.net/?retryWrites=true&w=majority&appName=MilleniumStyle

import { quizData } from './form.js';
const submitButton = document.querySelector('[data-js="submit"]');

const handleSubmit = async e => {
  e.currentTarget.classList.add('loading');

  try {
    const newData = clearData(quizData);
    const { phone } = newData;
    console.log(phone);
  } catch (error) {
    console.log('Ошибка записи в MongoDB', error);
  } finally {
    e.currentTarget.classList.remove('loading');
  }
};

const clearData = data => {
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

submitButton.addEventListener('click', handleSubmit);
