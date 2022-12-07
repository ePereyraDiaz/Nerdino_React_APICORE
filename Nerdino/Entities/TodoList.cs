using System.Collections.Generic;

namespace Nerdino.Entities
{
    public class TodoList : AuditableEntity
    {
        public string Name { get; set; }

        public ICollection<TodoTask> Tasks { get; set; }
    }
}
