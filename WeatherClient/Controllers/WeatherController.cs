using System;
using System.Collections.Generic;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WeatherClient.Models;
using RestSharp;
using WeatherClient.Configs;
using System.Data.SqlClient;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace WeatherClient.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherController : ControllerBase
    {
        private readonly RestClient _httpClient;
        private readonly ILogger<WeatherController> _logger;

        public WeatherController(ILogger<WeatherController> logger)
        {
            _logger = logger;
            _httpClient = new RestClient("https://api.openweathermap.org/data/2.5");
        }

        [HttpGet("[action]")]
        public Weather Current(string city)
        {
            var request = new RestRequest("weather", Method.GET)
                .AddParameter("q", city)
                .AddParameter("units", "metric")
                .AddParameter("lang", "es")
                .AddParameter("appid", APIKeys.OpenWeatherMapKey);
            var response = _httpClient.Execute<OpenWeatherMap>(request);
            if (response.ErrorException != null)
            {
                _logger.LogError(response.ErrorException, response.ErrorMessage);
                Response.StatusCode = (int) HttpStatusCode.InternalServerError;
                return new Weather()
                {
                    Message = "Internal Server Error"
                };
            } 
            
            if (!response.IsSuccessful)
            {
                Response.StatusCode = (int) response.StatusCode;
                return new Weather()
                {
                    Message = response.Data.message
                };
            }

            using (var db = new DatabaseContext())
            {
                var weather = new Weather()
                {
                    Response = response.Data,
                    City = response.Data.name,
                    Country = response.Data.sys.country,
                    Temperature = response.Data.main.temp
                };
                db.Weathers.Add(weather);
                db.SaveChanges();
                
                Response.StatusCode = (int) response.StatusCode;
                return weather;
            }
        }

        [HttpGet("{id:int}")]
        public Weather Index(int id)
        {
            using (var db = new DatabaseContext())
            {
                return db.Weathers.Find(id);
            }
        }

        [HttpGet("[action]")]
        public List<Weather> LastSearches()
        {
            using (var db = new DatabaseContext())
            {
                return db.Weathers
                    .AsQueryable()
                    .Take(5)
                    .OrderByDescending(x => x.Created)
                    .ToList();
            }
        }
    }
}