using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ResumeRandomizer.Models
{
    public class ResumeExperience
    {
        public int Id { get; set; }

        [Required]
        public int ResumeId { get; set; }
        public Resume Resume { get; set; }

        [Required]
        public int ExperienceId { get; set; }
        public Experience Experience { get; set; }
    }
}
