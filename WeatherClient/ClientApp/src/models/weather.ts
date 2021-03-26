export interface ResponseWeather {
    weather: string
    lon: number
    lat: number
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    wind_speed: number
    country: string
    timezone: number
    name: string
}