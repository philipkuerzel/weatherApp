const container = document.querySelector(".container")
const search = document.querySelector(".search-box button")
const weatherBox = document.querySelector(".weather-box")
const weatherDetails = document.querySelector(".weatherDetails")

search.addEventListener("click",() => {
    const APIKey = "41ad82297cf0fd9fcb842c3a02bb8abd"
    const location = document.querySelector(".search-box input").value
    
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIKey}`)
    .then((response) => response.json())
    .then((data) => {

        const weatherIcon = document.querySelector("img")
        let icon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
    
        const temperature = document.querySelector(".weather-box .temperature")
        const description = document.querySelector(".weather-box .description")

        const localTimeOutput = document.querySelector(".localTime")
        const windDetails = document.querySelector(".windDetails")
        const cloudiness = document.querySelector(".cloudiness")
        const pressure = document.querySelector(".pressure")
        const humidity = document.querySelector(".humidity")
        const sunrise = document.querySelector(".sunrise")
        const sunset = document.querySelector(".sunset")
        const geoCoordsLon = document.querySelector(".geoCoordsLon")
        const geoCoordsLat = document.querySelector(".geoCoordsLat")
        
        const localTimezoneOffset = `${data.timezone}`
        const LocalTimeLive = () => {
            const currentTimeUTC = new Date().toUTCString()
            console.log(currentTimeUTC);
            const currentTime = new Date(new Date(currentTimeUTC).getTime() + localTimezoneOffset * 1000).toLocaleTimeString();
            console.log(currentTime);
            localTimeOutput.textContent = currentTime
        };
        LocalTimeLive()
        setInterval(LocalTimeLive, 1000)

        weatherIcon.setAttribute("src", icon)
        temperature.textContent = `${(data.main.temp).toFixed(1)}°C`
        description.textContent = `${data.weather[0].description}`
        windDetails.textContent = `${data.wind.speed} Km/h (${data.wind.deg}°)`
        cloudiness.textContent = `${data.clouds.all}`
        pressure.textContent = `${data.main.pressure}hPa`
        humidity.textContent = `${data.main.humidity}%`
        const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
        const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();

        sunrise.textContent = `${sunriseTime}`;
        sunset.textContent = `${sunsetTime}`;

        geoCoordsLon.textContent = `${data.coord.lon}`
        geoCoordsLat.textContent = `${data.coord.lat}`

    }).catch ((err) => console.log(err))
})