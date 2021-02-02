using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ResumeRandomizer.Models.ViewModels
{
    public class ResumeListView
    {

        public int Id { get; set; }

        public string Title { get; set; }

        public DateTime CreateDateTime { get; set; }

        public string HeaderFont { get; set; }

        public string BodyFont { get; set; }

        public string Color { get; set; }
    }
}
