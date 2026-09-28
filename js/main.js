// ============================================
// Переключение темы
// ============================================
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

function openMenu() {
  nav.classList.add('is-open');
  burger.classList.add('is-open');
  burger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden'; // блокируем прокрутку
}

function closeMenu() {
  nav.classList.remove('is-open');
  burger.classList.remove('is-open');
  burger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = ''; // восстанавливаем прокрутку
}

function toggleMenu() {
  const isOpen = nav.classList.contains('is-open');
  isOpen ? closeMenu() : openMenu();
}

if (burger && nav) {
  burger.addEventListener('click', toggleMenu);
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Escape закрывает бургер
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // При увеличении окна — закрываем бургер автоматически
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && nav.classList.contains('is-open')) {
      closeMenu();
    }
  });
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
  if (!slides.length) return;
  showSlide((currentSlide + 1) % slides.length);
}

function prevSlide() {
  if (!slides.length) return;
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
// Рендер карточек каталога из PRODUCTS
// ============================================
const cardsContainer = document.getElementById('cards');
const tabs = document.querySelectorAll('.tabs__btn');
const showMoreBtn = document.querySelector('.show-more');
const MOBILE_BREAKPOINT = 768;
const VISIBLE_ON_MOBILE = 4;

let currentCategory = 'coffee';
let isExpanded = false;

function createCard(product) {
  const li = document.createElement('li');
  li.className = 'card';
  li.dataset.category = product.category;
  li.dataset.id = product.id;

  li.innerHTML = `
    <img class="card__img" src="${product.image}" alt="${product.name}" width="300" height="300">
    <h2 class="card__name">${product.name}</h2>
    <p class="card__desc">${product.description}</p>
    <span class="card__price">$${product.price.toFixed(2)}</span>
  `;

  return li;
}

function renderCards() {
  if (!cardsContainer || typeof PRODUCTS === 'undefined') return;

  cardsContainer.innerHTML = '';
  PRODUCTS.forEach((product) => {
    cardsContainer.appendChild(createCard(product));
  });
}

function applyFilters() {
  if (!cardsContainer) return;

  const cards = cardsContainer.querySelectorAll('.card');
  const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
  const categoryCards = [...cards].filter((c) => c.dataset.category === currentCategory);
  const shouldHide = isMobile && !isExpanded;

  cards.forEach((card) => {
    if (card.dataset.category !== currentCategory) {
      card.hidden = true;
    } else {
      const index = categoryCards.indexOf(card);
      card.hidden = shouldHide && index >= VISIBLE_ON_MOBILE;
    }
  });

  // Кнопка Show more
  if (showMoreBtn) {
    const hasMore = categoryCards.length > VISIBLE_ON_MOBILE;
    if (!isMobile || !hasMore || isExpanded) {
      showMoreBtn.hidden = true;
    } else {
      showMoreBtn.hidden = false;
    }
  }
}

function filterCards(category) {
  currentCategory = category;
  isExpanded = false;
  applyFilters();
}

if (tabs.length && cardsContainer) {
  // Первый рендер
  renderCards();

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('tabs__btn--active'));
      tab.classList.add('tabs__btn--active');
      filterCards(tab.dataset.category);
    });
  });

  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
      isExpanded = true;
      applyFilters();
    });
  }

  window.addEventListener('resize', applyFilters);

  // По умолчанию — Coffee
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
const sizesContainer = document.getElementById('modalSizes');
const addonsContainer = document.getElementById('modalAddons');

let basePrice = 0;
let currentProduct = null;

function renderSizes(product) {
  if (!sizesContainer || !product.sizes) return;

  sizesContainer.innerHTML = product.sizes.map((item) => `
    <label class="modal__option">
      <input type="radio" name="size" value="${item.value}" data-price="${item.price}" ${item.default ? 'checked' : ''}>
      <span>${item.label}</span>
    </label>
  `).join('');

  sizesContainer.querySelectorAll('input[name="size"]').forEach((input) => {
    input.addEventListener('change', updatePrice);
  });
}

function renderAddons(product) {
  if (!addonsContainer || !product.addons) return;

  addonsContainer.innerHTML = product.addons.map((item) => `
    <label class="modal__addon">
      <input type="checkbox" name="addon" value="${item.value}" data-price="${item.price}">
      <span>${item.label}</span>
    </label>
  `).join('');

  addonsContainer.querySelectorAll('input[name="addon"]').forEach((input) => {
    input.addEventListener('change', updatePrice);
  });
}

function updatePrice() {
  if (!modal) return;
  const sizeAdd = parseFloat(
    modal.querySelector('input[name="size"]:checked')?.dataset.price || 0
  );
  let addonsAdd = 0;
  modal.querySelectorAll('input[name="addon"]:checked').forEach((cb) => {
    addonsAdd += parseFloat(cb.dataset.price || 0);
  });

  const total = basePrice + sizeAdd + addonsAdd;
  modalPrice.textContent = `Total: $${total.toFixed(2)}`;
}

function openModal(product) {
  if (!modal || !product) return;

  currentProduct = product;
  basePrice = product.price;

  modalImage.src = product.image;
  modalImage.alt = product.name;
  modalTitle.textContent = product.name;
  modalDesc.textContent = product.description;

  renderSizes(product);
  renderAddons(product);
  updatePrice();

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  currentProduct = null;
}

// Делегирование клика по карточкам
if (modal && cardsContainer) {
  cardsContainer.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (!card) return;
    const product = PRODUCTS.find((p) => p.id === card.dataset.id);
    if (product) openModal(product);
  });

  modal.querySelectorAll('[data-close]').forEach((el) => {
    el.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
}
