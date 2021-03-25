using System;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WeatherClient.Models;
using RestSharp;

namespace WeatherClient.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherController : ControllerBase
    {
        private readonly string _openWeatherMapKey;
        private readonly RestClient _httpClient;
        private readonly ILogger<WeatherController> _logger;

        public WeatherController(ILogger<WeatherController> logger)
        {
            _logger = logger;
            _openWeatherMapKey = Environment.GetEnvironmentVariable("OPEN_WEATHER_MAP_KEY");
            _httpClient = new RestClient("https://api.openweathermap.org/data/2.5");
        }

        [HttpGet]
        public JsonResult Get()
        {
            return new JsonResult(new
            {
                message = "Hello World"
            });
        }

        [HttpGet("[action]")]
        public JsonResult Current(string city)
        {
            var request = new RestRequest("weather", Method.GET)
                .AddParameter("q", city)
                .AddParameter("units", "metric")
                .AddParameter("lang", "es")
                .AddParameter("appid", _openWeatherMapKey);
            var response = _httpClient.Execute<OpenWeatherMap>(request);
            if (response.ErrorException != null)
            {
                _logger.LogError(response.ErrorException, response.ErrorMessage);
                Response.StatusCode = (int) HttpStatusCode.InternalServerError;
                return new JsonResult(new
                {
                    message = "Internal Server Error"
                });
            }
            
            if (!response.IsSuccessful)
            {
                Response.StatusCode = (int) response.StatusCode;
                return new JsonResult(new
                {
                    message = response.Data.message
                });
            }

            Response.StatusCode = (int) response.StatusCode;
            return new JsonResult(new ResponseWeather
            {
                weather = response.Data.weather[0].description,
                lon = response.Data.coord.lon,
                lat = response.Data.coord.lat,
                temp = response.Data.main.temp,
                feels_like = response.Data.main.temp,
                temp_min = response.Data.main.temp_min,
                temp_max = response.Data.main.temp_max,
                pressure = response.Data.main.pressure,
                humidity = response.Data.main.humidity,
                wind_speed = response.Data.wind.speed,
                country = response.Data.sys.country,
                timezone = response.Data.timezone / 3600,
                name = response.Data.name
            });
        }
    }
}