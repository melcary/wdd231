
const API_KEY = '40bb216eff75f1d8fa5c1203405975c1'; 
const CITY_ID = '3936456';           
const ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?id=${CITY_ID}&appid=${API_KEY}&units=metric`;

export async function getWeather() {
  const cached = getCachedWeather();
  if (cached) return cached;

  try {
    const response = await fetch(ENDPOINT);
    if (!response.ok) throw new Error(`Weather API error: ${response.status}`);
    const data = await response.json();

    const weather = {
      temp: Math.round(data.main.temp),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      city: data.name,
    };

    localStorage.setItem('ls_weather', JSON.stringify({ data: weather, timestamp: Date.now() }));
    return weather;
  } catch (error) {
    console.warn('Weather fetch failed:', error.message);
    return null;
  }
}

function getCachedWeather() {
  try {
    const raw = localStorage.getItem('ls_weather');
    if (!raw) return null;
    const { data, timestamp } = JSON.parse(raw);
    const TEN_MIN = 10 * 60 * 1000;
    if (Date.now() - timestamp < TEN_MIN) return data;
  } catch {
   
  }
  return null;
}

export function renderWeatherWidget(weather, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;

  if (!weather) {
    el.innerHTML = `<span>Lima, PE</span>`;
    return;
  }

  el.innerHTML = `
    <img
      src="https://openweathermap.org/img/wn/${weather.icon}.png"
      alt="${weather.description}"
      width="40" height="40"
      loading="lazy"
    />
    <div>
      <span class="temp">${weather.temp}°C</span>
      <span>${weather.description}</span>
      <div>Lima, Peru · ${weather.humidity}% humidity</div>
    </div>
  `;
}