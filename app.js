// YOUR JS CODE HERE
        const btnLocation = document.querySelector('.btn-get-location');
        const displayWeather = document.querySelector('.displayWeather')

        const getWeather = async (location) => {
            try {
                const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=49.2497&longitude=-123.1193&current=temperature_2m,is_day,rain,showers,wind_speed_10m&timezone=auto&forecast_days=1`)
                const data = await response.json()
                return data
            } catch (err) {
                console.error(err)
            }
        }

        btnLocation.addEventListener('click', async () => {
            const location = document.querySelector('.location').value
            const weatherData = await getWeather(location)

            if (weatherData) {
                const timezone = weatherData.timezone || "Unavailable"
                const temperature = weatherData.current ? weatherData.current.temperature_2m : "N/A"
                const windSpeed = weatherData.current ? weatherData.current.wind_speed_10m : "Unavailable"
                const time = weatherData.current ? new Date(weatherData.current.time).toLocaleString() : "N/A"


                let weatherHtml = `
                <h3>Timezone: ${timezone}</h3>
                <h3>Temperature: ${temperature} °C</h3>
                <h3>Wind Speed: ${windSpeed} km/h</h3>
                <h3>Last updated: ${time}</h3>
            `
            displayWeather.innerHTML = weatherHtml
            } else {
                displayWeather.innerHTML = "<h3>Weather data not available</h3>"
            }
        });
