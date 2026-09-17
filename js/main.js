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

const sizeInputs = modal ? modal.querySelectorAll('input[name="size"]') : [];
const addonInputs = modal ? modal.querySelectorAll('input[name="addon"]') : [];

let basePrice = 0;

function updatePrice() {
  const sizeAdd = parseFloat(
    modal.querySelector('input[name="size"]:checked')?.dataset.price || 0
  );
  let addonsAdd = 0;
  modal.querySelectorAll('input[name="addon"]:checked').forEach((cb) => {
    addonsAdd += parseFloat(cb.dataset.price || 0);
  });

  const total = basePrice + sizeAdd + addonsAdd;
  modalPrice.textContent = `$${total.toFixed(2)}`;
}

function resetOptions() {
  const smallSize = modal.querySelector('input[name="size"][value="s"]');
  if (smallSize) smallSize.checked = true;

  modal.querySelectorAll('input[name="addon"]').forEach((cb) => {
    cb.checked = false;
  });
}

function openModal(card) {
  const img = card.querySelector('img');
  const name = card.querySelector('.card__name');
  const desc = card.querySelector('.card__desc');
  const priceEl = card.querySelector('.card__price');

  modalImage.src = img ? img.src : '';
  modalImage.alt = img ? img.alt : '';
  modalTitle.textContent = name ? name.textContent : '';
  modalDesc.textContent = desc ? desc.textContent : '';

  basePrice = priceEl ? parseFloat(priceEl.textContent.replace('$', '')) : 0;

  resetOptions();
  updatePrice();

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

if (modal) {
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => openModal(card));
  });

  modal.querySelectorAll('[data-close]').forEach((el) => {
    el.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  sizeInputs.forEach((input) => input.addEventListener('change', updatePrice));
  addonInputs.forEach((input) => input.addEventListener('change', updatePrice));
}
