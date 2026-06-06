import { places } from '../data/places.mjs';

const hamBtn  = document.querySelector('#ham-btn');
const mainNav = document.querySelector('#main-nav');
 
hamBtn.addEventListener('click', () => {
  hamBtn.classList.toggle('open');
  mainNav.classList.toggle('open');
});
 
document.querySelectorAll('nav ul li a').forEach(link => {
  if (link.href === window.location.href) link.classList.add('active');
});
 
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent =
    `Last Modification: ${document.lastModified}`;

const banner    = document.getElementById('visit-banner');
const now       = Date.now();
const lastVisit = localStorage.getItem('discoverLastVisit');
if (!lastVisit) {
  banner.textContent = '👋 Welcome! Let us know if you have any questions.';
} else {
  const diffMs   = now - Number(lastVisit);
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays < 1) {
    banner.textContent = '😊 Back so soon! Awesome!';
  } else if (diffDays === 1) {
    banner.textContent = 'You last visited 1 day ago.';
  } else {
    banner.textContent = `You last visited ${diffDays} days ago.`;
  }
}
 
localStorage.setItem('discoverLastVisit', now);

const grid = document.getElementById('discover-grid');

grid.innerHTML = places.map((place, i) => `
  <article class="discover-card">
    <h2 class="discover-card-title">${place.name}</h2>
    <figure class="discover-figure">
      <img
        src="images/${place.image}"
        alt="${place.name}"
        loading="${i < 2 ? 'eager' : 'lazy'}"
        width="300"
        height="200">
    </figure>
      <p class="discover-desc">${place.description}</p>
      <p class="discover-address">${place.address}</p>
    <a href="${place.link}" target="_blank" rel="noopener" class="discover-btn" aria-label="Learn more about ${place.name}" title="Learn more about ${place.name}">Learn More about ${place.name}</a>
  </article>
`).join('');