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
// Модальное окно
// ============================================
const modal = document.getElementById('modal');
const modalImage = modal?.querySelector('.modal__image');
const modalTitle = modal?.querySelector('.modal__title');
const modalDesc = modal?.querySelector('.modal__desc');
const modalPrice = modal?.querySelector('.modal__price');

const sizeInputs = modal ? modal.querySelectorAll('input[name="size"]') : [];

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
  modalPrice.textContent = `Total: $${total.toFixed(2)}`; // ← "Total:" добавлен
}

function resetOptions() {
  const defaultSize = modal.querySelector('input[name="size"][value="200"]');
  if (defaultSize) defaultSize.checked = true;

  modal.querySelectorAll('input[name="addon"]').forEach((cb) => {
    cb.checked = false;
  });
}
// Добавки по категориям
const ADDONS = {
  coffee: [
    { value: 'sugar', label: 'Sugar', price: 0.3 },
    { value: 'cinnamon', label: 'Cinnamon', price: 0.4 },
    { value: 'syrup', label: 'Syrup', price: 0.5 },
  ],
  tea: [
    { value: 'sugar', label: 'Sugar', price: 0.3 },
    { value: 'lemon', label: 'Lemon', price: 0.4 },
    { value: 'syrup', label: 'Syrup', price: 0.5 },
  ],
  dessert: [
    { value: 'berries', label: 'Berries', price: 0.5 },
    { value: 'nuts', label: 'Nuts', price: 0.5 },
    { value: 'jam', label: 'Jam', price: 0.4 },
  ],
};

const addonsContainer = document.getElementById('modalAddons');

function renderAddons(category) {
  const list = ADDONS[category] || [];
  addonsContainer.innerHTML = list.map((item) => `
    <label class="modal__addon">
      <input type="checkbox" name="addon" value="${item.value}" data-price="${item.price}">
      <span>${item.label}</span>
    </label>
  `).join('');

  // Переподключаем слушатели к новым чекбоксам
  addonsContainer.querySelectorAll('input[name="addon"]').forEach((input) => {
    input.addEventListener('change', updatePrice);
  });
}
function openModal(card) {
  const img = card.querySelector('img');
  const name = card.querySelector('.card__name');
  const desc = card.querySelector('.card__desc');
  const priceEl = card.querySelector('.card__price');
  const category = card.dataset.category;

  modalImage.src = img ? img.src : '';
  modalImage.alt = img ? img.alt : '';
  modalTitle.textContent = name ? name.textContent : '';
  modalDesc.textContent = desc ? desc.textContent : '';

  renderAddons(category);

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
}
