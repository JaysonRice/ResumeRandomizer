using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ResumeRandomizer.Models
{
    public class Bullet
    {
        public int Id { get; set; }

        public int? ExperienceId { get; set; }

        public Experience Experience { get; set; }

        public int? ProjectId { get; set; }

        public Project Project { get; set; }

        public string Content { get; set; }
    }
}
