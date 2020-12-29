﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ResumeRandomizer.Models
{
    public class Color
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string ColorName { get; set; }
    }
}
