// Your code here!
const weatherApi = "https://api.weather.gov/alerts/active?area=";

// FETCH FUNCTION
async function fetchWeatherAlerts(state) {
  try {
    if (!state) {
      throw new Error("Please enter a state code.");
    }

    const response = await fetch(`${weatherApi}${state}`);

    if (!response.ok) {
      throw new Error("Failed to fetch weather alerts.");
    }

    const data = await response.json();

    displayAlerts(data);
  } catch (error) {
    displayError(error.message);
  }
}

// DISPLAY ALERTS
function displayAlerts(data) {
  const alertsDiv = document.getElementById("alerts-display");
  const errorDiv = document.getElementById("error-message");

  // clear previous alerts
  alertsDiv.innerHTML = "";

  // clear and hide error
  errorDiv.textContent = "";
  errorDiv.classList.add("hidden");

  const alerts = data.features;

  const title = document.createElement("h2");
  title.textContent = `Weather Alerts: ${alerts.length}`;
  alertsDiv.appendChild(title);

  const list = document.createElement("ul");

  alerts.forEach(alert => {
    const li = document.createElement("li");
    li.textContent = alert.properties.headline;
    list.appendChild(li);
  });

  alertsDiv.appendChild(list);
}

// DISPLAY ERROR
function displayError(message) {
  const errorDiv = document.getElementById("error-message");
  const alertsDiv = document.getElementById("alerts-display");

  // clear alerts
  alertsDiv.innerHTML = "";

  // show error
  errorDiv.textContent = message;
  errorDiv.classList.remove("hidden");
}

// EVENT LISTENER (button click)
document.getElementById("fetch-alerts").addEventListener("click", function () {
  const input = document.getElementById("state-input");
  const state = input.value.trim().toUpperCase();

  fetchWeatherAlerts(state);

  // clear input
  input.value = "";
});

