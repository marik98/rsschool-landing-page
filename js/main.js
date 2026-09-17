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
// Бургер-меню
// ============================================
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');

function toggleMenu() {
  const isOpen = nav.classList.toggle('is-open');
  burger.classList.toggle('is-open', isOpen);
  burger.setAttribute('aria-expanded', isOpen);
}

function closeMenu() {
  nav.classList.remove('is-open');
  burger.classList.remove('is-open');
  burger.setAttribute('aria-expanded', 'false');
}

if (burger && nav) {
  burger.addEventListener('click', toggleMenu);
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
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

  // По умолчанию показать кофе
  filterCards('coffee');
}
// ============================================
// Модальное окно
// ============================================
const modal = document.getElementById('modal');
const modalImage = modal?.querySelector('.modal__image');
const modalTitle = modal?.querySelector('.modal__title');
const modalDesc = modal?.querySelector('.modal__desc');
const modalPrice = modal?.querySelector('.modal__price');

function openModal(card) {
  const img = card.querySelector('.card img, .card__image, img');
  const name = card.querySelector('.card__name');
  const desc = card.querySelector('.card__desc');
  const price = card.querySelector('.card__price');

  modalImage.src = img ? img.src : '';
  modalImage.alt = img ? img.alt : '';
  modalTitle.textContent = name ? name.textContent : '';
  modalDesc.textContent = desc ? desc.textContent : '';
  modalPrice.textContent = price ? price.textContent : '';

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // блокируем скролл страницы
}

function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

if (modal) {
  // Клик по карточке — открыть модалку
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => openModal(card));
  });

  // Клик по [data-close] (оверлей + крестик) — закрыть
  modal.querySelectorAll('[data-close]').forEach((el) => {
    el.addEventListener('click', closeModal);
  });

  // Esc — закрыть
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
}
