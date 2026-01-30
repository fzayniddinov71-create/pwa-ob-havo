const API_KEY = "859f19df4b4586f7545eaa5a3e02dd84";


const result = document.getElementById("result");
const forecastDiv = document.getElementById("forecast");
const aqiDiv = document.getElementById("aqi");
const alertDiv = document.getElementById("alert");


async function getWeather() {
const city = cityInput.value;


const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=uz&appid=${API_KEY}`);
const data = await res.json();


const { temp, humidity } = data.main;
const icon = data.weather[0].icon;
const desc = data.weather[0].description;
const { lat, lon } = data.coord;


result.innerHTML = `
<h2>${city}</h2>
<img src="https://openweathermap.org/img/wn/${icon}@2x.png">
<p>${temp}°C — ${desc}</p>
<p>💧 Namlik: ${humidity}%</p>
`;


getForecast(city);
getAQI(lat, lon);
showMap(lat, lon);
}


async function getForecast(city) {
const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=uz&appid=${API_KEY}`);
const data = await res.json();


forecastDiv.innerHTML = "";
alertDiv.innerHTML = "";


for (let i = 0; i < data.list.length; i += 8) {
const item = data.list[i];
const date = new Date(item.dt * 1000).toLocaleDateString("uz-UZ", { weekday: "short" });
const icon = item.weather[0].icon;
const desc = item.weather[0].description;


if (desc.includes("qor")) {
alertDiv.innerHTML = "❄️ OG'OHLANTIRISH: QOR YOG'ADI";
}


forecastDiv.innerHTML += `
<div class="day">
<b>${date}</b><br>
<img src="https://openweathermap.org/img/wn/${icon}.png"><br>
${Math.round(item.main.temp)}°C<br>
${desc}
</div>
`;
}
}


async function getAQI(lat, lon) {
const res = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
const data = await res.json();


const aqi = data.list[0].main.aqi;
const level = ["Yaxshi", "O‘rtacha", "Yomon", "Xavfli", "Juda xavfli"][aqi - 1];


aqiDiv.innerHTML = `🌫 Havo ifloslanishi: <b>${level}</b>`;
}


function showMap(lat, lon) {
map.innerHTML = `<iframe width="100%" height="100%" src="https://maps.google.com/maps?q=${lat},${lon}&z=10&output=embed"></iframe>`;
}


// Dark / Light


themeToggle.onclick = () => {
document.body.classList.toggle("light");
};


// PWA
if ('serviceWorker' in navigator) {
navigator.serviceWorker.register('service-worker.js');
}
