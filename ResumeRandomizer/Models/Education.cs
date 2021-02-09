using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ResumeRandomizer.Models
{
    public class Education
    {

        public int Id { get; set; }

        public string Institution { get; set; }

        public string Degree { get; set; }

        public DateTime? DateGraduated { get; set; }

        [Required]
        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }

    }
}
