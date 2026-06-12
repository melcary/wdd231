import { getWeather, renderWeatherWidget } from './weather.js';

const hamBtn = document.querySelector('#ham-btn');
const mainNav = document.querySelector('#nav-links');
 
hamBtn.addEventListener('click', () => {
  hamBtn.classList.toggle('open');
  mainNav.classList.toggle('open');
});
 
 
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent =
    `Last Modification: ${document.lastModified}`;

document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});
let allDishes   = [];
let activeFilter = 'All';


function renderDishes(dishes) {
  const grid = document.getElementById('dishes-grid');
  if (!grid) return;

  if (dishes.length === 0) {
    grid.innerHTML = '<p>No dishes found for this category.</p>';
    return;
  }

  grid.innerHTML = dishes.map(dish => `
    <article class="card dish-card" data-id="${dish.id}" tabindex="0"
         role="button" aria-label="View details for ${dish.name}">
  <img
    class="card-img"
    src="${dish.image}"
    alt="${dish.name}"
    loading="lazy"
  >

  <div class="card-body">
    <h3>${dish.name}</h3>

    <p>
      <span class="badge">${dish.category}</span>
      <span class="badge">${dish.region}</span>
    </p>

  </div>
</article>
  `).join('');


  grid.querySelectorAll('.dish-card').forEach(card => {
    card.addEventListener('click', () => openModal(parseInt(card.dataset.id)));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(parseInt(card.dataset.id));
      }
    });
  });
}

function initFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      activeFilter = btn.dataset.filter;
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filtered = activeFilter === 'All'
        ? allDishes
        : allDishes.filter(d => d.category === activeFilter);

      renderDishes(filtered);
    });
  });
}

function openModal(id) {
  const dish    = allDishes.find(d => d.id === id);
  const overlay = document.getElementById('dish-modal');
  const content = document.getElementById('modal-content');
  if (!dish || !overlay || !content) return;

  content.innerHTML = `
    <button class="modal-close" id="modal-close-btn" aria-label="Close dialog">✕</button>
    <img
  class="card-img"
  src="${dish.image}"
  alt="${dish.name}">
    <h2>${dish.name}</h2>
    <p>${dish.description}</p>
    <div class="modal-detail">
      <div class="modal-detail-item">
        <label>Category</label>
        <span>${dish.category}</span>
      </div>
      <div class="modal-detail-item">
        <label>Region</label>
        <span>${dish.region}</span>
      </div>
    </div>
    <div>
      <strong>📍 Where to try it:</strong> ${dish.whereToTry}
    </div>
  `;

  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  const closeBtn = document.getElementById('modal-close-btn');
  closeBtn?.focus();
  closeBtn?.addEventListener('click', closeModal);
}

function closeModal() {
  const overlay = document.getElementById('dish-modal');
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}


async function loadDishes() {
  const grid = document.getElementById('dishes-grid');
  if (!grid) return;

  try {
    const response = await fetch('data/dishes.json');
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    allDishes = await response.json();

    allDishes = [...allDishes].sort((a, b) => a.name.localeCompare(b.name));

    renderDishes(allDishes);
  } catch (error) {
    console.error('Dishes fetch error:', error);
    grid.innerHTML = `
      <p>
        Could not load dishes. Please try again later.
      </p>`;
  }
}


function persistFilter() {
  const saved = localStorage.getItem('ls_dish_filter');
  if (saved) {
    const btn = document.querySelector(`.filter-btn[data-filter="${saved}"]`);
    if (btn) btn.click();
  }

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      localStorage.setItem('ls_dish_filter', btn.dataset.filter);
    });
  });
}


document.addEventListener('DOMContentLoaded', async () => {

  initFilters();
  await loadDishes();
  persistFilter();

  const weather = await getWeather();
  renderWeatherWidget(weather, 'weather-widget');
});
