using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nerdino.Database;
using Nerdino.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nerdino.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoListsController : ControllerBase
    {
        private readonly IApplicationDbContext _context;

        public TodoListsController(IApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("")]
        public IActionResult Get()
        {
            return Ok(_context.TodoLists.Include(t => t.Tasks));
        }

        [HttpPost]
        [Route("")]
        public async Task<IActionResult> Post(TodoList todoList)
        {
            if (todoList == null || todoList.Id != 0)
            {
                return BadRequest();
            }

            _context.TodoLists.Add(todoList);
            await _context.SaveChangesAsync();

            return Ok(todoList.Id);
        }

        [HttpPost]
        [Route("{id}/todotasks")]
        public async Task<IActionResult> Post(int id, TodoTask todoTask)
        {
            var todoList = await _context.TodoLists.FirstOrDefaultAsync(t => t.Id == id);

            if (todoList is null)
            {
                return BadRequest();
            }

            if (todoList.Tasks == null)
            {
                todoList.Tasks = new List<TodoTask>();
            }

            var newTodoTask = new TodoTask
            {
                Title = todoTask.Title
            };

            todoList.Tasks.Add(newTodoTask);
            await _context.SaveChangesAsync();

            return Ok(newTodoTask.Id);
        }
    }
}
