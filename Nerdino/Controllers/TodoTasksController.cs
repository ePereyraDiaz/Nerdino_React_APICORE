using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nerdino.Database;
using System.Linq;

namespace Nerdino.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoTasksController : ControllerBase
    {
        private readonly IApplicationDbContext _context;

        public TodoTasksController(IApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPut]
        [Route("{id}/done")]
        public IActionResult SetTaskDone(int id)
        {            
            var ToDo = _context.TodoLists.Include(t => t.Tasks).SelectMany(x => x.Tasks.Where(y => y.Id == id)).FirstOrDefault();
            ToDo.Done = true;

            _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        [Route("{id}/done")]
        public IActionResult SetTaskUndone(int id)
        {
            var ToDo = _context.TodoLists.Include(t => t.Tasks).SelectMany(x => x.Tasks.Where(y => y.Id == id)).FirstOrDefault();
            ToDo.Done = false;

            _context.SaveChangesAsync();
            return Ok();
        }
    }
}
