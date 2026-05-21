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
  
const API_KEY = '40bb216eff75f1d8fa5c1203405975c1'; 
const LAT     = -12.04;   
const LON     = -77.04;
const UNITS = 'imperial'; 

function formatTime(unixTimestamp, timezoneOffset) {
  const date = new Date((unixTimestamp + timezoneOffset) * 1000);
  let hours   = date.getUTCHours();
  const mins  = date.getUTCMinutes().toString().padStart(2, '0');
  const ampm  = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12 || 12;
  return `${hours}:${mins}${ampm}`;
}
function getDayLabel(unixTimestamp) {
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  return days[new Date(unixTimestamp * 1000).getDay()];
}
 
async function loadWeather() {
  try {
    const curRes  = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=${UNITS}`
    );
    if (!curRes.ok) throw new Error('Weather fetch failed');
        const cur = await curRes.json();
      document.getElementById('w-temp').textContent    = Math.round(cur.main.temp);
    document.getElementById('w-desc').textContent    =
      cur.weather[0].description.replace(/\b\w/g, c => c.toUpperCase());
    document.getElementById('w-high').textContent    = Math.round(cur.main.temp_max);
    document.getElementById('w-low').textContent     = Math.round(cur.main.temp_min);
    document.getElementById('w-humidity').textContent = cur.main.humidity;
    document.getElementById('w-sunrise').textContent =
      formatTime(cur.sys.sunrise, cur.timezone);
    document.getElementById('w-sunset').textContent  =
      formatTime(cur.sys.sunset,  cur.timezone);
 
    const icon = cur.weather[0].icon;
    const iconEl = document.getElementById('weather-icon');
    iconEl.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        iconEl.alt = cur.weather[0].description;
       const foreRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=${UNITS}`
    );
    if (!foreRes.ok) throw new Error('Forecast fetch failed');
    const fore = await foreRes.json();
 
    const today = new Date().toDateString();
    const seen  = new Set();
    const days  = [];
 
    for (const item of fore.list) {
      const d    = new Date(item.dt * 1000);
      const key  = d.toDateString();
      if (key === today || seen.has(key)) continue;
      seen.add(key);
      days.push(item);
      if (days.length === 3) break;
        }
      const list = document.getElementById('forecast-list');
    list.innerHTML = days.map(d => `
      <li class="forecast-item">
        <span class="forecast-day">${getDayLabel(d.dt)}:</span>
        <strong class="forecast-temp">${Math.round(d.main.temp)}°F</strong>
      </li>`).join('');
 
  } catch (err) {
    console.warn('Weather error:', err.message);
    document.getElementById('w-desc').textContent = 'Weather unavailable';
    document.getElementById('forecast-list').innerHTML =
      '<li>Forecast unavailable</li>';
  }
}
 
loadWeather();
 function getBadgeHTML(level) {
  if (level === 3) return `<span class="badge badge-gold">⭐ Gold</span>`;
  if (level === 2) return `<span class="badge badge-silver">🥈 Silver</span>`;
  return '';
}
 
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
async function loadSpotlights() {
  const container = document.getElementById('spotlights-container');
  try {
    const res = await fetch('data/members.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const members = await res.json();
 
    const eligible = members.filter(m => m.membershipLevel >= 2);
    shuffle(eligible);
 
   const count    = Math.random() < 0.5 ? 2 : 3;
    const selected = eligible.slice(0, count);
 
  container.innerHTML = selected.map(m => `
  <article class="spotlight-card">
    <div class="spotlight-header-row">
      <div class="spotlight-text-top">
        <h4 class="spotlight-name">${m.name}</h4>
        <p class="spotlight-tagline">${m.tagline || ''}</p>
      </div>
    </div>
    <div class="spotlight-body">
      <div class="spotlight-img-wrap">
        <img src="images/${m.image}" alt="${m.name} logo" loading="lazy" width="160" height="100">
      </div>
      <div class="spotlight-info">
        <p><strong>EMAIL:</strong> ${m.email}</p>
        <p><strong>PHONE:</strong> ${m.phone}</p>
        <p><strong>URL:</strong> <a href="${m.website}" target="_blank" rel="noopener">
          ${m.website.replace(/^https?:\/\//, '')}
        </a></p>
      </div>
    </div>
  </article>`).join('');
 
  } catch (err) {
    container.innerHTML = `<p style="color:#c0392b;">⚠️ Could not load spotlights.</p>`;
    console.warn('Spotlights error:', err.message);
  }
}
 
loadSpotlights();