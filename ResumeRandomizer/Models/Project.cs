using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ResumeRandomizer.Models
{
    public class Project
    {

        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Title { get; set; }
        [Required]
        public string ProjectName { get; set; }

        public DateTime? DateStarted { get; set; }

        public DateTime? DateFinished { get; set; }

        [Required]
        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }

        public List<Bullet> Bullets { get; set; }
    }
}
