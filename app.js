function searchBtn() {
  const enteredValue = document.querySelector(".searchbar").value;
  document.querySelector(".error").style.display = "none";
  console.log(enteredValue);
  weatherData(enteredValue);
}

async function weatherData(city) {
  const data = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=9579d11afc34453aa5854342230205&q=${city}&days=7&aqi=no&alerts=no`
  ).then((response) => {
    if (!response.ok) {
      document.querySelector(".error").style.display = "block";
    }

    return response.json();
  });

  //   console.log(data);
  //setting up the city name

  document.querySelector(".city").innerHTML = `${data.location.name}`;
  // Code Snippet for setting the Temperature,Description,Humidity,Windspeed,Date,Icons
  for (let i = 1; i < 8; i++) {
    document.querySelector(`.t${i}`).innerHTML = `${
      data.forecast.forecastday[`${i - 1}`].day.avgtemp_c
    }°C`;
    let description = `${
      data.forecast.forecastday[`${i - 1}`].day.condition.text
    }`;
    document.querySelector(`.d${i}`).innerHTML = description;
    document.querySelector(`.h${i}`).innerHTML = `${
      data.forecast.forecastday[`${i - 1}`].day.avghumidity
    }%`;
    document.querySelector(`.w${i}`).innerHTML = `${
      data.forecast.forecastday[`${i - 1}`].day.maxwind_kph
    }km/h`;

    i > 1
      ? (document.querySelector(`.date${i}`).innerHTML = `${
          data.forecast.forecastday[`${i - 1}`].date
        }`)
      : null;

    if (
      description == "Patchy rain possible" ||
      description == "Moderate rain"
    ) {
      document.querySelector(`.i${i}`).src = "";
    } else if (description == "Partly cloudy") {
      document.querySelector(`.i${i}`).src = "";
    } else if (description == "Sunny") {
      document.querySelector(`.i${i}`).src = "";
    } else if (description == "Heavy rain") {
      document.querySelector(`.i${i}`).src = "";
    } else if (description == "Overcast") {
      document.querySelector(`.i${i}`).src = "";
    }
  }
}

weatherData("Guwahati");
