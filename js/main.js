// Переключение темы
const themeToggle = document.querySelector('.theme-toggle');
const THEME_KEY = 'coffee-house-theme';

function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }
}

function loadTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme) {
    applyTheme(savedTheme);
    return;
  }
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(prefersDark ? 'dark' : 'light');
}

function toggleTheme() {
  const isDark = document.body.classList.contains('dark-theme');
  const newTheme = isDark ? 'light' : 'dark';
  applyTheme(newTheme);
  localStorage.setItem(THEME_KEY, newTheme);
}

loadTheme();

if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}
// ============================================
// Переключение категорий в каталоге
// ============================================
const tabs = document.querySelectorAll('.tabs__btn');
const cards = document.querySelectorAll('.card');

function filterCards(category) {
  cards.forEach((card) => {
    const isMatch = card.dataset.category === category;
    card.hidden = !isMatch;
  });
}

if (tabs.length && cards.length) {
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('tabs__btn--active'));
      tab.classList.add('tabs__btn--active');
      filterCards(tab.dataset.category);
    });
  });

  filterCards('coffee');
}
// ============================================
// Слайдер в секции Favourites
// ============================================
const slides = document.querySelectorAll('.slider__item');
const sliderDots = document.querySelectorAll('.slider__dot');
const prevBtn = document.querySelector('.slider__arrow--prev');
const nextBtn = document.querySelector('.slider__arrow--next');

let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('slider__item--active', i === index);
  });
  sliderDots.forEach((dot, i) => {
    dot.classList.toggle('slider__dot--active', i === index);
  });
  currentSlide = index;
}

function nextSlide() {
  showSlide((currentSlide + 1) % slides.length);
}

function prevSlide() {
  showSlide((currentSlide - 1 + slides.length) % slides.length);
}

if (slides.length) {
  prevBtn?.addEventListener('click', prevSlide);
  nextBtn?.addEventListener('click', nextSlide);
  sliderDots.forEach((dot, i) => {
    dot.addEventListener('click', () => showSlide(i));
  });
}
