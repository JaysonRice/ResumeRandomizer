using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ResumeRandomizer.Models
{
    public class Resume
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Title { get; set; }

        [Required]
        public DateTime CreateDateTime { get; set; }

        [Required]
        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }
        [Required]
        public int HeaderFontId { get; set; }

        public Font HeaderFont { get; set; }
        [Required]
        public int BodyFontId { get; set; }

        public Font BodyFont { get; set; }
        [Required]
        public int ColorId { get; set; }

        public Color Color { get; set; }

        public List<Education> Educations { get; set; }

        public List<Project> Projects { get; set; }

        public List<Experience> Experiences { get; set; }

    }
}
