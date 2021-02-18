using Microsoft.EntityFrameworkCore;
using ResumeRandomizer.Data;
using ResumeRandomizer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ResumeRandomizer.Repositories
{
    public class ExperienceRepository
    {

        private readonly ApplicationDbContext _context;

        public ExperienceRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Experience> GetByUserProfileId(int id)
        {
            return _context.Experience
                .Where(e => e.UserProfileId == id)
                .Include(e => e.Bullets)
                .ToList();
        }

        public Experience GetById(int id)
        {
            return _context.Experience
                .Include(e => e.Bullets)
                .FirstOrDefault(e => e.Id == id);
        }


        public void Add(Experience experience)
        {
            _context.Add(experience);
            _context.SaveChanges();
        }

        public void Update(Experience experience)
        {
            _context.Entry(experience).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var experience = GetById(id);
            _context.Experience.Remove(experience);
            _context.SaveChanges();
        }
    }
}
