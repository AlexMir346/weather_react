import React, { useState } from 'react';
import ErrorComponent from './components/ErrorComponent';

const API = {
  key: '7539eb3075559294af7f4182c5d99300',
  base: 'https://api.openweathermap.org/data/2.5/',
};

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [weatherType, setWeatherType] = useState('App');
  const [error, setError] = useState(false);

  const search = (searchWeather) => {
    if (searchWeather.key === 'Enter') {
      fetch(`${API.base}weather?q=${query}&units=metric&APPID=${API.key}`)
        .then((res) => res.json())
        .then((result) => {
          if (result.cod === '404') {
            setError(true);
            setQuery('');
          } else {
            setQuery('');
            setWeather(result);

            const weatherClass =
              typeof result.weather !== 'undefined'
                ? `App ${result.weather[0].main.toLowerCase()}`
                : 'App';

            setWeatherType(weatherClass);
            setError(false);
          }
        });
    }
  };

  const dateBuilder = (day) => {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let weekDay = days[day.getDay()];
    let date = day.getDate();
    let month = months[day.getMonth()];
    let year = day.getFullYear();

    return `${weekDay} ${date} ${month} ${year}`;
  };

  console.log(weather);

  return (
    <div>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search for the Weather"
            onChange={(event) => setQuery(event.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {error ? (
          <ErrorComponent />
        ) : (
          typeof weather.main != 'undefined' && (
            <div className="weather-container">
              <div className="location-box">
                <div className="location">
                  {weather.name}, {weather.sys.country}
                </div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <div className="weather-box">
                <div className="temp">{Math.round(weather.main.temp)}℃</div>
                <div className="weather">
                  <p>{weather.weather[0].main}</p>
                </div>

                <div className="weather-icon">
                  <p
                    className={weatherType}
                    style={{ width: '100px', height: '100px', backgroundSize: 'cover' }}></p>
                </div>
              </div>
            </div>
          )
        )}
      </main>
    </div>
  );
}

export default App;
