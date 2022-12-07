using System;

namespace Nerdino.Entities
{
    public class TodoTask : AuditableEntity
    {
        public string Title { get; set; }

        public bool Done { get; set; }
    }
}
