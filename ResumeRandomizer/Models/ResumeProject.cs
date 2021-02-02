using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ResumeRandomizer.Models
{
    public class ResumeProject
    {
        public int Id { get; set; }

        [Required]
        public int ResumeId { get; set; }
        public Resume Resume { get; set; }

        [Required]
        public int ProjectId { get; set; }
        public Project Project { get; set; }
    }
}
