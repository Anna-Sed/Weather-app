const API_KEY = 'b4543838313bf440adf9e90da8cf46e2';

const form = document.querySelector('.form');
const cityTitle = document.querySelector('.current__weather-city')
const weatherTemp = document.querySelector('.current__weater-temp')
const humidityValue = document.querySelector('.humidity-desc-value')
const windValue = document.querySelector('.wind-desc-value')

const state = {
    cityName: '',
    weatherInfo: {
        temp: null,
        windSpeed: null,
        humidity: null,
        status: null,
    }
}

const render = () => {
    const { temp, humidity, windSpeed, status } =  state.weatherInfo
    cityTitle.textContent = state.cityName
    weatherTemp.textContent = `${temp}°c`
    humidityValue.textContent = `${humidity}%`
    windValue.textContent = `${windSpeed}m/h`
}

const getGeo = async (city) => {
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
    try {
       const response = await fetch(geoUrl)
        const data = await response.json()
        console.log(data)
        const { lat, lon } = data[0]
        console.log({ lat, lon })
        return { lat, lon }
    }
    catch (e) {
        console.error('Error getGeo: ', e)
        throw new Error(e)
    }
}

const getWeather = async ({ lat, lon }) => {
    console.log('lat, lon = ', lat, lon)
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`

    try {
        const response = await fetch(weatherUrl)
        const data = await response.json()
        console.log("Data weather = ", data)
        const humidity = data.main.humidity
        const windSpeed = data.wind.speed
        const temp = Math.round(data.main.temp)
        const status = data.weather[0]['main']
        return { temp, humidity, windSpeed, status }
    }
    catch (e) {
        console.error('Weather error: ', e)
        throw new Error(e)
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(form);
    console.log('City: ', formData.get('city'))
    form.reset()

    const cityName = formData.get('city').trim()
    const coordinates = await getGeo(cityName)
    console.log('Координаты вернулись = ', coordinates)
    const { temp, humidity, windSpeed, status } = await getWeather(coordinates)
    console.log('Возврат погоды = ',{ temp, humidity, windSpeed })

    state.cityName = formData.get('city')
    state.weatherInfo = {
        temp,
        humidity,
        windSpeed,
        status
    }
    render()
})
