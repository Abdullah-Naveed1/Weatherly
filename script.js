const apiKey = `YOUR_API_KEY`;

const searchButton = document.querySelector('#search-button');
const cityName = document.querySelector("#city-name");
const cityInput = document.querySelector('#city-input');
const feedback = document.querySelector("#feedback");
const temperature = document.querySelector("#temperature");
const tempUnit = document.querySelector("#temperature-unit");
const humid = document.querySelector("#humidity");
const pres = document.querySelector("#pressure");
const wind = document.querySelector("#wind");
const feelsLike = document.querySelector("#feels-like");
const celciusBtn = document.querySelector("#celcius");
const fahrenheitBtn = document.querySelector("#fahrenheit");

celciusBtn.classList.add("clicked");

let currentUnit = "celcius";

let globalTemp=-1, globalFeelsLike=-1;

function FtoC(temp){
    temp = (temp-32)*5/9;
    return temp.toFixed(1);
}

function CtoF(temp){
    temp = 9/5*temp+32;
    return temp.toFixed(1);
}

celciusBtn.addEventListener('click', () => {
    currentUnit = "celcius";
    celciusBtn.classList.add("clicked");
    fahrenheitBtn.classList.remove("clicked");
    if (temperature.textContent !== "--") {
        if (temperature.textContent.at(-1) === "F") {
            if(globalTemp!=-1){
                globalTemp = FtoC(globalTemp);
                temperature.textContent = `${globalTemp}°C`;
            }
            if(globalFeelsLike!=-1){
                globalFeelsLike = FtoC(globalFeelsLike);
                feelsLike.textContent = `Feels like: ${globalFeelsLike}°C`;
            }
        }
    }
});

fahrenheitBtn.addEventListener('click', () => {
    currentUnit = "fahrenheit";
    fahrenheitBtn.classList.add("clicked");
    celciusBtn.classList.remove("clicked");
    if (temperature.textContent !== "--") {
        if (temperature.textContent.at(-1) === "C") {
            if(globalTemp!=-1){
                globalTemp = CtoF(globalTemp);
                temperature.textContent = `${globalTemp}°F`;
            }
            if(globalFeelsLike!=-1){
                globalFeelsLike = CtoF(globalFeelsLike);
                feelsLike.textContent = `Feels like: ${globalFeelsLike}°F`;
            }
        }
    }
});

searchButton.addEventListener('click', async (event) => {
    try {
        const inputtedCity = cityInput.value;
        const geoResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${inputtedCity}&limit=1&appid=${apiKey}`);
        if(!geoResponse.ok){
            cityName.textContent = "API key error / Network issue";
            return;
        }
        const geoData = await geoResponse.json();
        if (geoData.length === 0) {
            cityName.textContent = `City not found`;
            return;
        }
        const [{ lat: latitude, lon: longitude }] = geoData;

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        const { weather: [{ description: desc }], main: { temp, feels_like, humidity, pressure }, wind: { speed: windSpeed } } = data;

        let tempNum = Number(temp);
        if (currentUnit === "celcius") {
            tempNum = tempNum - 273.15;
            tempNum = tempNum.toFixed(1);
        }
        else if (currentUnit === "fahrenheit") {
            tempNum = 9 / 5 * (tempNum - 273.15) + 32;
            tempNum = tempNum.toFixed(1);
        }

        let feelsLikeNum = Number(feels_like);

        if (currentUnit === "celcius") {
            feelsLikeNum = feelsLikeNum - 273.15;
            feelsLikeNum = feelsLikeNum.toFixed(1);
        }
        else if (currentUnit === "fahrenheit") {
            feelsLikeNum = 9 / 5 * (feelsLikeNum - 273.15) + 32;
            feelsLikeNum = feelsLikeNum.toFixed(1);
        }

        let windKmh = windSpeed * 3.6;
        windKmh = windKmh.toFixed(2);

        cityName.textContent = inputtedCity;
        feedback.textContent = `Description: ${desc}`;
        if (currentUnit === "celcius") {
            temperature.textContent = `${tempNum}°C`;
        }
        else {
            temperature.textContent = `${tempNum}°F`;
        }
        humid.textContent = `Humidity: ${humidity}%`;
        pres.textContent = `Pressure: ${pressure} hPa`;
        wind.textContent = `Wind Speed: ${windKmh} km/h`;
        if (currentUnit === "celcius")
            feelsLike.textContent = `Feels like: ${feelsLikeNum}°C`;
        else
            feelsLike.textContent = `Feels like: ${feelsLikeNum}°F`;
        globalTemp = tempNum;
        globalFeelsLike = feelsLikeNum;

    } catch (error) {
        alert(`Error: ${error}`);
    }
});

