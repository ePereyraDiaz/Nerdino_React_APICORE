using Microsoft.AspNetCore.Mvc;
using Nerdino.Database;
using Nerdino.Entities;
using System.Collections.Generic;
using System.Linq;

namespace Nerdino.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly IApplicationDbContext _context;

        public WeatherForecastController(IApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            return _context.WeatherForecasts.Take(5);
        }
    }
}
