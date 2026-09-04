# Weatherly

A responsive weather application built with HTML, CSS, and vanilla JavaScript. Weatherly uses the OpenWeather API to retrieve and display current weather conditions for a searched city.

## Features

* Search for a city and retrieve its current weather
* Display temperature, feels-like temperature, humidity, pressure, wind speed, and weather description
* Switch between Celsius and Fahrenheit
* Convert temperatures locally without making additional API requests
* Responsive layout
* Interactive UI elements and hover states

## Technologies

* HTML5
* CSS3
* JavaScript (ES6+)
* OpenWeather API
* Font Awesome
* Google Fonts

## API

Weatherly uses two OpenWeather endpoints:

1. **Geocoding API** — converts the searched city name into latitude and longitude.
2. **Current Weather API** — retrieves the current weather data using those coordinates.

```text
City name
    ↓
Geocoding API
    ↓
Latitude / Longitude
    ↓
Current Weather API
    ↓
Weather data
```

Temperature unit conversion is handled on the client side using the data already retrieved from the API.

## Project Structure

```text
Weatherly/
├── index.html
├── style.css
├── script.js
├── images/
│   ├── Dark Valley Background Image.jpg
│   └── weather_icon_background_removed.png
└── README.md
```

## Setup

### 1. Clone the repository

```bash
git clone <https://github.com/Abdullah-Naveed1/Weatherly.git>
cd Weatherly
```

### 2. Configure the API key

Create an API key through OpenWeather and add it to `script.js`.

```javascript
const apiKey = "YOUR_API_KEY";
```

Do not commit a real API key to a public repository.

### 3. Run the application

Open `index.html` in a browser.

No backend or build process is currently required.

## Preview

<img width="1889" height="1008" alt="Screenshot 2026-09-05 004133" src="https://github.com/user-attachments/assets/1651112f-8391-45c0-9298-e3f9c452f304" />

## Known Limitations

* API requests are currently made directly from the client.
* API credentials therefore cannot be securely hidden in the current architecture.
* Error and loading states are limited.
* The application currently focuses on current weather rather than forecasts.

## Future Improvements

* Add weather icons
* Add loading and error states
* Support searching with the Enter key
* Improve mobile responsiveness
* Refactor JavaScript into smaller modules/functions
* Improve API error handling
* Introduce a backend/serverless API layer
* Add weather forecasts
* Improve UI and accessibility

## License

This project is available for educational and personal use.
