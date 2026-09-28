// ============================================
// Данные каталога
// ============================================

const COFFEE_SIZES = [
  { value: '200', label: '200 ml', price: 0, default: true },
  { value: '300', label: '300 ml', price: 0.5 },
  { value: '400', label: '400 ml', price: 1 },
];

const COFFEE_ADDONS = [
  { value: 'sugar', label: 'Sugar', price: 0.3 },
  { value: 'cinnamon', label: 'Cinnamon', price: 0.4 },
  { value: 'syrup', label: 'Syrup', price: 0.5 },
];

const TEA_SIZES = [
  { value: '200', label: '200 ml', price: 0, default: true },
  { value: '300', label: '300 ml', price: 0.5 },
  { value: '400', label: '400 ml', price: 1 },
];

const TEA_ADDONS = [
  { value: 'sugar', label: 'Sugar', price: 0.3 },
  { value: 'lemon', label: 'Lemon', price: 0.4 },
  { value: 'syrup', label: 'Syrup', price: 0.5 },
];

const DESSERT_SIZES = [
  { value: '50', label: '50 g', price: 0, default: true },
  { value: '100', label: '100 g', price: 0.5 },
  { value: '200', label: '200 g', price: 1 },
];

const DESSERT_ADDONS = [
  { value: 'berries', label: 'Berries', price: 0.5 },
  { value: 'nuts', label: 'Nuts', price: 0.5 },
  { value: 'jam', label: 'Jam', price: 0.4 },
];

const PRODUCTS = [
  // ============ COFFEE ============
  {
    id: 'irish-coffee',
    category: 'coffee',
    name: 'Irish coffee',
    description: 'Fragrant black coffee with Jameson Irish whiskey and whipped milk',
    price: 7.00,
    image: 'img/coffee-irish.jpg',
    sizes: COFFEE_SIZES,
    addons: COFFEE_ADDONS,
  },
  {
    id: 'kahlua-coffee',
    category: 'coffee',
    name: 'Kahlua coffee',
    description: 'Classic coffee with milk and Kahlua liqueur under a cap of frothed milk',
    price: 7.00,
    image: 'img/coffee-kahlua.jpg',
    sizes: COFFEE_SIZES,
    addons: COFFEE_ADDONS,
  },
  {
    id: 'honey-raf',
    category: 'coffee',
    name: 'Honey raf',
    description: 'Espresso with frothed milk, cream and aromatic honey',
    price: 5.50,
    image: 'img/coffee-honey-raf.jpg',
    sizes: COFFEE_SIZES,
    addons: COFFEE_ADDONS,
  },
  {
    id: 'ice-cappuccino',
    category: 'coffee',
    name: 'Ice cappuccino',
    description: 'Cappuccino with soft thick foam in summer version with ice',
    price: 5.00,
    image: 'img/coffee-ice-cappuccino.jpg',
    sizes: COFFEE_SIZES,
    addons: COFFEE_ADDONS,
  },
  {
    id: 'espresso',
    category: 'coffee',
    name: 'Espresso',
    description: 'Classic black coffee',
    price: 4.50,
    image: 'img/coffee-espresso.jpg',
    sizes: COFFEE_SIZES,
    addons: COFFEE_ADDONS,
  },
  {
    id: 'latte',
    category: 'coffee',
    name: 'Latte',
    description: 'Fresco coffee with the addition of steamed milk and dense milk foam',
    price: 5.50,
    image: 'img/coffee-latte.jpg',
    sizes: COFFEE_SIZES,
    addons: COFFEE_ADDONS,
  },
  {
    id: 'latte-macchiato',
    category: 'coffee',
    name: 'Latte macchiato',
    description: 'Espresso with frothed milk and chocolate',
    price: 5.50,
    image: 'img/coffee-latte-macchiato.jpg',
    sizes: COFFEE_SIZES,
    addons: COFFEE_ADDONS,
  },
  {
    id: 'coffee-cognac',
    category: 'coffee',
    name: 'Coffee with cognac',
    description: 'Fragrant black coffee with cognac and whipped cream',
    price: 6.50,
    image: 'img/coffee-cognac.jpg',
    sizes: COFFEE_SIZES,
    addons: COFFEE_ADDONS,
  },

  // ============ TEA ============
  {
    id: 'moroccan',
    category: 'tea',
    name: 'Moroccan',
    description: 'Fragrant black tea with the addition of tangerine, cinnamon, honey, lemon and mint',
    price: 4.50,
    image: 'img/tea-moroccan.png',
    sizes: TEA_SIZES,
    addons: TEA_ADDONS,
  },
  {
    id: 'ginger',
    category: 'tea',
    name: 'Ginger',
    description: 'Original black tea with fresh ginger, lemon and honey',
    price: 5.00,
    image: 'img/tea-ginger.png',
    sizes: TEA_SIZES,
    addons: TEA_ADDONS,
  },
  {
    id: 'cranberry',
    category: 'tea',
    name: 'Cranberry',
    description: 'Invigorating black tea with cranberry and honey',
    price: 5.00,
    image: 'img/tea-cranberry.png',
    sizes: TEA_SIZES,
    addons: TEA_ADDONS,
  },
  {
    id: 'sea-buckthorn',
    category: 'tea',
    name: 'Sea buckthorn',
    description: 'Toning sweet black tea with sea buckthorn, fresh thyme and cinnamon',
    price: 5.50,
    image: 'img/tea-sea-buckthorn.png',
    sizes: TEA_SIZES,
    addons: TEA_ADDONS,
  },

  // ============ DESSERT ============
  {
    id: 'marble-cheesecake',
    category: 'dessert',
    name: 'Marble cheesecake',
    description: 'Philadelphia cheese with lemon zest on a light sponge cake and red currant jam',
    price: 3.50,
    image: 'img/dessert-marble-cheesecake.png',
    sizes: DESSERT_SIZES,
    addons: DESSERT_ADDONS,
  },
  {
    id: 'red-velvet',
    category: 'dessert',
    name: 'Red velvet',
    description: 'Layer cake with cream cheese frosting',
    price: 4.00,
    image: 'img/dessert-red-velvet.png',
    sizes: DESSERT_SIZES,
    addons: DESSERT_ADDONS,
  },
  {
    id: 'cheesecakes',
    category: 'dessert',
    name: 'Cheesecakes',
    description: 'Soft cottage cheese pancakes with sour cream and fresh berries and sprinkled with powdered sugar',
    price: 4.50,
    image: 'img/dessert-cheesecakes.png',
    sizes: DESSERT_SIZES,
    addons: DESSERT_ADDONS,
  },
  {
    id: 'creme-brulee',
    category: 'dessert',
    name: 'Creme brulee',
    description: 'Delicate creamy dessert in a caramel basket with wild berries',
    price: 4.00,
    image: 'img/dessert-creme-brulee.png',
    sizes: DESSERT_SIZES,
    addons: DESSERT_ADDONS,
  },
  {
    id: 'pancakes',
    category: 'dessert',
    name: 'Pancakes',
    description: 'Tender pancakes with strawberry jam and fresh strawberries',
    price: 4.50,
    image: 'img/dessert-pancakes.png',
    sizes: DESSERT_SIZES,
    addons: DESSERT_ADDONS,
  },
  {
    id: 'honey-cake',
    category: 'dessert',
    name: 'Honey cake',
    description: 'Classic honey cake with delicate custard',
    price: 4.50,
    image: 'img/dessert-honey-cake.png',
    sizes: DESSERT_SIZES,
    addons: DESSERT_ADDONS,
  },
  {
    id: 'chocolate-cake',
    category: 'dessert',
    name: 'Chocolate cake',
    description: 'Cake with hot chocolate filling and nuts with dried apricots',
    price: 5.50,
    image: 'img/dessert-chocolate-cake.png',
    sizes: DESSERT_SIZES,
    addons: DESSERT_ADDONS,
  },
  {
    id: 'black-forest',
    category: 'dessert',
    name: 'Black forest',
    description: 'A combination of thin sponge cake with cherry jam and light chocolate',
    price: 6.50,
    image: 'img/dessert-black-forest.png',
    sizes: DESSERT_SIZES,
    addons: DESSERT_ADDONS,
  },
];
