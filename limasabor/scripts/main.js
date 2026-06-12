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

async function loadFeaturedDishes() {
  const grid = document.getElementById('featured-dishes');
  if (!grid) return;

  try {
    const response = await fetch('data/dishes.json');
    if (!response.ok) throw new Error('Failed to load dishes');
    const dishes = await response.json();

    const featured = dishes.slice(0, 3);

    grid.innerHTML = featured.map(dish => `
  <article class="card">
    <img
      class="card-img"
      src="${dish.image}"
      alt="${dish.name}"
      loading="lazy"
    >
    <div class="card-body">
      <h3>${dish.name}</h3>
      <p>
        ${dish.category} 
      </p>
      <p>${dish.description}</p>
      <p>📍 <em>${dish.whereToTry}</em></p>
    </div>
  </article>
`).join('');
  } catch (error) {
    console.error('Featured dishes error:', error);
    grid.innerHTML = '<p>Could not load featured dishes.</p>';
  }
}

async function initWeather() {
  const weather = await getWeather();
  renderWeatherWidget(weather, 'weather-widget');
}

function trackVisit() {
  const lastVisit = localStorage.getItem('ls_last_visit');
  const banner    = document.getElementById('visit-banner');
  if (!banner) return;

  if (lastVisit) {
    const date = new Date(lastVisit).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
    banner.textContent = `Welcome back! Your last visit was ${date}.`;
    banner.style.display = 'block';
  }

  localStorage.setItem('ls_last_visit', new Date().toISOString());
}


document.addEventListener('DOMContentLoaded', () => {
  loadFeaturedDishes();
  initWeather();
  trackVisit();
});