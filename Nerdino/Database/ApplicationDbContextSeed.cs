using Nerdino.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nerdino.Database
{
    public static class ApplicationDbContextSeed
    {
        public static async Task Initialize(IApplicationDbContext context)
        {
            if (!context.WeatherForecasts.Any())
            {
                var random = new Random();

                var seedWeatherForecasts = Enumerable.Range(0, 5).Select(index => new WeatherForecast
                {
                    DayOfWeek = DateTime.Today.AddDays(index).DayOfWeek.ToString(),
                    Date = DateTime.Today.AddDays(index),
                    MinTemperatureC = 30 + random.Next(0, 5),
                    MaxTemperatureC = 40 - random.Next(0, 5),
                });

                context.WeatherForecasts.AddRange(seedWeatherForecasts);
            }

            if (!context.TodoLists.Any())
            {
                var counter = 0;

                var todos = Enumerable.Range(0, 2).Select(index => new TodoList
                {
                    Name = $"Test {index + 1}",
                    Tasks = new List<TodoTask>
                    {
                        new TodoTask { Title = $"Task {++counter}", Done = (counter % 2 == 0) },
                        new TodoTask { Title = $"Task {++counter}", Done = (counter % 2 == 0)  },
                        new TodoTask { Title = $"Task {++counter}", Done = (counter % 2 == 0)  }
                    }
                });

                context.TodoLists.AddRange(todos);
            }

            await context.SaveChangesAsync();
        }
    }
}
