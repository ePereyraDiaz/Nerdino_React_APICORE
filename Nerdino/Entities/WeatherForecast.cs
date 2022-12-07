using System;
using System.ComponentModel.DataAnnotations;

namespace Nerdino.Entities
{
    public class WeatherForecast : AuditableEntity
    {
        public string DayOfWeek { get; set; }

        public DateTime Date { get; set; }

        public int MinTemperatureC { get; set; }

        public int MaxTemperatureC { get; set; }

        public int MinTemperatureF => 32 + (int)(MinTemperatureC / 0.5556);

        public int MaxTemperatureF => 32 + (int)(MaxTemperatureC / 0.5556);
    }
}
