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


function initForm() {
  const form = document.getElementById('recommendation-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    const data = {
      name:         form.name.value.trim(),
      email:        form.email.value.trim(),
      neighborhood: form.neighborhood.value,
      restaurant:   form.restaurant.value.trim(),
      dish:         form.dish.value.trim(),
      rating:       form.rating.value,
      comments:     form.comments.value.trim(),
      submitted:    new Date().toISOString(),
    };
    localStorage.setItem('ls_last_recommendation', JSON.stringify(data));
  });
}


document.addEventListener('DOMContentLoaded', async () => {
  initForm();

  const weather = await getWeather();
  renderWeatherWidget(weather, 'weather-widget');
});
