const apiKey = "7d1a139c7619a69baf4471c8831cd846";
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") return;
  getWeather(city);
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

async function getWeather(city) {
  weatherResult.innerHTML = "<p>Loading...</p>";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      if (data.cod === 401) {
        weatherResult.innerHTML = "<p>API key not active yet. Wait a bit and try again.</p>";
      } else if (data.cod === "404") {
        weatherResult.innerHTML = "<p>City not found. Check spelling and try again.</p>";
      } else {
        weatherResult.innerHTML = `<p>Error: ${data.message}</p>`;
      }
      return;
    }

    displayWeather(data);

  } catch (error) {
    weatherResult.innerHTML = "<p>Something went wrong. Please try again.</p>";
  }
}

function displayWeather(data) {
  const cityName = data.name;
  const temp = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const humidity = data.main.humidity;
  const icon = data.weather[0].icon;

  weatherResult.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
    <h2>${cityName}</h2>
    <p class="temp">${temp}°C</p>
    <p class="desc">${description}</p>
    <p class="humidity">Humidity: ${humidity}%</p>
  `;
}

getWeather("Nairobi");