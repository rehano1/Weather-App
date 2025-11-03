let city = document.querySelector("#search-input");

let form = document.querySelector("#search-form");

form.addEventListener("submit", fetchData);
// const city = 'London';
async function fetchData(event) {
  event.preventDefault();
  const apiKey = "WSQ2CTSN4TFT36QKQ33R63AWY";
  const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city.value}?unitGroup=us&key=${apiKey}&contentType=json`;

  try {
    const response = await fetch(apiUrl, { mode: "cors" });
    if (!response.ok) {
      throw new Error("Response not ok");
    }
    const myData = await response.json();
    const newData = processData(myData);
    const display = displayData(newData);
    console.log (display);

  } catch (error) {
    console.error("fetch error:", error);
  }
}

function processData(data) {
  const selectedData = {
    City: data.resolvedAddress,
    Temperature: Math.round(data.currentConditions.temp),
    FeelsLike: Math.round(data.currentConditions.feelslike),
    Humidity: Math.round(data.currentConditions.humidity),
    WindSpeed: Math.round(data.currentConditions.windspeed),
  };
  return selectedData;
}

function displayData(data) {
    const showData = document.querySelector('#show-data');
    let html = "<h2>Weather Info</h2>"
    for (let key in data) {
        html += `<li>${key}: ${data[key]} </li>`
    }

    showData.innerHTML = html;
    

    
}

