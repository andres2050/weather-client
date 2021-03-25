using System;
using System.Net;
using System.Net.Http;
using WeatherClient.Models;
using RestSharp;
using System.Web.Http.Tracing;
using System.Web.Http;

namespace WeatherClient.Controllers
{
    [Route("api/[controller]")]
    public class WeatherController : ApiController
    {
        private readonly string _openWeatherMapKey;
        private readonly RestClient _httpClient;

        public WeatherController()
        {
            _openWeatherMapKey = Environment.GetEnvironmentVariable("OPEN_WEATHER_MAP_KEY");
            _httpClient = new RestClient("https://api.openweathermap.org/data/2.5");
        }

        [HttpGet]
        public HttpResponseMessage GetWeather(string City)
        {
            var request = new RestRequest("weather", Method.GET)
                .AddParameter("q", City)
                .AddParameter("units", "metric")
                .AddParameter("lang", "es")
                .AddParameter("appid", _openWeatherMapKey);
            var response = _httpClient.Execute<OpenWeatherMap>(request);
            if (response.ErrorException != null)
            {
                Configuration.Services.GetTraceWriter().Error(Request, response.ErrorMessage, response.ErrorException);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new
                {
                    message = "Internal Server Error"
                });
            }

            if (!response.IsSuccessful)
            {
                return Request.CreateResponse(response.StatusCode, new
                {
                    message = response.Data.message
                });
            }


            return Request.CreateResponse(response.StatusCode, new ResponseWeather
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